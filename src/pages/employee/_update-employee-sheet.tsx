import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {useOpenUpdateEmployeeSheet} from "./_use-open-update-employee-sheet"
import EmployeeForm from "./_form"
import {actions} from "astro:actions"
import {toast} from "sonner"
import {useShouldUpdate} from "./_should_update_event"
import {useState} from "react"

export const UpdateEmployeeSheet = () => {
  const {onShouldUpdate} = useShouldUpdate()
  const [isLoading, setIsLoading] = useState(false)
  const {open, onClose, employee} = useOpenUpdateEmployeeSheet()
  if (open && !employee) {
    toast.error("Employee not found")
    onClose()
  }
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update a employee record</SheetTitle>
          <SheetDescription>
            Fill in the information below to update employee record.
          </SheetDescription>
        </SheetHeader>
        <EmployeeForm isLoading={isLoading} defaultValues={employee!} onSubmit={async (e) => {
          try {
            setIsLoading(true)
            const {error} = await actions.updateEmployee({
              id: employee!.id,
              ...e
            })
            if (error) {
              throw error
            }
            toast.success("Employee updated successfully")
            onShouldUpdate()
            onClose()
          } catch (e) {
            if (e instanceof Error) {
              toast.error(e.message)
            } else {
              toast.error("Failed to update employee")
            }
          } finally {
            setIsLoading(false)
          }
        }} />
      </SheetContent>
    </Sheet>
  )
}
