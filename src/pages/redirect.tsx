import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import z from 'zod/v4'
import { getLinkByShortUrl } from '@/services/link'

export default function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const parsedShortUrl = z.string().min(1).safeParse(shortUrl)

  useEffect(() => {
    console.log('shortUrl parameter:', parsedShortUrl)
    getLinkByShortUrl(parsedShortUrl).then(link => {
      if (link) {
        // If the link exists, redirect to the original URL
        console.log('Redirecting to:', link.url)
      }
    })
  }, [parsedShortUrl])

  return (
    <main className="h-dvh flex justify-center items-center p-10">
      <div className="flex flex-col justify-center items-center max-w-145 h-81 md:w-187 lg:w-245 bg-gray-100">
        <img
          className="h-21"
          src="./src/assets/error-404.svg"
          alt="Error 404"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Link não encontrado</h1>
          <p className="text-md text-gray-600 wrap-break-word w-121">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em {''}
            <Link to="/" className="text-blue-500 underline">
              brev.ly
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
