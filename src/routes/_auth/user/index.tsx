import { createFileRoute } from '@tanstack/react-router'
import UserPage from '@/pages/user'

export const Route = createFileRoute('/_auth/user/')({ 
  component: UserPage
})
