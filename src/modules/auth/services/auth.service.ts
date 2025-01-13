import { HttpService } from '~shared/services/http.service';
import { GoogleTokenType } from '../types/google-token.type';
import { IHttpConfig } from '~shared/services/types';
import  {httpFactoryService } from '~shared/services/http-factory.service';

class AuthService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }
  
  public async sendGoogleJWT(token: GoogleTokenType) {
    const config: IHttpConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    
    this.httpService.get('/api/user/google', config);
  }
}

export const authService = new AuthService(httpFactoryService.createHttpService());