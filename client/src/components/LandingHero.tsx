import MobileNav from "./MobileNav"
import leaf from "../img/leaf.png"

interface MobileNavProps { 
  euFormVis: boolean
  setEuFormVis: React.Dispatch<React.SetStateAction<boolean>>
}
const LandingHero = (props: MobileNavProps) => {
  const {euFormVis, setEuFormVis} = props
  return (
    <div className="bg-[#FFD166] text-[#073B4C]">
    <MobileNav/>
    <div className="w-full px-6 flex gap-8 mt-4 flex-col pb-4 relative">
      <h1 className="text-7xl font-wix uppercase font-extrabold text-center full-width-font w-full">BudHub</h1>
        <p className="font-nunito font-normal text-[16px] z-10 bg-[#FFD166] bg-opacity-60">Welcome to BudHub, your one-stop destination for simple, convenient, and reliable marijuana delivery. With BudHub, accessing the cannabis products you love has never been easier.</p>
        <img className="absolute z-0 w-[300px] -bottom-20 -left-3 opacity-30" src={leaf} alt="" />
      <button onClick={()=>setEuFormVis(!euFormVis) } className="bg-[#073B4C] text-[#FFD166] py-2 px-3 rounded-lg w-1/3 self-end z-10">Get Started</button>
    </div>
  </div>
  )
}

export default LandingHero