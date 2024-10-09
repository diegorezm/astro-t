import type {Employee} from "@/models/employee";
import {actions} from "astro:actions";
import {useEffect, useState} from "react";
import EmployeeCard from "./_card";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const setup = async () => {
    const {data, error} = await actions.getEmployees()
    if (error) {
      console.log(error)
      alert(error)
    } else {
      setEmployee(data)
    }
  }
  useEffect(() => {
    setup()
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {employee.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
        />
      ))}
    </div>
  )
}
