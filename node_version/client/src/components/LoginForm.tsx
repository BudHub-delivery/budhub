import { IoClose } from 'react-icons/io5'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginRequest } from '../utils/apiRequests'

interface LoginFormProps {
  error: any
  setError:any
  setEuFormVis: any
  setIsLogin: any
}

const LoginForm = (props: LoginFormProps) => {
  const { error, setError, setEuFormVis, setIsLogin } = props
  const navigate = useNavigate()

  const [loginUser, setLoginUser] = useState({
    email: "",
    password:""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginRequest(loginUser)
      .then(() => { navigate("/dashboard") })
      .catch(err => setError(err));
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-blue-950 relative">
        <div className="flex flex-col justify-center items-center login font-oswald gap-4 py-6">
          <IoClose onClick={() => setEuFormVis(false)} className="absolute top-0 right-0 m-2 text-neutral-100 text-2xl hover:cursor-pointer" />
          <div className="absolute top-10 px-2">
            {
              <p className="text-neutral-100 bg-red-500 text-center rounded">{error}</p>
            }
          </div>
          <h1 className="font-oswald uppercase text-4xl text-neutral-100  font-semibold uppercase">Login</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-opacity-30 px-5 flex flex-col gap-4">
            <div className="flex flex-wrap -mx-3 gap-3">
              <div className="flex flex-col gap-2 w-full px-3">
                <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  value={loginUser.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-full px-3">
                  <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                    type="password"
                    placeholder="********"
                    name="password"
                    value={loginUser.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="bg-indigo-700 hover:bg-indigo-500 text-neutral-100 font-bold py-2 px-4 rounded w-full shadow-lg">Submit</button>
          </form>
          <p className="text-neutral-100 text-sm my-3">Wanted to Sign up instead? <span onClick={() => {setIsLogin(false); setError(null)}} className="underline italic">Go here.</span></p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm