import React from 'react'

const Center = () => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-4">Medium</span> is a place to
          write, read and connect
        </h1>
        <h2>
          Its easy and free to post your thinking on any topic and connect with
          other readers
        </h2>
      </div>
      <img
        className="hidden h-32 md:inline-flex lg:h-full"
        src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
      />
    </div>
  )
}

export default Center
