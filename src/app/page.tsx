'use client'

import { Box, ThemeProvider } from '@mui/material'
import { useCallback } from 'react'

// Tema
import theme from './theme/theme'

// Componentes de layout
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'

// Secciones de la página
import HeroSection from '@/app/components/sections/hero-section'
import FeaturesSection from '@/app/components/sections/feature-section'
import ApiImprovementSection from '@/app/components/sections/api-improvement-section'
import FileConverterSection from '@/app/components/sections/file-convertion'
import FaqSection from '@/app/components/sections/faq-section'

export default function BiceRoutes() {
  // Función para scroll a la sección de conversión
  const scrollToConversion = useCallback(() => {
    const section = document.getElementById('conversion')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection onActionClick={scrollToConversion} />

        {/* Features Section */}
        <FeaturesSection />

        {/* API Improvement Section */}
        <ApiImprovementSection />

        {/* File Converter Section */}
        <FileConverterSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
