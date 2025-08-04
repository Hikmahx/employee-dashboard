'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalEmployees: number;
  onPageChange: (page: number) => void;
};

export function Paginator({
  currentPage,
  totalPages,
  totalEmployees,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className='flex items-center justify-between px-4 py-2 text-sm mt-auto'>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 bg-transparent'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Previous page</span>
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size='icon'
            className={`h-8 w-8 ${
              currentPage === page
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 bg-transparent'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
          <span className='sr-only'>Next page</span>
        </Button>
      </div>
      <div className='text-gray-500'>{totalEmployees} employees</div>
    </div>
  );
}
