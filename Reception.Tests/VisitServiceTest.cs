using System;
using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Testing;
using Reception.ServiceInterface;
using Reception.ServiceModel;
using Reception.ServiceModel.Types;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Reception.Tests
{
    public class VisitServiceTest : ServiceTestFixtureBase
    {
        protected VisitService Service;

        [SetUp]
        protected override async Task SetUp()
        {
            await base.SetUp();
            AppHost.Container.AddTransient<VisitService>();
            Service = AppHost.Container.Resolve<VisitService>();
            Service.Request = new MockHttpRequest();

            using var db = await AppHost.Container.Resolve<IDbConnectionFactory>().OpenAsync();
            db.DropAndCreateTable<VisitEntity>();
        }

        private CreateVisit GetCreateVisit => new CreateVisit
        {
            HostName = "Somebody",
            VisitorType = VisitorType.Contractor,
            CarRegistration = "ABC123",
            ContactNumber = "012345",
            DateTime = DateTime.Now
        };

        [Test]
        public async Task Can_Create_Visit()
        {
            var visit = await Service.Post(GetCreateVisit);

            visit.Should().NotBeNull();
            visit.Id.Should().BeGreaterThan(0);

            var getVisit = await Service.Get(new GetVisitById { Id = visit.Id });

            getVisit.Should().NotBeNull();
            getVisit.Id.Should().Be(visit.Id);
        }
        
        [Test]
        public async Task Can_Get_Active_Visit()
        {
            var visit = await Service.Post(GetCreateVisit);

            visit.Should().NotBeNull();
            visit.Id.Should().BeGreaterThan(0);

            var getVisit = await Service.Get(new GetVisit());

            getVisit.Should().NotBeNull();
            getVisit.Id.Should().Be(visit.Id);
        }

        [Test]
        public async Task Cannot_Get_Visit_Than_Has_Ended()
        {
            var visit = await Service.Post(GetCreateVisit);

            visit.Should().NotBeNull();
            visit.Id.Should().BeGreaterThan(0);

            await Service.Post(new EndVisit
            {
                Id = visit.Id,
                VisitEndedDateTime = DateTime.Now
            });

            Func<Task> act = async () => await Service.Get(new GetVisit());
            act.Should().Throw<HttpError>()
                .Where(e => 
                    e.Message == ErrorMessage.NoActiveVisits && 
                    e.StatusCode == HttpStatusCode.NotFound);
        }

        [Test]
        public async Task Cannot_End_Visit_After_Max_Time()
        {
            var visit = await Service.Post(GetCreateVisit);

            visit.Should().NotBeNull();
            visit.Id.Should().BeGreaterThan(0);
            
            Func<Task> act = async () => await Service.Post(new EndVisit
            {
                Id = visit.Id,
                VisitEndedDateTime = DateTime.Now.AddDays(1)
            });

            act.Should().Throw<HttpError>()
                .Where(e => 
                    e.Message.Contains(ErrorMessage.MaxEndDateExceeded) && 
                    e.StatusCode == HttpStatusCode.BadRequest);
        }
    }
}
