import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccoutVerification from '~/pages/Auth/AccoutVerifycation'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Home from '~/pages/Client/Home'
import AdminDashboard from '~/pages/Admin/Dashboard'
import ConfirmationCheckout from '~/components/Client/Checkout/components/ConfirmationCheckout'
import ProductDetail from '~/components/Client/Item/components/ProductDetail'
import Cart from '~/components/Client/Cart'
import Checkout from '~/components/Client/Checkout'
import ProductByCategory from '~/components/Client/Category/components/ProductByCategory'
import UserProfile from '~/components/Client/User'
import ScrollToTop from '~/components/Form/ScrollToTop'
import OrderFollow from  '~/components/Client/OrderFollow'
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/Home' replace={true} />
  return <Outlet />
}
function App() {

  const currentUser = useSelector(selectCurrentUser)

  return (
<><ScrollToTop />
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
      <Route path='/productDetail/:productName' element={<ProductDetail />} />
      <Route path='/cartDetail/:id' element={<Cart />} />
      <Route path='/checkout/:id' element={<Checkout />} />
      <Route path='/order/confirmation/:id' element={<ConfirmationCheckout />} />
        <Route path='/order/follow' element={<OrderFollow />} />
        <Route path='/userProfile/:id' element={<UserProfile />} />
      // Trong App.js hoặc router
      <Route path="/category/:categoryName" element={<ProductByCategory />} />
      {/* 404 route*/}
      <Route path='*' element={<NotFound />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
    </>
  )
}
export default App
