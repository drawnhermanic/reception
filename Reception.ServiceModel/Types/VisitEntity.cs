using System;
using ServiceStack.DataAnnotations;

namespace Reception.ServiceModel.Types
{
    public class VisitEntity
    {
        [AutoIncrement]
        public int Id { get; set; }

        [Required]
        public string HostName { get; set; }

        [Required]
        public VisitorType? VisitorType { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public string CarRegistration { get; set; }

        public string ContactNumber { get; set; }

        public DateTime? EndDateTime { get; set; }

        [Required]
        //[References(typeof(UserAuth))]
        public int AuthUserId { get; set; }

        [Reference]
        public AppUser AppUser { get; set; }
    }
}