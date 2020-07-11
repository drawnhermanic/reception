using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceStack;
using Reception.ServiceModel;
using Reception.ServiceModel.Types;
using ServiceStack.Auth;
using ServiceStack.OrmLite;

namespace Reception.ServiceInterface
{
    [Authenticate]
    public class VisitorService : Service
    {
        private readonly IAuthRepository _authRepository;

        public VisitorService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [RequiredRole("Admin")]
        public async Task<GetVisitorsResponse> Get(GetVisitors request)
        {
            var q = Db.From<VisitEntity>();
            q.Join<VisitEntity, AppUser>((visit, user) => visit.AuthUserId == user.Id);
            var results = await Db.SelectMultiAsync<VisitEntity, AppUser>(q);
            var visitors = new List<GetVisitor>();

            foreach (var result in results)
            {
                var visitor = result.Item1.ConvertTo<GetVisitor>();
                visitor.VisitorName = result.Item2.DisplayName;
                visitors.Add(visitor);
            }

            return new GetVisitorsResponse
            {
                Visitors = visitors
            };
        }
    }
}