// components/layout/Footer.tsx
// Pie de página con enlaces y información de la empresa

import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material'
import Logo from './logo'
import { colors } from '../../theme/theme'

const Footer = () => {
  const year = new Date().getFullYear()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        bgcolor: theme.palette.background.paper, // Adaptado al tema
        borderTop: `1px solid ${alpha(
          isDark ? theme.palette.primary.main : colors.bleuDeFrance,
          isDark ? 0.2 : 0.1
        )}`
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
            <Typography
              variant="body2"
              color="textSecondary"
              align="justify"
              sx={{ color: theme.palette.text.secondary }}
            >
              Herramienta simple y eficiente para convertir archivos YML a rutas
              API. Optimiza tu flujo de trabajo de desarrollo.
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              component="a"
              href="https://bennu.cl"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: 'none',
                color: theme.palette.text.secondary
              }}
            >
              powered by bennu
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Producto
            </Typography>
            <Stack spacing={1}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
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
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
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
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
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
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Empresa
            </Typography>
            <Stack spacing={1}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
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
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Contacto
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: theme.palette.text.secondary }}
        >
          © {year} BICE Routes. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
