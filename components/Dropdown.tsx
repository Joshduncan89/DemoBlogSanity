import { useState, Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ChevronDoubleUpIcon } from '@heroicons/react/solid'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { DocumentAddIcon } from '@heroicons/react/solid'
import { CogIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'

const Dropdownbar = () => {
  const { data: session } = useSession()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  const logout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
      signOut()
    }
  }
  return (
    <Menu as="div" className="relative inline-block pr-4 text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {session?.user?.name}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-black "
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ChevronDoubleUpIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDoubleUpIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Trending
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LightningBoltIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <LightningBoltIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  New
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href="/contribute"
                >
                  {active ? (
                    <DocumentAddIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DocumentAddIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Contribute
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Account
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-slate-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1"></div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdownbar
