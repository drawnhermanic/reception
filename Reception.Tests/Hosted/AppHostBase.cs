using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Auth;

namespace Reception.Tests.Hosted
{
    public abstract class AppHostBase
    {
        public const string ListeningOn = "http://localhost:2337/";
        protected ServiceStackHost AppHost;

        protected virtual RegisterUserTestData.RegisterUser DefaultRegisterUser => new RegisterUserTestData().Default;

        protected virtual RegisterUserTestData.RegisterUser DefaultRegisterAdminUser => new RegisterUserTestData().Admin;

        protected virtual IServiceClient GetClient() => new JsonServiceClient(ListeningOn);

        [SetUp]
        protected virtual async Task SetUp()
        {
            AppHost = CreateAppHost()
                .Init()
                .Start(ListeningOn);

            await Task.CompletedTask;
        }

        [TearDown]
        protected virtual async Task TearDown()
        {
            AppHost.Dispose();

            await Task.CompletedTask;
        }

        protected virtual ServiceStackHost CreateAppHost()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            var configuration = builder.Build();

            return new TestAppHost(ListeningOn)
            {
                AppSettings = new NetCoreAppSettings(configuration)
            };
        }

        protected IServiceClient GetClientWithBearerToken(string bearerToken)
        {
            return new JsonServiceClient(ListeningOn)
            {
                BearerToken = bearerToken,
            };
        }

        protected IServiceClient GetClientWithAuthSecret()
        {
            var authSecretHeader = HttpHeaders.XParamOverridePrefix + "authsecret";
            return new JsonServiceClient(ListeningOn)
            {
                RequestFilter = req => req.Headers[authSecretHeader] = "xxx"
            };
        }

        protected virtual AuthenticateResponse AuthenticateWithCredentials()
        {
            return GetClient().Post(new Authenticate
            {
                provider = "credentials",
                UserName = DefaultRegisterUser.Email,
                Password = DefaultRegisterUser.Password
            });
        }

        protected virtual AuthenticateResponse AuthenticateAdminWithCredentials()
        {
            return GetClient().Post(new Authenticate
            {
                provider = "credentials",
                UserName = DefaultRegisterAdminUser.Email,
                Password = DefaultRegisterAdminUser.Password
            });
        }

        protected virtual void RegisterUser(RegisterUserTestData.RegisterUser user)
        {
            CreateUser(user);
        }

        protected virtual void RegisterAdminUser(RegisterUserTestData.RegisterUser user)
        {
            CreateUser(user);
        }

        private void CreateUser(RegisterUserTestData.RegisterUser user)
        {
            new SaltedHash().GetHashAndSaltString(user.Password, out var hash, out var salt);

            var authRepo = AppHost.Container.Resolve<IAuthRepository>();
            authRepo.CreateUserAuth(new AppUser
            {
                Id = user.Id,
                DisplayName = "DisplayName",
                Email = user.Email,
                UserName = user.Username,
                PasswordHash = hash,
                Salt = salt,
                Roles = user.Roles,
                Permissions = user.Permissions
            }, user.Password);
        }
    }
}