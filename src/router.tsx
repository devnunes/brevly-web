import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import RedirectPage from './pages/redirect'

export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/:shortUrl" element={<RedirectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
