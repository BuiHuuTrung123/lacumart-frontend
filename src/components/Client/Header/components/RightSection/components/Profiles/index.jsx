import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'

import { updateCurrentCart } from '~/redux/cart/cartSlice'
import { useNavigate, useParams } from 'react-router-dom'


function Profiles() {
  const navigate = useNavigate()

 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      allowClose: true,
    })
      .then(() => {
        try {
          dispatch(logoutUserAPI(false))
          dispatch(updateCurrentCart())
        } catch (error) {
          // Handle error
        }
      })
      .catch(() => {
        // Handle cancellation
      });
  }
  const handleProfiles = () => {
    navigate(`/userProfile/${currentUser._id}`)

  }
  return (
    <Box>
      <Tooltip title="Tài khoản cá nhân">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            src={currentUser?.avata}
            alt="loi anh"
          >
            M
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
        // QUAN TRỌNG: Thêm các props này để ngăn scrollbar biến mất
        disableScrollLock={true} // ← Ngăn MUI lock scroll
        sx={{
          // Đảm bảo menu không ảnh hưởng đến scrollbar
          '& .MuiPaper-root': {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >


        <MenuItem
          sx={{
            '&:hover': { color: 'success.light' }
          }}
          onClick={handleClose}
        >
          <Avatar src={currentUser?.avatar} sx={{ width: 28, height: 28, mr: 1.5 }} />
          {currentUser?.displayName || 'User'}
        </MenuItem>

        <Divider />

        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}


        <MenuItem onClick={(e) => {
          e.stopPropagation(); // Ngăn event bubbling
          handleProfiles();
          handleClose(); // Đóng menu sau khi navigate
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem
          sx={{
            '&:hover': { color: 'warning.dark' },
            '& .logout-icon': { color: 'warning.dark' }
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles