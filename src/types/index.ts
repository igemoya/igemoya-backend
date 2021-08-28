export type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

export const UserTypeValues = ["Audience", "Manager"] as const;
export type UserType = typeof UserTypeValues[number];

export const exhibitionGeoTypeValues = ["Point", "Polygon"] as const;
export type exhibitionGeoType = typeof exhibitionGeoTypeValues[number];

export type coordinate = [number, number];

export enum HttpStatus {
  Continue = 100,
  SwitchingProtocol,
  Processing,
  EarlyHints,
  OK = 200,
  Created,
  Accepted,
  NonAuthInfo,
  NoContent,
  ResetContent,
  PartialContent,
  MultipleChoice = 300,
  MovedPermanently,
  Found,
  SeeOther,
  NotModified,
  TempRedirect = 307,
  PermRedirect,
  BadRequest = 400,
  Unauthorized,
  Forbidden = 403,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  RequestTimeout = 408,
  Conflict,
  Gone,
  InternalServerError = 500,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
}
