import axios from "axios";
import { storeLoggedInUserLocally } from "./utils";

interface LoginUser {
  email: string;
  password:string
}

interface NewUser {
  firstName: string
  lastName: string
  email: string
  password:string
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    "Content-Type":'application/json'
  }
})

export const loginRequest = async (loginUser:LoginUser) => {
  return apiClient.post("/auth/login", loginUser)
    .then(res => {storeLoggedInUserLocally(res.data)})
    .catch(err=>{throw err.response.data.error})
}

export const newUserRequest = async (newUser: NewUser) => {
  return apiClient.post("/users", newUser)
    .then(res => { res })
    .catch(err=>{throw err.response.data.error})
}