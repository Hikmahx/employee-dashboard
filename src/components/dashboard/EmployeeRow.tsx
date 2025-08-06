'use client'

import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, ChevronDown, ChevronUp } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { EmployeeForm } from './EmployeeForm'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

type EmployeeRowProps = {
  employee: Employee
  onToggleExpand: (id: string) => void
  onToggleCheck: (id: string) => void
  onSaveEmployee: (employee: Employee) => void
  onDeleteEmployee: (id: string) => void
  onEditEmployee: (employee: Employee) => void
  availablePositions: string[]
}

export function EmployeeRow({
  employee,
  onToggleExpand,
  onToggleCheck,
  onSaveEmployee,
  onDeleteEmployee,
  onEditEmployee,
  availablePositions,
}: EmployeeRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <TableRow className={employee.expanded ? 'bg-gray-50' : 'bg-white'}>
        <TableCell className='w-[50px]'>
          <Checkbox
            id={`employee-${employee.id}`}
            checked={employee.checked}
            onCheckedChange={() => onToggleCheck(employee.id)}
          />
        </TableCell>
        <TableCell className='font-medium'>
          <div className='text-black font-medium'>{employee.name}</div>
          <div className='text-sm text-gray-500'>{employee.id}</div>
        </TableCell>
        <TableCell className=''>
          <div>{employee.position}</div>
          <div className='text-sm text-gray-500'>{employee.experience}</div>
        </TableCell>
        <TableCell>
          <div className='mb-4'>{employee.team}</div>
        </TableCell>
        <TableCell>
          <div className='mb-4'>{employee.bday}</div>
        </TableCell>
        <TableCell className=''>
          <div className='text-gray-700 font-medium'>{employee.email}</div>
          <div className='text-sm text-gray-500'>{employee.mobile}</div>
        </TableCell>
        <TableCell>
          <div className='mb-4'>{employee.address}</div>
        </TableCell>
        <TableCell>
          <div className='mb-4'>{employee.status}</div>
        </TableCell>
        <TableCell className='text-right'>
          <div className='flex items-center justify-end gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreVertical className='h-4 w-4' />
                  <span className='sr-only'>Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='bg-white cursor-pointer'
              >
                <DropdownMenuItem onClick={() => onEditEmployee(employee)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onToggleExpand(employee.id)}
            >
              {employee.expanded ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
              <span className='sr-only'>Toggle expand</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {employee.expanded && (
        <TableRow className='bg-teal-50/20'>
          <TableCell colSpan={9} className='py-0 pl-12 pr-4'>
            <EmployeeForm
              employee={employee}
              onSave={onSaveEmployee}
              availablePositions={availablePositions}
            />
          </TableCell>
        </TableRow>
      )}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              {employee.name}&apos;s data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteEmployee(employee.id)}
              className='bg-red-500 text-white hover:bg-red-800'
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
