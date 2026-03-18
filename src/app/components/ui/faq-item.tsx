// Componente para elementos individuales de FAQ

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  alpha
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { colors } from '../../theme/theme'

interface FaqItemProps {
  question: string
  answer: string
  lastItem?: boolean
}

const FaqItem = ({ question, answer, lastItem = false }: FaqItemProps) => {
  return (
    <Accordion
      sx={{
        mb: lastItem ? 0 : 2,
        boxShadow: 'none',
        border: `1px solid ${alpha(colors.bleuDeFrance, 0.1)}`,
        borderRadius: '12px !important',
        '&:before': {
          display: 'none'
        }
      }}
    >
      <AccordionSummary expandIcon={<AddIcon />}>
        <Typography variant="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default FaqItem
