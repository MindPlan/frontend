import { HttpService } from '~shared/services/http.service';
import { IHttpConfig } from '~shared/services/types';
import { httpFactoryService } from '~shared/services/http-factory.service';

import { GoogleTokenType } from '../types/google-token.type.ts';
import { AuthGoogleResponse } from '../types/auth-google.response.ts';
import { RegistrationRequest } from '../types/registration-request.type.ts';
import { LoginRequest } from '../types/login-request.type.ts';
import { LoginResponse } from '../types/login-response.type.ts';
import { UserInfoResponse } from '../types/user-info.response.ts';

class AuthService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }
  
  public async sendGoogleJWT(token: GoogleTokenType): Promise<AuthGoogleResponse> {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    
    return this.httpService.get<AuthGoogleResponse>(`/auth/google/`, config);
  }
  
  public async registration(data: RegistrationRequest): Promise<void> {
    return this.httpService.post<void, RegistrationRequest>('/auth/registration/', data);
  }
  
  public async login(data: LoginRequest): Promise<LoginResponse> {
    return this.httpService.post<LoginResponse, LoginRequest>('/auth/sign-in/', data);
  }
  
  public async verifyEmail(jwt: string): Promise<void> {
    return this.httpService.get<void>(`/auth/verify-email/${jwt}/`);
  }
  
  public async getUserInfo(accessToken: string): Promise<UserInfoResponse> {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }
    
    return this.httpService.get<UserInfoResponse>(`/auth/me/`, config);
  }
  
  // Send verification mail to email of a user
  public async initResettingPassword(accessToken: string): Promise<void> {
    const config: IHttpConfig = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    
    return this.httpService.post<void, void>('/auth/password-reset/', undefined, config);
  }
  
  // User clicks a links, and we tell to the backend that the user has access to its email
  public async confirmResettingPassword(jwt: string): Promise<void> {
    return this.httpService.post<void, void>(`/auth/password-reset-confirm/${jwt}`, undefined);
  }
  
  // TODO: implement a method for changing a password
  // public async changePassword(): Promise<void> {}
  
  // TODO: change HTTP method to GET or send refreshToken in the request body - discuss it with Oleksandr Python Dev
  public async logout(refreshToken: string): Promise<void> {
    const config: IHttpConfig = {
      headers: {'Authorization' : `Bearer ${refreshToken}`},
    }
    
    return this.httpService.get<void>('/auth/token/logout/', config);
  }
}

export const authService = new AuthService(httpFactoryService.createHttpService());