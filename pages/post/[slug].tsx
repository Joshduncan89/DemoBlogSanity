import { GetStaticProps } from 'next'
import { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import Footer from '../../components/Footer'

interface Props {
  post: Post
}

interface FormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmitForm: SubmitHandler<FormInput> = (data) => {
    fetch(`/api/createComment`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
        console.error(err)
      })
  }

  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()}
        className="h-60 w-full object-cover"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mb-3 mt-10 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light">{post.description}</h2>
        <div className="mt-3 flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()}
          />
          <p className="text-xs">
            Blog post by {post.author.name} - Published at{' '}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: (props: any) => <li className="ml-4 list-disc" {...props} />,
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="mx-auto my-5 max-w-lg border border-gray-400" />
      {submitted ? (
        <div className="mx-auto flex max-w-lg flex-col py-10">
          <h3 className="text-xl font-semibold">Comment submitted!</h3>
          <p className="text-sm">
            All comments must be approved before displaying
          </p>
        </div>
      ) : (
        <form
          className="mx-auto mb-10 flex max-w-lg flex-col p-5"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <h3 className="text-md">Enjoy the article?</h3>
          <h4 className="text-2xl font-semibold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />
          <input
            {...register('_id')}
            name="_id"
            value={post._id}
            type="hidden"
          />
          <label className="mb-5 block">
            <span>Name</span>
            <input
              {...register('name', { required: true })}
              className="mt-1 block w-full border px-3 py-2 shadow ring-blue-400 focus:ring-2"
              type="text"
              placeholder="My Name Jeff"
            />
          </label>
          <label className="mb-5 block">
            <span>Email</span>
            <input
              {...register('email', { required: true })}
              className="mt-1 block w-full border px-3 py-2 shadow ring-blue-400 focus:ring-2"
              type="text"
              placeholder="Email@email.com"
            />
          </label>
          <label className="mb-5 block">
            <span>Comment</span>
            <textarea
              {...register('comment', { required: true, maxLength: 250 })}
              className="mt-1 block w-full border px-3 py-2 shadow ring-blue-400 focus:ring-2"
              rows={4}
              placeholder="Leave a comment..."
            />
          </label>
          <div className="flex flex-col">
            {errors.name && <p>Name field is required</p>}
            {errors.email && <p>Email field is required</p>}
            {errors.comment && <p>Comment field is required</p>}
          </div>
          <input
            type="submit"
            className="w-full cursor-pointer rounded-md bg-gray-400 py-1 text-white hover:bg-gray-500"
          />
        </form>
      )}

      {/* COMMENTS */}

      <div className="mx-auto my-8 flex max-w-lg flex-col space-y-2 p-10 shadow shadow-gray-400">
        <h3 className="text-4xl font-semibold">Comments</h3>
        <hr />
        {post.comments.length == 0 ? (
          <p className="py-4 text-xs">No comments to display</p>
        ) : (
          post.comments.map((comment) => (
            <p>
              <span className="font-bold">{comment.name}</span> :{' '}
              <span className="italic"> {comment.comment}</span>{' '}
            </p>
          ))
        )}
      </div>
      <Footer />
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id,
        slug
      }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    description,
    author -> {
    name,
    image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    slug,
  mainImage,
  body}`

  const post = await sanityClient.fetch(query, {
    slug: context.params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}

export default Post
