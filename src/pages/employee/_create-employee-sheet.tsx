import {actions} from "astro:actions"
import EmployeeForm from "./_form"
import {useOpenCreateEmployeeSheet} from "./_use-open-create-employee-sheet"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {toast} from "sonner"
import {useShouldUpdate} from "./_should_update_event"
import {useState} from "react"

export const CreateEmployeeSheet = () => {
  const {open, onClose} = useOpenCreateEmployeeSheet()
  const [isLoading, setIsLoading] = useState(false)
  const {onShouldUpdate} = useShouldUpdate()
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a employee record</SheetTitle>
          <SheetDescription>
            Fill in the information below to create a new employee.
          </SheetDescription>
        </SheetHeader>
        <EmployeeForm isLoading={isLoading} onSubmit={async (e) => {
          try {
            setIsLoading(true)
            const {error} = await actions.createEmployee(e)
            if (error) {
              throw error
            }
            toast.success("Employee created successfully")
            onShouldUpdate()
            onClose()
          } catch (e) {
            if (e instanceof Error) {
              toast.error(e.message)
            } else {
              toast.error("Failed to create employee")
            }
          } finally {
            setIsLoading(false)
          }
        }} />
      </SheetContent>
    </Sheet>
  )
}
