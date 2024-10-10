import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import type {Employee} from "@/models/employee";
import {useOpenUpdateEmployeeSheet} from "./_use-open-update-employee-sheet";
import {actions} from "astro:actions";
import {toast} from "sonner";
import {useShouldUpdate} from "./_should_update_event";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({employee}) => {
  const {onOpen} = useOpenUpdateEmployeeSheet()
  const {onShouldUpdate} = useShouldUpdate()
  const onEdit = (employee: Employee) => {
    onOpen(employee)
  }

  const onDelete = async (id: string) => {
    const {error} = await actions.deleteEmployee({id})
    if (error) {
      toast.error(error.message ?? "Failed to delete employee")
    }
    toast.success("Employee deleted successfully!")
    onShouldUpdate();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{employee.name}</CardTitle>
        <p className="text-sm text-secondary-foreground">{formatDate(employee.createdAt)}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <img src={employee.image} alt={employee.name} className="w-24 h-24 rounded-full mb-4" />
        <p className="text-sm font-medium">{employee.company}</p>
        <p className="text-sm text-secondary-foreground">{employee.job}</p>
        <div className="mt-4 flex space-x-2 w-full">
          <Button onClick={() => onEdit(employee)} className="w-full lg:w-1/2">Edit</Button>
          <Button variant="destructive" onClick={() => onDelete(employee.id)} className="w-full lg:w-1/2">Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;

