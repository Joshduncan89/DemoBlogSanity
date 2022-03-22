import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import Center from '../components/Center'
import Header from '../components/Header'
import { Post } from '../typings'
import Link from 'next/link'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div>
      <Head>
        <title>Medium 2.0 Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Center />
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group w-full cursor-pointer overflow-hidden border-2 ">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
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
