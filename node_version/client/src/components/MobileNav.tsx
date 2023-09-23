import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiFillHome, AiOutlineLogout } from 'react-icons/ai'
import { TbPlant2 } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { FaInfoCircle } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

const MobileNav = () => {
  const [navRevealed, setNavRevealed] = useState(false);
  const navigate = useNavigate();
  const toggleNav = () => {
    setNavRevealed(!navRevealed);
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <div className="flex items-center justify-between mx-2 pt-8">
        <AiOutlineMenu onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" />
        <div className="flex items-center">
          {/* <p className="font-medium underline underline-offset-2">BudHub<span className="font-light text-lg">App</span></p> */}
          <TbPlant2 className="h-[35px] w-[35px]" />
        </div>
      </div>
      {/* <p className="text-right mx-2 text-indigo-500 text-sm italic">{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p> */}
      <div
        className="fixed font-oswald inset-y-0 justify-between flex flex-col grow gap-3 bg-slate-900 text-neutral-100 py-2 pt-10 pr-12 pl-2 shadow-lg z-50"
        style={{ display: (navRevealed ? 'flex' : 'none') }}>
        <div className="flex flex-col gap-3">
          <AiOutlineClose onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" />
          <div className="flex items-center gap-2">
            <AiFillHome />
            <Link to="/">Home</Link>
          </div>
          <div className="flex items-center gap-2">
            <FaInfoCircle />
            <Link to="/about">About Us</Link>
          </div>
          {
            "jwt" in localStorage ?
              <>
                <div className="flex items-center gap-2">
                  <MdDashboard />
                  <Link to="/dashboard" className="text-neutral-100">Dashboard</Link>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineLogout />
                  <p onClick={handleLogout} className="text-neutral-100">Logout</p>
                </div>
              </>
              :
              null
          }
        </div>
      </div>
    </div>
  )
}

export default MobileNav