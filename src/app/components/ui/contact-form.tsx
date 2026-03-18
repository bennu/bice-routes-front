import React, { useState } from 'react'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Slide,
  alpha
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ChatIcon from '@mui/icons-material/Chat'
import SendIcon from '@mui/icons-material/Send'

// Colores del tema importados (referencia)
const colors = {
  platinum: '#EEE2DF', // Crema claro para fondos
  thistle: '#DEC1DB', // Lavanda claro para acentos secundarios
  liberty: '#5B61B2', // Azul-púrpura para elementos principales
  bleuDeFrance: '#2F80E4', // Azul brillante para botones y destacados
  littleBoyBlue: '#6DA0E1' // Azul claro para elementos interactivos
}

// Tipo de datos para el formulario
type ContactFormData = {
  name: string
  email: string
  message: string
}

export default function ContactChatWidget() {
  // Estado para controlar si el widget está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false)

  // Estado para mostrar mensaje de éxito
  const [submitted, setSubmitted] = useState(false)

  // Configurar el formulario
  const methods = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Datos enviados:', data)
    // Aquí iría la lógica para enviar los datos al backend
    setSubmitted(true)
    // Reiniciar después de 3 segundos
    setTimeout(() => {
      setSubmitted(false)
      methods.reset()
    }, 3000)
  }

  return (
    <>
      {/* Botón flotante que muestra/oculta el widget */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: alpha(colors.liberty, 0.9),
            color: 'white',
            width: '60px',
            height: '60px',
            boxShadow: '0 8px 32px rgba(91, 97, 178, 0.3)', // Sombra con el color liberty
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            border: `2px solid ${alpha(colors.liberty, 0.3)}`,
            '&:hover': {
              backgroundColor: colors.liberty
            }
          }}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      )}

      {/* Widget de chat con estilo glassmorphism */}
      <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={0} // Sin elevación predeterminada para usar nuestro propio estilo
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            maxWidth: '100%',
            height: 'auto', // Altura automática basada en contenido
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px',
            zIndex: 1300,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
          }}
        >
          {/* Cabecera del widget */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 18px',
              background: `linear-gradient(135deg, ${colors.liberty} 0%, ${colors.bleuDeFrance} 100%)`,
              boxShadow: `0 2px 10px ${alpha(colors.bleuDeFrance, 0.3)}`,
              color: 'white',
              borderBottom: `1px solid ${alpha('#ffffff', 0.2)}`
            }}
          >
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#ffffff',
                mr: 2,
                width: 28,
                height: 28,
                borderRadius: '50%'
              }}
            >
              <ChatIcon fontSize="small" sx={{ color: colors.liberty }} />
            </Box>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
              Danos tu feedback!
            </Typography>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.2)
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Contenido del formulario */}
          <Box
            sx={{
              p: 2,
              overflowY: 'auto',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: submitted ? 'center' : 'flex-start',
              backgroundColor: '#ffffff'
            }}
          >
            {submitted ? (
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  backgroundColor: alpha(colors.platinum, 0.5),
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${alpha(colors.thistle, 0.3)}`
                }}
              >
                <Typography
                  variant="h6"
                  color={colors.liberty}
                  gutterBottom
                  fontWeight="bold"
                >
                  ¡Mensaje enviado!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </Typography>
              </Box>
            ) : (
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  style={{ width: '100%' }}
                >
                  <Controller
                    name="name"
                    control={methods.control}
                    rules={{ required: 'Nombre es requerido' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.liberty
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.liberty
                            }
                          }
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={methods.control}
                    rules={{
                      required: 'Email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: alpha('#ffffff', 0.7),
                            backdropFilter: 'blur(4px)',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.littleBoyBlue
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.liberty
                            }
                          }
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="message"
                    control={methods.control}
                    rules={{ required: 'Mensaje es requerido' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Mensaje"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        multiline
                        rows={4}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: alpha('#ffffff', 0.7),
                            backdropFilter: 'blur(4px)',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.littleBoyBlue
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: colors.liberty
                            }
                          }
                        }}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      py: 1,
                      backgroundColor: colors.liberty,
                      '&:hover': {
                        backgroundColor: colors.bleuDeFrance
                      }
                    }}
                    endIcon={<SendIcon />}
                  >
                    Enviar
                  </Button>
                </form>
              </FormProvider>
            )}
          </Box>
        </Paper>
      </Slide>
    </>
  )
}
