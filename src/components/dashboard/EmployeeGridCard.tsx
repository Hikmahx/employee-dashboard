'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import type { Employee } from '@/lib/types';

type EmployeeGridCardProps = {
  employee: Employee;
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onSaveEmployee: (employee: Employee) => void;
  isExpanded: boolean;
  isChecked: boolean;
  onEditClick: (employee: Employee) => void;
};

export function EmployeeGridCard({
  employee,
  onToggleExpand,
  onToggleCheck,
  onSaveEmployee,
  isExpanded,
  isChecked,
  onEditClick,
}: EmployeeGridCardProps) {
  return (
    <Card className='relative flex flex-col'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id={`employee-grid-${employee.id}`}
            checked={isChecked}
            onCheckedChange={() => onToggleCheck(employee.id)}
          />
          <CardTitle className='text-lg font-semibold text-teal-600'>
            {employee.name}
          </CardTitle>
        </div>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='bg-white'>
              <DropdownMenuItem onClick={() => onEditClick(employee)}>
                Edit
              </DropdownMenuItem>{' '}
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Removed expand/collapse button for grid view as editing is now via dialog */}
          {/* If you still want a separate expand/collapse for more details, you can re-add it */}
        </div>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='grid grid-cols-2 gap-2 text-sm text-gray-700'>
          <div>
            <span className='font-medium'>ID:</span> {employee.id.split('-')[1]}
          </div>
          <div>
            <span className='font-medium'>Position:</span> {employee.position}
          </div>
          <div>
            <span className='font-medium'>Experience:</span>{' '}
            {employee.experience}
          </div>
          <div>
            <span className='font-medium'>Team:</span> {employee.team}
          </div>
          <div>
            <span className='font-medium'>Bday:</span> {employee.bday}
          </div>
          <div>
            <span className='font-medium'>Email:</span> {employee.email}
          </div>
          <div>
            <span className='font-medium'>Mobile:</span> {employee.mobile}
          </div>
          <div className='col-span-2'>
            <span className='font-medium'>Address:</span> {employee.address}
          </div>
          <div className='col-span-2'>
            <span className='font-medium'>Status:</span> {employee.status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
