import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const jwt = searchParams.get("token");
  useEffect(() => {
    axios.post("http://localhost:8080/api/auth/confirm", {token: jwt})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <h1 className="text-white text-center">{ jwt }</h1>
  )
}

export default ConfirmEmail