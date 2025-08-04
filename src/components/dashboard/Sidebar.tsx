import Link from 'next/link';
import {
  LayoutGrid,
  Search,
  Mail,
  Users,
  Calendar,
  FileText,
  MoreHorizontal,
  Heart,
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className='sticky h-screen w-20 flex-col items-center justify-between border-r border-gray-100 bg-white py-6 sm:flex'>
      <div className='flex flex-col items-center gap-6'>
        <Link href='#' className='text-teal-500' prefetch={false}>
          <Heart className='h-8 w-8' />
          <span className='sr-only'>Home</span>
        </Link>
        <nav className='flex flex-col items-center gap-4'>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
            prefetch={false}
          >
            <LayoutGrid className='h-5 w-5' />
            <span className='sr-only'>Dashboard</span>
          </Link>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
            prefetch={false}
          >
            <Search className='h-5 w-5' />
            <span className='sr-only'>Search</span>
          </Link>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
            prefetch={false}
          >
            <Mail className='h-5 w-5' />
            <span className='sr-only'>Mail</span>
          </Link>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-600'
            prefetch={false}
          >
            <Users className='h-5 w-5' />
            <span className='sr-only'>Employees</span>
          </Link>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
            prefetch={false}
          >
            <Calendar className='h-5 w-5' />
            <span className='sr-only'>Calendar</span>
          </Link>
          <Link
            href='#'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
            prefetch={false}
          >
            <FileText className='h-5 w-5' />
            <span className='sr-only'>Documents</span>
          </Link>
        </nav>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Link
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900'
          prefetch={false}
        >
          <MoreHorizontal className='h-5 w-5' />
          <span className='sr-only'>More</span>
        </Link>
      </div>
    </aside>
  );
}
