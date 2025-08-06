import { z } from 'zod'

export const EmployeeSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z
    .string()
    .min(1)
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      "Please enter both first and last name (e.g. 'John Doe')"
    ),
  surname: z.string().min(1),
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
  mobile: z.string().min(1, 'Mobile number is required'),
  address: z.string().min(1, 'Address is required'),
  status: z.string().min(1, 'Status is required'),
  checked: z.boolean(),
  expanded: z.boolean(),
})

// Schema for adding employees (omits auto-generated fields)
export const AddEmployeeSchema = EmployeeSchema.omit({
  id: true,
  checked: true,
  expanded: true,
}).transform((data) => ({
  ...data,
  // No transformation needed since we'll handle name/surname in the form
}))

export type Employee = z.infer<typeof EmployeeSchema>
export type AddEmployeeFormValues = z.infer<typeof AddEmployeeSchema>
