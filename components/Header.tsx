import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Dropdownbar from './Dropdown'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="mx-auto flex justify-between bg-sky-900 p-2 shadow-md shadow-slate-400">
      <Link href={'/'}>
        <div className="cursor-pointers flex h-10 w-[130px] items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-cyan-800 px-8">
          <h1 className="cursor-pointer text-xl font-semibold text-white">
            EarthNews
          </h1>
        </div>
      </Link>
      <div className="lg:text-md flex w-full items-center justify-end space-x-12 text-xs md:mr-8">
        <div className="hidden items-center justify-evenly space-x-2 font-bold md:inline-flex md:space-x-12">
          <Link href={'/about'}>
            <h3>About</h3>
          </Link>
          {session ? (
            <h3>
              <Dropdownbar />
            </h3>
          ) : (
            <Link href={'/auth/signin'}>
              <h3 className="cursor-pointer font-bold">Sign In</h3>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
