import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Dropdownbar from './Dropdown'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="mx-auto flex max-w-7xl justify-between bg-sky-900 p-5 shadow-md shadow-slate-400">
      <div className="flex items-center space-x-5">
        <Link href={'/'}>
          <div className="cursor-pointers flex h-10 w-[110px] items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-cyan-800">
            <h1 className="cursor-pointer text-xl font-semibold ">EarthNews</h1>
          </div>
        </Link>
        <div className="hidden items-center justify-evenly space-x-5 md:inline-flex">
          <Link href={'/about'}>
            <h3>About</h3>
          </Link>
          <h3 className="rounded-full bg-slate-600 px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-teal-400">
        {session ? (
          <h3>
            <Dropdownbar />
          </h3>
        ) : (
          <Link href={'/auth/signin'}>
            <h3 className="cursor-pointer px-4 font-semibold">Sign In</h3>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
