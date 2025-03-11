// Logo de BICE Routes con icono de AltRoute

import { Box, Typography } from '@mui/material'
import AltRouteIcon from '@mui/icons-material/AltRoute'
import { colors } from '../../theme/theme'

interface LogoProps {
  size?: 'small' | 'default'
}

const Logo = ({ size = 'default' }: LogoProps) => {
  const iconSize = size === 'small' ? 24 : 32

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          bgcolor: colors.bleuDeFrance,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1,
          p: 0.5,
          width: iconSize + 8,
          height: iconSize + 8
        }}
      >
        <AltRouteIcon sx={{ color: 'white', fontSize: iconSize }} />
      </Box>
      <Typography
        variant={size === 'small' ? 'subtitle1' : 'h6'}
        noWrap
        sx={{ fontWeight: 700 }}
      >
        BICE Routes
      </Typography>
    </Box>
  )
}

export default Logo
