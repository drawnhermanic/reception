using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Web;
using ServiceStack.Auth;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Reception
{
    public class AppUserAuthEvents : AuthEvents
    {
        public override void OnAuthenticated(IRequest req, IAuthSession session, IServiceBase authService, 
            IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            var authRepo = HostContext.AppHost.GetAuthRepository(req);
            using (authRepo as IDisposable)
            {
                var userAuth = (AppUser)authRepo.GetUserAuth(session.UserAuthId);
                userAuth.ProfileUrl = session.GetProfileUrl();
                userAuth.LastLoginIp = req.UserHostAddress;
                userAuth.LastLoginDate = DateTime.UtcNow;
                authRepo.SaveUserAuth(userAuth);
            }
        }
    }

    public class ConfigureAuthRepository : IConfigureAppHost, IConfigureServices, IPreInitPlugin
    {
        public void Configure(IServiceCollection services)
        {
            services.AddSingleton<IDbConnectionFactory>(c =>
                new OrmLiteConnectionFactory("Data Source=Reception.db;Version=3;", SqliteDialect.Provider));

            services.AddSingleton<IAuthRepository>(c =>
                new OrmLiteAuthRepository<AppUser, UserAuthDetails>(c.Resolve<IDbConnectionFactory>()));
        }

        public void Configure(IAppHost appHost)
        {
            var authRepo = appHost.Resolve<IAuthRepository>();
            authRepo.InitSchema();

            CreateUser(authRepo, "reception@barnardos.org.au", "Admin User", "R3c3ption", roles:new[]{ RoleNames.Admin });
        }

        public void BeforePluginsLoaded(IAppHost appHost)
        {
            appHost.AssertPlugin<AuthFeature>().AuthEvents.Add(new AppUserAuthEvents());
        }

        // Add initial Users to the configured Auth Repository
        public void CreateUser(IAuthRepository authRepo, string email, string name, string password, string[] roles)
        {
            if (authRepo.GetUserAuthByUserName(email) == null)
            {
                var newAdmin = new AppUser { Email = email, DisplayName = name };
                var user = authRepo.CreateUserAuth(newAdmin, password);
                authRepo.AssignRoles(user, roles);
            }
        }
    }
}
