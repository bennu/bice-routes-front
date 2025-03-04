// theme/theme.ts
// Contiene las definiciones de colores y tema de la aplicación con paleta cálida

import { createTheme, alpha } from '@mui/material'

// Colores principales de la aplicación - Nueva paleta cálida
export const colors = {
  // Colores primarios
  platinum: '#EEE2DF', // Crema claro para fondos
  thistle: '#DEC1DB', // Lavanda claro para acentos secundarios
  liberty: '#5B61B2', // Azul-púrpura para elementos principales
  bleuDeFrance: '#2F80E4', // Azul brillante para botones y destacados
  littleBoyBlue: '#6DA0E1' // Azul claro para elementos interactivos
}

// Helper para transparencia
export const getAlpha = (color: string, value: number) => alpha(color, value)

// Tema principal de la aplicación con la nueva paleta
const theme = createTheme({
  palette: {
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
          backgroundColor: colors.liberty,
          '&:hover': {
            backgroundColor: '#4A4E91' // Más oscuro en hover
          }
        },
        containedSecondary: {
          backgroundColor: colors.bleuDeFrance,
          '&:hover': {
            backgroundColor: '#2468B8' // Más oscuro en hover
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
          backgroundColor: '#ffffff',
          color: colors.liberty
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
    }
  }
})

export default theme
