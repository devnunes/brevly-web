import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import z from 'zod/v4'
import CentralWidget from '@/components/widgets/central'
import { getLinkByShortUrl } from '@/services/link'

export default function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const [shortUrlHasRedirection, setshortUrlHasRedirection] =
    useState<boolean>(true)
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const parsedShortUrl = z.string().min(1).safeParse(shortUrl)

    const fetchUrl = async () => {
      await getLinkByShortUrl(parsedShortUrl)
        .then(({ url }) => {
          if (!z.string().min(1).safeParse(url).success) {
            return setshortUrlHasRedirection(false)
          }
          setUrl(url)
        })
        .catch(_error => {
          setshortUrlHasRedirection(false)
        })
    }
    fetchUrl()
  }, [shortUrl])

  useEffect(() => {
    if (url !== '') {
      setTimeout(() => {
        window.location.href = url
      }, 1000)
    }
  }, [url])

  return (
    <main className="h-dvh flex justify-center items-center p-10">
      {shortUrlHasRedirection === false ? (
        <CentralWidget title="Link não encontrado" type="notfound">
          <p className="text-md text-gray-600 wrap-break-word w-121">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em {''}
            <Link to="/" className="text-blue-500 underline">
              brev.ly
            </Link>
            .
          </p>
        </CentralWidget>
      ) : (
        <CentralWidget title="Redirecionando..." type="redirecting">
          <p className="text-md mt-2.5 text-gray-600 wrap-break-word w-100">
            O link será aberto automaticamente em alguns instantes. Não foi
            redirecionado?{' '}
            <a
              href={url}
              className="text-blue-base underline hover:cursor-pointer"
            >
              Acesse aqui
            </a>
          </p>
        </CentralWidget>
      )}
    </main>
  )
}
