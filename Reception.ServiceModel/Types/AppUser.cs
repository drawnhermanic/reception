using System;
using ServiceStack.Auth;

namespace Reception.ServiceModel.Types
{
    // Custom UserAuth Data Model with extended Metadata properties
    public class AppUser : UserAuth
    {
        public string ProfileUrl { get; set; }
        public string LastLoginIp { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string CarRegistration { get; set; }
    }
}