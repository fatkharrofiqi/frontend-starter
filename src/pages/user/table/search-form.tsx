import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface SearchField {
  key: string
  label: string
  placeholder: string
}

interface SearchFormProps {
  fields: SearchField[]
  onSearch: (values: Record<string, string>) => void
  onClear: () => void
  initialValues?: Record<string, string>
}

export function SearchForm({ fields, onSearch, onClear, initialValues = {} }: SearchFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)

  const handleInputChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(values)
  }

  const handleClear = () => {
    setValues({})
    onClear()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="mb-6 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Search</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium mb-2 block">{field.label}</label>
            <Input
              placeholder={field.placeholder}
              value={values[field.key] || ""}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        ))}
        <div className="flex items-end gap-2">
          <Button onClick={handleSearch} className="flex-1">
            Search
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}