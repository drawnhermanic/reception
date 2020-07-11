using System;
using System.Net;
using ServiceStack;

namespace Reception.ServiceModel
{
    [Tag("Visit")]
    [ApiResponse(HttpStatusCode.BadRequest, "Your request was not understood")]
    [ApiResponse(HttpStatusCode.InternalServerError, "Oops, something broke")]
    [Route("/visit/end", "POST", Summary = "POST Visit End", Notes = "End a visit")]
    public class EndVisit : IReturn<EndVisitResponse>
    {
        public int Id { get; set; }

        public DateTime VisitEndedDateTime { get; set; }
    }

    public class EndVisitResponse : IHasResponseStatus
    {
        public ResponseStatus ResponseStatus { get; set; }
    }
}