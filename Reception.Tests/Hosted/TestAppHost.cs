using System;
using System.Net;
using Funq;
using Reception.ServiceInterface;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Reception.Tests.Hosted
{
    public class ConfigureAuthTest : ConfigureAuth
    {
    }

    public class ConfigureAuthRepositoryTest : ConfigureAuthRepository
    {
    }

    public class TestAppHost : AppSelfHostBase
    {
        private readonly string _webUrl;

        public TestAppHost(string webUrl) : base("Reception.Test", typeof(VisitorService).Assembly)
        {
            _webUrl = webUrl;
        }

        public Action<Container> Use;

        protected IAuthRepository AuthRepo;

        public override void Configure(Container container)
        {
            ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;

            Use?.Invoke(container);

            SetConfig(new HostConfig
            {
                AdminAuthSecret = "xxx",
                DebugMode = true
            });

            ConfigureContainer(container);
        }

        public virtual void ConfigureContainer(Container container)
        {
            container.Register<IDbConnectionFactory>(c =>
                new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));

            AuthRepo = new InMemoryAuthRepository<AppUser, UserAuthDetails>();
            container.Register(AuthRepo);
            AuthRepo.InitSchema();
        }
    }
}