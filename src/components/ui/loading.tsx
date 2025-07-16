import React from "react"

interface LoadingProps {
  fullScreen?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loading({ fullScreen = true, size = "md", className = "" }: LoadingProps) {
  // Size mappings
  const sizeClasses = {
    sm: "h-6 w-6 border-t-1 border-b-1",
    md: "h-12 w-12 border-t-2 border-b-2",
    lg: "h-16 w-16 border-t-3 border-b-3",
  }

  // Container classes
  const containerClasses = fullScreen
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center p-4"

  return (
    <div className={containerClasses}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} border-primary ${className}`} 
      />
    </div>
  )
}