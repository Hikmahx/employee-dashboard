import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Search, Calendar } from 'lucide-react';

export function Filters() {
  return (
    <TableRow className='bg-gray-50'>
      <TableCell className='w-[50px]' />
      <TableCell>
        <div className='relative'>
          <Input type='text' placeholder='Search...' className='h-8 pl-8' />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <Select>
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='designer'>Designer</SelectItem>
            <SelectItem value='product-manager'>Product manager</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <div className='relative'>
          <Input type='text' placeholder='Search...' className='h-8 pl-8' />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <div className='relative'>
          <Input type='text' placeholder='Date' className='h-8 pr-8' />
          <Calendar className='absolute right-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <div className='relative'>
          <Input type='text' placeholder='Search...' className='h-8 pl-8' />
          <Search className='absolute left-2.5 top-2.5 h-3 w-3 text-gray-500' />
        </div>
      </TableCell>
      <TableCell>
        <Select>
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='minsk'>Minsk</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select>
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='full-time'>Full-time</SelectItem>
            <SelectItem value='part-time'>Part-time</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell />
    </TableRow>
  );
}
