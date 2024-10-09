export interface Employee {
  id: string;
  name: string;
  image: string;
  company: string;
  job: string;
  createdAt: string;
}


export interface EmployeeDTO extends Omit<Employee, "id" | "createdAt"> {}
