import React, { useState } from 'react'
import { Box, Typography, Grid, Fade, Button } from '@mui/material'
import { Whatshot } from '@mui/icons-material'
import whey from '~/assets/Category/whey.jpg'
import bcaa from '~/assets/Category/bcaa.jpg'
import tangcan from '~/assets/Category/tangcan.png'
import vitamin from '~/assets/Category/vitamin.jpg'

const categories = [
  { 
    id: 1, 
    name: 'Whey Protein', 
    sub: ['Whey Isolate', 'Whey Blend', 'Whey Hydro', 'Whey Native'], 
    image: whey,
    bestSellers: [
      { name: 'Rule 1 Protein', price: '1.290.000₫', image: whey },
      { name: 'Optimum Nutrition', price: '1.590.000₫', image: whey },
      { name: 'MuscleTech', price: '1.390.000₫', image: whey }
    ]
  },
  { 
    id: 2, 
    name: 'BCAA - Amino', 
    sub: ['BCAA Powder', 'EAA Complex', 'Amino Energy', 'Recovery'], 
    image: bcaa,
    bestSellers: [
      { name: 'Xtend BCAA', price: '850.000₫', image: bcaa },
      { name: 'Scivation', price: '790.000₫', image: bcaa },
      { name: 'ON Amino', price: '920.000₫', image: bcaa }
    ]
  },
  { 
    id: 3, 
    name: 'Tăng Cân', 
    sub: ['Serious Mass', 'Mass Gainer', 'Weight Gainer', 'Super Mass'], 
    image: tangcan,
    bestSellers: [
      { name: 'Serious Mass', price: '1.790.000₫', image: tangcan },
      { name: 'Mutant Mass', price: '2.050.000₫', image: tangcan },
      { name: 'Pro Gainer', price: '1.950.000₫', image: tangcan }
    ]
  },
  { 
    id: 4, 
    name: 'Vitamin & Khoáng Chất', 
    sub: ['Multivitamin', 'Vitamin D3', 'Omega-3', 'Vitamin C'], 
    image: vitamin,
    bestSellers: [
      { name: 'Now D3 5000IU', price: '490.000₫', image: vitamin },
      { name: 'Omega-3', price: '560.000₫', image: vitamin },
      { name: 'Animal Pak', price: '890.000₫', image: vitamin }
    ]
  },
  { 
    id: 5, 
    name: 'Pre Workout', 
    sub: ['Pre Pump', 'Pre Energy', 'Pre Strength', 'Pre Focus'], 
    image: whey,
    bestSellers: [
      { name: 'Jack3d', price: '950.000₫', image: whey },
      { name: 'C4', price: '820.000₫', image: whey },
      { name: 'Pre-Kaged', price: '1.100.000₫', image: whey }
    ]
  },
  { 
    id: 6, 
    name: 'Creatine', 
    sub: ['Creatine Mono', 'Creatine HCL', 'Creatine Complex', 'Creapure'], 
    image: bcaa,
    bestSellers: [
      { name: 'Creatine Mono', price: '450.000₫', image: bcaa },
      { name: 'Creapure', price: '680.000₫', image: bcaa },
      { name: 'Con-Cret', price: '750.000₫', image: bcaa }
    ]
  },
    { 
    id: 7, 
    name: 'Phụ kiện tập gym', 
    sub: ['Bình lắc', 'Dây kháng lực', 'Phục kiện lacu', 'Phụ kiện Harbinger'], 
    image: bcaa,
    bestSellers: [
      { name: 'Creatine Mono', price: '450.000₫', image: bcaa },
      { name: 'Creapure', price: '680.000₫', image: bcaa },
      { name: 'Con-Cret', price: '750.000₫', image: bcaa }
    ]
  }
]

const MegaMenu = ({ showMenu, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(categories[0])

  return (
    <Fade in={showMenu} timeout={250}>
      <Box
        onMouseLeave={onClose}
        sx={{
          width: '100%',
          bgcolor: 'white',
          py: 4,
        
        }}
      >
        <Box sx={{ maxWidth: '1000px', mx: 'auto', px: 4 }}>
          <Grid container spacing={4}>
            {/* Cột trái: Danh mục chính */}
            <Grid item xs={3}>
              <Box sx={{ borderRight: '1px solid #f0f0f0', pr: 3 }}>
                {categories.map((cat) => (
                  <Box
                    key={cat.id}
                    onMouseEnter={() => setHoveredCategory(cat)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      bgcolor: hoveredCategory?.id === cat.id ? 'rgba(255, 87, 34, 0.08)' : 'transparent',
                      border: hoveredCategory?.id === cat.id ? '1px solid rgba(255, 87, 34, 0.2)' : '1px solid transparent',
                      '&:hover': { 
                        bgcolor: 'rgba(255, 87, 34, 0.05)',
                        border: '1px solid rgba(255, 87, 34, 0.1)'
                      },
                      transition: 'all 0.3s ease',
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: hoveredCategory?.id === cat.id ? '#ff5722' : '#333',
                        fontSize: '15px',
                      }}
                    >
                      {cat.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Cột giữa: Sub categories */}
            <Grid item xs={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#ff5722', 
                  mb: 2,
                  fontSize: '16px'
                }}
              >
                {hoveredCategory.name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {hoveredCategory.sub.map((subName, i) => (
                  <Button
                    key={i}
                    sx={{
                      justifyContent: 'flex-start',
                      color: '#555',
                      fontSize: '14px',
                      fontWeight: 500,
                      py: 1,
                      px: 0,
                      minWidth: 'auto',
                      textTransform: 'none',
                      '&:hover': {
                        color: '#ff5722',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {subName}
                  </Button>
                ))}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#ff5722',
                    color: '#ff5722',
                    fontWeight: 600,
                    fontSize: '13px',
                    py: 1,
                    px: 2,
                    '&:hover': {
                      bgcolor: '#ff5722',
                      color: 'white',
                    },
                  }}
                >
                  Xem tất cả {hoveredCategory.name} →
                </Button>
              </Box>
            </Grid>

            {/* Cột phải: Sản phẩm bán chạy */}
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Whatshot sx={{ color: '#ff5722', fontSize: '20px' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
                  Bán chạy nhất!
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {hoveredCategory.bestSellers.map((product, i) => (
                  <Grid item xs={4} key={i}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #f5f5f5',
                        borderRadius: '12px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                          transform: 'translateY(-3px)',
                          borderColor: '#ff5722',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                          mb: 1.5,
                        }}
                      />
                      <Typography 
                        sx={{ 
                          fontSize: '13px', 
                          fontWeight: 600,
                          mb: 0.5,
                          height: '32px',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontSize: '14px', 
                          fontWeight: 700, 
                          color: '#ff5722' 
                        }}
                      >
                        {product.price}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Banner khuyến mãi */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: '#fff8e1',
                  border: '2px solid #ffd54f',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#e65100' }}>
                  🎉 GIẢM GIÁ LÊN ĐẾN 30% - MIỄN PHÍ VẬN CHUYỂN
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#666', mt: 0.5 }}>
                  Áp dụng cho đơn hàng từ 1.500.000₫
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  )
}

export default MegaMenu