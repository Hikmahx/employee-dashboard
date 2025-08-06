'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Employee } from '@/lib/types'
import { AddEmployeeSchema } from '@/lib/types'
import { EmployeeFields } from './EmployeeFields'

type AddEmployeeFormValues = z.infer<typeof AddEmployeeSchema>

type AddEmployeeDialogProps = {
  isOpen: boolean
  onClose: () => void
  onAddEmployee: (
    employee: Omit<Employee, 'id' | 'checked' | 'expanded'>
  ) => void
  availablePositions: string[]
}

export function AddEmployeeDialog({
  isOpen,
  onClose,
  onAddEmployee,
  availablePositions,
}: AddEmployeeDialogProps) {
  const form = useForm<AddEmployeeFormValues>({
    resolver: zodResolver(AddEmployeeSchema),
    defaultValues: {
      name: '',
      surname: '',
      position: '',
      experience: '',
      team: 0,
      bday: '',
      email: '',
      mobile: '',
      address: '',
      status: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = (values: AddEmployeeFormValues) => {
    try {
      form.trigger().then((isValid) => {
        if (isValid) {
          onAddEmployee({
            ...values,
            surname: values.name.trim().split(/\s+/).slice(1).join(' ') || '',
          })
          form.reset()
          onClose()
        }
      })
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] bg-white'>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Fill in the details for the new employee.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <EmployeeFields availablePositions={availablePositions} />
            <DialogFooter className='col-span-full'>
              <Button variant='outline' onClick={onClose} type='button'>
                Cancel
              </Button>
              <Button
                className='bg-teal-500 hover:bg-teal-600 text-white'
                type='submit'
                disabled={
                  form.formState.isSubmitting
                }
              >
                Add Employee
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
