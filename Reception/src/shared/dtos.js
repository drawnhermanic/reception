/* Options:
Date: 2020-07-11 08:31:12
Version: 5.91
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:44311

//GlobalNamespace:
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
//ExcludeTypes:
//DefaultImports:
*/
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError(init) {
        Object.assign(this, init);
    }
    return ResponseError;
}());
export { ResponseError };
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus(init) {
        Object.assign(this, init);
    }
    return ResponseStatus;
}());
export { ResponseStatus };
export var VisitorType;
(function (VisitorType) {
    VisitorType["Employee"] = "Employee";
    VisitorType["Contractor"] = "Contractor";
})(VisitorType || (VisitorType = {}));
var GetVisitor = /** @class */ (function () {
    function GetVisitor(init) {
        Object.assign(this, init);
    }
    return GetVisitor;
}());
export { GetVisitor };
var GetUserResponse = /** @class */ (function () {
    function GetUserResponse(init) {
        Object.assign(this, init);
    }
    return GetUserResponse;
}());
export { GetUserResponse };
var GetVisitorsResponse = /** @class */ (function () {
    function GetVisitorsResponse(init) {
        Object.assign(this, init);
    }
    return GetVisitorsResponse;
}());
export { GetVisitorsResponse };
var CreateVisitResponse = /** @class */ (function () {
    function CreateVisitResponse(init) {
        Object.assign(this, init);
    }
    return CreateVisitResponse;
}());
export { CreateVisitResponse };
var GetVisitResponse = /** @class */ (function () {
    function GetVisitResponse(init) {
        Object.assign(this, init);
    }
    return GetVisitResponse;
}());
export { GetVisitResponse };
var EndVisitResponse = /** @class */ (function () {
    function EndVisitResponse(init) {
        Object.assign(this, init);
    }
    return EndVisitResponse;
}());
export { EndVisitResponse };
// @DataContract
var AuthenticateResponse = /** @class */ (function () {
    function AuthenticateResponse(init) {
        Object.assign(this, init);
    }
    return AuthenticateResponse;
}());
export { AuthenticateResponse };
// @DataContract
var AssignRolesResponse = /** @class */ (function () {
    function AssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return AssignRolesResponse;
}());
export { AssignRolesResponse };
// @DataContract
var UnAssignRolesResponse = /** @class */ (function () {
    function UnAssignRolesResponse(init) {
        Object.assign(this, init);
    }
    return UnAssignRolesResponse;
}());
export { UnAssignRolesResponse };
// @DataContract
var ConvertSessionToTokenResponse = /** @class */ (function () {
    function ConvertSessionToTokenResponse(init) {
        Object.assign(this, init);
    }
    return ConvertSessionToTokenResponse;
}());
export { ConvertSessionToTokenResponse };
// @DataContract
var GetAccessTokenResponse = /** @class */ (function () {
    function GetAccessTokenResponse(init) {
        Object.assign(this, init);
    }
    return GetAccessTokenResponse;
}());
export { GetAccessTokenResponse };
// @DataContract
var RegisterResponse = /** @class */ (function () {
    function RegisterResponse(init) {
        Object.assign(this, init);
    }
    return RegisterResponse;
}());
export { RegisterResponse };
// @Route("/user", "GET")
var GetUser = /** @class */ (function () {
    function GetUser(init) {
        Object.assign(this, init);
    }
    GetUser.prototype.createResponse = function () { return new GetUserResponse(); };
    GetUser.prototype.getTypeName = function () { return 'GetUser'; };
    return GetUser;
}());
export { GetUser };
// @Route("/visitors", "GET")
var GetVisitors = /** @class */ (function () {
    function GetVisitors(init) {
        Object.assign(this, init);
    }
    GetVisitors.prototype.createResponse = function () { return new GetVisitorsResponse(); };
    GetVisitors.prototype.getTypeName = function () { return 'GetVisitors'; };
    return GetVisitors;
}());
export { GetVisitors };
// @Route("/visit", "POST")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
var CreateVisit = /** @class */ (function () {
    function CreateVisit(init) {
        Object.assign(this, init);
    }
    CreateVisit.prototype.createResponse = function () { return new CreateVisitResponse(); };
    CreateVisit.prototype.getTypeName = function () { return 'CreateVisit'; };
    return CreateVisit;
}());
export { CreateVisit };
// @Route("/visit/{Id}", "GET")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
var GetVisitById = /** @class */ (function () {
    function GetVisitById(init) {
        Object.assign(this, init);
    }
    GetVisitById.prototype.createResponse = function () { return new GetVisitResponse(); };
    GetVisitById.prototype.getTypeName = function () { return 'GetVisitById'; };
    return GetVisitById;
}());
export { GetVisitById };
// @Route("/visit", "GET")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
var GetVisit = /** @class */ (function () {
    function GetVisit(init) {
        Object.assign(this, init);
    }
    GetVisit.prototype.createResponse = function () { return new GetVisitResponse(); };
    GetVisit.prototype.getTypeName = function () { return 'GetVisit'; };
    return GetVisit;
}());
export { GetVisit };
// @Route("/visit/end", "POST")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
var EndVisit = /** @class */ (function () {
    function EndVisit(init) {
        Object.assign(this, init);
    }
    EndVisit.prototype.createResponse = function () { return new EndVisitResponse(); };
    EndVisit.prototype.getTypeName = function () { return 'EndVisit'; };
    return EndVisit;
}());
export { EndVisit };
// @Route("/auth")
// @Route("/auth/{provider}")
// @DataContract
var Authenticate = /** @class */ (function () {
    function Authenticate(init) {
        Object.assign(this, init);
    }
    Authenticate.prototype.createResponse = function () { return new AuthenticateResponse(); };
    Authenticate.prototype.getTypeName = function () { return 'Authenticate'; };
    return Authenticate;
}());
export { Authenticate };
// @Route("/assignroles")
// @DataContract
var AssignRoles = /** @class */ (function () {
    function AssignRoles(init) {
        Object.assign(this, init);
    }
    AssignRoles.prototype.createResponse = function () { return new AssignRolesResponse(); };
    AssignRoles.prototype.getTypeName = function () { return 'AssignRoles'; };
    return AssignRoles;
}());
export { AssignRoles };
// @Route("/unassignroles")
// @DataContract
var UnAssignRoles = /** @class */ (function () {
    function UnAssignRoles(init) {
        Object.assign(this, init);
    }
    UnAssignRoles.prototype.createResponse = function () { return new UnAssignRolesResponse(); };
    UnAssignRoles.prototype.getTypeName = function () { return 'UnAssignRoles'; };
    return UnAssignRoles;
}());
export { UnAssignRoles };
// @Route("/session-to-token")
// @DataContract
var ConvertSessionToToken = /** @class */ (function () {
    function ConvertSessionToToken(init) {
        Object.assign(this, init);
    }
    ConvertSessionToToken.prototype.createResponse = function () { return new ConvertSessionToTokenResponse(); };
    ConvertSessionToToken.prototype.getTypeName = function () { return 'ConvertSessionToToken'; };
    return ConvertSessionToToken;
}());
export { ConvertSessionToToken };
// @Route("/access-token")
// @DataContract
var GetAccessToken = /** @class */ (function () {
    function GetAccessToken(init) {
        Object.assign(this, init);
    }
    GetAccessToken.prototype.createResponse = function () { return new GetAccessTokenResponse(); };
    GetAccessToken.prototype.getTypeName = function () { return 'GetAccessToken'; };
    return GetAccessToken;
}());
export { GetAccessToken };
// @Route("/register")
// @DataContract
var Register = /** @class */ (function () {
    function Register(init) {
        Object.assign(this, init);
    }
    Register.prototype.createResponse = function () { return new RegisterResponse(); };
    Register.prototype.getTypeName = function () { return 'Register'; };
    return Register;
}());
export { Register };
