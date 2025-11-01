// pages/Home.jsx (Đã cập nhật)
import React, { Suspense, lazy } from 'react';
import Hearder from '~/components/Client/Hearder/Hearder';
import Box from '@mui/material/Box';
import Footer from '~/components/Client/Footer/Footer';
import SupplementNavBar from '~/components/Client/SupplementNavBar/SupplementNavBar';

// Lazy load các components
const Banner = lazy(() => import('~/components/Client/Banner/Banner'));
const Category = lazy(() => import('~/components/Client/Category/Category'));
const CategorySection = lazy(() => import('~/components/Client/Item/CategorySection'));

// Import skeleton components
import BannerSkeleton from '~/components/Client/Banner/BannerSkeleton';
import CategorySkeleton from '~/components/Client/Category/CategorySkeleton';
import { Container, Skeleton } from '@mui/material';

// Skeleton cho CategorySection
const CategorySectionSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
    {[1, 2, 3].map((section) => (
      <Box key={section} sx={{ mb: 6 }}>
        {/* Section Header Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Skeleton variant="rounded" sx={{ width: 6, height: 32 }} />
          <Box>
            <Skeleton variant="text" sx={{ fontSize: '26px', width: '200px' }} />
            <Skeleton variant="text" sx={{ fontSize: '14px', width: '250px', mt: 0.5 }} />
          </Box>
        </Box>

        {/* Products Grid Skeleton */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr 1fr' }, gap: 3 }}>
          {[1, 2, 3, 4, 5].map((product) => (
            <Skeleton key={product} variant="rounded" sx={{ height: '300px', borderRadius: 3 }} />
          ))}
        </Box>
      </Box>
    ))}
  </Container>
);

function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        overflowX: 'hidden',
        
      }}
    >
      {/* Header & Navigation - Load ngay */}
      <Hearder />
      <SupplementNavBar />

      {/* Main Content với Suspense */}
      <Box component="main" sx={{ flex: 1 }}>
        <Suspense fallback={<BannerSkeleton />}>
          <Banner />
        </Suspense>

        <Suspense fallback={<CategorySkeleton />}>
          <Category />
        </Suspense>

        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>
      </Box>

      {/* Footer - Load ngay */}
      <Footer />
    </Box>
  );
}

export default Home;