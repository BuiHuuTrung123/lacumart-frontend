// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import HomeIcon from '@mui/icons-material/Home'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import { createNewBoardAPI } from '~/apis'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  const theme = useTheme()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(registerUserAPI({ email, password }),
      { pending: 'Đang đăng ký tài khoản...' }
    ).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const error = (data) => {
    // Error handling logic if needed
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: { xs: 4, sm: 6, md: 8 },
        px: 2
      }}
    >
      <form onSubmit={handleSubmit(submitRegister, error)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard
            sx={{
              width: '100%',
              maxWidth: { xs: 350, sm: 400, md: 420 },
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(255, 87, 34, 0.2)',
              overflow: 'visible',
              border: `2px solid #ff5722`,
              background: 'white',
              position: 'relative'
            }}
          >
            {/* Header Section */}
            <Box sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
              {/* Home Button */}
              <Button
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  color: '#ff5722',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid #ff5722',
                  '&:hover': {
                    backgroundColor: '#fff5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(255, 87, 34, 0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Trang chủ
              </Button>

              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 2
              }}>
                <Avatar
                  sx={{
                    bgcolor: '#ff5722',
                    width: 50,
                    height: 50,
                    boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)'
                  }}
                >
                  <FitnessCenterIcon />
                </Avatar>
                <Avatar
                  sx={{
                    bgcolor: '#ff5722',
                    width: 50,
                    height: 50,
                    boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)'
                  }}
                >
                  <LockIcon />
                </Avatar>
              </Box>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: '#ff5722',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: { xs: '1.75rem', sm: '2rem' }
                }}
              >
                ĐĂNG KÝ
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  mb: 1,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                TẠO TÀI KHOẢN MỚI
              </Typography>
            </Box>

            {/* Form Fields */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  error={!!errors['email']}
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#ff5722' },
                      '&.Mui-focused fieldset': { borderColor: '#ff5722' }
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#ff5722' }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'email'} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  type="password"
                  variant="outlined"
                  error={!!errors['password']}
                  {...register('password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#ff5722' },
                      '&.Mui-focused fieldset': { borderColor: '#ff5722' }
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#ff5722' }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'password'} />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  type="password"
                  variant="outlined"
                  error={!!errors['password_confirmation']}
                  {...register('password_confirmation', {
                    validate: (value) => {
                      if (value === watch('password')) return true
                      return 'Mật khẩu xác nhận không khớp!'
                    }
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': { borderColor: '#ff5722' },
                      '&.Mui-focused fieldset': { borderColor: '#ff5722' }
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#ff5722' }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
              </Box>
            </Box>

            {/* Register Button */}
            <CardActions sx={{ px: 3, pb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  backgroundColor: '#ff5722',
                  boxShadow: '0 4px 15px rgba(255, 87, 34, 0.3)',
                  '&:hover': {
                    backgroundColor: '#e65100',
                    boxShadow: '0 6px 20px rgba(255, 87, 34, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px'
                }}
              >
                Đăng ký
              </Button>
            </CardActions>

            {/* Login Link */}
            <Box sx={{ p: 3, pt: 0, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 2, color: '#666', fontWeight: 600 }}>
                ĐÃ CÓ TÀI KHOẢN?
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#ff5722',
                    borderColor: '#ff5722',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: '#ff5722',
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)'
                    },
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px'
                  }}
                >
                  Đăng nhập ngay
                </Button>
              </Link>
            </Box>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default RegisterForm