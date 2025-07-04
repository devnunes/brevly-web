import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import z from 'zod/v4'
import CentralWidget from '@/components/widgets/central'
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
      <CentralWidget title="Link não encontrado">
        <p className="text-md text-gray-600 wrap-break-word w-121">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em {''}
          <Link to="/" className="text-blue-500 underline">
            brev.ly
          </Link>
          .
        </p>
      </CentralWidget>
    </main>
  )
}
