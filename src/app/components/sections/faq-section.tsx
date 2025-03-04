// components/sections/FaqSection.tsx
// Sección de preguntas frecuentes

import { Box, Container, Typography, alpha } from '@mui/material'
import FaqItem from '../ui/faq-item'
import { colors } from '../../theme/theme'

const FaqSection = () => {
  const faqItems = [
    {
      question: '¿Qué tipo de archivos YML puedo convertir?',
      answer:
        'Puedes convertir cualquier archivo YML o YAML que contenga definiciones de API, especialmente aquellos compatibles con OpenAPI o Swagger. La herramienta es especialmente útil para archivos de especificación de API REST, pero funciona con cualquier estructura YML válida.'
    },
    {
      question: '¿Es seguro usar este convertidor online?',
      answer:
        'Sí, absolutamente. Todo el procesamiento ocurre en tu navegador local, y nunca almacenamos tus archivos en nuestros servidores. Tus datos nunca salen de tu dispositivo, lo que garantiza total privacidad y seguridad para tus documentos.'
    },
    {
      question: '¿Cuál es el tamaño máximo de archivo permitido?',
      answer:
        'No hay un límite estricto en el tamaño del archivo ya que el procesamiento se realiza localmente. Sin embargo, para un rendimiento óptimo, recomendamos archivos de hasta 10MB. Los archivos más grandes pueden procesarse, pero podrían tardar más dependiendo de la capacidad de tu dispositivo.'
    },
    {
      question: '¿Puedo usar las rutas generadas en cualquier framework?',
      answer:
        'Sí, las rutas generadas están en un formato de texto plano universal que puede ser integrado fácilmente en cualquier framework como Express, Django, Spring Boot, Laravel u otros. Las rutas siguen un formato estándar que es compatible con la mayoría de las implementaciones de API REST.'
    },
    {
      question: '¿BICE Routes ofrece alguna funcionalidad adicional?',
      answer:
        'Actualmente ofrecemos la conversión básica de YML a rutas. Estamos trabajando en funcionalidades adicionales como la generación de código cliente, documentación automática, y validación de estructuras API. Estas características estarán disponibles en próximas actualizaciones.'
    }
  ]

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: alpha(colors.thistle, 0.2)
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Preguntas frecuentes
        </Typography>

        <Box sx={{ mb: 6 }}>
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              lastItem={index === faqItems.length - 1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default FaqSection
