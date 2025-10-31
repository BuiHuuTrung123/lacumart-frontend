import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccoutVerification from '~/pages/Auth/AccoutVerifycation'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Home from '~/pages/Home'
import AdminDashboard from '~/pages/Admin/Dashboard'
import ProductDetail from '~/components/Client/Item/ProductDetail/ProductDetail'
import Cart from '~/components/Client/Cart/Cart'
import Checkout from '~/components/Client/Checkout/Checkout'
import ProductByCategory from '~/components/Client/Category/ProductByCategory/ProductByCategory'
import UserProfile from '~/components/Client/User/UserProfile'
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
      <Route path='/productDetail/:id' element={<ProductDetail />} />
      <Route path='/cartDetail/:id' element={<Cart />} />
      <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/userProfile/:id' element={<UserProfile />} />
      // Trong App.js hoặc router
      <Route path="/category/:categoryName" element={<ProductByCategory />} />
      {/* 404 route*/}
      <Route path='*' element={<NotFound />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  )
}
export default App
