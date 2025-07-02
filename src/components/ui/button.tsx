import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex justify-between items-center',
  variants: {
    size: {
      primary: 'text-blue-base',
      secondary:
        'w-25 text-gray-500 text-s rounded-sm p-2 bg-gray-200 hover:bg-gray-300 border-1 border-transparent hover:border-blue-base transition-colors',
      tertiary:
        'text-gray-500 rounded-sm p-2 bg-gray-200 hover:bg-gray-300 border-1 border-transparent hover:border-blue-base transition-colors',
    },
  },
  defaultVariants: {
    size: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode
  }

export function Button({ size, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ size, className })}
      {...props}
      type="button"
    >
      {children}
    </button>
  )
}
