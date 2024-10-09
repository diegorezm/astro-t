import {useState, type FormEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import type {Employee, EmployeeDTO} from "@/models/employee";

type Props = {
  onSubmit: (e: EmployeeDTO) => void;
  defaultValues?: Employee;
};

const EmployeeForm = ({onSubmit, defaultValues}: Props) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [job, setJob] = useState(defaultValues?.job || "");
  const [company, setCompany] = useState(defaultValues?.company || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      job,
      company,
      image: "https://i.pravatar.cc/300",
    });
    setName("");
    setJob("");
    setCompany("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Job Title</Label>
        <Input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Company</Label>
        <Input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Employee</Button>
    </form>
  );
};

export default EmployeeForm;

