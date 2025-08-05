'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
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
    onSave(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'
      >
        <FormField
          control={form.control}
          name='surname'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-500'>Surname</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
              <FormLabel className='text-xs text-gray-500'>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8',
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
          name='team'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-500'>Team</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-500'>Name</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
          name='experience'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-500'>
                Experience
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8',
                      form.formState.errors.experience && 'border-red-500'
                    )}
                  >
                    <SelectValue placeholder='Select experience' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
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
                        'h-8 pl-3 text-left font-normal',
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
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date ? format(date, 'MMM dd, yyyy') : '')
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
              <FormLabel className='text-xs text-gray-500'>E-mail</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
              <FormLabel className='text-xs text-gray-500'>Mobile</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
              <FormLabel className='text-xs text-gray-500'>Address</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'h-8',
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
              <FormLabel className='text-xs text-gray-500'>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8',
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
    </Form>
  )
}
