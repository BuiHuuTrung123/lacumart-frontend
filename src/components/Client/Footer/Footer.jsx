// src/components/Client/Footer/Footer.jsx
import React from 'react';
import { Box, Grid, Typography, Link, Divider, IconButton, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0f1720 0%, #1a2530 50%, #0f1720 100%)',
        color: '#fff',
        pt: 6,
        pb: 3,
        width: '100%',
        borderTop: '3px solid #ff5722',
      }}
    >
      {/* Banner dịch vụ nổi bật */}
      <Box
        sx={{
          maxWidth: '1500px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          mb: 4,
        }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { icon: LocalShippingIcon, text: 'Giao hàng siêu tốc 1-4h', sub: 'Nội thành Hà Nội' },
            { icon: SecurityIcon, text: 'Chính hãng 100%', sub: 'Cam kết chất lượng' },
            { icon: SupportAgentIcon, text: 'Hỗ trợ 24/7', sub: 'Hotline: 1800.2067' },
            { icon: FitnessCenterIcon, text: 'Tư vấn chuyên sâu', sub: 'Bởi chuyên gia' },
          ].map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(255, 87, 34, 0.1)',
                  border: '1px solid rgba(255, 87, 34, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 87, 34, 0.15)',
                    border: '1px solid rgba(255, 87, 34, 0.4)',
                  },
                }}
              >
                <item.icon sx={{ fontSize: 32, color: '#ff5722', mb: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '14px', mb: 0.5 }}>
                  {item.text}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cfcfcf', fontSize: '12px' }}>
                  {item.sub}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* --- Cột 1: Giới thiệu --- */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FitnessCenterIcon sx={{ fontSize: 28, color: '#ff5722', mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #ff5722, #ff8c42)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                LACU MART
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#cfcfcf', lineHeight: 1.8, mb: 2 }}>
              Thương hiệu supplements uy tín từ 2011. Chuyên cung cấp thực phẩm bổ sung chính hãng với cam kết chất lượng, giá tốt nhất thị trường và dịch vụ chuyên nghiệp.
            </Typography>
            
            {/* Newsletter */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#fff' }}>
                Đăng ký nhận ưu đãi
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <input
                  type="email"
                  placeholder="Email của bạn..."
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #ff5722',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                    fontWeight: 700,
                    borderRadius: '8px',
                    px: 2,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #e65100, #ff5722)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Gửi
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* --- Cột 2: Danh mục --- */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#ff5722', fontSize: '16px' }}>
              SẢN PHẨM
            </Typography>
            {['Whey Protein', 'Sữa Tăng Cân', 'BCAA - Amino', 'Pre Workout', 'Creatine', 'Vitamin'].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5 }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: '#cfcfcf',
                    fontSize: 14,
                    transition: 'all 0.2s ease',
                    display: 'block',
                    '&:hover': { 
                      color: '#ff5722',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {item}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* --- Cột 3: Hỗ trợ --- */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#ff5722', fontSize: '16px' }}>
              HỖ TRỢ
            </Typography>
            {['Chính sách bảo hành', 'Giao hàng & Thanh toán', 'Đổi trả 15 ngày', 'Hướng dẫn mua hàng', 'Câu hỏi thường gặp', 'Liên hệ'].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1.5 }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: '#cfcfcf',
                    fontSize: 14,
                    transition: 'all 0.2s ease',
                    display: 'block',
                    '&:hover': { 
                      color: '#ff5722',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {item}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* --- Cột 4: Liên hệ --- */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#ff5722', fontSize: '16px' }}>
              LIÊN HỆ
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ color: '#ff5722', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#cfcfcf' }}>
                123 Fitness Street, Quận Thanh Xuân, Hà Nội
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalPhoneIcon sx={{ color: '#ff5722', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#cfcfcf' }}>
                Hotline: <b style={{ color: '#fff', fontSize: '16px' }}>1800.2067</b>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <MailOutlineIcon sx={{ color: '#ff5722', mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#cfcfcf' }}>
                lacumart@gmail.com
              </Typography>
            </Box>

            {/* Social Media */}
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#fff' }}>
              Kết nối với chúng tôi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: FacebookIcon, color: '#1877f2', name: 'Facebook' },
                { icon: InstagramIcon, color: '#e4405f', name: 'Instagram' },
                { icon: YouTubeIcon, color: '#ff0000', name: 'YouTube' },
                { icon: MailOutlineIcon, color: '#ff5722', name: 'Email' },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: social.color,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': { 
                      background: social.color,
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  title={social.name}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#9aa4b2', textAlign: { xs: 'center', md: 'left' } }}>
            © {new Date().getFullYear()} <b style={{ color: '#ff5722' }}>LACU MART</b>. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Điều khoản sử dụng', 'Chính sách bảo mật', 'Cookies'].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  color: '#9aa4b2',
                  fontSize: '13px',
                  '&:hover': { color: '#ff5722' },
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;