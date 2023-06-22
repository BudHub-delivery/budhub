interface UserWithTokens {
  accessToken: string
  refreshToken: string
  firstName: string
  lastName: string
  id: any
  email:string
}
export const storeLoggedInUserLocally = (input: UserWithTokens) => {
  localStorage.setItem("jwt", input.accessToken);
  localStorage.setItem("rft", input.refreshToken);
  localStorage.setItem("firstName", input.firstName);
  localStorage.setItem("lastName", input.lastName);
  localStorage.setItem("id", input.id);
  localStorage.setItem("email", input.email);
}