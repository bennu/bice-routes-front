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
  Stack,
  Tooltip,
  alpha,
  CircularProgress,
  TextField,
  Tabs,
  Tab,
  useTheme
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
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

  const generateRoutes = async () => {
    if (files.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      // Convertir los archivos a base64
      const openApiSpecs = await Promise.all(
        files.map((file) => convertFileToBase64(file))
      )

      // Codificar las rutas existentes en base64 (si hay)
      const existingRoutesEncoded = existingRoutes
        ? btoa(existingRoutes)
        : btoa('') // Si no hay rutas existentes, enviamos un string vacío codificado

      // Crear el objeto de datos correctamente estructurado para el backend
      const data = {
        routes: existingRoutesEncoded,
        openApiSpecs: openApiSpecs
      }

      // Enviar los datos al servicio
      const response = await parse(data)

      // Procesar la respuesta - actualizado para manejar el formato que incluye newRoutes y routesFail
      if (response && Array.isArray(response.newRoutes)) {
        // El backend devuelve un objeto con propiedad newRoutes
        setRoutes(response.newRoutes)
        // Guardar también las rutas fallidas si existen
        if (Array.isArray(response.routesFail)) {
          setRoutesFail(response.routesFail)
        } else {
          setRoutesFail([])
        }
      } else if (Array.isArray(response)) {
        // El backend devuelve un array directamente
        setRoutes(response)
        setRoutesFail([])
      } else if (response && Array.isArray(response.routes)) {
        // El backend devuelve un objeto con propiedad routes
        setRoutes(response.routes)
        setRoutesFail([])
      } else {
        // Formato inesperado
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

  // Color para el área de carga
  const dropAreaBgColor = alpha(bleuColor, isDark ? 0.1 : 0.05)
  const dropAreaBorderColor = isDark ? alpha(bleuColor, 0.5) : bleuColor

  // Color para el área de resultados
  const resultsAreaBgColor = isDark
    ? alpha(theme.palette.background.paper, 0.3)
    : alpha(colors.littleBoyBlue, 0.2)

  return (
    <Box
      id="conversion"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: theme.palette.background.default // Usar color del tema
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
            color: theme.palette.text.primary // Adaptado al tema
          }}
        >
          Convertidor de YML a Rutas
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
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
            {/* Existing Routes Input */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                bgcolor: theme.palette.background.paper // Adaptado al tema
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
              >
                Rutas Existentes (Opcional)
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Ingresa tus rutas existentes (una por línea) para filtrarlas de
                los resultados
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
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="textSecondary">
                Estas rutas serán excluidas de los resultados finales
              </Typography>
            </Paper>

            {/* File Upload Area */}
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                bgcolor: dropAreaBgColor,
                border: `2px dashed ${dropAreaBorderColor}`,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: alpha(bleuColor, isDark ? 0.15 : 0.08)
                },
                mb: 3
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
              <Box sx={{ fontSize: 48, color: bleuColor, mb: 2 }}>⬆️</Box>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
              >
                Elige archivos YML o arrástralos aquí
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                Solo se admiten archivos .yml y .yaml
              </Typography>
            </Paper>

            {/* Features bullets */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 2
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: libertyColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Arrastra y suelta archivos
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: libertyColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Compatible con todos los dispositivos
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: libertyColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    100% seguro y privado
                  </Typography>
                </Stack>
              </Box>
            </Box>

            {/* Files List */}
            {files.length > 0 && (
              <Paper
                sx={{
                  p: 2,
                  mb: 3,
                  bgcolor: theme.palette.background.paper // Adaptado al tema
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{
                    mb: 1,
                    color: theme.palette.text.primary
                  }}
                >
                  Archivos subidos
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {files.map((file, index) => (
                    <ListItem
                      key={`${file.name}-${index}`}
                      secondaryAction={
                        <Box sx={{ display: 'flex' }}>
                          {/* Botón de eliminar */}
                          <IconButton
                            edge="end"
                            onClick={() => removeFile(index)}
                            size="small"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            <Box sx={{ fontSize: 'default' }}>🗑️</Box>
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {file.name}
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
            {files.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={generateRoutes}
                  disabled={isLoading}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: bleuColor,
                    '&:hover': {
                      bgcolor: alpha(libertyColor, 0.8)
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={24}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Procesando...
                    </>
                  ) : (
                    'Generar Routes.TXT'
                  )}
                </Button>
              </Box>
            )}

            {/* Error message */}
            {error && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                sx={{ mb: 3 }}
              >
                {error}
              </Typography>
            )}

            {/* Routes Display with Tabs */}
            {(routes.length > 0 || routesFail.length > 0) && (
              <Paper
                sx={{
                  p: 3,
                  bgcolor: resultsAreaBgColor,
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Resultados
                  </Typography>
                  <Tooltip title="Descargar rutas">
                    <IconButton
                      onClick={downloadRoutes}
                      color="primary"
                      disabled={routes.length === 0}
                      sx={{
                        color: routes.length === 0 ? undefined : bleuColor
                      }}
                    >
                      <Box sx={{ fontSize: 'default' }}>⬇️</Box>
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Tabs navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="rutas tabs"
                    sx={{
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 'auto',
                        fontWeight: 'medium',
                        mr: 2,
                        color: theme.palette.text.secondary
                      }
                    }}
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            Rutas generadas
                          </Typography>
                          {routes.length > 0 && (
                            <Box
                              sx={{
                                bgcolor: bleuColor,
                                color: 'white',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ml: 1,
                                fontSize: 12
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            color={
                              routesFail.length > 0
                                ? 'error.main'
                                : theme.palette.text.primary
                            }
                          >
                            Rutas fallidas
                          </Typography>
                          {routesFail.length > 0 && (
                            <Box
                              sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ml: 1,
                                fontSize: 12
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
                        bgcolor: theme.palette.background.paper,
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        overflowX: 'auto'
                      }}
                    >
                      {routes.map((route, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          component="div"
                          sx={{
                            mb: 0.5,
                            color: route.startsWith('GET')
                              ? 'success.main'
                              : route.startsWith('POST')
                                ? 'info.main'
                                : route.startsWith('PUT')
                                  ? 'warning.main'
                                  : route.startsWith('DELETE')
                                    ? 'error.main'
                                    : theme.palette.text.primary
                          }}
                        >
                          {route}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'center',
                        py: 4,
                        color: theme.palette.text.secondary
                      }}
                    >
                      No hay rutas generadas
                    </Typography>
                  )}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {routesFail.length > 0 ? (
                    <Box
                      sx={{
                        bgcolor: theme.palette.background.paper,
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        overflowX: 'auto'
                      }}
                    >
                      {routesFail.map((route, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          component="div"
                          sx={{
                            mb: 0.5,
                            color: 'error.main'
                          }}
                        >
                          {route}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'center',
                        py: 4,
                        color: theme.palette.text.secondary
                      }}
                    >
                      No hay rutas fallidas
                    </Typography>
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
