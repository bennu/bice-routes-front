// components/sections/FileConverterSection.tsx
// Sección de conversión de archivos con el formulario de carga
'use client'
import { useState, useCallback, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Tooltip,
  alpha,
  CircularProgress,
  TextField,
  Tabs,
  Tab,
  useTheme,
  Switch,
  FormControlLabel,
  Collapse
} from '@mui/material'
import { colors } from '../../theme/theme'
import { parse } from '@/app/service/routesService'

// Componente para los paneles de pestañas
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`routes-tabpanel-${index}`}
      aria-labelledby={`routes-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

// Componente para los paneles de pestañas de entrada
interface InputTabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function InputTabPanel(props: InputTabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`input-tabpanel-${index}`}
      aria-labelledby={`input-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

const FileConverterSection = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [files, setFiles] = useState<File[]>([])
  const [routes, setRoutes] = useState<string[]>([])
  const [routesFail, setRoutesFail] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [existingRoutes, setExistingRoutes] = useState<string>('')
  const [tabValue, setTabValue] = useState<number>(0)
  const [inputTabValue, setInputTabValue] = useState<number>(0)
  const [openApiSpec, setOpenApiSpec] = useState<string>('')
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleInputTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setInputTabValue(newValue)
    // Limpiar datos cuando cambies de pestaña
    if (newValue === 0) {
      setOpenApiSpec('')
    } else {
      setFiles([])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter(
        (file) => file.name.endsWith('.yml') || file.name.endsWith('.yaml')
      )

      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    if (event.dataTransfer.files) {
      const droppedFiles = Array.from(event.dataTransfer.files).filter(
        (file) => file.name.endsWith('.yml') || file.name.endsWith('.yaml')
      )

      setFiles((prev) => [...prev, ...droppedFiles])
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Función para convertir un archivo a base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        // El resultado será un data URL, necesitamos extraer la parte base64
        const base64String = reader.result as string
        // Remover el prefijo del data URL (ej: "data:application/yaml;base64,")
        const base64 = base64String.split(',')[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleExistingRoutesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExistingRoutes(event.target.value)
  }

  const handleOpenApiSpecChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOpenApiSpec(event.target.value)
  }

  const handleAdvancedOptionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowAdvancedOptions(event.target.checked)
    if (!event.target.checked) {
      setExistingRoutes('')
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setOpenApiSpec(text)
    } catch (error) {
      console.error('Error al pegar desde el portapapeles:', error)
      setError('No se pudo acceder al portapapeles. Intenta pegar manualmente.')
    }
  }

  const generateRoutes = async () => {
    if (inputTabValue === 0 && files.length === 0) return
    if (inputTabValue === 1 && !openApiSpec.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      let data: {
        routes: string
        openApiSpecs?: string[]
        openApiSpec?: string
      }

      if (inputTabValue === 0) {
        const openApiSpecs = await Promise.all(
          files.map((file) => convertFileToBase64(file))
        )

        const existingRoutesEncoded = existingRoutes
          ? btoa(unescape(encodeURIComponent(existingRoutes)))
          : btoa('')

        data = {
          routes: existingRoutesEncoded,
          openApiSpecs: openApiSpecs
        }
      } else {
        const existingRoutesEncoded = existingRoutes
          ? btoa(unescape(encodeURIComponent(existingRoutes)))
          : btoa('')

        data = {
          routes: existingRoutesEncoded,
          openApiSpec: btoa(unescape(encodeURIComponent(openApiSpec)))
        }
      }

      const response = await parse(data)

      if (response && Array.isArray(response.newRoutes)) {
        setRoutes(response.newRoutes)
        if (Array.isArray(response.routesFail)) {
          setRoutesFail(response.routesFail)
        } else {
          setRoutesFail([])
        }
      } else if (Array.isArray(response)) {
        setRoutes(response)
        setRoutesFail([])
      } else if (response && Array.isArray(response.routes)) {
        setRoutes(response.routes)
        setRoutesFail([])
      } else {
        console.warn('Formato de respuesta inesperado:', response)
        setRoutes([])
        setRoutesFail([])
      }
    } catch (error) {
      console.error('Error al generar rutas:', error)
      setError('Error al procesar los archivos. Por favor, inténtalo de nuevo.')
      setRoutes([])
      setRoutesFail([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const downloadRoutes = () => {
    if (routes.length === 0) return

    try {
      // Crear el contenido del archivo: unir todas las rutas con saltos de línea
      const routesText = routes.join('\n')

      // Crear un blob con el contenido
      const blob = new Blob([routesText], { type: 'text/plain' })

      // Crear URL del blob
      const url = URL.createObjectURL(blob)

      // Crear enlace de descarga
      const a = document.createElement('a')
      a.href = url
      a.download = 'routes.txt'

      // Añadir al DOM, hacer clic y limpiar
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al generar archivo:', error)
      setError('No se pudo crear el archivo de descarga')
    }
  }

  // Color para el botón de libertad adaptado al tema
  const libertyColor = isDark ? theme.palette.primary.main : colors.liberty

  // Color para botones y elementos de BleuDeFrance adaptado al tema
  const bleuColor = isDark ? theme.palette.primary.main : colors.bleuDeFrance

  // Estilo glassmórfico base
  const glassStyle = {
    background: isDark
      ? `linear-gradient(145deg, ${alpha('#ffffff', 0.05)}, ${alpha('#ffffff', 0.02)})`
      : `linear-gradient(145deg, ${alpha('#ffffff', 0.9)}, ${alpha('#ffffff', 0.6)})`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${isDark ? alpha('#ffffff', 0.1) : alpha('#ffffff', 0.2)}`,
    borderRadius: '16px',
    boxShadow: isDark
      ? `0 8px 32px ${alpha('#000000', 0.3)}`
      : `0 8px 32px ${alpha('#000000', 0.1)}`
  }

  return (
    <Box
      id="conversion"
      sx={{
        py: { xs: 8, md: 10 },
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            color: theme.palette.text.primary,
            fontWeight: 700,
            textShadow: isDark
              ? `0 2px 10px ${alpha('#000000', 0.5)}`
              : `0 2px 10px ${alpha('#000000', 0.1)}`
          }}
        >
          Convertidor de YML a Rutas
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{
            mb: 6,
            maxWidth: 800,
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          Convierte tus documentos YML a rutas API de alta calidad gratis en
          línea. No es necesario registrarse y no se agregan marcas de agua.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '80%', lg: '66.6%' } }}>
            {/* Input Method Tabs con Switch de Opciones Avanzadas */}
            <Paper
              sx={{
                mb: 3,
                ...glassStyle,
                overflow: 'hidden'
              }}
            >
              {/* Header con pestañas y switch */}
              <Box
                sx={{
                  borderBottom: `1px solid ${isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Tabs
                  value={inputTabValue}
                  onChange={handleInputTabChange}
                  aria-label="input method tabs"
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      minWidth: 'auto',
                      color: theme.palette.text.secondary,
                      fontSize: '1rem',
                      '&.Mui-selected': {
                        color: bleuColor
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: bleuColor,
                      height: 3,
                      borderRadius: '3px'
                    }
                  }}
                >
                  <Tab
                    label="📁 Subir archivos"
                    id="input-tab-0"
                    aria-controls="input-tabpanel-0"
                  />
                  <Tab
                    label="📝 Pegar YML"
                    id="input-tab-1"
                    aria-controls="input-tabpanel-1"
                  />
                </Tabs>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showAdvancedOptions}
                      onChange={handleAdvancedOptionsChange}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      ⚙️ Opciones avanzadas
                    </Typography>
                  }
                />
              </Box>

              {/* File Upload Panel */}
              <InputTabPanel value={inputTabValue} index={0}>
                <Box
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                    background: isDark
                      ? `linear-gradient(145deg, ${alpha(bleuColor, 0.05)}, ${alpha(bleuColor, 0.02)})`
                      : `linear-gradient(145deg, ${alpha(bleuColor, 0.08)}, ${alpha(bleuColor, 0.03)})`,
                    border: `2px dashed ${isDark ? alpha(bleuColor, 0.3) : alpha(bleuColor, 0.4)}`,
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleButtonClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    accept=".yml,.yaml"
                    onChange={handleFileChange}
                  />
                  <Box
                    sx={{
                      fontSize: 56,
                      mb: 3,
                      background: `linear-gradient(45deg, ${bleuColor}, ${libertyColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: `drop-shadow(0 2px 4px ${alpha(bleuColor, 0.3)})`
                    }}
                  >
                    🡹
                  </Box>
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    Elige archivos YML o arrástralos aquí
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    sx={{ fontSize: '1rem' }}
                  >
                    Solo se admiten archivos .yml y .yaml
                  </Typography>
                </Box>
              </InputTabPanel>

              {/* Paste YML Panel */}
              <InputTabPanel value={inputTabValue} index={1}>
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600
                      }}
                    >
                      📝 Pega tu contenido YML/YAML aquí
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={pasteFromClipboard}
                      sx={{
                        color: bleuColor,
                        borderRadius: '10px',
                        backdropFilter: 'blur(10px)',
                        background: alpha(bleuColor, 0.05)
                      }}
                    >
                      📋
                    </Button>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={12}
                    placeholder="openapi: 3.0.0
info:
  title: Mi API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Obtener usuarios
      responses:
        '200':
          description: Lista de usuarios"
                    value={openApiSpec}
                    onChange={handleOpenApiSpecChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: isDark
                          ? alpha('#ffffff', 0.03)
                          : alpha('#ffffff', 0.6),
                        backdropFilter: 'blur(10px)',
                        '& fieldset': {
                          borderColor: alpha(bleuColor, 0.3)
                        },
                        '&:hover fieldset': {
                          borderColor: alpha(bleuColor, 0.5)
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: bleuColor
                        }
                      },
                      '& .MuiInputBase-input': {
                        fontFamily:
                          'Monaco, Consolas, "Courier New", monospace',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      mt: 2,
                      display: 'block',
                      fontSize: '0.9rem',
                      fontStyle: 'italic'
                    }}
                  >
                    💡 Pega aquí el contenido completo de tu archivo
                    OpenAPI/Swagger en formato YAML
                  </Typography>
                </Box>
              </InputTabPanel>
            </Paper>

            {/* Advanced Options - Existing Routes Input */}
            <Collapse in={showAdvancedOptions}>
              <Paper
                sx={{
                  p: 4,
                  mb: 3,
                  ...glassStyle
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  🔧 Rutas Existentes (Opcional)
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mb: 3, fontSize: '1rem' }}
                >
                  Ingresa tus rutas existentes (una por línea) para filtrarlas
                  de los resultados
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="GET /api/v1/users
POST /api/v1/users
DELETE /api/v1/users/{id}"
                  value={existingRoutes}
                  onChange={handleExistingRoutesChange}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: isDark
                        ? alpha('#ffffff', 0.03)
                        : alpha('#ffffff', 0.6),
                      backdropFilter: 'blur(10px)',
                      '& fieldset': {
                        borderColor: alpha(libertyColor, 0.3)
                      },
                      '&:hover fieldset': {
                        borderColor: alpha(libertyColor, 0.5)
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: libertyColor
                      }
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                      fontSize: '0.9rem'
                    }
                  }}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ fontSize: '0.9rem', fontStyle: 'italic' }}
                >
                  ⚡ Estas rutas serán excluidas de los resultados finales
                </Typography>
              </Paper>
            </Collapse>
            {/* Files List - Solo mostrar en la pestaña de archivos */}
            {inputTabValue === 0 && files.length > 0 && (
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  ...glassStyle
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    mb: 2,
                    color: theme.palette.text.primary
                  }}
                >
                  📂 Archivos subidos
                </Typography>
                <Divider
                  sx={{
                    mb: 2,
                    borderColor: isDark
                      ? alpha('#ffffff', 0.1)
                      : alpha('#000000', 0.1)
                  }}
                />
                <List dense>
                  {files.map((file, index) => (
                    <ListItem
                      key={`${file.name}-${index}`}
                      sx={{
                        borderRadius: '8px',
                        mb: 1,
                        background: isDark
                          ? alpha('#ffffff', 0.02)
                          : alpha('#ffffff', 0.4),
                        '&:hover': {
                          background: isDark
                            ? alpha('#ffffff', 0.05)
                            : alpha('#ffffff', 0.6)
                        }
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => removeFile(index)}
                          size="small"
                          color="error"
                        >
                          🗑️
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 500
                            }}
                          >
                            📄 {file.name}
                          </Typography>
                        }
                        secondary={`${(file.size / 1024).toFixed(2)} KB`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Generate Routes Button */}
            {((inputTabValue === 0 && files.length > 0) ||
              (inputTabValue === 1 && openApiSpec.trim())) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={generateRoutes}
                  disabled={isLoading}
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${bleuColor}, ${libertyColor})`,
                    boxShadow: `0 8px 32px ${alpha(bleuColor, 0.3)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${alpha(bleuColor, 0.9)}, ${alpha(libertyColor, 0.9)})`,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 40px ${alpha(bleuColor, 0.4)}`
                    },
                    '&:disabled': {
                      background: alpha(theme.palette.action.disabled, 0.3),
                      color: theme.palette.action.disabled
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={28}
                        color="inherit"
                        sx={{ mr: 2 }}
                      />
                      ⚡ Procesando...
                    </>
                  ) : (
                    '🚀 Generar Routes.TXT'
                  )}
                </Button>
              </Box>
            )}

            {/* Error message */}
            {error && (
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  ...glassStyle,
                  borderLeft: `4px solid ${theme.palette.error.main}`
                }}
              >
                <Typography
                  color="error"
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  ❌ {error}
                </Typography>
              </Paper>
            )}

            {/* Routes Display with Tabs */}
            {(routes.length > 0 || routesFail.length > 0) && (
              <Paper
                sx={{
                  p: 4,
                  mb: 4,
                  ...glassStyle
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      color: theme.palette.text.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    📊 Resultados
                  </Typography>
                  <Tooltip title="Descargar rutas" arrow>
                    <IconButton
                      onClick={downloadRoutes}
                      disabled={routes.length === 0}
                      sx={{
                        color: bleuColor,
                        borderRadius: '10px',
                        backdropFilter: 'blur(10px)',
                        background: alpha(bleuColor, 0.05)
                      }}
                    >
                      ⬇️
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Tabs navigation */}
                <Box
                  sx={{
                    borderBottom: `1px solid ${isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`,
                    mb: 3
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="rutas tabs"
                    sx={{
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 'auto',
                        fontWeight: 600,
                        mr: 3,
                        color: theme.palette.text.secondary,
                        fontSize: '1rem',
                        borderRadius: '8px 8px 0 0',
                        '&.Mui-selected': {
                          color: bleuColor
                        }
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: bleuColor,
                        height: 3,
                        borderRadius: '3px'
                      }
                    }}
                  >
                    <Tab
                      label={
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'inherit',
                              fontWeight: 'inherit'
                            }}
                          >
                            ✅ Rutas generadas
                          </Typography>
                          {routes.length > 0 && (
                            <Box
                              sx={{
                                background: `linear-gradient(45deg, ${bleuColor}, ${libertyColor})`,
                                color: 'white',
                                minWidth: 30,
                                height: 24,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem',
                                px: 1
                              }}
                            >
                              {routes.length}
                            </Box>
                          )}
                        </Box>
                      }
                      id="routes-tab-0"
                      aria-controls="routes-tabpanel-0"
                    />
                    <Tab
                      label={
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography
                            variant="body1"
                            color={
                              routesFail.length > 0 ? 'error.main' : 'inherit'
                            }
                            sx={{ fontWeight: 'inherit' }}
                          >
                            ❌ Rutas Existente
                          </Typography>
                          {routesFail.length > 0 && (
                            <Box
                              sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                minWidth: 24,
                                height: 24,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem',
                                px: 1
                              }}
                            >
                              {routesFail.length}
                            </Box>
                          )}
                        </Box>
                      }
                      id="routes-tab-1"
                      aria-controls="routes-tabpanel-1"
                    />
                  </Tabs>
                </Box>

                {/* Tab content */}
                <TabPanel value={tabValue} index={0}>
                  {routes.length > 0 ? (
                    <Box
                      sx={{
                        background: isDark
                          ? `linear-gradient(145deg, ${alpha('#000000', 0.2)}, ${alpha('#000000', 0.05)})`
                          : `linear-gradient(145deg, ${alpha('#ffffff', 0.8)}, ${alpha('#ffffff', 0.5)})`,
                        p: 3,
                        borderRadius: '12px',
                        fontFamily:
                          'Monaco, Consolas, "Courier New", monospace',
                        fontSize: '0.9rem',
                        overflowX: 'auto',
                        border: `1px solid ${isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.05)}`,
                        backdropFilter: 'blur(10px)',
                        maxHeight: '400px',
                        overflowY: 'auto'
                      }}
                    >
                      {routes.map((route, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          component="div"
                          sx={{
                            mb: 1,
                            borderRadius: '6px',
                            background: isDark
                              ? alpha('#ffffff', 0.02)
                              : alpha('#ffffff', 0.3),
                            color: route.startsWith('GET')
                              ? '#4caf50'
                              : route.startsWith('POST')
                                ? '#2196f3'
                                : route.startsWith('PUT')
                                  ? '#ff9800'
                                  : route.startsWith('DELETE')
                                    ? '#f44336'
                                    : theme.palette.text.primary,
                            fontWeight: 500
                          }}
                        >
                          {route}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 6,
                        background: isDark
                          ? alpha('#ffffff', 0.02)
                          : alpha('#ffffff', 0.5),
                        borderRadius: '12px',
                        border: `2px dashed ${isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 1,
                          fontSize: '3rem'
                        }}
                      >
                        📄
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500
                        }}
                      >
                        No hay rutas generadas
                      </Typography>
                    </Box>
                  )}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {routesFail.length > 0 ? (
                    <Box
                      sx={{
                        background: isDark
                          ? `linear-gradient(145deg, ${alpha('#f44336', 0.1)}, ${alpha('#f44336', 0.05)})`
                          : `linear-gradient(145deg, ${alpha('#f44336', 0.05)}, ${alpha('#f44336', 0.02)})`,
                        p: 3,
                        borderRadius: '12px',
                        fontFamily:
                          'Monaco, Consolas, "Courier New", monospace',
                        fontSize: '0.9rem',
                        overflowX: 'auto',
                        border: `1px solid ${alpha('#f44336', 0.2)}`,
                        backdropFilter: 'blur(10px)',
                        maxHeight: '400px',
                        overflowY: 'auto'
                      }}
                    >
                      {routesFail.map((route, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          component="div"
                          sx={{
                            mb: 1,
                            p: 1,
                            borderRadius: '6px',
                            background: alpha('#f44336', 0.1),
                            color: '#f44336',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: alpha('#f44336', 0.15),
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          {route}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 6,
                        background: isDark
                          ? alpha('#ffffff', 0.02)
                          : alpha('#ffffff', 0.5),
                        borderRadius: '12px',
                        border: `2px dashed ${isDark ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 1,
                          fontSize: '3rem'
                        }}
                      >
                        ✅
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500
                        }}
                      >
                        No hay rutas fallidas
                      </Typography>
                    </Box>
                  )}
                </TabPanel>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default FileConverterSection
