import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Data from './pages/Data'
import NavBar from './components/NavBar'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data" element={<Data />} />
            </Routes>
        </>
    )
}

export default App
