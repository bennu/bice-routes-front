'use client'

import { Box, Container, Typography, alpha, useTheme } from '@mui/material'
import { colors } from '@/app/theme/theme'
import YamlTypingAnimation from '@/app/components/ui/yaml-typing-animation '

const ApiImprovementSection = () => {
  const theme = useTheme()

  // Color de fondo adaptativo manteniendo la estructura original
  const bgColor =
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.6) // Versión oscura
      : alpha(colors.thistle, 0.3) // Versión clara original

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: bgColor
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
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Mejora tus APIs
            </Typography>

            <Typography
              variant="body1"
              align="justify"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary
              }}
            >
              Antes de implementar, aprovecha nuestras otras herramientas para
              modificar aún más tus rutas API. Puedes agregar autenticación,
              validación y documentación, comprimirlas para enviarlas por correo
              electrónico o incluso combinarlas con otras APIs para facilitar la
              gestión de archivos.
            </Typography>

            <Typography
              variant="body1"
              align="justify"
              sx={{ color: theme.palette.text.secondary }}
            >
              Nuestro motor de conversión inteligente asegura que todas las
              especificaciones de tu YML sean preservadas con exactitud,
              garantizando una traducción perfecta a rutas API funcionales.
            </Typography>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Box sx={{ position: 'relative' }}>
              {/* Reemplazar imagen estática con animación de tipeo YAML */}
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <YamlTypingAnimation />
              </Box>

              {/* Elementos decorativos */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: alpha(
                    theme.palette.mode === 'light'
                      ? colors.bleuDeFrance
                      : theme.palette.primary.main,
                    0.1
                  ),
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
                  bgcolor: alpha(
                    theme.palette.mode === 'light'
                      ? colors.bleuDeFrance
                      : theme.palette.primary.main,
                    0.1
                  ),
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
