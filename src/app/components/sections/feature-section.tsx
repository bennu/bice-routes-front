// Sección de características principales

import { Box, Container, Typography } from '@mui/material'
import FeatureCard from '../ui/feature-card'
import { colors } from '../../theme/theme'

const FeaturesSection = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Conversión Rápida',
      description:
        'Nuestro algoritmo de alto rendimiento convierte tus archivos YML a rutas API en segundos, independientemente de la complejidad de tu documento.',
      color: colors.bleuDeFrance
    },
    {
      icon: '🔒',
      title: 'Seguridad Garantizada',
      description:
        'Todos tus archivos se procesan en tu navegador local, sin almacenar nada en servidores externos. Tu información nunca sale de tu dispositivo.',
      color: colors.liberty
    },
    {
      icon: '📱',
      title: 'Compatibilidad Total',
      description:
        'BICE Routes funciona en cualquier dispositivo y sistema operativo. Convierte archivos desde tu ordenador, tablet o smartphone sin perder funcionalidad.',
      color: colors.littleBoyBlue
    }
  ]

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Características principales
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default FeaturesSection
