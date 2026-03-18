import React, { useEffect, useState } from 'react'
import { Tooltip, Box, useTheme } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode } from '@/app/theme/theme-context'
import { alpha } from '@mui/material/styles'

const ThemeToggleButton = () => {
  const { mode, toggleColorMode, isTransitioning } = useThemeMode()
  const theme = useTheme()
  const [animate, setAnimate] = useState(false)
  const isDark = mode === 'dark'

  // Efecto para activar animación cuando se completa una transición
  useEffect(() => {
    if (!isTransitioning) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <Tooltip title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}>
      <Box
        sx={{
          position: 'relative',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '800px',
          cursor: 'pointer',
          '&:hover .toggle-container': {
            transform: 'scale(1.08)',
            boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.5)}`
          },
          '&:active .toggle-container': {
            transform: 'scale(0.96)'
          }
        }}
        onClick={isTransitioning ? undefined : toggleColorMode}
      >
        {/* Contenedor principal con efecto 3D */}
        <Box
          className="toggle-container"
          sx={{
            position: 'relative',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            border: `2px solid ${alpha(theme.palette.primary.main, isDark ? 0.7 : 0.3)}`,
            boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, isDark ? 0.4 : 0.2)}`,
            transition: 'all 0.3s ease',
            transformStyle: 'preserve-3d',
            transform: animate ? 'rotateY(180deg)' : 'rotateY(0)',
            overflow: 'hidden'
          }}
        >
          {/* Cara frontal (tema claro) */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              transition: 'all 0.5s ease',
              transform: isDark ? 'rotateY(180deg)' : 'rotateY(0)',
              opacity: isDark ? 0 : 1,
              zIndex: 2
            }}
          >
            <Brightness7
              sx={{
                fontSize: 22,
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 0 2px rgba(255, 200, 50, 0.4))'
              }}
            />
          </Box>

          {/* Cara trasera (tema oscuro) */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              transition: 'all 0.5s ease',
              transform: isDark ? 'rotateY(0)' : 'rotateY(-180deg)',
              opacity: isDark ? 1 : 0,
              zIndex: 1
            }}
          >
            <Brightness4
              sx={{
                fontSize: 22,
                color: theme.palette.primary.light,
                filter: 'drop-shadow(0 0 3px rgba(100, 150, 255, 0.5))'
              }}
            />
          </Box>

          {/* Efecto de eclipse - círculo que se desplaza para cubrir/descubrir */}
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: isDark
                ? `radial-gradient(circle, ${alpha('#000000', 0.8)} 30%, ${alpha('#1a237e', 0.6)} 70%, transparent 75%)`
                : `radial-gradient(circle, ${alpha('#ffffff', 0.8)} 30%, ${alpha('#ffeb3b', 0.2)} 70%, transparent 75%)`,
              opacity: animate ? 1 : 0,
              transition: 'opacity 0.3s ease',
              animation: animate
                ? isDark
                  ? 'eclipseLight 1.2s ease-out forwards'
                  : 'eclipseDark 1.2s ease-out forwards'
                : 'none',
              '@keyframes eclipseLight': {
                '0%': { transform: 'translate(100%, 100%)' },
                '100%': { transform: 'translate(0%, 0%)' }
              },
              '@keyframes eclipseDark': {
                '0%': { transform: 'translate(0%, 0%)' },
                '100%': { transform: 'translate(100%, 100%)' }
              },
              zIndex: 0
            }}
          />
        </Box>

        {/* Resplandor exterior */}
        <Box
          sx={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            borderRadius: '50%',
            background: isDark
              ? `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`
              : `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
            opacity: animate ? 1 : 0.3,
            transition: 'opacity 0.5s ease',
            animation: animate ? 'glow 1.2s ease-out' : 'none',
            '@keyframes glow': {
              '0%': { transform: 'scale(0.5)', opacity: 0.1 },
              '50%': { opacity: 1 },
              '100%': { transform: 'scale(1)', opacity: 0.3 }
            },
            zIndex: -1
          }}
        />

        {/* Destellos alrededor (solo en modo oscuro) */}
        {isDark && animate && (
          <>
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: 2,
                  height: 2,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  opacity: 0,
                  animation: `sparkle${i} 0.6s ease-out 0.3s forwards`,
                  [`@keyframes sparkle${i}`]: {
                    '0%': {
                      transform: `translate(0, 0) scale(1)`,
                      opacity: 0
                    },
                    '30%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${Math.cos((i * Math.PI) / 4) * 35}px, ${Math.sin((i * Math.PI) / 4) * 35}px) scale(0)`,
                      opacity: 0
                    }
                  }
                }}
              />
            ))}
          </>
        )}
      </Box>
    </Tooltip>
  )
}

export default ThemeToggleButton
