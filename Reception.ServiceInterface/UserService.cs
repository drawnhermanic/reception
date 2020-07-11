using Reception.ServiceModel;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Auth;

namespace Reception.ServiceInterface
{
    [Authenticate]
    public class UserService : Service
    {
        private readonly IAuthRepository _authRepository;

        public UserService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public GetUserResponse Get(GetUser request)
        {
            var email = GetSession().Email;
            var appUser = (AppUser)_authRepository.GetUserAuthByUserName(email);
            var response = appUser.ConvertTo<GetUserResponse>();
            return response;
        }
    }
}