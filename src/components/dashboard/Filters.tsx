'use client';

import { Button } from '@/components/ui/button';

import { useState, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Search, CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type ColumnFilters = {
  nameId: string;
  position: string;
  team: string;
  bday: string;
  emailMobile: string;
  address: string;
  status: string;
};

type TableFiltersProps = {
  columnFilters: ColumnFilters;
  onColumnFilterChange: (key: keyof ColumnFilters, value: string) => void;
};

export function Filters({
  columnFilters,
  onColumnFilterChange,
}: TableFiltersProps) {
  // Local states for debounced inputs
  const [localNameId, setLocalNameId] = useState(columnFilters.nameId);
  const [localTeam, setLocalTeam] = useState(columnFilters.team);
  const [localBday, setLocalBday] = useState(columnFilters.bday);
  const [localEmailMobile, setLocalEmailMobile] = useState(
    columnFilters.emailMobile
  );

  // Debounced values
  const [debouncedNameId] = useDebounceValue(localNameId, 300);
  const [debouncedTeam] = useDebounceValue(localTeam, 300);
  const [debouncedBday] = useDebounceValue(localBday, 300);
  const [debouncedEmailMobile] = useDebounceValue(localEmailMobile, 300);

  // Effects to update parent's filter state after debounce
  useEffect(() => {
    if (debouncedNameId !== columnFilters.nameId) {
      onColumnFilterChange('nameId', debouncedNameId);
    }
  }, [debouncedNameId, columnFilters.nameId, onColumnFilterChange]);

  useEffect(() => {
    if (debouncedTeam !== columnFilters.team) {
      onColumnFilterChange('team', debouncedTeam);
    }
  }, [debouncedTeam, columnFilters.team, onColumnFilterChange]);

  useEffect(() => {
    if (debouncedBday !== columnFilters.bday) {
      onColumnFilterChange('bday', debouncedBday);
    }
  }, [debouncedBday, columnFilters.bday, onColumnFilterChange]);

  useEffect(() => {
    if (debouncedEmailMobile !== columnFilters.emailMobile) {
      onColumnFilterChange('emailMobile', debouncedEmailMobile);
    }
  }, [debouncedEmailMobile, columnFilters.emailMobile, onColumnFilterChange]);

  return (
    <TableRow className='bg-gray-50'>
      <TableCell className='w-[50px]' />
      <TableCell>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search...'
            className='h-8 pl-8'
            value={localNameId}
            onChange={(e) => setLocalNameId(e.target.value)}
          />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <Select
          value={columnFilters.position}
          onValueChange={(val) => onColumnFilterChange('position', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Designer'>Designer</SelectItem>
            <SelectItem value='Product manager'>Product manager</SelectItem>
            <SelectItem value='Engineer'>Engineer</SelectItem>
            <SelectItem value='New Hire'>New Hire</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search...'
            className='h-8 pl-8'
            value={localTeam}
            onChange={(e) => setLocalTeam(e.target.value)}
          />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'h-8 w-full justify-start text-left font-normal',
                !localBday && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {localBday ? (
                format(new Date(localBday), 'MMM dd, yyyy')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={localBday ? new Date(localBday) : undefined}
              onSelect={(date) =>
                setLocalBday(date ? format(date, 'MMM dd, yyyy') : '')
              }
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search...'
            className='h-8 pl-8'
            value={localEmailMobile}
            onChange={(e) => setLocalEmailMobile(e.target.value)}
          />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <Select
          value={columnFilters.address}
          onValueChange={(val) => onColumnFilterChange('address', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Minsk, Pobeditelay, 135'>
              Minsk, Pobeditelay, 135
            </SelectItem>
            <SelectItem value='Minsk, Derzinskogo, 47'>
              Minsk, Derzinskogo, 47
            </SelectItem>
            <SelectItem value='New City, New Street, 1'>
              New City, New Street, 1
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={columnFilters.status}
          onValueChange={(val) => onColumnFilterChange('status', val)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Full-time'>Full-time</SelectItem>
            <SelectItem value='Part-time'>Part-time</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell />
    </TableRow>
  );
}
