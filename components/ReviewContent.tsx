import React from 'react'
import { useSession } from 'next-auth/react'
interface BlogInput {
  title: string
  description: string
  author: string | number | readonly string[] | undefined
  mainImage: string
  body: string
  _createdAt: Date
}

const ReviewContent: React.FC<BlogInput> = ({
  title,
  description,
  author,
  mainImage,
  body,
  _createdAt,
}: BlogInput) => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className="  bg-white sm:mx-auto sm:max-w-2xl sm:scale-90">
      <img src={mainImage} className="mt-3 h-40 w-full object-cover" />
      <article className="mx-auto max-h-[32rem] max-w-3xl overflow-y-scroll p-4">
        <h1 className="mt-10 mb-3 text-3xl">{title}</h1>
        <h2 className="mb-2 text-xl font-light">{description}</h2>
        <div className="mt-3 flex items-center space-x-4">
          <img className="h-12 w-12 rounded-full" src={session?.user?.image} />
          <p className="text-xs">
            Blog content by {author} - Published at{' '}
            {new Date(_createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">{body}</div>
      </article>
    </div>
  )
}

export default ReviewContent
