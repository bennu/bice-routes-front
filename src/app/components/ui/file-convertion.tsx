'use client'

import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { colors } from '@/app/theme/theme'

// Define el tipo para una partícula
interface Particle {
  id: number
  size: number
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  delay: number
}

const FileConversionAnimation = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)

  // Verificar si estamos en el cliente para evitar errores de hidratación
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Crear partículas cuando se hace hover
  useEffect(() => {
    if (!isClient) return

    if (isHovering) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        startX: -50 + Math.random() * 20,
        startY: -20 + Math.random() * 40,
        endX: 50 + Math.random() * 20,
        endY: -20 + Math.random() * 40,
        duration: 1 + Math.random(),
        delay: Math.random() * 0.5
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [isHovering, isClient])

  // No renderizar partículas en el servidor
  const renderParticles = isClient && particles.length > 0

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 320,
          width: '100%',
          bgcolor: 'rgba(227, 242, 253, 0.7)',
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
            bgcolor: 'rgba(227, 242, 253, 0.9)'
          }
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Burbujas decorativas de fondo */}
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: 'rgba(200, 230, 250, 0.8)',
            transition: 'all 0.5s ease',
            transform: isHovering ? 'scale(1.2)' : 'scale(1)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(200, 230, 250, 0.8)',
            transition: 'all 0.5s ease',
            transform: isHovering ? 'scale(1.2)' : 'scale(1)'
          }}
        />

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {/* Archivo YML con signo de exclamación morado */}
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.5s ease',
              transform: isHovering ? 'translateX(-80px)' : 'translateX(0)',
              opacity: isHovering ? 0.3 : 1
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 96,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  height: 20,
                  bgcolor: colors.bleuDeFrance,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  YML
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Signo de exclamación morado */}
                <Typography
                  variant="h3"
                  sx={{
                    color: colors.thistle,
                    fontWeight: 'bold',
                    lineHeight: 1,
                    userSelect: 'none'
                  }}
                >
                  !
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ mt: 1, color: '#666' }}>
              openapi.spec
            </Typography>
          </Box>

          {/* Flecha de conversión */}
          <Box
            sx={{
              zIndex: 10,
              transition: 'all 0.3s ease',
              transform: isHovering ? 'scale(1)' : 'scale(0.5)',
              opacity: isHovering ? 1 : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Flecha simple */}
            <Box
              sx={{
                width: 150,
                height: 60,
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Punta de la flecha */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: 50,
                  width: 0,
                  height: 0,
                  borderTop: '15px solid transparent',
                  borderBottom: '15px solid transparent',
                  borderLeft: `20px solid ${colors.liberty}`,
                  animation:
                    isClient && isHovering ? 'pulse 1.5s infinite' : 'none'
                }}
              />
            </Box>
          </Box>

          {/* Archivo TXT con doblez en la esquina */}
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.5s ease',
              transform: isHovering ? 'translateX(80px)' : 'translateX(0)',
              opacity: isHovering ? 1 : 0
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 96,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <Box sx={{ flex: 1, p: 1 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    bgcolor: '#e0e0e0',
                    borderRadius: 4,
                    mb: 0.8
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    bgcolor: '#e0e0e0',
                    borderRadius: 4,
                    mb: 0.8
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    bgcolor: '#e0e0e0',
                    borderRadius: 4,
                    mb: 0.8
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    bgcolor: '#e0e0e0',
                    borderRadius: 4
                  }}
                />
              </Box>

              {/* Doblez de la esquina - simulando el icono de Windows */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  bgcolor: '#bbb', // Color del doblez
                  clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
                  transform: 'rotate(0deg)',
                  zIndex: 5
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(200,200,200,0.9) 100%)',
                  transform: 'rotate(0deg)',
                  zIndex: 6
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ mt: 1, color: '#666' }}>
              routes.txt
            </Typography>
          </Box>

          {/* Partículas de transformación - Enfoque simplificado */}
          {renderParticles &&
            particles.map((particle) => (
              <Box
                key={particle.id}
                sx={{
                  position: 'absolute',
                  width: particle.size,
                  height: particle.size,
                  borderRadius: '50%',
                  backgroundColor: colors.bleuDeFrance,
                  zIndex: 5,
                  opacity: 0,
                  transform: `translate(${particle.startX}px, ${particle.startY}px)`,
                  animation: `moveParticle${particle.id} ${particle.duration}s infinite ${particle.delay}s`,
                  '@keyframes moveParticle0': {
                    '0%': {
                      transform: `translate(${particles[0]?.startX || 0}px, ${particles[0]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[0]?.endX || 0}px, ${particles[0]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle1': {
                    '0%': {
                      transform: `translate(${particles[1]?.startX || 0}px, ${particles[1]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[1]?.endX || 0}px, ${particles[1]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle2': {
                    '0%': {
                      transform: `translate(${particles[2]?.startX || 0}px, ${particles[2]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[2]?.endX || 0}px, ${particles[2]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle3': {
                    '0%': {
                      transform: `translate(${particles[3]?.startX || 0}px, ${particles[3]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[3]?.endX || 0}px, ${particles[3]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle4': {
                    '0%': {
                      transform: `translate(${particles[4]?.startX || 0}px, ${particles[4]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[4]?.endX || 0}px, ${particles[4]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle5': {
                    '0%': {
                      transform: `translate(${particles[5]?.startX || 0}px, ${particles[5]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[5]?.endX || 0}px, ${particles[5]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle6': {
                    '0%': {
                      transform: `translate(${particles[6]?.startX || 0}px, ${particles[6]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[6]?.endX || 0}px, ${particles[6]?.endY || 0}px)`,
                      opacity: 0
                    }
                  },
                  '@keyframes moveParticle7': {
                    '0%': {
                      transform: `translate(${particles[7]?.startX || 0}px, ${particles[7]?.startY || 0}px)`,
                      opacity: 0
                    },
                    '50%': { opacity: 1 },
                    '100%': {
                      transform: `translate(${particles[7]?.endX || 0}px, ${particles[7]?.endY || 0}px)`,
                      opacity: 0
                    }
                  }
                }}
              />
            ))}
        </Box>

        {/* Texto informativo */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            width: '100%',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            transform: isHovering ? 'translateY(0)' : 'translateY(10px)',
            opacity: isHovering ? 1 : 0
          }}
        ></Box>
      </Box>

      {/* CSS global para animaciones */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: translateY(-50%) translateX(-10px);
          }
          50% {
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
    </Box>
  )
}

export default FileConversionAnimation
