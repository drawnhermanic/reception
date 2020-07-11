using System;
using System.Threading.Tasks;
using Reception.ServiceModel;
using Reception.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.OrmLite;

namespace Reception.ServiceInterface
{
    [Authenticate]
    public class VisitService : Service
    {
        private readonly IAuthRepository _authRepository;

        public VisitService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<CreateVisitResponse> Post(CreateVisit request)
        {
            UpdateUserAuth(request);
            var entity = request.ConvertTo<VisitEntity>();
            entity.AuthUserId = int.Parse(GetSession().UserAuthId);
            await Db.SaveAsync(entity);
            return new CreateVisitResponse { Id = entity.Id };
        }

        public async Task<GetVisitResponse> Get(GetVisitById request)
        {
            var visit = await Db.SingleByIdAsync<VisitEntity>(request.Id);
            if(visit == null)
                throw HttpError.NotFound($"Visit {request.Id} does not exist");
            var response = visit.ConvertTo<GetVisitResponse>();
            return response;
        }

        public async Task<GetVisitResponse> Get(GetVisit request)
        {
            var userAuthId = int.Parse(GetSession().UserAuthId);
            var visit = await Db.SingleAsync<VisitEntity>(x => 
                x.AuthUserId == userAuthId && 
                !x.EndDateTime.HasValue);
            if (visit == null)
                throw HttpError.NotFound(ErrorMessage.NoActiveVisits);
            var response = visit.ConvertTo<GetVisitResponse>();
            return response;
        }

        public async Task<EndVisitResponse> Post(EndVisit request)
        {
            var visit = await Db.SingleByIdAsync<VisitEntity>(request.Id);
            if (visit == null)
                throw HttpError.NotFound(string.Format(ErrorMessage.VisitDoesNotExist, request.Id));
            if (visit.EndDateTime.HasValue)
                throw HttpError.BadRequest(new ArgumentException(ErrorMessage.EndDateExists, nameof(request.VisitEndedDateTime)).Message);
            if (!HasValidEndDate(visit.DateTime, request.VisitEndedDateTime))
                throw HttpError.BadRequest(new ArgumentException(ErrorMessage.MaxEndDateExceeded, nameof(request.VisitEndedDateTime)).Message);

            await Db.UpdateAddAsync(() => new VisitEntity
            {
                EndDateTime = request.VisitEndedDateTime
            },
                x =>
                    x.Id == request.Id);
            return new EndVisitResponse();
        }

        private void UpdateUserAuth(CreateVisit request)
        {
            var email = GetSession().Email;
            var appUser = (AppUser)_authRepository.GetUserAuthByUserName(email);
            if (request.ContactNumber != appUser.PhoneNumber)
            {
                appUser.PhoneNumber = request.ContactNumber;
                _authRepository.SaveUserAuth(appUser);
            }
            if (request.CarRegistration != appUser.CarRegistration)
            {
                appUser.CarRegistration = request.CarRegistration;
                _authRepository.SaveUserAuth(appUser);
            }
        }

        private bool HasValidEndDate(DateTime visitStartTime, DateTime visitEndTime)
        {
            var hours = (visitEndTime - visitStartTime).TotalHours;
            if (hours > 8)
                return false;
            return true;
        }
    }
}