namespace Reception.ServiceInterface
{
    public static class ErrorMessage
    {
        public const string VisitDoesNotExist = "Visit {0} does not exist";
        public const string NoActiveVisits = "No active visits for the user exist";
        public const string EndDateExists = "Your visit has already been ended";
        public const string MaxEndDateExceeded = "Your visit has exceeded the maximum time and has been ended";
    }
}