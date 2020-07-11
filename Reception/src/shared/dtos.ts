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


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export enum VisitorType
{
    Employee = 'Employee',
    Contractor = 'Contractor',
}

export class GetVisitor
{
    public hostName: string;
    public visitorName: string;
    public visitorType: VisitorType;
    public dateTime: string;
    public contactNumber: string;
    public carRegistration: string;
    public endDateTime?: string;

    public constructor(init?: Partial<GetVisitor>) { (Object as any).assign(this, init); }
}

export class GetUserResponse
{
    public id: number;
    public phoneNumber: string;
    public carRegistration: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetUserResponse>) { (Object as any).assign(this, init); }
}

export class GetVisitorsResponse
{
    public visitors: GetVisitor[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetVisitorsResponse>) { (Object as any).assign(this, init); }
}

export class CreateVisitResponse
{
    public id: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CreateVisitResponse>) { (Object as any).assign(this, init); }
}

export class GetVisitResponse
{
    public id: number;
    public visitorType: VisitorType;
    public dateTime: string;
    public contactNumber: string;
    public carRegistration: string;
    public endDateTime?: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetVisitResponse>) { (Object as any).assign(this, init); }
}

export class EndVisitResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<EndVisitResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=11)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public profileUrl: string;

    // @DataMember(Order=9)
    public roles: string[];

    // @DataMember(Order=10)
    public permissions: string[];

    // @DataMember(Order=12)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UnAssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ConvertSessionToTokenResponse
{
    // @DataMember(Order=1)
    public meta: { [index: string]: string; };

    // @DataMember(Order=2)
    public accessToken: string;

    // @DataMember(Order=3)
    public refreshToken: string;

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ConvertSessionToTokenResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class GetAccessTokenResponse
{
    // @DataMember(Order=1)
    public accessToken: string;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetAccessTokenResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class RegisterResponse
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public referrerUrl: string;

    // @DataMember(Order=5)
    public bearerToken: string;

    // @DataMember(Order=6)
    public refreshToken: string;

    // @DataMember(Order=7)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=8)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<RegisterResponse>) { (Object as any).assign(this, init); }
}

// @Route("/user", "GET")
export class GetUser implements IReturn<GetUserResponse>
{

    public constructor(init?: Partial<GetUser>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetUserResponse(); }
    public getTypeName() { return 'GetUser'; }
}

// @Route("/visitors", "GET")
export class GetVisitors implements IReturn<GetVisitorsResponse>
{

    public constructor(init?: Partial<GetVisitors>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetVisitorsResponse(); }
    public getTypeName() { return 'GetVisitors'; }
}

// @Route("/visit", "POST")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
export class CreateVisit implements IReturn<CreateVisitResponse>
{
    /**
    * Name of person being visited
    */
    // @ApiMember(DataType="string", Description="Name of person being visited", IsRequired=true, Name="HostName")
    public hostName: string;

    /**
    * Type of visitor
    */
    // @ApiMember(DataType="string", Description="Type of visitor", IsRequired=true, Name="VisitorType")
    public visitorType: VisitorType;

    /**
    * Date and time of visit
    */
    // @ApiMember(DataType="string", Description="Date and time of visit", Format="date-time", Name="DateTime")
    public dateTime: string;

    /**
    * Contact number
    */
    // @ApiMember(DataType="string", Description="Contact number", IsRequired=true, Name="ContactNumber")
    public contactNumber: string;

    /**
    * Car registration number
    */
    // @ApiMember(DataType="string", Description="Car registration number", Name="CarRegistration")
    public carRegistration: string;

    public constructor(init?: Partial<CreateVisit>) { (Object as any).assign(this, init); }
    public createResponse() { return new CreateVisitResponse(); }
    public getTypeName() { return 'CreateVisit'; }
}

// @Route("/visit/{Id}", "GET")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
export class GetVisitById implements IReturn<GetVisitResponse>
{
    public id: number;

    public constructor(init?: Partial<GetVisitById>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetVisitResponse(); }
    public getTypeName() { return 'GetVisitById'; }
}

// @Route("/visit", "GET")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
export class GetVisit implements IReturn<GetVisitResponse>
{

    public constructor(init?: Partial<GetVisit>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetVisitResponse(); }
    public getTypeName() { return 'GetVisit'; }
}

// @Route("/visit/end", "POST")
// @ApiResponse(Description="Your request was not understood", StatusCode=400)
// @ApiResponse(Description="Oops, something broke", StatusCode=500)
export class EndVisit implements IReturn<EndVisitResponse>
{
    public id: number;
    public visitEndedDateTime: string;

    public constructor(init?: Partial<EndVisit>) { (Object as any).assign(this, init); }
    public createResponse() { return new EndVisitResponse(); }
    public getTypeName() { return 'EndVisit'; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe?: boolean;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=16)
    public useTokenCookie?: boolean;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public scope: string;

    // @DataMember(Order=20)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public createResponse() { return new AuthenticateResponse(); }
    public getTypeName() { return 'Authenticate'; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AssignRoles>) { (Object as any).assign(this, init); }
    public createResponse() { return new AssignRolesResponse(); }
    public getTypeName() { return 'AssignRoles'; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<UnAssignRoles>) { (Object as any).assign(this, init); }
    public createResponse() { return new UnAssignRolesResponse(); }
    public getTypeName() { return 'UnAssignRoles'; }
}

// @Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost
{
    // @DataMember(Order=1)
    public preserveSession: boolean;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ConvertSessionToToken>) { (Object as any).assign(this, init); }
    public createResponse() { return new ConvertSessionToTokenResponse(); }
    public getTypeName() { return 'ConvertSessionToToken'; }
}

// @Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost
{
    // @DataMember(Order=1)
    public refreshToken: string;

    // @DataMember(Order=2)
    public useTokenCookie?: boolean;

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<GetAccessToken>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetAccessTokenResponse(); }
    public getTypeName() { return 'GetAccessToken'; }
}

// @Route("/register")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public firstName: string;

    // @DataMember(Order=3)
    public lastName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public email: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public confirmPassword: string;

    // @DataMember(Order=8)
    public autoLogin?: boolean;

    // @DataMember(Order=10)
    public errorView: string;

    // @DataMember(Order=11)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Register>) { (Object as any).assign(this, init); }
    public createResponse() { return new RegisterResponse(); }
    public getTypeName() { return 'Register'; }
}

