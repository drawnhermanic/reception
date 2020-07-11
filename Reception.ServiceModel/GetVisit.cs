using System;
using System.Net;
using ServiceStack;

namespace Reception.ServiceModel
{
    [Tag("Visit")]
    [ApiResponse(HttpStatusCode.BadRequest, "Your request was not understood")]
    [ApiResponse(HttpStatusCode.InternalServerError, "Oops, something broke")]
    [Route("/visit/{Id}", "GET", Summary = "GET Visit By Id", Notes = "Get visit details by id")]
    public class GetVisitById : IReturn<GetVisitResponse>
    {
        public int Id { get; set; }
    }

    [Tag("Visit")]
    [ApiResponse(HttpStatusCode.BadRequest, "Your request was not understood")]
    [ApiResponse(HttpStatusCode.InternalServerError, "Oops, something broke")]
    [Route("/visit", "GET", Summary = "GET Visit", Notes = "Get current visit details of user")]
    public class GetVisit : IReturn<GetVisitResponse>
    {
    }

    public class GetVisitResponse : IHasResponseStatus
    {
        public int Id { get; set; }

        public VisitorType VisitorType { get; set; }

        public DateTime DateTime { get; set; }

        public string ContactNumber { get; set; }

        public string CarRegistration { get; set; }

        public DateTime? EndDateTime { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }
}