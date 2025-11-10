import React from 'react'
import { Box, Fade, Backdrop } from '@mui/material'
import CartPopover from './components/CartIcon/components/CartPopover'
import Profiles from './components/Profiles'
import HotlineInfo from '~/components/Client/Header/components/RightSection/components/HotlineInfo'
import MobileSearchToggle from '~/components/Client/Header/components/RightSection/components/MobileSearchToggle'
import WishlistIcon from '~/components/Client/Header/components/RightSection/components/WishlistIcon'
import NotificationsIcon from '~/components/Client/Header/components/RightSection/components/NotificationsIcon'
import LocalShipping from '~/components/Client/Header/components/RightSection/components/LocalShipping'
import CartIcon from '~/components/Client/Header/components/RightSection/components/CartIcon'
import AuthButtons from '~/components/Client/Header/components/RightSection/components/AuthButtons'

const RightSection = ({

  currentUser,
  showCartPopover,
  showNotifications,
  setShowNotifications,
  cartPopoverRef,
  cartIconRef,
  onToggleCartPopover,
  onCloseCartPopover,
  totalCartItems,
  cartTotal,
  hotline
}) => {

  return (

    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 1, sm: 2 },
      paddingRight: '10px'
    }}>
      <HotlineInfo hotline={hotline} />

      <MobileSearchToggle />

      {currentUser && <WishlistIcon />}

      {currentUser && (
        <NotificationsIcon
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      )}
      {currentUser && (
        <LocalShipping />
      )}  

      {currentUser && (
        <CartIcon
          cartIconRef={cartIconRef}
          onToggleCartPopover={onToggleCartPopover}
          totalCartItems={totalCartItems}
        />
      )}

      {/* Cart Popover */}
      <Fade in={showCartPopover}>
        <Box sx={{ zIndex: 9999 }}>
          <Backdrop
            open={showCartPopover}
            sx={{
              color: '#fff',
              zIndex: 9998,
              backgroundColor: 'rgba(0, 0, 0, 0.1)' // Màu nhẹ để vẫn thấy nền
            }}
          />

          <Box
            ref={cartPopoverRef}
            sx={{
              position: 'absolute',
              top: '100%',
              right: 23,
              width: { xs: '320px', sm: '400px' },
              maxWidth: '90vw',
              backgroundColor: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              borderTop: '3px solid #ff5722',
              zIndex: 9999,
              maxHeight: 'calc(100vh - 120px)',
              borderRadius: '0 0 12px 12px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 0 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'white',
                borderRadius: 4
              },
              display: showCartPopover ? 'block' : 'none'
            }}
          >
            <CartPopover
              showMenu={showCartPopover}
              onClose={onCloseCartPopover}
              cartTotal={cartTotal}
              itemCount={totalCartItems}
            />
          </Box>
        </Box>
      </Fade>


      {!currentUser && <AuthButtons />}

      {currentUser && <Profiles />}
    </Box>
  )
}

export default RightSection