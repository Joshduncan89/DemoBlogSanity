import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Dropdownbar from './Dropdown'
import { GlobeAmericasIcon } from '@heroicons/react/24/outline'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="mx-auto flex justify-between bg-black p-2 text-slate-200 shadow-md shadow-slate-400 md:justify-between">
      <Link href={'/'}>
        <div className="flex cursor-pointer items-center justify-center px-8">
          <GlobeAmericasIcon
            className="h-8 w-8"
            fill="#e2e8f0"
            stroke="black"
          />
        </div>
      </Link>

      <div className="md:text-md mr-4 inline-flex items-center justify-evenly space-x-4 text-xs font-bold md:mr-12 md:space-x-12 md:tracking-widest">
        <Link href={'/about'}>
          <h3>About</h3>
        </Link>
        {session ? (
          <h3>
            <Dropdownbar />
          </h3>
        ) : (
          <Link href={'/auth/signin'} className="hidden md:inline-block">
            <h3 className="cursor-pointer font-bold">Sign In</h3>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
