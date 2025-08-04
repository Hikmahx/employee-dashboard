import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Plus, List, Grid3X3, Search } from 'lucide-react';

export function Header() {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-semibold'>Employees</h1>
      <div className='flex items-center gap-4'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All categories' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All categories</SelectItem>
            <SelectItem value='design'>Design</SelectItem>
            <SelectItem value='product'>Product</SelectItem>
            <SelectItem value='engineering'>Engineering</SelectItem>
          </SelectContent>
        </Select>
        <div className='relative'>
          <Input type='search' placeholder='Search...' className='pl-8' />
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
        </div>
        <Button className='bg-teal-500 hover:bg-teal-600 text-white'>
          <Plus className='mr-2 h-4 w-4' />
          Add employee
        </Button>
        <div className='flex rounded-md border'>
          <Button variant='ghost' size='icon' className='rounded-r-none border-r'>
            <List className='h-4 w-4 text-gray-500' />
            <span className='sr-only'>List view</span>
          </Button>
          <Button variant='ghost' size='icon' className='rounded-l-none border-l'>
            <Grid3X3 className='h-4 w-4 text-gray-500' />
            <span className='sr-only'>Grid view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
