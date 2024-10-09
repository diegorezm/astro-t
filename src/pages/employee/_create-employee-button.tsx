import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useOpenCreateEmployeeSheet} from "./_use-open-create-employee-sheet";

export const CreateEmployeeButton = () => {
  const {onOpen} = useOpenCreateEmployeeSheet();

  return (
    <Button onClick={onOpen}>
      New Employee
      <Plus className="ml-2 size-4" />
    </Button>
  );
};

