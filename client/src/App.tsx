import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import ConfirmEmail from './pages/ConfirmEmail'
import Landing from './pages/Landing'
import NewUserSubmitted from './pages/NewUserSubmitted'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/new-user-welcome" element={<NewUserSubmitted />} />
        <Route path="/dashboard" element={ <Dashboard/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
