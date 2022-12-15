export interface GoogleAuthPayload {
  iss: string;
  nbf?: number;
  aud: string;
  sub: string;
  email?: string;
  email_verified?: boolean;
  azp?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
  jti?: string;
}

export interface GoogleButtonData {
  credential: string;
  g_csrf_token: string;
}

export interface GoogleSignInResponse {
  clientId: string;
  credential: string;
  select_by: string;
}

export interface GoogleUserInfo {
  aud?: string;
  azp?: string;
  email: string;
  email_verified?: boolean;
  exp?: number;
  family_name?: string;
  given_name?: string;
  hd?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  name?: string;
  nbf?: number;
  picture?: string;
  sub?: string;
}

export interface GoogleClientConfiguration extends customConfig {
  client_id: string;
  auto_select?: boolean;
  login_uri?: string;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: 'signin' | 'signup' | 'use';
  state_cookie_domain?: string;
  ux_mode?: string;
  allowed_parent_origin?: string;
}

interface customConfig {
  disable_exponential_cooldowntime?: boolean;
  authvalidate_by_googleapis?: boolean;
}
