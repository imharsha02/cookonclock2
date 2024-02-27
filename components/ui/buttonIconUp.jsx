import { ChevronUp } from "lucide-react"
 
import { Button } from "./button"
 
export function ButtonIconUp({onClick}) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <ChevronUp className="h-4 w-4" />
    </Button>
  )
}