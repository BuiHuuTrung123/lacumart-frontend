import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Banner1 from '~/assets/Banner/Banner1.jpg';
import Banner2 from '~/assets/Banner/Banner2.jpg';
import Banner3 from '~/assets/Banner/Banner3.jpg';
import MiniBanner1 from '~/assets/Banner/Banner_mini.jpg';
import MiniBanner2 from '~/assets/Banner/Banner_mini1.jpg';
import MiniBanner3 from '~/assets/Banner/Banner_mini2.jpg';
import Box from '@mui/material/Box'
import React from 'react';

const mainBanners = [
  { id: 1, src: Banner1, alt: 'Banner 1' },
  { id: 2, src: Banner2, alt: 'Banner 2' },
  { id: 3, src: Banner3, alt: 'Banner 3' },
];

const miniBanners = [
  { id: 1, src: MiniBanner1, alt: 'Mini Banner 1' },
  { id: 2, src: MiniBanner2, alt: 'Mini Banner 2' },
  { id: 3, src: MiniBanner3, alt: 'Mini Banner 3' },
];

function Banner() {
  return (
    <Box sx={{ 
      width: '100%',
      py: { xs: 0, sm: 2 }, // Tăng padding
      backgroundColor: 'background.default'
    }}>
      {/* Banner chính - TĂNG CAO ĐÁNG KỂ */}
      <Box sx={{ 
        width: '100%', 
        mb: { xs: 3, sm: 4 }, // Tăng margin bottom
        px: { xs: 0, sm: 2, md: 3 }
      }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          style={{
            width: '100%',
            borderRadius: { xs: '0px', sm: '16px', md: '20px' },
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
          }}
        >
          {mainBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box 
                sx={{
                  width: '100%',
                  height: {
                    xs: '250px',  // Mobile - TĂNG CAO
                    sm: '400px',  // Tablet - TĂNG CAO  
                    md: '550px',  // Desktop - TĂNG CAO
                    lg: '650px'   // Large desktop - TĂNG CAO
                  },
                  backgroundImage: `url(${banner.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease-in-out',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
                className="banner-main-container"
              >
                {/* Overlay gradient khi hover */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,87,34,0.15) 0%, rgba(255,140,66,0.08) 100%)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                    }
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Banner mini - TĂNG CAO */}
      <Box sx={{ 
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1.8,
              spaceBetween: 15
            },
            600: {
              slidesPerView: 2.5,
              spaceBetween: 18
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 22
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 26
            }
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {miniBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box 
                sx={{
                  width: '100%',
                  height: {
                    xs: '120px',  // TĂNG
                    sm: '150px',  // TĂNG
                    md: '180px',  // TĂNG
                    lg: '200px'   // TĂNG
                  },
                  backgroundImage: `url(${banner.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: { xs: '10px', sm: '14px', md: '18px' },
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 50px rgba(255,87,34,0.25)',
                    '& .banner-mini-overlay': {
                      opacity: 1,
                    }
                  }
                }}
                className="banner-mini-container"
              >
                {/* Glow effect khi hover */}
                <Box
                  className="banner-mini-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,87,34,0.4) 0%, transparent 70%)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Custom Styles cho Swiper Navigation */}
      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: white;
            background: rgba(255, 87, 34, 0.95);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(12px);
            border: 2px solid rgba(255,255,255,0.3);
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          }

          .swiper-button-prev:hover, .swiper-button-next:hover {
            background: rgba(255, 87, 34, 1);
            transform: translateY(-50%) scale(1.15);
            box-shadow: 0 12px 40px rgba(255,87,34,0.5);
          }

          .swiper-button-prev {
            left: 25px;
          }

          .swiper-button-next {
            right: 25px;
          }

          .swiper-button-prev::after, .swiper-button-next::after {
            font-size: 24px;
            font-weight: bold;
          }

          /* Ẩn navigation trên mobile */
          @media (max-width: 600px) {
            .swiper-button-prev, .swiper-button-next {
              display: none;
            }
          }

          /* Đảm bảo swiper slide chiếm đủ không gian */
          .swiper-slide {
            height: auto;
          }

          /* Hiệu ứng loading mượt mà */
          .banner-main-container {
            animation: slideInUp 0.8s ease-out;
          }

          .banner-mini-container {
            animation: fadeInScale 0.6s ease-out;
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default Banner;