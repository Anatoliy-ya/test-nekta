export interface AuthInterface {
  email: string;
  password: string;
  personal_data_access: boolean;
}

export interface AuthResponseInterface {
  msg: string;
  data: {
    access_token: string;
    expires_at: number;
    token_type: string;
  };
}
