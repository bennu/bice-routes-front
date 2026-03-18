import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Link,
  useScrollTrigger,
  useTheme,
  Button,
  useMediaQuery
} from '@mui/material'
import Logo from './logo'
import { colors } from '../../theme/theme'
import ThemeToggleButton from '../ui/theme-toggle-button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  })

  useEffect(() => {
    setIsScrolled(trigger)
  }, [trigger])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={isScrolled ? 4 : 0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: isScrolled ? 'none' : `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            py: 1,
            display: 'flex',
            justifyContent: 'space-between' // Asegura que los elementos se espacien correctamente
          }}
        >
          {/* Sección izquierda: Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Logo />
          </Box>

          {/* Sección central: Enlaces de navegación (solo desktop) */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4
              }}
            >
              <Link
                component="button"
                variant="body1"
                underline="none"
                color="textPrimary"
                onClick={() => scrollToSection('conversion')}
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color:
                      theme.palette.mode === 'dark'
                        ? colors.darkBleuDeFrance
                        : colors.bleuDeFrance
                  }
                }}
              >
                Conversión
              </Link>
              <Link
                component="button"
                variant="body1"
                underline="none"
                color="textPrimary"
                onClick={() => scrollToSection('features')}
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color:
                      theme.palette.mode === 'dark'
                        ? colors.darkBleuDeFrance
                        : colors.bleuDeFrance
                  }
                }}
              >
                Características
              </Link>
              <Link
                component="button"
                variant="body1"
                underline="none"
                color="textPrimary"
                onClick={() => scrollToSection('faq')}
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color:
                      theme.palette.mode === 'dark'
                        ? colors.darkBleuDeFrance
                        : colors.bleuDeFrance
                  }
                }}
              >
                FAQ
              </Link>
            </Box>
          )}

          {/* Sección derecha: Navegación móvil o botón de tema */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'flex-end' // Alinea los elementos a la derecha
            }}
          >
            {/* Mobile Navigation Links */}
            {isMobile && (
              <>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => scrollToSection('conversion')}
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '0.85rem',
                    textTransform: 'none'
                  }}
                >
                  Conviértelo
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => scrollToSection('faq')}
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '0.85rem',
                    textTransform: 'none'
                  }}
                >
                  FAQ
                </Button>
              </>
            )}

            {/* Theme Toggle Button - Siempre alineado a la derecha */}
            <ThemeToggleButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
