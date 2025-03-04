// Sección "Mejora tus APIs"

import { Box, Container, Typography, Button, Stack, alpha } from '@mui/material'
import { colors } from '../../theme/theme'

const ApiImprovementSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: alpha(colors.thistle, 0.3)
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6
          }}
        >
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Mejora tus APIs
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Antes de implementar, aprovecha nuestras otras herramientas para
              modificar aún más tus rutas API. Puedes agregar autenticación,
              validación y documentación, comprimirlas para enviarlas por correo
              electrónico o incluso combinarlas con otras APIs para facilitar la
              gestión de archivos.
            </Typography>

            <Typography variant="body1" paragraph>
              Nuestro motor de conversión inteligente asegura que todas las
              especificaciones de tu YML sean preservadas con exactitud,
              garantizando una traducción perfecta a rutas API funcionales.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.bleuDeFrance,
                  color: 'white',
                  px: 3,
                  py: 1.5
                }}
              >
                Explorar herramientas
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: colors.bleuDeFrance,
                  color: colors.bleuDeFrance,
                  px: 3,
                  py: 1.5
                }}
              >
                Ver ejemplos
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  background: `url("/api/placeholder/600/400") center/cover`
                }}
              />

              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: colors.bleuDeFrance,
                  zIndex: -1
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: alpha(colors.bleuDeFrance, 0.1),
                  zIndex: -1
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ApiImprovementSection
