import { createFileRoute } from '@tanstack/react-router'
import UserFormPage from '@/pages/user/form'

export const Route = createFileRoute('/_auth/user/form')({ 
  component: UserFormPage
})
