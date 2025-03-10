// Tarjeta para mostrar una característica con ícono y descripción

import { ReactNode } from 'react'
import { Box, Card, CardContent, Typography, alpha } from '@mui/material'
import { colors } from '../../theme/theme'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color?: string
}

const FeatureCard = ({
  icon,
  title,
  description,
  color = colors.bleuDeFrance
}: FeatureCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${alpha(colors.bleuDeFrance, 0.1)}`,
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Box
        sx={{
          height: 200,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            bgcolor: alpha(color, 0.05)
          }}
        >
          {icon}
        </Box>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom align="justify">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="justify">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
