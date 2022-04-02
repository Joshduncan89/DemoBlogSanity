import { getProviders, signIn } from 'next-auth/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface PropProvider {
  providers: {
    provider: {
      name: string
      id: string
    }
  }
}

const LoginPage = ({ providers }: PropProvider) => {
  return (
    <div className="bg-[url('/background.jpg')]">
      <Header />
      <div className="h-96 w-full flex-col items-center justify-center rounded-md bg-slate-100/70 p-4 text-center sm:m-4 sm:mx-auto sm:max-w-md">
        <h1 className="p-2 text-2xl font-bold sm:text-3xl md:text-5xl">
          EarthNews
        </h1>
        <p className="mt-4 mb-6 pl-4  text-sm font-medium">
          Start your blogging journey today
        </p>
        <div>
          <p className="mb-4 text-xs sm:text-sm">Login with an account</p>
          {Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="w-20 rounded-md bg-blue-500 p-2 text-sm text-white hover:bg-blue-700"
              >
                {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
