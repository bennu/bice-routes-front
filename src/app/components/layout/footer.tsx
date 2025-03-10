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
        bgcolor: 'white',
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

          <FooterLinkSection
            title="Producto"
            links={[
              { title: 'Características', href: '#features' },
              { title: 'Ejemplos', href: '#examples' },
              { title: 'Guías', href: '#guides' }
            ]}
          />

          <FooterLinkSection
            title="Empresa"
            links={[
              { title: 'Acerca de', href: 'https://bennu.cl' },
              { title: 'Contacto', href: '#contact' }
            ]}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="textSecondary" align="center">
          © {year} BICE Routes. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

// Sub-componente para secciones de enlaces del footer
interface FooterLink {
  title: string
  href: string
}

interface FooterLinkSectionProps {
  title: string
  links: FooterLink[]
}

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => {
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={1}>
        {links.map((link, index) => (
          <Link
            key={index}
            component="button"
            variant="body2"
            underline="none"
            color="textSecondary"
            href={link.href}
            sx={{ textAlign: 'left' }}
          >
            {link.title}
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default Footer
