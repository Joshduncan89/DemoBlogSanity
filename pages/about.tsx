import React from 'react'
import Header from '../components/Header'

const About = () => {
  return (
    <div>
      <Header />
      <div className="flex bg-slate-100">
        <div className="mx-auto flex max-w-xl flex-col items-center space-y-7 p-5">
          <h3 className="my-5 text-3xl font-semibold">About Us</h3>
          <p>
            EarthNews is not a real website to get your actual news. Although
            some of the stories dont seem far fetched from where out society may
            be heading, Bezos Bots <span className="italic">probably</span> wont
            be available for awhile. Im an aspiring developer who used the
            satire as a quick model to learn some new APIs.{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
