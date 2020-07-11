using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using Reception.ServiceModel;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Reception.Tests.Hosted
{
    public class CreateVisitTests : AppHostBase
    {
        protected string UserId;
        protected IServiceClient Client { get; set; }

        [SetUp]
        protected override async Task SetUp()
        {
            await base.SetUp();
            RegisterUser(DefaultRegisterUser);
            var authResponse = AuthenticateWithCredentials();
            var bearerToken = authResponse.BearerToken;
            bearerToken.Should().NotBeEmpty();
            Client = GetClientWithBearerToken(authResponse.BearerToken);

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
        public void Should_Create_Visit()
        {
            var response = Client.Post(GetCreateVisit);
            response.Should().NotBeNull();
            response.ResponseStatus.Should().BeNull();
            response.Id.Should().BeGreaterThan(0);
        }
    }
}