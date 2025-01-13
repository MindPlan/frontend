import { HttpService } from '~shared/services/http.service';
import { IHttpConfig } from '~shared/services/types';
import { httpFactoryService } from '~shared/services/http-factory.service';

import { GoogleTokenType } from '../types/google-token.type';
import { AuthGoogleResponse } from '../types/auth-google.response';

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
    
    return this.httpService.get<AuthGoogleResponse>('/api/user/google', config);
  }
}

export const authService = new AuthService(httpFactoryService.createHttpService());