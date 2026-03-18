// Sección principal de la página con título y animación

import { Box, Container, Typography, Button, alpha } from '@mui/material'
import FileConversionAnimation from '@/app/components/ui/file-convertion'
import { colors } from '@/app/theme/theme'

interface HeroSectionProps {
  onActionClick: () => void
}

const HeroSection = ({ onActionClick }: HeroSectionProps) => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: alpha(colors.bleuDeFrance, 0.05)
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4
          }}
        >
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3
              }}
            >
              Convierte openAPI.spec a rutas API instantáneamente
            </Typography>

            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ mb: 4, fontWeight: 400 }}
              align="justify"
            >
              BICE Routes convierte tus archivos openAPI.spec en rutas API
              utilizables con un solo clic. Ahorra tiempo y evita errores en el
              desarrollo de tus proyectos.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={onActionClick}
              sx={{
                bgcolor: colors.bleuDeFrance,
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              Comienza ahora
            </Button>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <FileConversionAnimation />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
