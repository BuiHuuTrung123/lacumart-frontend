import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccoutVerification from '~/pages/Auth/AccoutVerifycation'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Home from '~/pages/Home'
import AdminDashboard from '~/pages/Admin/Dashboard'
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/Home' replace={true} />
  return <Outlet />
}
function App() {

  const currentUser = useSelector(selectCurrentUser)
  return (

    <Routes>


      <Route element={<ProtectedRoute user={currentUser} />} >
        {currentUser?.role === 'client' && <Route path='/' element={<Home />} />}
        <Route path='/' element={<AdminDashboard />} />
      </Route>
      {/* Authentication */}
      <Route path='/Home' element={<Home />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccoutVerification />} />


      {/* 404 route*/}
      <Route path='*' element={<NotFound />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  )
}
export default App
