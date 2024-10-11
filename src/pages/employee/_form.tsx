import {useState, type FormEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import type {Employee, EmployeeDTO} from "@/models/employee";

type Props = {
  onSubmit: (e: EmployeeDTO) => void;
  defaultValues?: Employee;
  isLoading?: boolean;
};

const EmployeeForm = ({onSubmit, defaultValues, isLoading = false}: Props) => {
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
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="job-title">Job Title</Label>
        <Input
          id="job-title"
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default EmployeeForm;

