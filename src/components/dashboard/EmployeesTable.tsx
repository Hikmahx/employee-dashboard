'use client'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import type { Employee } from '@/lib/types'
import { Filters } from './Filters'
import { EmployeeRow } from './EmployeeRow'

type SortConfig = {
  key: keyof Employee | null
  direction: 'asc' | 'desc'
}

type ColumnFilters = {
  nameId: string
  position: string
  team: string
  bday: string
  emailMobile: string
  address: string
  status: string
}

type EmployeeTableProps = {
  employees: Employee[]
  onToggleExpand: (id: string) => void
  onToggleCheck: (id: string) => void
  onSaveEmployee: (employee: Employee) => void
  columnFilters: ColumnFilters
  onColumnFilterChange: (key: keyof ColumnFilters, value: string) => void
  sortConfig: SortConfig
  onSort: (key: keyof Employee) => void
}

export function EmployeeTable({
  employees,
  onToggleExpand,
  onToggleCheck,
  onSaveEmployee,
  columnFilters,
  onColumnFilterChange,
  sortConfig,
  onSort,
}: // Removed expandedEmployeeId and checkedEmployeeIds from destructuring
EmployeeTableProps) {
  const getSortIcon = (key: keyof Employee) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className='h-4 w-4 text-gray-400' />
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className='h-4 w-4 text-gray-700' />
    }
    return <ArrowDown className='h-4 w-4 text-gray-700' />
  }

  return (
    <div className='rounded-lg border border-gray-50 bg-white shadow-sm max-h-[75vh] overflow-scroll'>
      <Table>
        <TableHeader>
          <TableRow className='bg-gray-50'>
            <TableHead className='w-[50px]'>
              <Checkbox id='select-all' />
            </TableHead>
            <TableHead
              className='min-w-[150px] cursor-pointer'
              onClick={() => onSort('name')}
            >
              <div className='flex items-center gap-1'>
                Name/ID
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[150px] cursor-pointer'
              onClick={() => onSort('position')}
            >
              <div className='flex items-center gap-1'>
                Position
                {getSortIcon('position')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[100px] cursor-pointer'
              onClick={() => onSort('team')}
            >
              <div className='flex items-center gap-1'>
                Team
                {getSortIcon('team')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[150px] cursor-pointer'
              onClick={() => onSort('bday')}
            >
              <div className='flex items-center gap-1'>
                Bday
                {getSortIcon('bday')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[200px] cursor-pointer'
              onClick={() => onSort('email')}
            >
              <div className='flex items-center gap-1'>
                E-mail / Mobile
                {getSortIcon('email')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[200px] cursor-pointer'
              onClick={() => onSort('address')}
            >
              <div className='flex items-center gap-1'>
                Address
                {getSortIcon('address')}
              </div>
            </TableHead>
            <TableHead
              className='min-w-[100px] cursor-pointer'
              onClick={() => onSort('status')}
            >
              <div className='flex items-center gap-1'>
                Status
                {getSortIcon('status')}
              </div>
            </TableHead>
            <TableHead className='w-[80px]' />
          </TableRow>
        </TableHeader>
        <TableBody>
          <Filters
            columnFilters={columnFilters}
            onColumnFilterChange={onColumnFilterChange}
          />
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className='text-center text-gray-500 py-9'>
                No employees found
              </TableCell>
            </TableRow>
          )}
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
  )
}
