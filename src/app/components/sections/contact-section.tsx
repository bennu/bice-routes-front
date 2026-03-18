'use client'

import { Box, Container, Typography, Button, alpha } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import { colors } from '@/app/theme/theme'
import ContactFormModal from '@/app/components/ui/contact-form'

const ContactSection = () => {
  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: alpha(colors.platinum, 0.4)
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            mb: 4
          }}
        >
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 2 }}>
            ¿Necesitas ayuda?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Estamos aquí para ayudarte con cualquier pregunta o duda que tengas
            sobre BICE Routes. Nuestro equipo te responderá a la brevedad.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<EmailIcon />}
            onClick={handleOpen}
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: colors.bleuDeFrance,
              color: 'white',
              '&:hover': {
                bgcolor: colors.liberty
              },
              borderRadius: 8,
              boxShadow: `0 4px 14px ${alpha(colors.bleuDeFrance, 0.4)}`
            }}
          >
            Contáctanos
          </Button>
        </Box>

        {/* Información de contacto adicional */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            gap: 5,
            mt: 5
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              bgcolor: alpha('#fff', 0.4),
              backdropFilter: 'blur(10px)',
              p: 3,
              borderRadius: 3,
              boxShadow: `0 4px 20px ${alpha('#000', 0.05)}`,
              maxWidth: 300,
              mx: 'auto',
              width: '100%',
              border: `1px solid ${alpha('#fff', 0.2)}`
            }}
          >
            <Typography variant="h6" gutterBottom color={colors.liberty}>
              Horario de Atención
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Lunes a Viernes
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
              9:00 - 18:00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tiempo de respuesta: hasta 24 horas hábiles
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              bgcolor: alpha('#fff', 0.4),
              backdropFilter: 'blur(10px)',
              p: 3,
              borderRadius: 3,
              boxShadow: `0 4px 20px ${alpha('#000', 0.05)}`,
              maxWidth: 300,
              mx: 'auto',
              width: '100%',
              border: `1px solid ${alpha('#fff', 0.2)}`
            }}
          >
            <Typography variant="h6" gutterBottom color={colors.liberty}>
              Email
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
              soporte@bennu.cl
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Envíanos un correo y te responderemos a la brevedad.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Modal de formulario de contacto */}
      <ContactFormModal />
    </Box>
  )
}

export default ContactSection
