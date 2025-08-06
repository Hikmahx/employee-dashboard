'use client'

import { useState, useEffect } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Search, CalendarIcon, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format, parse, isValid } from 'date-fns'
import { Button } from '@/components/ui/button'

type ColumnFilters = {
  nameId: string
  position: string
  team: string
  bday: string
  emailMobile: string
  address: string
  status: string
}

type TableFiltersProps = {
  columnFilters: ColumnFilters
  onColumnFilterChange: (key: keyof ColumnFilters, value: string) => void
  availablePositions: string[]
}

export function Filters({
  columnFilters,
  onColumnFilterChange,
  availablePositions,
}: TableFiltersProps) {
  const [localNameId, setLocalNameId] = useState(columnFilters.nameId)
  const [localTeam, setLocalTeam] = useState(columnFilters.team)
  const [localBday, setLocalBday] = useState(columnFilters.bday)
  const [localEmailMobile, setLocalEmailMobile] = useState(
    columnFilters.emailMobile
  )
  const [localAddress, setLocalAddress] = useState(columnFilters.address)

  const [debouncedNameId] = useDebounceValue(localNameId, 300)
  const [debouncedTeam] = useDebounceValue(localTeam, 300)
  const [debouncedBday] = useDebounceValue(localBday, 300)
  const [debouncedEmailMobile] = useDebounceValue(localEmailMobile, 300)
  const [debouncedAddress] = useDebounceValue(localAddress, 300)

  useEffect(() => {
    if (debouncedNameId !== columnFilters.nameId) {
      onColumnFilterChange('nameId', debouncedNameId)
    }
  }, [debouncedNameId, columnFilters.nameId, onColumnFilterChange])

  useEffect(() => {
    if (debouncedTeam !== columnFilters.team) {
      onColumnFilterChange('team', debouncedTeam)
    }
  }, [debouncedTeam, columnFilters.team, onColumnFilterChange])

  useEffect(() => {
    if (debouncedBday !== columnFilters.bday) {
      onColumnFilterChange('bday', debouncedBday)
    }
  }, [debouncedBday, columnFilters.bday, onColumnFilterChange])

  useEffect(() => {
    if (debouncedEmailMobile !== columnFilters.emailMobile) {
      onColumnFilterChange('emailMobile', debouncedEmailMobile)
    }
  }, [debouncedEmailMobile, columnFilters.emailMobile, onColumnFilterChange])

  useEffect(() => {
    if (debouncedAddress !== columnFilters.address) {
      onColumnFilterChange('address', debouncedAddress)
    }
  }, [debouncedAddress, columnFilters.address, onColumnFilterChange])

  const parseDateString = (dateString: string): Date | undefined => {
    const parsed = parse(dateString, 'MMM dd, yyyy', new Date())
    return isValid(parsed) ? parsed : undefined
  }

  return (
    <TableRow className='bg-gray-50/50'>
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
            {availablePositions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
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
            <div className='relative'>
              <Input
                type='text'
                placeholder='Pick a date'
                className={cn(
                  'h-8 pr-8',
                  !localBday && 'text-muted-foreground'
                )}
                value={localBday}
                onChange={(e) => setLocalBday(e.target.value)}
              />
              <CalendarIcon className='absolute right-2.5 top-2.5 h-3 w-3 text-gray-500' />
              {localBday && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:bg-transparent'
                  onClick={() => setLocalBday('')}
                  aria-label='Clear date'
                >
                  <X className='h-3 w-3' />
                </Button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={parseDateString(localBday)}
              onSelect={(date) =>
                setLocalBday(date ? format(date, 'MMM dd, yyyy') : '')
              }
              initialFocus
              captionLayout='dropdown'
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
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search address...'
            className='h-8 pl-8'
            value={localAddress}
            onChange={(e) => setLocalAddress(e.target.value)}
          />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
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
  )
}
