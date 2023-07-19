import { CameraIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { BaseSyntheticEvent, useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { showCancelModal, showSubmitModal } from '../atoms/ModalAtom'
import CancelModalPage from '../components/CancelModelPage'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SubmitModalPage from '../components/SubmitModalPage'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getSession, useSession } from 'next-auth/react'
import ReviewContent from '../components/ReviewContent'
import { sanityClient } from '../sanity'
import Router from 'next/router'

interface BlogInput {
  title: string
  description: string
  author: string | number | readonly string[] | undefined
  mainImage: string
  body: string
  _createdAt: Date
}

const Contribute: React.FC = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BlogInput>()
  const [cancelOpen, setCancelOpen] = useRecoilState(showCancelModal)
  const [submitOpen, setSubmitOpen] = useRecoilState(showSubmitModal)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [postDetails, setPostDetails] = useState<BlogInput>(getValues())
  const [review, setReview] = useState<boolean>(false)
  // const [author, setAuthor] = useState<string>()

  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const user = session?.user
    const slug = user?.name?.split(' ').join('-')
  }, [review])

  useEffect(() => {
    if (!selectedFile) {
      setValue('mainImage', '')
    }
  }, [selectedFile])

  const addImageToPost = (e: BaseSyntheticEvent) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      const value = readerEvent.target!.result as string
      setSelectedFile(value)
      setValue('mainImage', value)
    }
  }

  const reviewPost = () => {
    setValue('_createdAt', new Date())
    setPostDetails(getValues())
    setReview(true)
  }

  const submitForm = () => {
    console.log(postDetails)
    setSubmitOpen(true)
    // fetch(`/api/createBlog`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // })
    //   .then(() => {
    //     setSubmitted(true)
    //   })
    //   .catch((err) => {
    //     setSubmitted(false)
    //     console.error(err)
    //   })
  }

  // const submitHandler = () => {
  //   const values = getValues()
  //   fetch('/api/createBlog', {
  //     method: 'POST',
  //     body: JSON.stringify(values),
  //   })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  return (
    <div className="bg-slate-500">
      <Header />

      {/* REVIEW PAGE */}

      <div>
        {review ? (
          <div>
            <h3 className="mt-10 text-center font-mono text-2xl font-semibold">
              Review
            </h3>
            <ReviewContent {...postDetails} />
            <div className="mx-auto flex items-center justify-center space-x-6 py-6 sm:pt-3">
              <button
                type="button"
                onClick={submitForm}
                className="w-32 rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-32 rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-400"
                onClick={() => setReview(false)}
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          // CREATE BLOG

          <div className=" mx-auto my-9 max-w-5xl rounded-md bg-slate-100 p-4">
            <div className="flex justify-center py-4">
              <h1 className="text-2xl font-semibold">Create a Blog</h1>
            </div>
            <form
              onSubmit={handleSubmit(reviewPost)}
              className="mx-auto my-10 flex w-full max-w-3xl flex-col justify-center space-y-6"
            >
              <label className=" block">
                <span className="my-2 block">Author</span>
                <input
                  {...(register('author'), { required: true })}
                  className="block w-full max-w-2xl border px-3 py-2 shadow-md"
                  type="text"
                  placeholder="Title"
                  name="author"
                />
                {errors.author && 'Author is required'}
              </label>
              <label className=" block">
                <span className="my-2 block">Title</span>
                <input
                  {...(register('title'), { required: true })}
                  className="block w-full max-w-2xl border px-3 py-2 shadow-md"
                  type="text"
                  placeholder="Title"
                  name="title"
                />
                {errors.title && 'Title is required'}
              </label>
              <label>
                <span className="my-2 block">Description</span>
                <input
                  {...(register('description'), { required: true })}
                  className="block w-full max-w-2xl border px-3 py-2 shadow-md"
                  type="text"
                  placeholder="Description"
                  name="description"
                />
                {errors.description && 'Description is required'}
              </label>
              <label>
                <span className="my-2 block">Body</span>
                <textarea
                  {...(register('body'), { required: true, minLength: 40 })}
                  className="block w-full max-w-2xl border px-3 py-2 shadow-md"
                  rows={8}
                  placeholder="Create your story..."
                  name="body"
                />
                {errors.body && 'Text body is required'}
              </label>

              {/* IMAGE */}

              {selectedFile ? (
                <div className="relative max-w-md">
                  <img
                    className="h-48 w-full object-cover"
                    src={selectedFile}
                    alt="photo"
                    onClick={() => setSelectedFile(null)}
                  />
                  <XCircleIcon
                    className="absolute right-1 top-1 h-6 w-6 scale-105 cursor-pointer rounded-full fill-red-500 transition-all duration-100 ease-out hover:scale-125"
                    onClick={() => setSelectedFile(null)}
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <h3 className="text-xs font-semibold">
                    Add a header image for your story
                  </h3>
                  <div
                    className=" flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-100"
                    onClick={() => fileRef.current?.click()}
                  >
                    <CameraIcon className="h-6 w-6" aria-hidden="true" />
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      onChange={addImageToPost}
                    />
                    <input
                      type="text"
                      {...(register('mainImage'), { required: true })}
                      hidden
                      name="mainImage"
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-6 pb-3">
                <button
                  type="submit"
                  className="w-32 rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500"
                >
                  Review
                </button>
                <button
                  type="button"
                  className="w-32 rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-400"
                  onClick={() => setCancelOpen(true)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
      <CancelModalPage />
      <SubmitModalPage />
    </div>
  )
}

export default Contribute
