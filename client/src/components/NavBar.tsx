import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillGearFill } from 'react-icons/bs'
import { TbPlant2 } from 'react-icons/tb'
import { Link } from 'react-router-dom'
const NavBar = () => {
    const [today] = useState(new Date());
    const [navRevealed, setNavRevealed] = useState(false);
    type Months = {
        [key: number]: string;
      };
    const months : Months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }
    const toggleNav = () => {
        setNavRevealed(!navRevealed);
    }
    return (
        <>
            <div className="text-neutral-300 font-oswald text-xl mb-6">
                <div className="flex items-center justify-between mx-2 mt-2">
                    <AiOutlineMenu onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" />
                    <div className="flex items-center">
                        <p className="font-medium underline underline-offset-2">BudHub<span className="font-light text-lg">App</span></p>
                        <TbPlant2 className="h-[35px] w-[35px]" />
                    </div>
                </div>
                <p className="text-right mx-2 text-indigo-500 text-sm italic">{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
            </div>
            <div
                className="fixed font-oswald inset-y-0 z-10 justify-between flex flex-col grow gap-3 bg-indigo-900 text-neutral-100 py-2 pr-12 pl-2 shadow-lg"
                style={{ display: (navRevealed ? 'flex' : 'none') }}>
                <div className="flex flex-col gap-3">
                    <AiOutlineClose onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" /> 
                    <div className="flex items-center gap-2">
                        <AiOutlineShoppingCart />
                        <Link to="/cart">Cart</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsFillGearFill />
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <AiOutlineLogout />
                    <Link className="text-neutral-100" to="/logout">Logout</Link>
                </div>
            </div>
        </>
    )
}

export default NavBar