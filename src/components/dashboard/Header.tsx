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
import { Plus, List, AlignJustify, Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  showSelectedOnly: boolean;
  setShowSelectedOnly: (show: boolean) => void;
  onAddEmployeeClick: () => void;
}

export function Header({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  showSelectedOnly,
  setShowSelectedOnly,
  onAddEmployeeClick,
}: HeaderProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const [debouncedLocalSearchTerm] = useDebounceValue(localSearchTerm, 300);

  useEffect(() => {
    if (debouncedLocalSearchTerm !== searchTerm) {
      setSearchTerm(debouncedLocalSearchTerm);
    }
  }, [debouncedLocalSearchTerm, searchTerm, setSearchTerm]);

  return (
    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-0 mb-5 lg:mb-0'>
      <h1 className='text-2xl font-semibold'>Employees</h1>
      <div className='flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-4 w-full lg:ml-auto'>
        <div className='flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto'>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='All categories' />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value='all'>All categories</SelectItem>
              <SelectItem value='designer'>Designer</SelectItem>
              <SelectItem value='product manager'>Product Manager</SelectItem>
              <SelectItem value='engineer'>Engineer</SelectItem>
            </SelectContent>
          </Select>
          <div className='relative w-full md:w-auto'>
            <Input
              type='search'
              placeholder='Search...'
              className='pl-8 w-full min-w-[120px]'
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
          </div>
        </div>
        <div className='flex items-center gap-4 w-full lg:w-auto'>
          <Button
            className='bg-teal-500 hover:bg-teal-600 text-white flex-1 w-full md:max-w-[150px]'
            onClick={onAddEmployeeClick}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add <span className='hidden md:flex'>employee</span>
          </Button>
          <div className='flex  rounded-md border'>
            <Button
              variant={!showSelectedOnly ? 'default' : 'ghost'}
              size='icon'
              className={`rounded-r-none ${
                !showSelectedOnly
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : ''
              }`}
              onClick={() => setShowSelectedOnly(false)}
            >
              <AlignJustify
                className={`h-4 w-4 ${
                  !showSelectedOnly ? 'text-white' : 'text-gray-500'
                }`}
              />
              <span className='sr-only'>List view</span>
            </Button>
            <Button
              variant={showSelectedOnly ? 'default' : 'ghost'}
              size='icon'
              className={`rounded-l-none ${
                showSelectedOnly
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : ''
              }`}
              onClick={() => setShowSelectedOnly(true)}
            >
              <List
                className={`h-4 w-4 ${
                  showSelectedOnly ? 'text-white' : 'text-gray-500'
                }`}
              />
              <span className='sr-only'>Show selected</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
