import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserAction } from "@/hooks/actions/user-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const updateUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type UpdateUserForm = z.infer<typeof updateUserSchema>

interface UpdateUserFormProps {
  uuid: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function UpdateUserForm({ uuid, onSuccess, onCancel }: UpdateUserFormProps) {
  const { updateUser, getUser } = useUserAction()
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { data: user } = getUser(uuid)
  
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })
  
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      })
    }
  }, [user, form])

  const onSubmit = async (data: UpdateUserForm) => {
    try {
      await updateUser.mutateAsync({
        uuid,
        userData: data,
      })
      setIsSuccess(true)
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        }
      }, 1500) // Show success message for 1.5 seconds before closing
    } catch (error) {
      form.setError("root", {
        message: "Failed to update user",
      })
    }
  }

  return (
    <div className="py-4">
      {isSuccess && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md">
          User updated successfully!
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <div className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={updateUser.isPending || isSuccess}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={updateUser.isPending || isSuccess}
            >
              {updateUser.isPending ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}