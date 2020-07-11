using System.Collections.Generic;

namespace Reception.Tests.Hosted
{
    public class RegisterUserTestData
    {
        public RegisterUser Default => new RegisterUser
        {
            Id = 1,
            Password = "password",
            Email = "user@email.com"
        };

        public RegisterUser Admin => new RegisterUser
        {
            Id = 2,
            Password = "secret",
            Email = "admin@email.com",
            Roles = new List<string> {"Admin"}
        };

        public class RegisterUser
        {
            public RegisterUser()
            {
                Roles = new List<string>();
                Permissions = new List<string>();
            }

            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public List<string> Roles { get; set; } 
            public List<string> Permissions { get; set; }
        }
    }
}