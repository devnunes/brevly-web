import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import type { CreateLinkParams } from '@/http/create-link-on-storage'
import { useLinksStore } from '../store/links'

const newLinkFormValidationSchema = z.object({
  url: z.url(),
  shortUrl: z.string(),
})

export function CreateLinkWidget() {
  const { addLink } = useLinksStore()
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(newLinkFormValidationSchema),
  })

  const handleCreateLink = (data: CreateLinkParams) => {
    addLink(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      action=""
      className="flex flex-col rounded-lg w-95 h-85 p-8 bg-gray-100 gap-6"
    >
      <span className="text-lg w-79">Novo link</span>
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-xs text-gray-500">
          LINK ORIGINAL
        </label>
        <input
          className="border border-gray-300 rounded-lg text-gray-400 px-4 py-2"
          type="text"
          placeholder="https://www.exemplo.com.br"
          {...register('url', { required: true })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="shortUrl" className="text-xs text-gray-500">
          LINK ENCURTADO
        </label>
        <input
          className="border border-gray-300 rounded-lg text-gray-400 px-4 py-3"
          type="text"
          placeholder="brev.ly/"
          {...register('shortUrl', { required: true })}
        />
      </div>
      <button
        className="bg-blue-base text-white rounded-lg w-full text-md py-3.5"
        type="submit"
      >
        Salvar link
      </button>
    </form>
  )
}
