export interface KakaoToken {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

export interface KakaoIdentity {
  target_id_type: string;
  target_id: number;
  secure_resource: boolean;
  property_keys: string[];
}
