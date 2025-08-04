import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/lib/types';
import { Filters } from './Filters';
import { EmployeeRow } from './EmployeeRow';

type EmployeeTableProps = {
  employees: Employee[];
  onToggleExpand: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onSaveEmployee: (employee: Employee) => void;
};

export function EmployeeTable({
  employees,
  onToggleExpand,
  onToggleCheck,
  onSaveEmployee,
}: EmployeeTableProps) {
  return (
    <div className='rounded-lg border border-gray-50bg-white shadow-sm max-h-[75vh] overflow-scroll'>
      <Table>
        <TableHeader>
          <TableRow className='bg-gray-50'>
            <TableHead className='w-[50px]'>
              <Checkbox id='select-all' />
            </TableHead>
            <TableHead className='min-w-[150px]'>
              <div className='flex items-center gap-1'>
                Name/ID
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[150px]'>
              <div className='flex items-center gap-1'>
                Position
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[100px]'>
              <div className='flex items-center gap-1'>
                Team
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[150px]'>
              <div className='flex items-center gap-1'>
                Bday
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[200px]'>
              <div className='flex items-center gap-1'>
                E-mail / Mobile
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[200px]'>
              <div className='flex items-center gap-1'>
                Address
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='min-w-[100px]'>
              <div className='flex items-center gap-1'>
                Status
                <ArrowUpDown className='h-4 w-4 text-gray-400' />
              </div>
            </TableHead>
            <TableHead className='w-[80px]' />
          </TableRow>
        </TableHeader>
        <TableBody>
          <Filters />
          {employees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onToggleExpand={onToggleExpand}
              onToggleCheck={onToggleCheck}
              onSaveEmployee={onSaveEmployee}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
