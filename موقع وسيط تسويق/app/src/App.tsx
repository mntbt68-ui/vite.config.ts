import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Publishers from './pages/Publishers'
import Advertisers from './pages/Advertisers'
import BankInfo from './pages/BankInfo'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/publishers" element={<Publishers />} />
      <Route path="/advertisers" element={<Advertisers />} />
      <Route path="/bank-info" element={<BankInfo />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
