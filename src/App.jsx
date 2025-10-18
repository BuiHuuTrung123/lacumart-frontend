import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccoutVerification from '~/pages/Auth/AccoutVerifycation'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
function App() {

  const currentUser = useSelector(selectCurrentUser)
  return (

    <Routes>


      <Route element={<ProtectedRoute user={currentUser} />} >
        <Route path='/' element={<Auth />} />
      </Route>
      {/* Authentication */}
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
