using ServiceStack;

namespace Reception.ServiceModel
{
    [Tag("User")]
    [Route("/user", "GET", Summary = "GET User", Notes = "Get user details")]
    public class GetUser : IReturn<GetUserResponse>
    {
    }

    public class GetUserResponse : IHasResponseStatus
    {
        public int Id { get; set; }

        public string PhoneNumber { get; set; }

        public string CarRegistration { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }
}