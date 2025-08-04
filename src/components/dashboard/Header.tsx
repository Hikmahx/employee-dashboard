'use client';

import { useState, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';
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

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  layoutView: 'list' | 'grid';
  setLayoutView: (view: 'list' | 'grid') => void;
  onAddEmployeeClick: () => void;
};

export function Header({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  layoutView,
  setLayoutView,
  onAddEmployeeClick,
}: HeaderProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce the local search term before passing it up
  const [debouncedLocalSearchTerm] = useDebounceValue(localSearchTerm, 300);

  // Update the parent's search term only when the debounced value changes
  // This effect ensures the parent's state is updated after debounce
  // and prevents immediate re-renders on every keystroke.
  // It also handles initial sync if searchTerm is not empty.
  useEffect(() => {
    if (debouncedLocalSearchTerm !== searchTerm) {
      setSearchTerm(debouncedLocalSearchTerm);
    }
  }, [debouncedLocalSearchTerm, searchTerm, setSearchTerm]);

  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-semibold'>Employees</h1>
      <div className='flex items-center gap-4'>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All categories' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='all'>All categories</SelectItem>
            <SelectItem value='designer'>Designer</SelectItem>
            <SelectItem value='product manager'>Product Manager</SelectItem>
            <SelectItem value='engineer'>Engineer</SelectItem>
          </SelectContent>
        </Select>
        <div className='relative'>
          <Input
            type='search'
            placeholder='Search...'
            className='pl-8'
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
        </div>
        <Button
          className='bg-teal-500 hover:bg-teal-600 text-white'
          onClick={onAddEmployeeClick}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add employee
        </Button>
        <div className='flex rounded-md border'>
          <Button
            variant={layoutView === 'list' ? 'default' : 'ghost'}
            size='icon'
            className={`rounded-r-none ${
              layoutView === 'list'
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : ''
            }`}
            onClick={() => setLayoutView('list')}
          >
            <List className='h-4 w-4 text-gray-500' />
            <span className='sr-only'>List view</span>
          </Button>
          <Button
            variant={layoutView === 'grid' ? 'default' : 'ghost'}
            size='icon'
            className={`rounded-l-none ${
              layoutView === 'grid'
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : ''
            }`}
            onClick={() => setLayoutView('grid')}
          >
            <Grid3X3 className='h-4 w-4 text-gray-500' />
            <span className='sr-only'>Grid view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
