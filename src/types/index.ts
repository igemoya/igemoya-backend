export type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

export const UserTypeValues = ["Audience", "Manager"] as const;
export type UserType = typeof UserTypeValues[number];

export const exhibitionGeoTypeValues = ["Point", "Polygon"] as const;
export type exhibitionGeoType = typeof exhibitionGeoTypeValues[number];

export type coordinate = [number, number];
