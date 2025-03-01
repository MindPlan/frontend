class Validator {
  public validatePassword(password: string): string | boolean {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    
    
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }
    
    if (!/[!@#$%^&*\-_~]/.test(password)) {
      return 'Password must contain at least one special symbol';
    }
    
    return true;
  }

  public validateEmail(email: string): boolean {
    const regex =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return regex.test(email);
  }
}

export const validator = new Validator();
