import { JwtToken } from '../models/jwt-token.model';

export class JWTTokenFactory {
  static build(isAuthenticated: boolean = false, token: string = null) {
    return {
      isAuthenticated: isAuthenticated,
      token: token,
    };
  }
}
