'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns'; // Import format from date-fns

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react'; // Changed to CalendarIcon
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'; // Import Popover components
import { Calendar } from '@/components/ui/calendar'; // Import Calendar component
import { cn } from '@/lib/utils'; // Import cn for conditional class names
import type { Employee } from '@/lib/types';
import { EmployeeSchema } from '@/lib/types'; // Import the Zod schema

type EmployeeEditFormProps = {
  employee: Employee;
  onSave: (employee: Employee) => void;
};

export function EmployeeForm({ employee, onSave }: EmployeeEditFormProps) {
  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema), // Use zodResolver
    defaultValues: employee, // Initialize form with the current employee data
  });

  const onSubmit = (values: Employee) => {
    onSave(values);
  };

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
                <Input className='h-8' {...field} />
              </FormControl>
              <FormMessage />
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
                  <SelectTrigger className='h-8'>
                    <SelectValue placeholder='Select position' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
                  <SelectItem value='Designer'>Designer</SelectItem>
                  <SelectItem value='Product manager'>
                    Product manager
                  </SelectItem>
                  <SelectItem value='Engineer'>Engineer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
                  className='h-8'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)} // Correctly handle number input
                />
              </FormControl>
              <FormMessage />
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
                <Input className='h-8' {...field} />
              </FormControl>
              <FormMessage />
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
                  <SelectTrigger className='h-8'>
                    <SelectValue placeholder='Select experience' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
                  <SelectItem value='1 year'>1 year</SelectItem>
                  <SelectItem value='3 years'>3 years</SelectItem>
                  <SelectItem value='5 years'>5 years</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
                        !field.value && 'text-muted-foreground'
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
              <FormMessage />
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
                <Input className='h-8' {...field} />
              </FormControl>
              <FormMessage />
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
                <Input className='h-8' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-500'>Address</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-8'>
                    <SelectValue placeholder='Select address' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
                  <SelectItem value='Minsk, Pobeditelay, 135'>
                    Minsk, Pobeditelay, 135
                  </SelectItem>
                  <SelectItem value='Minsk, Derzinskogo, 47'>
                    Minsk, Derzinskogo, 47
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
                  <SelectTrigger className='h-8'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
                  <SelectItem value='Full-time'>Full-time</SelectItem>
                  <SelectItem value='Part-time'>Part-time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
  );
}
