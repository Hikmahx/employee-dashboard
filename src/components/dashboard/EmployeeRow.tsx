'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { EmployeeForm } from './EmployeeForm';

type EmployeeRowProps = {
  employee: Employee;
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onSaveEmployee: (employee: Employee) => void;
  isExpanded: boolean;
  isChecked: boolean;
};

export function EmployeeRow({
  employee,
  onToggleExpand,
  onToggleCheck,
  onSaveEmployee,
  isExpanded,
  isChecked,
}: EmployeeRowProps) {
  return (
    <>
      <TableRow className={isExpanded ? 'bg-teal-50/50' : ''}>
        <TableCell className='w-[50px]'>
          <Checkbox
            id={`employee-${employee.id}`}
            checked={isChecked}
            onCheckedChange={() => onToggleCheck(employee.id)}
          />
        </TableCell>
        <TableCell className='font-medium'>
          <div className='text-teal-600'>{employee.name}</div>
          <div className='text-sm text-gray-500'>
            {employee.id.split('-')[1]}
          </div>
        </TableCell>
        <TableCell>
          <div>{employee.position}</div>
          <div className='text-sm text-gray-500'>{employee.experience}</div>
        </TableCell>
        <TableCell>{employee.team}</TableCell>
        <TableCell>{employee.bday}</TableCell>
        <TableCell>
          <div className='text-teal-600'>{employee.email}</div>
          <div className='text-sm text-gray-500'>{employee.mobile}</div>
        </TableCell>
        <TableCell>{employee.address}</TableCell>
        <TableCell>{employee.status}</TableCell>
        <TableCell className='text-right'>
          <div className='flex items-center justify-end gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreVertical className='h-4 w-4' />
                  <span className='sr-only'>Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='bg-white'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onToggleExpand(employee.id)}
            >
              {isExpanded ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
              <span className='sr-only'>Toggle expand</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className='bg-teal-50/50'>
          <TableCell colSpan={9} className='py-0 pl-12 pr-4'>
            <EmployeeForm employee={employee} onSave={onSaveEmployee} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
