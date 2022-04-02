import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { showCancelModal } from '../atoms/ModalAtom'

const CancelModalPage = () => {
  const router = useRouter()
  const [open, setOpen] = useRecoilState(showCancelModal)

  const cancelPost = () => {
    router.push('/')
  }
  const continuePost = () => {
    setOpen(false)
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as={'div'}
        onClose={setOpen}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="my-8 inline-block w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Are you sure you want to cancel?
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your post will not be published
                </p>
              </div>

              <div className="space-between mt-4 flex items-center justify-center space-x-6">
                <button
                  type="button"
                  className=" rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={cancelPost}
                >
                  Exit
                </button>
                <button
                  type="button"
                  className=" rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={continuePost}
                >
                  Continue
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CancelModalPage
