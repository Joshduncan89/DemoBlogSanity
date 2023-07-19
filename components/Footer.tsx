import React from 'react'
import Icons from './Icons'

const Footer = () => {
  return (
    <div className="w-full rounded-t-md bg-black font-semibold text-white">
      <div className="flex flex-col  bg-black pt-3 ">
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center space-y-1 p-6">
            <h1 className=" text-slate-400">FOLLOW</h1>
            <Icons />
          </div>
          <div className="text cursor-pointer space-y-1 p-6">
            <h1 className=" cursor-auto text-slate-400">SUPPORT</h1>
            <h3>Donate</h3>
            <h3>Documentation</h3>
            <h3>Api</h3>
            <h3>Reviews</h3>
          </div>
          <div className="spacing-y-1 cursor-pointer p-6">
            <h1 className="cursor-auto text-slate-400">LEGAL</h1>
            <h3>About</h3>
            <h3>Claim</h3>
            <h3>Privacy</h3>
            <h3>Terms</h3>
          </div>
        </div>
      </div>
      <hr className=" mx-auto max-w-xl" />
      <div className=" flex justify-center p-4">
        <p>© 2021 EarthNews Inc. All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
