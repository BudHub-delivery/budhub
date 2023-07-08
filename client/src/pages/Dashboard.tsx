import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  if (!("jwt" in localStorage)){
    navigate("/logout")
  }

  const [userInfo, setUserInfo] = useState({
    "jwt": localStorage.getItem("jwt"),
    "rft": localStorage.getItem("rft"),
    "firstName": localStorage.getItem("firstName"),
    "lastName": localStorage.getItem("lastName"),
    "email": localStorage.getItem("email"),
    "id" : localStorage.getItem("id")
  });

  const authHeader = { headers: { Authorization: `Bearer ${userInfo.jwt}` } }

  const [jwtTestMsg, setJwtTestMsg] = useState("")
  const [rftTestMsg, setRftTestMsg] = useState("")

  const jwtTest = () => {
    setJwtTestMsg("");
    setTimeout(() => {
      axios.post("http://localhost:8080/api/auth/jwtDevTest",{id:userInfo.id}, authHeader)
      .then((res:any) => {
        console.log(res);
        setJwtTestMsg(res.data.message)
      })
      .catch(err => {
        console.log(err)
        setJwtTestMsg(err.response.data.message)
    })
    }, 1000)
  }

  const rftTest = () => {
    axios.post("http://localhost:8080/api/auth/execute-refresh-request",{rft:userInfo.rft}, authHeader)
      .then(res => {
        console.log(res);
        localStorage.setItem("rft", res.data.rft)
        localStorage.setItem("jwt", res.data.jwt)
        setUserInfo({ ...userInfo, "rft": res.data.rft, "jwt": res.data.jwt })
        setRftTestMsg("Refreshed!")
      })
      .catch(err => {
        console.log(err)
        setRftTestMsg("Failed...")
    })
  }

  return (
    <div>
      <MobileNav />
      <div className="text-neutral-800 flex flex-col gap-4 text-lg py-6 px-2 overflow-wrap break-words">
        <h1 className="text-2xl uppercase">Login and Reg is working!</h1>
        <hr />
        <p>First Name: {userInfo.firstName} </p>
        <p>Last Name: {userInfo.lastName} </p>
        <p>Token from Server: <span className="text-xs">{userInfo.jwt}</span></p>
        <p>Refresh Token Stored on DB: <span className="text-xs">{userInfo.rft}</span></p>
        <p>User Email: {userInfo.email}</p>
        <hr />
        <p>JWT Expiration Test:</p>
        <button onClick={jwtTest} className="bg-indigo-700 rounded text-neutral-100 uppercase">Ping the DB</button>
        <p>Test Result: <span className="uppercase font-bold">{ jwtTestMsg }</span></p>
        <p>RFT Refresh Test:</p>
        <button onClick={rftTest} className="bg-indigo-700 rounded text-neutral-100 uppercase">Reresh Me!</button>
        <p>Test Result: <span className="uppercase font-bold">{ rftTestMsg }</span></p>
      </div>
    </div>
  )
}

export default Dashboard