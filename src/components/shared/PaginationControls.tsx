'use client'

import { useRouter } from 'next/navigation'
import NextIcon from '../icons/Next'
import PrevIcon from '../icons/Prev'

interface Props {
  currentPage: number
  totalPages: number
  nextPage?: number
  prevPage?: number
  page: number
}

export default function PaginationControls({
  page,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: Props) {
  const router = useRouter()

  console.log('page:', page)
  console.log('totalPages:', totalPages)

  const handleNavigate = (pages: number) => {
    router.push(`/shorts?page=${pages}`)
  }

  return (
    <div className='absolute right-2 flex flex-col gap-5'>
      <button
        onClick={() => handleNavigate(currentPage - 1)}
        type='button'
        disabled={page <= totalPages}
        className={`p-1 w-[45px] h-[45px] rounded-full flex justify-center items-center ${
          page <= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#eee] hover:bg-gray-400'
        }`}
        aria-label='Go to previous'
      >
        <NextIcon />
      </button>

      <button
        onClick={() => handleNavigate(currentPage + 1)}
        type='button'
        className={`p-1 w-[45px] h-[45px] rounded-full flex justify-center items-center ${
          page > 1 ? 'bg-[#eee] hover:bg-gray-400' : 'bg-gray-300 cursor-not-allowed '
        }`}
        aria-label='Go to next'
      >
        <PrevIcon />
      </button>
    </div>
  )
}
