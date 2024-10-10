import type {Employee} from "@/models/employee";
import {actions} from "astro:actions";
import {useEffect, useState} from "react";
import EmployeeCard from "./_card";
import {useShouldUpdate} from "./_should_update_event";
import {toast} from "sonner";
import {ActionError} from "astro:actions";
import LoadingSpinner from "@/components/loading-spinner";

export const EmployeeList = () => {
  const {shouldUpdate, onShouldUpdateReset} = useShouldUpdate()
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const setup = async () => {
    try {
      setIsLoading(true)
      const {data, error} = await actions.getEmployees()
      if (error) {
        throw error
      } else {
        setEmployee(data)
      }
    } catch (e) {
      if (e instanceof ActionError) {
        toast.error(e.message)
      } else {
        toast.error("Failed to fetch employees")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setup()
  }, [])

  useEffect(() => {
    if (shouldUpdate) {
      setup()
      onShouldUpdateReset()
    }
  }, [shouldUpdate])

  if (isLoading) {
    return <LoadingSpinner />
  }

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
