class Validator {
  public validatePassword(password: string): boolean {
    const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    return regex.test(password);
  }

  public validateEmail(email: string): boolean {
    const regex =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return regex.test(email);
  }
}

export const validator = new Validator();
