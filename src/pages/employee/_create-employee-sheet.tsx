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

export const CreateEmployeeSheet = () => {
  const {open, onClose} = useOpenCreateEmployeeSheet()
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a employee record</SheetTitle>
          <SheetDescription>
            Fill in the information below to create a new employee.
          </SheetDescription>
        </SheetHeader>
        <EmployeeForm onSubmit={async (e) => {
          const {error} = await actions.createEmployee(e)
          if (error) {
            toast.error(error.message ?? "Failed to create employee")
            return
          }
          toast.success("Employee created successfully")
          setTimeout(() => location.reload(), 1000)
          onClose()
        }} />
      </SheetContent>
    </Sheet>
  )
}
