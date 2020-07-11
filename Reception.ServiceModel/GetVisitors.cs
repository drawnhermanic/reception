using System;
using System.Collections.Generic;
using ServiceStack;

namespace Reception.ServiceModel
{
    [Tag("Visitors")]
    [Route("/visitors", "GET", Summary = "GET Visitors", Notes = "Get all visitors")]
    public class GetVisitors : IReturn<GetVisitorsResponse> {}

    public class GetVisitorsResponse : IHasResponseStatus
    {
        public List<GetVisitor> Visitors { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    public class GetVisitor
    {
        public string HostName { get; set; }

        public string VisitorName { get; set; }

        public VisitorType VisitorType { get; set; }

        public DateTime DateTime { get; set; }

        public string ContactNumber { get; set; }

        public string CarRegistration { get; set; }

        public DateTime? EndDateTime { get; set; }
    }
}
