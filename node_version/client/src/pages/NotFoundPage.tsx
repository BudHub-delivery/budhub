import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-neutral-800 text-center font-oswald text-4xl">Oops...You seem to be lost</h1>
      <Link className="text-sky-800 underline text-2xl" to="/">Go Home</Link>
    </div>
  )
}

export default NotFoundPage