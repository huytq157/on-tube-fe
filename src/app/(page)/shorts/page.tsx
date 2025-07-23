import LayoutDefault from '@/components/layouts/default/LayoutDefault'
import VideoShortCard from '@/components/card/VideoShortCard'
import VideoShortSkeleton from '@/components/skeleton/VideoShortSkeleton'
import { Metadata } from 'next'
import PaginationControls from '@/components/shared/PaginationControls'

export const metadata: Metadata = {
  title: 'Video Shorts | On-tube',
  description: 'Explore the latest video shorts on our platform.',
  openGraph: {
    title: 'Video Shorts | On-tube',
    description: 'Explore the latest video shorts on our platform.',
    images: ['https://yourwebsite.com/og-image.jpg'],
    url: 'https://yourwebsite.com/shorts',
  },
  twitter: {
    title: 'Video Shorts | On-tube',
    description: 'Explore the latest video shorts on our platform.',
    images: ['https://yourwebsite.com/og-image.jpg'],
    card: 'summary_large_image',
  },
}

interface Video {
  _id: string
  title: string
  videoUrl: string
  videoThumbnail: string
  totalView: number
  createdAt: Date
  isPublic: boolean
  publishedDate: Date
  writer: {
    _id: string
    name: string
    avatar: string
  }
}

async function getShortVideos(
  page: number,
  limit: number
): Promise<{
  data: Video[]
  totalPages: number
  currentPage: number
  nextPage?: number
  prevPage?: number
}> {
  const res = await fetch(
    `http://localhost:8000/api/video/all?page=${page}&limit=${limit}&isPublic=true&videoType=short`,
    { cache: 'no-store' }
  )

  const body = await res.json()

  const totalPages = parseInt(res.headers.get('x-pages-count') || '1', 10)
  const currentPage = parseInt(res.headers.get('x-page') || String(page), 10)
  const nextPage = parseInt(res.headers.get('x-next-page') || '') || undefined
  const prevPage = currentPage > 1 ? currentPage - 1 : undefined

  const formattedData: Video[] = (body.data || []).map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    publishedDate: new Date(item.publishedDate),
  }))

  return {
    data: formattedData,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  }
}

export default async function ShortPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || 1)
  const limit = 1
  const { data, totalPages, currentPage, nextPage, prevPage } = await getShortVideos(page, limit)

  return (
    <LayoutDefault>
      <div className='flex flex-col items-center justify-center relative w-full'>
        {data.length === 0
          ? [...Array(limit)].map((_, index) => <VideoShortSkeleton key={index} />)
          : data.map((item) => <VideoShortCard key={item._id} item={item} />)}

        <PaginationControls
          page={page}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </LayoutDefault>
  )
}
