export class UserDto {
  constructor(object: any) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
  }

  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}
