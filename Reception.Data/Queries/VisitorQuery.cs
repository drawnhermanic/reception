using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Reception.ServiceModel.Types;

namespace Reception.Data.Queries
{
    public interface IVisitorQuery
    {
        Task<VisitEntity> Get(IDbConnection db, int id);
        Task<IList<VisitEntity>> GetAll(IDbConnection db);
    }

    public class VisitorQuery : IVisitorQuery
    {
        public async Task<VisitEntity> Get(IDbConnection db, int id)
        {
            var result = await db.SingleByIdAsync<VisitEntity>(id);
            return result;
        }

        public async Task<IList<VisitEntity>> GetAll(IDbConnection db)
        {
            var result = await db.SelectAsync<VisitEntity>();
            return result;
        }
    }
}