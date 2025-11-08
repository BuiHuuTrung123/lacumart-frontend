// ToastProvider.jsx
import { ToastContainer } from 'react-toastify'
import { useTheme, Backdrop } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
export default function ToastProvider() {
    const theme = useTheme()
    const [toastCount, setToastCount] = useState(0)

    useEffect(() => {
        // Hàm kiểm tra số lượng toast
        const checkToasts = () => {
            const toasts = document.querySelectorAll('.Toastify__toast')
            setToastCount(toasts.length)
        }

        // Theo dõi sự thay đổi
        const observer = new MutationObserver(checkToasts)
        const toastContainer = document.querySelector('.Toastify')

        if (toastContainer) {
            observer.observe(toastContainer, {
                childList: true,
                subtree: true
            })
        }

        // Kiểm tra ngay lần đầu
        checkToasts()

        return () => observer.disconnect()
    }, [])
    return (

        <>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)' // Màu nhẹ
                }}
                open={toastCount > 0}
            />
            <ToastContainer
                position="top-center"
                autoClose={false}       // ❌ Không tự tắt
                closeOnClick={false}
                draggable={false}
                hideProgressBar={true}  // Ẩn thanh tiến trình
                theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
                toastClassName='Toastify__toast'
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999
                }}
                toastStyle={{
                    textAlign: 'center'
                }}
                closeButton={({ closeToast }) => (
                    <IconButton
                        size="small"
                        onClick={closeToast}
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': { color: theme.palette.error.main },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}
            />
        </>
    )
}