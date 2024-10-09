import {defineAction} from 'astro:actions';
import {z} from 'astro:schema';
import type {Employee} from '@/models/employee';

const apiUrl = import.meta.env.API_URL as string;

export const server = {
  getEmployees: defineAction({
    handler: async () => {
      const response = await fetch(`${apiUrl}/employees`);
      const employees: Employee[] = await response.json();
      return employees;
    }
  }),

  getEmployee: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees/${input.id}`);
      const employee: Employee = await response.json();
      return employee;
    }
  }),

  createEmployee: defineAction({
    input: z.object({
      name: z.string(),
      image: z.string(),
      company: z.string(),
      job: z.string(),
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const employee: Employee = await response.json();
      return employee;
    }
  }),

  updateEmployee: defineAction({
    input: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      company: z.string(),
      job: z.string(),
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees/${input.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const employee: Employee = await response.json();
      return employee;
    }
  }),

  deleteEmployee: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      await fetch(`${apiUrl}/employees/${input.id}`, {
        method: 'DELETE',
      });
      return {success: true};
    }
  })
};

