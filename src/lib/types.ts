import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  position: z.string().min(1, 'Position is required'),
  experience: z.string().min(1, 'Experience is required'),
  team: z.number().min(1, 'Team must be a positive number'),
  bday: z
    .string()
    .min(1, 'Birthday is required')
    .regex(
      /^\w{3} \d{1,2}, \d{4}$/,
      'Invalid date format (e.g., Aug 15, 1986)'
    ),
  email: z.string().email('Invalid email address'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(
      /^\+\d{1,3}$$\d{2,3}$$-\d{3}-\d{2}-\d{2}$/,
      'Invalid mobile format (e.g., +375(29)-298-44-44)'
    ), 
  address: z.string().min(1, 'Address is required'),
  status: z.string().min(1, 'Status is required'),
  checked: z.boolean(),
  expanded: z.boolean(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
