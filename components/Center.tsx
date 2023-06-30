import React from 'react'
import Header from './Header'

const Center = () => {
  return (
    <div className=" bg-[url('/earth1.webp')]">
      <Header />
      <div className="mx-auto flex h-80 max-w-7xl items-center justify-center border-y border-black  py-10 lg:py-0">
        <div className=" my-5 space-y-5 rounded-md px-10 pb-5 text-white">
          <h1 className="max-w-xl bg-gradient-to-r from-indigo-500 to-white bg-clip-text p-5  text-5xl text-transparent  decoration-4">
            EarthNews
          </h1>
          <h2 className="md:text-md max-w-xl  px-5 text-sm xl:text-lg">
            Connecting you with others to help share the stories your twitter
            fame depends on
          </h2>
          {/* <h2 className="hidden max-w-xl font-serif md:inline-block md:text-sm">
            Something happening in your part of the Globe? Share it with others,
            because misery loves company
          </h2> */}
        </div>
      </div>
    </div>
  )
}

export default Center
