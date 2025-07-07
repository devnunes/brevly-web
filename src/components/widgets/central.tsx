import type { ComponentProps } from 'react'

type CentralWidgetProps = ComponentProps<'div'> & {
  type: 'notfound' | 'redirecting'
  title: string
  children: React.ReactNode
}

export default function CentralWidget({
  title,
  children,
  type,
}: CentralWidgetProps) {
  return (
    <div className="flex flex-col justify-center items-center max-w-145 h-81 md:w-187 lg:w-245 bg-gray-100">
      {type === 'notfound' && (
        <img
          className="h-21"
          src="./src/assets/error-404.svg"
          alt="Error 404"
        />
      )}
      {type === 'redirecting' && (
        <img
          className="h-9 w-11 mb-7"
          src="./src/assets/brevly-icon.svg"
          alt="Loading"
        />
      )}
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        {children}
      </div>
    </div>
  )
}
