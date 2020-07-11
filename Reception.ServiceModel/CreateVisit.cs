using System;
using System.Net;
using ServiceStack;

namespace Reception.ServiceModel
{
    [Tag("Visit")]
    [ApiResponse(HttpStatusCode.BadRequest, "Your request was not understood")]
    [ApiResponse(HttpStatusCode.InternalServerError, "Oops, something broke")]
    [Route("/visit", "POST", Summary = "POST Visit", Notes = "Create a visit record")]
    public class CreateVisit : IReturn<CreateVisitResponse>
    {
        [ApiMember(Name = "HostName", Description = "Name of person being visited", DataType = "string", IsRequired = true)]
        public string HostName { get; set; }

        [ApiMember(Name = "VisitorType", Description = "Type of visitor", DataType = "string", IsRequired = true)]
        [ApiAllowableValues("VisitorType", typeof(VisitorType))]
        public VisitorType VisitorType { get; set; }

        [ApiMember(Name = "DateTime", Description = "Date and time of visit", DataType = "string", Format = "date-time", IsRequired = false)]
        public DateTime DateTime { get; set; }

        [ApiMember(Name = "ContactNumber", Description = "Contact number", DataType = "string", IsRequired = true)]
        public string ContactNumber { get; set; }

        [ApiMember(Name = "CarRegistration", Description = "Car registration number", DataType = "string", IsRequired = false)]
        public string CarRegistration { get; set; }
    }

    public enum VisitorType
    {
        Employee,
        Contractor
    }

    public class CreateVisitResponse : IHasResponseStatus
    {
        public int Id { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }
}