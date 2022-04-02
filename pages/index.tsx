import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import Center from '../components/Center'

import { Post } from '../typings'
import Link from 'next/link'
import Dropdown from '../components/Dropdown'
import Footer from '../components/Footer'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="w-screen">
      <Head>
        <title>Earth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center />

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group w-full cursor-pointer overflow-hidden rounded-md border-2 ">
              <img
                className="h-48 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div className="flex flex-1 flex-col justify-between">
                  <p className="font-bold">{post.title}</p>
                  <p className="font-xs">By {post.author.name}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    author -> {
    name,
    image
  },
    mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

export default Home
