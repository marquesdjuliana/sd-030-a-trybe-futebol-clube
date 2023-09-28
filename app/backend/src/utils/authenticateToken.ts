import { JwtPayload, Secret, SignOptions, verify, sign } from 'jsonwebtoken';

export default class TokenService {
  private static readonly: Secret = process.env.JWT_SECRET || 'padrao';
  private static configToken: SignOptions = {
    algorithm: 'HS256', expiresIn: '10d',
  };

  static generateToken(payload: JwtPayload): string {
    return sign(payload, TokenService.readonly, TokenService.configToken);
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      const decodedToken = verify(token, TokenService.readonly) as JwtPayload;
      const { role } = decodedToken;
      return role;
    } catch (error) {
      return null;
    }
  }
}
