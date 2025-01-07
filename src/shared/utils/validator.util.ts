export class ValidatorUtil {
  public static validatePassword(password: string): boolean {
    const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    return regex.test(password);
  }

  public static validateEmail(email: string): boolean {
    const regex =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return regex.test(email);
  }
}
