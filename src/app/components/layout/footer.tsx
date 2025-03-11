// components/layout/Footer.tsx
// Pie de página con enlaces y información de la empresa

import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  alpha
} from '@mui/material'
import Logo from './logo'
import { colors } from '../../theme/theme'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        bgcolor: '#ffffff',
        borderTop: `1px solid ${alpha(colors.bleuDeFrance, 0.1)}`
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: '2fr repeat(4, 1fr)'
            },
            gap: 4
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Logo size="small" />
            </Box>
            <Typography variant="body2" color="textSecondary" align="justify">
              Herramienta simple y eficiente para convertir archivos YML a rutas
              API. Optimiza tu flujo de trabajo de desarrollo.
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight="bold"
              component="a"
              href="https://bennu.cl"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              powered by bennu
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Producto
            </Typography>
            <Stack spacing={1}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color="textSecondary"
                sx={{ textAlign: 'left' }}
                onClick={() => {
                  const element = document.querySelector('#features')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Características
              </Link>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color="textSecondary"
                sx={{ textAlign: 'left' }}
                onClick={() => {
                  const element = document.querySelector('#examples')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Ejemplos
              </Link>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color="textSecondary"
                sx={{ textAlign: 'left' }}
                onClick={() => {
                  const element = document.querySelector('#guides')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Guías
              </Link>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Empresa
            </Typography>
            <Stack spacing={1}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color="textSecondary"
                sx={{ textAlign: 'left' }}
                onClick={() => {
                  window.open('https://bennu.cl', '_blank')
                }}
              >
                Acerca de
              </Link>
              <Link
                component="button"
                variant="body2"
                underline="none"
                color="textSecondary"
                sx={{ textAlign: 'left' }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Contacto
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="textSecondary" align="center">
          © {year} BICE Routes. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
