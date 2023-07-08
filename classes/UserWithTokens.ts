import UserClass from './UserClass'

export default class UserWithTokens {
  accessToken: string;
  refreshToken: string;

  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: UserClass, jwt: string, rft: string) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.accessToken = jwt
    this.refreshToken = rft
  }
}