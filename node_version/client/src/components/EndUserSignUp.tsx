import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

interface EndUserSignUpProps {
  euFormVis: boolean
  setEuFormVis: React.Dispatch<React.SetStateAction<boolean>>
}
const EndUserSignup = (props: EndUserSignUpProps) => {
  const { euFormVis, setEuFormVis } = props;

  const [error, setError] = useState("")

  const [isLogin, setIsLogin] = useState(false)

  return (
    <div style={{ display: (euFormVis ? 'flex' : 'none') }}>
      <div className="fixed inset-0 h-screen w-full bg-black opacity-80">
      </div>
      {
          !isLogin ?
            <SignUpForm setError={setError} error={error} setEuFormVis={setEuFormVis} setIsLogin={setIsLogin} />
            :
            <LoginForm error={error} setError={setError} setEuFormVis={setEuFormVis} setIsLogin={setIsLogin} />
      }
    </div>
  )
}

export default EndUserSignup