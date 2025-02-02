import { HttpService } from '~shared/services/http.service';
import { IHttpConfig } from '~shared/services/types';
import { httpFactoryService } from '~shared/services/http-factory.service';

import { GoogleTokenType } from '../types/google-token.type';
import { AuthGoogleResponse } from '../types/auth-google.response';
import { RegistrationRequest } from '../types/registration-request.type';
import { LoginRequest } from '../types/login-request.type';
import { LoginResponse } from '../types/login-response.type';
import { UserInfoResponse } from '../types/user-info.response';

class AuthService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }
  
  public async sendGoogleJWT(token: GoogleTokenType, action: 'registration' | 'login'): Promise<AuthGoogleResponse> {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    
    return this.httpService.get<AuthGoogleResponse>(`/auth/${action}-google/`, config);
  }
  
  public async registration(data: RegistrationRequest): Promise<void> {
    return this.httpService.post<void, RegistrationRequest>('/auth/registration/', data);
  }
  
  public async login(data: LoginRequest): Promise<LoginResponse> {
    return this.httpService.post<LoginResponse, LoginRequest>('/auth/sign-in/', data);
  }
  
  public async verifyEmail(jwt: string): Promise<void> {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    }
    
    return this.httpService.get<void>(`/auth/verify-email/${jwt}`, config);
  }
  
  public async getUserInfo(accessToken: string): Promise<UserInfoResponse> {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }
    
    return this.httpService.get<UserInfoResponse>(`/auth/me/`, config);
  }
  
  public async logout(refreshToken: string): Promise<void> {
    const config: IHttpConfig = {
      headers: {'Authorization' : `Bearer ${refreshToken}`},
    }
    
    return this.httpService.get<void>('/auth/token/logout/', config);
  }
}

export const authService = new AuthService(httpFactoryService.createHttpService());