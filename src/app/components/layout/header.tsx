import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Link,
  useScrollTrigger
} from '@mui/material'
import Logo from './logo'
import { colors } from '../../theme/theme'
import theme from '../../theme/theme'
import ThemeToggleButton from '../ui/theme-toggle-button' // Importamos el nuevo componente

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
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
        bgcolor: 'background.paper',
        borderBottom: isScrolled ? 'none' : `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            <Logo />
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
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
                '&:hover': { color: colors.bleuDeFrance }
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
                '&:hover': { color: colors.bleuDeFrance }
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
                '&:hover': { color: colors.bleuDeFrance }
              }}
            >
              FAQ
            </Link>
          </Box>

          {/* Theme Toggle Button */}
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <ThemeToggleButton />
          </Box>

          {/* Mobile Navigation Links */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 0,
              justifyContent: 'center',
              gap: 3
            }}
          >
            <Link
              component="button"
              variant="body2"
              underline="none"
              color="textPrimary"
              onClick={() => scrollToSection('conversion')}
              sx={{ fontWeight: 500 }}
            >
              Conviértelo
            </Link>
            <Link
              component="button"
              variant="body2"
              underline="none"
              color="textPrimary"
              onClick={() => scrollToSection('faq')}
              sx={{ fontWeight: 500 }}
            >
              FAQ
            </Link>
            {/* Mobile Theme Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeToggleButton />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
