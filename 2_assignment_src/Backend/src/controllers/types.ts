// NOTE: Helps typing the request and response objects
export type PasswordAuthenticationResponse = {
  authenticated: boolean;
  token?: string;
  user: {
    email: string;
  };
};

export type PasswordLoginBody = {
  email: string;
  password: string;
};
