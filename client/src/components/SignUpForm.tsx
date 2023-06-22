import { IoClose } from 'react-icons/io5'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { newUserRequest } from '../utils/apiRequests'

interface SignUpFormProps {
  error: any
  setError:any
  setEuFormVis: any
  setIsLogin : any
}

const SignUpForm = (props: SignUpFormProps) => {
  const { error, setError, setEuFormVis, setIsLogin } = props

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
    // confirm: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newUserRequest(newUser)
      .then(() => { navigate("/new-user-welcome") })
      .catch(err => { setError(err) });
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-teal-950 relative">
        <div className="flex flex-col justify-center items-center login font-oswald gap-4 py-6">
          <IoClose onClick={() => setEuFormVis(false)} className="absolute top-0 right-0 m-2 text-neutral-100 text-2xl hover:cursor-pointer" />
          <div className="absolute top-10 px-2">
            {
              <p className="text-neutral-100 bg-red-500 text-center rounded">{error}</p>
            }
          </div>
          <h1 className="font-oswald uppercase text-4xl text-neutral-100  font-semibold uppercase">Sign Up</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-opacity-30 px-5 flex flex-col gap-4">
            <div className="flex flex-wrap -mx-3 gap-3">
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-1/2 px-3 ">
                  <label className="flex block uppercase tracking-wide text-neutral-100 text-xs font-bold  gap-3">
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Jane"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2 px-3">
                  <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full px-3">
                <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-1/2 px-3">
                  <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                    type="password"
                    placeholder="********"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2 px-3">
                  <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                    Confirm
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white disabled:cursor-not-allowed"
                    type="password"
                    placeholder="********"
                    name="confirm"
                    autoComplete="new-password"
                    disabled
                  // value={newUser.confirm}
                  // onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="bg-indigo-700 hover:bg-indigo-500 text-neutral-100 font-bold py-2 px-4 rounded w-full shadow-lg">Submit</button>
          </form>
          <p className="text-neutral-100 text-sm my-3">Wanted to Login instead? <span onClick={()=>{ setIsLogin(true); setError(null)}} className="underline italic">Go here.</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm