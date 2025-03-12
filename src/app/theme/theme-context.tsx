import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  ReactNode,
  useEffect
} from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
  Box
} from '@mui/material'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'

// Crear el contexto del tema
interface ThemeContextType {
  mode: PaletteMode
  toggleColorMode: () => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  isTransitioning: false
})

// Custom hook para usar el contexto del tema
export const useThemeMode = () => useContext(ThemeContext)

// Proveedor del tema
interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Estado para el modo del tema (light/dark)
  const [mode, setMode] = useState<PaletteMode>('light')
  // Estado para controlar la transición
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Efecto para guardar la preferencia del tema en localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode')
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode as PaletteMode)
    }
  }, [])

  // Función para alternar entre modos de tema con transición
  const toggleColorMode = () => {
    setIsTransitioning(true)

    // Pequeño retardo para que la animación se pueda ver
    setTimeout(() => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme-mode', newMode)
        return newMode
      })

      // Finalizar la transición después de que el tema cambie
      setTimeout(() => {
        setIsTransitioning(false)
      }, 400)
    }, 100)
  }

  // Memorizar el valor del contexto para evitar renderizados innecesarios
  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
      isTransitioning
    }),
    [mode, isTransitioning]
  )

  // Seleccionar el tema adecuado según el modo
  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            transition: 'opacity 0.25s ease',
            opacity: isTransitioning ? 0.97 : 1
          }}
        >
          {children}
        </Box>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
