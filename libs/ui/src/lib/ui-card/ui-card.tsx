import { Box, Paper, PaperProps, Skeleton } from '@mantine/core'
import { useUiBreakpoints } from '../ui-theme'
import { ReactNode } from 'react'
import { UiCardTitle } from './ui-card-title'

interface UiCardProps extends PaperProps {
  children: ReactNode
  loading?: boolean
  title?: ReactNode
}

export function UiCard({ loading, title, ...props }: UiCardProps) {
  const { isSm } = useUiBreakpoints()

  return (
    <Paper p={isSm ? 'xs' : 'md'} withBorder {...props}>
      {title ? (
        <Box mb={isSm ? 'xs' : 'md'}>{typeof title === 'string' ? <UiCardTitle>{title}</UiCardTitle> : title}</Box>
      ) : null}
      {loading ? <Skeleton visible={loading}>{props.children}</Skeleton> : props.children}
    </Paper>
  )
}
