import type { User, UserSearchParams } from "@/dto/user"
import UserService from "@/services/user-service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useUserAction() {
  const queryClient = useQueryClient()

  // Query to get all users with search and pagination
  const getUsers = (params?: UserSearchParams) =>
    useQuery({
      queryKey: ["users", params],
      queryFn: async () => {
        const response = await UserService.getUsers(params)
        return response
      },
    })

  // Query to get a single user
  const getUser = (uuid: string) =>
    useQuery({
      queryKey: ["user", uuid],
      queryFn: async () => {
        const response = await UserService.getUser(uuid)
        return response.data.data
      },
      enabled: !!uuid,
    })

  // Mutation to create a user
  const createUser = useMutation({
    mutationFn: async (
      userData: Omit<User, "uuid" | "created_at" | "updated_at">,
    ) => {
      return await UserService.createUser(userData)
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  // Mutation to update a user
  const updateUser = useMutation({
    mutationFn: async ({
      uuid,
      userData,
    }: {
      uuid: string
      userData: Partial<Omit<User, "uuid" | "created_at" | "updated_at">>
    }) => {
      return await UserService.updateUser(uuid, userData)
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch users list and specific user
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user", variables.uuid] })
    },
  })

  // Mutation to delete a user
  const deleteUser = useMutation({
    mutationFn: async (uuid: string) => {
      return await UserService.deleteUser(uuid)
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}
