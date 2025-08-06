'use client'

import Link from 'next/link'
import {
  LayoutGrid,
  Search,
  Mail,
  Users,
  Calendar,
  FileText,
  MoreHorizontal,
  Heart,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Dashboard', link: '/dashboard', icon: LayoutGrid },
  { name: 'Search', link: '/search', icon: Search },
  { name: 'Mail', link: '/mail', icon: Mail },
  { name: 'Employees', link: '/', icon: Users },
  { name: 'Calendar', link: '/calendar', icon: Calendar },
  { name: 'Documents', link: '/documents', icon: FileText },
  { name: 'More', link: '/more', icon: MoreHorizontal },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <TooltipProvider delayDuration={0}>
      <aside className='relative top-0 h-screen w-20 flex-col items-center justify-between border-r border-gray-100 bg-white py-6 sm:flex'>
        <div className='flex flex-col items-center gap-6'>
          <Link href='/home' className='text-teal-500' prefetch={false}>
            <Heart className='h-8 w-8' />
            <span className='sr-only'>Home</span>
          </Link>
          <hr className='w-12 border-t border-gray-200' />
          <nav className='flex flex-col items-center gap-4'>
            {links.map((link) => {
              const isActive =
                pathname === link.link ||
                (pathname.startsWith(link.link) && link.link !== '/')
              return (
                <Tooltip key={link.link}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant='ghost'
                      size='icon'
                      className='h-9 w-9'
                    >
                      <Link
                        href={link.link}
                        className={cn(
                          `flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900`,
                          isActive
                            ? 'bg-teal-100 text-teal-600'
                            : 'text-gray-500 hover:bg-gray-100'
                        )}
                      >
                        <link.icon className='h-5 w-5' />
                        <span className='sr-only'>{link.name}</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right' align='center' alignOffset={24}>
                    <p className='text-sm font-medium'>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
        </div>
      </aside>
    </TooltipProvider>
  )
}
