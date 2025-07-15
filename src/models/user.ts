export interface Permission {
  name: string
}

export interface Role {
  name: string
  permissions: string[]
}

export interface User {
  uuid: string
  name: string
  email: string
  created_at: number
  updated_at: number
  roles: Role[]
  permissions: string[]
}

export interface UserResponse {
  data: User
}

// Dummy data for testing
export const dummyUsers: User[] = [
  {
    uuid: "abc48905-8fed-4bd5-bac3-4a6657a27b46",
    name: "Test",
    email: "test@test.com",
    created_at: 1751980098,
    updated_at: 1751980098,
    roles: [
      {
        name: "admin",
        permissions: [
          "read-permission",
          "write-permission",
          "delete-permission",
          "update-permission",
          "read-role",
          "write-role",
          "delete-role",
          "update-role"
        ]
      },
      {
        name: "user",
        permissions: [
          "read-user",
          "write-user",
          "delete-user",
          "update-user"
        ]
      }
    ],
    permissions: [
      "read-user",
      "read-other",
      "delete-permission",
      "read-role",
      "write-role",
      "update-role",
      "write-user",
      "delete-user",
      "update-user",
      "read-permission",
      "write-permission",
      "update-permission",
      "delete-role"
    ]
  },
  // Add more dummy users here
]