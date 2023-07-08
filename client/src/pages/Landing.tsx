import { useState } from "react"
import LandingHero from "../components/LandingHero"
import LandingBlurb01 from "../components/LandingBlurb01"
import LandingWhy from "../components/LandingWhy"
import EndUserSignup from "../components/EndUserSignUp"
const Landing = () => {
  const [euFormVis, setEuFormVis] = useState(false)
  return (
    <>
      <LandingHero euFormVis={euFormVis} setEuFormVis={setEuFormVis} />
      <LandingBlurb01 />
      <LandingWhy />
      <EndUserSignup euFormVis={euFormVis} setEuFormVis={setEuFormVis} />
    </>
  )
}

export default Landing