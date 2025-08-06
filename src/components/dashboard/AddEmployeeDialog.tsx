'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import { format } from 'date-fns'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import type { Employee } from '@/lib/types'
import { EmployeeSchema } from '@/lib/types'

const AddEmployeeFormSchema = EmployeeSchema.omit({
  id: true,
  checked: true,
  expanded: true,
})

type AddEmployeeFormValues = z.infer<typeof AddEmployeeFormSchema>

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
    resolver: zodResolver(AddEmployeeFormSchema),
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
  })

  const onSubmit = (values: AddEmployeeFormValues) => {
    onAddEmployee(values)
    form.reset()
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>Name</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.name && 'border-red-500'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='surname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Surname
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.surname && 'border-red-500'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Position
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-9',
                          form.formState.errors.position && 'border-red-500'
                        )}
                      >
                        <SelectValue placeholder='Select position' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-white'>
                      {availablePositions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Experience
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-9',
                          form.formState.errors.experience && 'border-red-500'
                        )}
                      >
                        <SelectValue placeholder='Select experience' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-white'>
                      <SelectItem value='0 years'>0 years</SelectItem>
                      <SelectItem value='1 year'>1 year</SelectItem>
                      <SelectItem value='3 years'>3 years</SelectItem>
                      <SelectItem value='5 years'>5 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='team'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>Team</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.team && 'border-red-500'
                      )}
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bday'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-xs text-gray-500'>Bday</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'h-9 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                            form.formState.errors.bday && 'border-red-500'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'MMM dd, yyyy')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(
                            date ? format(date, 'MMM dd, yyyy') : ''
                          )
                        }
                        initialFocus
                        captionLayout='dropdown'
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.email && 'border-red-500'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Mobile
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.mobile && 'border-red-500'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'h-9',
                        form.formState.errors.address && 'border-red-500'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-500'>
                    Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-9',
                          form.formState.errors.status && 'border-red-500'
                        )}
                      >
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-white'>
                      <SelectItem value='Full-time'>Full-time</SelectItem>
                      <SelectItem value='Part-time'>Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
            <DialogFooter className='col-span-full'>
              <Button variant='outline' onClick={onClose} type='button'>
                Cancel
              </Button>
              <Button
                className='bg-teal-500 hover:bg-teal-600 text-white'
                type='submit'
              >
                Add Employee
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
