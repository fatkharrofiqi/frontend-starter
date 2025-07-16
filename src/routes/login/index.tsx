import LoginPage from "@/pages/login"
import { createFileRoute, redirect } from "@tanstack/react-router"
import z from "zod"

const loginSearchSchema = z.object({
  from: z.string().optional(),
})

export const Route = createFileRoute("/login/")({
  component: LoginPage,
  validateSearch: (search) => loginSearchSchema.parse(search),
  beforeLoad: ({ context: { auth }, search }) => {
    if (auth.isAuthenticated && !auth.isInitialLoading) {
      throw redirect({
        to: search.from || "/dashboard",
      })
    }
  },
})
