import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react"

export function DynamicBreadcrumb() {
  const router = useRouter()
  const { location } = useRouterState()

  // Get the current path and split it into segments
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "")

  // Create breadcrumb items based on path segments
  const breadcrumbItems = []

  // Always add home/dashboard as the first item using the environment variable
  breadcrumbItems.push({
    label: import.meta.env.VITE_APP_NAME || "Frontend Starter",
    path: "/dashboard",
    isActive: pathSegments.length === 0 || pathSegments[0] === "dashboard",
  })

  // Build the rest of the breadcrumb items
  let currentPath = ""

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Format the label (capitalize and replace hyphens with spaces)
    const label = segment
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    breadcrumbItems.push({
      label,
      path: currentPath,
      isActive: index === pathSegments.length - 1,
    })
  })

  // Handle navigation with router
  const handleNavigation = (path: string) => {
    router.navigate({ to: path })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.path}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isActive ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator
                className={index === 0 ? "hidden md:block" : ""}
              />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
