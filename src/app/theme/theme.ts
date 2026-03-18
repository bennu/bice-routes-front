import { createTheme, alpha, ThemeOptions, PaletteMode } from '@mui/material'

// Colores principales de la aplicación - Nueva paleta cálida
export const colors = {
  // Colores primarios
  platinum: '#EEE2DF', // Crema claro para fondos
  thistle: '#DEC1DB', // Lavanda claro para acentos secundarios
  liberty: '#5B61B2', // Azul-púrpura para elementos principales
  bleuDeFrance: '#2F80E4', // Azul brillante para botones y destacados
  littleBoyBlue: '#6DA0E1', // Azul claro para elementos interactivos
  // Colores para el tema oscuro
  darkBg: '#121212', // Fondo oscuro principal
  darkPaper: '#1E1E1E', // Fondo para componentes Paper
  darkLiberty: '#6D73C6', // Versión más clara de Liberty para tema oscuro
  darkBleuDeFrance: '#4B98F5' // Versión más clara para tema oscuro
}

// Helper para transparencia
export const getAlpha = (color: string, value: number) => alpha(color, value)

// Configuraciones de tema por modo
const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Configuración del tema claro
          primary: {
            main: colors.liberty,
            light: colors.littleBoyBlue,
            dark: '#4A4E91', // Versión más oscura de Liberty
            contrastText: '#ffffff'
          },
          secondary: {
            main: colors.bleuDeFrance,
            light: colors.littleBoyBlue,
            dark: '#2468B8', // Versión más oscura de Bleu De France
            contrastText: '#ffffff'
          },
          background: {
            default: colors.platinum,
            paper: '#ffffff'
          },
          text: {
            primary: '#1A1A1A',
            secondary: '#424242'
          }
        }
      : {
          // Configuración del tema oscuro
          primary: {
            main: colors.darkLiberty,
            light: colors.littleBoyBlue,
            dark: colors.liberty,
            contrastText: '#ffffff'
          },
          secondary: {
            main: colors.darkBleuDeFrance,
            light: '#7DB5F8',
            dark: colors.bleuDeFrance,
            contrastText: '#ffffff'
          },
          background: {
            default: colors.darkBg,
            paper: colors.darkPaper
          },
          text: {
            primary: '#ffffff',
            secondary: '#B0B0B0'
          }
        }),
    success: {
      main: '#4CAF50', // Mantenemos colores estándar para estados
      light: '#81C784'
    },
    info: {
      main: colors.littleBoyBlue,
      light: '#90CAF9'
    },
    warning: {
      main: '#FFC107',
      light: '#FFE082'
    },
    error: {
      main: '#F44336',
      light: '#E57373'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500
        },
        containedPrimary: {
          backgroundColor:
            mode === 'light' ? colors.liberty : colors.darkLiberty,
          '&:hover': {
            backgroundColor: mode === 'light' ? '#4A4E91' : '#5B61B2'
          }
        },
        containedSecondary: {
          backgroundColor:
            mode === 'light' ? colors.bleuDeFrance : colors.darkBleuDeFrance,
          '&:hover': {
            backgroundColor: mode === 'light' ? '#2468B8' : '#2F80E4'
          }
        },
        outlined: {
          borderWidth: 2
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : colors.darkPaper,
          color: mode === 'light' ? colors.liberty : '#ffffff'
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none'
          }
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor:
                mode === 'dark' ? colors.darkLiberty : colors.liberty,
              opacity: 1,
              border: 0
            }
          }
        },
        thumb: {
          width: 24,
          height: 24
        },
        track: {
          borderRadius: 13,
          border: `1px solid ${mode === 'light' ? '#E9E9EA' : '#39393D'}`,
          backgroundColor: mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1
        }
      }
    }
  }
})

// Función para crear temas según el modo
export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode))
}

// Exportamos los temas predefinidos
export const lightTheme = createAppTheme('light')
export const darkTheme = createAppTheme('dark')

// Por defecto exportamos el tema claro
export default lightTheme
