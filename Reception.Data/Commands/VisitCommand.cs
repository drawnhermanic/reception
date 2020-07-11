using System;
using System.Data;
using System.Threading.Tasks;
using Reception.ServiceModel.Types;

namespace Reception.Data.Commands
{
    public interface IVisitCommand
    {
        Task Create(IDbConnection db, VisitEntity entity);
        Task End(IDbConnection db, long id, DateTime endDateTime);
    }

    public class VisitCommand : IVisitCommand
    {
        public Task Create(IDbConnection db, VisitEntity entity)
        {
            //if (db.CreateTableIfNotExists<VisitEntity>())
            //{
            //    await db.SaveAsync(entity);
            //}
            return Task.CompletedTask;
        }

        public Task End(IDbConnection db, long id, DateTime endDateTime)
        {
            //db.UpdateAdd(() => new VisitEntity { EndDateTime = endDateTime }, 
            //    where: x => x.Id == id);
            return Task.CompletedTask;
        }
    }
}
