'use client'

import { useForm, FormProvider } from 'react-hook-form' // Import FormProvider
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import type { Employee } from '@/lib/types'
import { EmployeeSchema } from '@/lib/types'
import { EmployeeFields } from './EmployeeFields'

type EmployeeEditFormProps = {
  employee: Employee
  onSave: (employee: Employee) => void
  availablePositions: string[]
}

export function EmployeeForm({
  employee,
  onSave,
  availablePositions,
}: EmployeeEditFormProps) {
  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: employee,
  })

  const onSubmit = (values: Employee) => {
    onSave({
      ...values,
      expanded: false, 
    })
  }

  return (
    <FormProvider {...form}>
      {' '}
      {/* Wrap with FormProvider */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'
      >
        <EmployeeFields availablePositions={availablePositions} />
        <div className='col-span-full flex justify-end'>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className='bg-teal-500 hover:bg-teal-600 text-white'
            type='submit'
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
