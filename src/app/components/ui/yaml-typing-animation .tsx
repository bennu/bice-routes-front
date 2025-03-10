'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Typography, alpha } from '@mui/material'
import { colors } from '@/app/theme/theme'

const YamlTypingAnimation = () => {
  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ejemplo de contenido YAML para animar
  const yamlContent = `openapi: 3.0.0
info:
  title: Sample API
  description: Lorem ipsum dolor sit amet
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
    description: Production server
paths:
  /users:
    get:
      summary: Returns a list of users
      responses:
        '200':
          description: Successfully retrieved users
    post:
      summary: Creates a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /users/{id}:
    get:
      summary: Returns a single user
      parameters:
        - name: id
          in: path
          required: true
      responses:
        '200':
          description: Success
        '404':
          description: User not found`

  useEffect(() => {
    if (currentIndex < yamlContent.length) {
      // Ajusta la velocidad del tipeo aquí (ms)
      const speed = Math.random() * 20 + 10 // Entre 10ms y 30ms para un efecto más natural

      const timer = setTimeout(() => {
        setText(yamlContent.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)

        // Scroll automático para seguir el texto
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      }, speed)

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)

      // Reiniciar la animación después de una pausa
      const resetTimer = setTimeout(() => {
        setText('')
        setCurrentIndex(0)
        setIsComplete(false)
      }, 5000) // 5 segundos de pausa cuando termina

      return () => clearTimeout(resetTimer)
    }
  }, [currentIndex, isComplete])

  // Determinar si mostrar el cursor
  const showCursor = !isComplete

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // Fondo con un sutil patrón de puntos para el efecto de profundidad
        backgroundImage: `
          radial-gradient(${alpha(colors.bleuDeFrance, 0.2)} 1px, transparent 1px), 
          radial-gradient(${alpha(colors.liberty, 0.15)} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      {/* Contenedor principal con efecto glassmorphism */}
      <Box
        sx={{
          width: '90%',
          height: '85%',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          // Efectos de glassmorphism
          backgroundColor: alpha('#ffffff', 0.15),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // Para Safari
          boxShadow: `
            0 8px 32px 0 ${alpha(colors.liberty, 0.15)},
            inset 0 0 0 1px ${alpha('#ffffff', 0.08)}
          `,
          border: `1px solid ${alpha('#ffffff', 0.15)}`,
          // Reflejo en la parte superior
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20%',
            background: `linear-gradient(to bottom, ${alpha('#ffffff', 0.15)}, transparent)`,
            zIndex: 1,
            pointerEvents: 'none'
          }
        }}
      >
        {/* Barra de título del editor */}
        <Box
          sx={{
            height: 36,
            background: `linear-gradient(to right, ${colors.liberty}, ${colors.bleuDeFrance})`,
            display: 'flex',
            alignItems: 'center',
            px: 3,
            borderBottom: `1px solid ${alpha(colors.liberty, 0.2)}`
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}
          >
            api-definition.yml
          </Typography>

          {/* Círculos de control de ventana */}
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: '#FF5F56',
                boxShadow: `0 0 0 1px ${alpha('#000', 0.1)}`
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: '#FFBD2E',
                boxShadow: `0 0 0 1px ${alpha('#000', 0.1)}`
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: '#27C93F',
                boxShadow: `0 0 0 1px ${alpha('#000', 0.1)}`
              }}
            />
          </Box>
        </Box>

        {/* Contenedor del código con scroll */}
        <Box
          ref={containerRef}
          sx={{
            p: 3,
            height: 'calc(100% - 36px)',
            overflow: 'auto',
            fontFamily:
              '"Fira Code", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.85rem',
            fontWeight: 500,
            lineHeight: 1.7,
            color: '#111',
            whiteSpace: 'pre',
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(colors.liberty, 0.3),
              borderRadius: '4px'
            }
          }}
        >
          {/* Contenido YAML con colores de sintaxis */}
          {text.split('\n').map((line, index) => (
            <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {colorizeYaml(line)}
            </Box>
          ))}

          {/* Cursor parpadeante */}
          {showCursor && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '0.6em',
                height: '1.2em',
                backgroundColor: colors.bleuDeFrance,
                animation: 'blink 1s step-end infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 }
                }
              }}
            />
          )}
        </Box>
      </Box>

      {/* Elementos decorativos alrededor para dar profundidad */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: `linear-gradient(145deg, ${alpha(colors.bleuDeFrance, 0.8)}, ${alpha(colors.liberty, 0.8)})`,
          filter: 'blur(20px)',
          opacity: 0.6,
          zIndex: -1
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: `linear-gradient(145deg, ${alpha(colors.thistle, 0.8)}, ${alpha(colors.platinum, 0.8)})`,
          filter: 'blur(25px)',
          opacity: 0.5,
          zIndex: -1
        }}
      />
    </Box>
  )
}

// Función para dar color a la sintaxis YAML
const colorizeYaml = (line: string) => {
  // Detectar líneas de comentarios
  if (line.trim().startsWith('#')) {
    return (
      <Typography component="span" sx={{ color: '#6A9955', whiteSpace: 'pre' }}>
        {line}
      </Typography>
    )
  }

  // Detectar claves y valores
  if (line.includes(':')) {
    const parts = line.split(':')
    const key = parts[0]
    const value = parts.slice(1).join(':') // Unir el resto si hay más ":" en el valor

    return (
      <>
        <Typography
          component="span"
          sx={{
            color: colors.bleuDeFrance,
            whiteSpace: 'pre',
            fontWeight: 'bold'
          }}
        >
          {key}
        </Typography>
        <Typography component="span" sx={{ color: '#333', whiteSpace: 'pre' }}>
          :
        </Typography>
        {value && (
          <Typography
            component="span"
            sx={{ color: colors.liberty, whiteSpace: 'pre' }}
          >
            {value}
          </Typography>
        )}
      </>
    )
  }

  // Detectar indentación y guiones
  if (line.trim().startsWith('-')) {
    const indent = line.substring(0, line.indexOf('-'))
    const rest = line.substring(line.indexOf('-') + 1)

    return (
      <>
        <Typography component="span" sx={{ whiteSpace: 'pre' }}>
          {indent}
        </Typography>
        <Typography
          component="span"
          sx={{ color: colors.thistle, whiteSpace: 'pre', fontWeight: 'bold' }}
        >
          -
        </Typography>
        <Typography
          component="span"
          sx={{ color: colors.liberty, whiteSpace: 'pre' }}
        >
          {rest}
        </Typography>
      </>
    )
  }

  // Línea normal
  return (
    <Typography component="span" sx={{ whiteSpace: 'pre', color: '#333' }}>
      {line}
    </Typography>
  )
}

export default YamlTypingAnimation
