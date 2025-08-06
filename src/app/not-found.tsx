import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground'>
      <h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='text-xl mb-8 text-center'>
        Sorry, the page you are looking for does not exist.
      </p>
      <div className='flex space-x-4 flex-col sm:flex-row'>
        <Button asChild>
          <Link href='/home'>Go to Home</Link>
        </Button>
        <Button variant='outline' asChild className='text-white bg-teal-500'>
          <Link href='/'>Go to Employees page</Link>
        </Button>
      </div>
    </div>
  )
}
