import { ChevronDown } from "lucide-react"
 
import { Button } from "./button"
 
export function ButtonIconDown({onClick}) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <ChevronDown className="h-4 w-4" />
    </Button>
  )
}