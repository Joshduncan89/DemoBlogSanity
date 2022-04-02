import { CameraIcon, XCircleIcon } from '@heroicons/react/solid'
import { BaseSyntheticEvent, useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { showCancelModal, showSubmitModal } from '../atoms/ModalAtom'
import CancelModalPage from '../components/CancelModelPage'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SubmitModalPage from '../components/SubmitModalPage'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'

interface BlogInput {
  title: string
  description: string
  author: string | number | readonly string[] | undefined
  mainImage: string | null
  body: string
}

interface SessionProps {
  user: {
    image: string
    name: string
    email: string
  }
}

const Contribute: React.FC = () => {
  const [cancelOpen, setCancelOpen] = useRecoilState(showCancelModal)
  const [submitOpen, setSubmitOpen] = useRecoilState(showSubmitModal)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  console.log(session?.user?.name)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogInput>()

  useEffect(() => {
    if (!selectedFile) {
      setValue('mainImage', null)
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

  const submitForm: SubmitHandler<BlogInput> = (data) => {
    console.log(data)
    // fetch(`/api/createComment`, {
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

  return (
    <div>
      <Header />
      <div>
        <div className="my-3 mx-auto max-w-5xl rounded-md bg-slate-100 p-4">
          <div className="flex justify-center py-4">
            <h1 className="text-2xl font-semibold">Create a Blog</h1>
          </div>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="my-10 mx-auto flex w-full max-w-3xl flex-col justify-center space-y-6"
          >
            <label className=" block">
              <span className="my-2 block">Author</span>
              <input
                {...register('author')}
                className="block w-full max-w-2xl border py-2 px-3 shadow-md"
                type="text"
                placeholder="Title"
                name="author"
              />
            </label>
            <label className=" block">
              <span className="my-2 block">Title</span>
              <input
                {...register('title')}
                className="block w-full max-w-2xl border py-2 px-3 shadow-md"
                type="text"
                placeholder="Title"
                name="title"
              />
            </label>
            <label>
              <span className="my-2 block">Description</span>
              <input
                {...register('description')}
                className="block w-full max-w-2xl border py-2 px-3 shadow-md"
                type="text"
                placeholder="Description"
                name="description"
              />
            </label>
            <label>
              <span className="my-2 block">Body</span>
              <textarea
                {...register('body')}
                className="block w-full max-w-2xl border py-2 px-3 shadow-md"
                rows={8}
                placeholder="Create your story..."
                name="body"
              />
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
                    {...register('mainImage')}
                    hidden
                    name="mainImage"
                  />
                </div>
              </div>
            )}
            <div className="flex space-x-6 pb-3">
              <button
                type="submit"
                // onClick={() => setSubmitOpen(true)}
                className="w-32 rounded bg-blue-400 py-2 px-4 font-bold text-white hover:bg-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-32 rounded bg-red-300 py-2 px-4 font-bold text-white hover:bg-red-400"
                onClick={() => setCancelOpen(true)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <CancelModalPage />
      <SubmitModalPage />
    </div>
  )
}

export default Contribute
