import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import MegaMenu from './Menus/MegaMenu';

const SupplementNavBar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const supplementRef = useRef(null);
  const megaMenuRef = useRef(null);

  const handleOpenMegaMenu = () => {
    setShowMegaMenu(true);
  };

  const handleCloseMegaMenu = () => {
    setShowMegaMenu(false);
  };

  const handleOtherItemClick = () => {
    // Đóng MegaMenu khi click vào các mục khác
    setShowMegaMenu(false);
  };

  // Đóng MegaMenu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        supplementRef.current && 
        !supplementRef.current.contains(event.target) &&
        megaMenuRef.current && 
        !megaMenuRef.current.contains(event.target)
      ) {
        setShowMegaMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={supplementRef}
      sx={{
        backgroundColor: 'secondary.main',
        position: 'sticky', // THÊM DÒNG NÀY
        color: 'white',
        height: (theme) => theme.trelloCustom.supplementNavbarHeight,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        width: '100%',
        zIndex: 1000
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%', 
            gap: 4
          }}
        >
          {/* Left side - Navigation items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%' }}>
            {/* Thực Phẩm Bổ Sung với MegaMenu */}
            <Box
              sx={{ 
                height: '100%',
                position: 'relative'
              }}
            >
              <Typography
                onClick={handleOpenMegaMenu}
                onMouseEnter={handleOpenMegaMenu}
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: showMegaMenu ? '2px solid' : '2px solid transparent',
                  borderColor: 'primary.main',
                  color: showMegaMenu ? 'primary.main]' : 'white',
                  px: 1,
                  '&:hover': { 
                    color: 'primary.main'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Thực Phẩm Bổ Sung ▼
              </Typography>

              {/* MegaMenu hiển thị trực tiếp dưới nav bar */}
              {showMegaMenu && (
                <Box
                  ref={megaMenuRef}
                  onMouseLeave={handleCloseMegaMenu}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '55vw',
                    backgroundColor: 'white',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    borderTop: '3px solid #ff5722',
                    zIndex: 999,
                    maxHeight: 'calc(100vh - 120px)',
                    overflowY: 'auto'
                  }}
                >
                  <MegaMenu 
                    showMenu={showMegaMenu} 
                    onClose={handleCloseMegaMenu}
                  />
                </Box>
              )}
            </Box>
            
            {/* Các mục khác - chỉ đóng MegaMenu khi click (không đóng khi hover) */}
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Mục Tiêu & Nhu Cầu ▼
            </Typography>
            
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Khuyến Mãi ▼
            </Typography>
            
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Thương Hiệu
            </Typography>
            
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Kiến Thức ▼
            </Typography>
            
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Công Cụ ▼
            </Typography>
            
            <Typography
              onClick={handleOtherItemClick}
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: 1,
                '&:hover': { 
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Hệ Thống Cửa Hàng
            </Typography>
          </Box>

          {/* Right side - Login button */}
          {/* <Typography
            onClick={handleOtherItemClick}
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              px: 1,
              '&:hover': { 
                color: 'primary.main',
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Đăng Nhập
          </Typography> */}
        </Box>
      </Container>
    </Box>
  );
};

export default SupplementNavBar;