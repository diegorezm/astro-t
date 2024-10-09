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

export const UpdateEmployeeSheet = () => {
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
        <EmployeeForm defaultValues={employee!} onSubmit={async (e) => {
          if (!employee) {
            toast.error("Employee not found")
            return
          }
          const {error} = await actions.updateEmployee({
            id: employee.id,
            ...e
          })
          if (error) {
            toast.error(error.message ?? "Failed to update employee")
            return
          }
          toast.success("Employee updated successfully")
          setTimeout(() => location.reload(), 1000)
          onClose()
        }} />
      </SheetContent>
    </Sheet>
  )
}
