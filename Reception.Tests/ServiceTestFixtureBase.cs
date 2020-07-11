using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Testing;

namespace Reception.Tests
{
    public abstract class ServiceTestFixtureBase
    {
        protected ServiceStackHost AppHost;
        protected InMemoryAuthRepository AuthRepo;

        public const string UserName = "user";
        public const string Password = "p@55word";
        public const string Email = "test@email.com";

        [SetUp]
        protected virtual async Task SetUp()
        {
            AppHost = new BasicAppHost().Init();
            AppHost.Container.Register<IDbConnectionFactory>(new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));
            AuthRepo = new InMemoryAuthRepository();
            AppHost.Container.Register<IAuthRepository>(AuthRepo);
            AppHost.Container.Register<IAuthSession>(c => CreateUserSession());

            CreateUser(1, UserName, null, Password, new List<string> { "Admin" });

            await Task.CompletedTask;
        }

        private void CreateUser(int id, string username, string email, string password, List<string> roles = null, List<string> permissions = null)
        {
            new SaltedHash().GetHashAndSaltString(password, out var hash, out var salt);

            AuthRepo.CreateUserAuth(new AppUser
            {
                Id = id,
                DisplayName = "DisplayName",
                Email = email ?? Email,
                UserName = username,
                FirstName = "FirstName",
                LastName = "LastName",
                PasswordHash = hash,
                Salt = salt,
                Roles = roles,
                Permissions = permissions
            }, password);
        }

        public static AuthUserSession CreateUserSession()
        {
            return new AuthUserSession
            {
                UserAuthId = "1",
                Language = "en",
                PhoneNumber = "*****",
                FirstName = "Test",
                LastName = "User",
                Email = Email,
                PrimaryEmail = Email,
                UserAuthName = "Mocked",
                UserName = "Mocked",
            };
        }

        [TearDown]
        public void TearDown()
        {
            AuthRepo.Clear();
            AppHost.Dispose();
        }
    }
}