interface Video {
  _id: string
  title: string
  videoUrl: string
  isPublic: boolean
  writer: {
    _id: string
    name: string
    avatar: string
  }
  videoThumbnail: string
  totalView: number
  publishedDate: string
  createdAt: string
}

async function getVideos({
  limit = 12,
  category = 'all',
}: {
  limit?: number
  category?: string
}): Promise<{ videos: Video[]; hasMore: boolean }> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/all?page=1&limit=${limit}&category=${
    category === 'all' ? 'null' : category
  }&isPublic=true&videoType=long`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return { videos: [], hasMore: false }
  const data = await res.json()
  return {
    videos: Array.isArray(data.data) ? (data.data as Video[]) : [],
    hasMore: !!data.hasMore,
  }
}

import { Suspense } from 'react'
import Link from 'next/link'
import SkeletonVideoCard from '@/components/card/SkeletonVideoCard'
import VideoCard from '@/components/card/VideoCard'
import LayoutDefault from '@/components/layouts/default/LayoutDefault'

interface Category {
  _id: string
  title: string
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/list`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data.data) ? (data.data as Category[]) : []
}

export default async function Home(props: any) {
  const searchParams = props.searchParams
    ? typeof props.searchParams.then === 'function'
      ? await props.searchParams
      : props.searchParams
    : {}

  const limitRaw = searchParams.limit
  const limit = Number(Array.isArray(limitRaw) ? limitRaw[0] : limitRaw || 12)

  const categoryRaw = searchParams.category
  const category = Array.isArray(categoryRaw) ? categoryRaw[0] : categoryRaw || 'all'

  const categories = await getCategories()
  const { videos, hasMore } = await getVideos({ limit, category })

  return (
    <LayoutDefault>
      {/* Filter category */}
      <div className='flex gap-[10px] mb-[20px] overflow-y-auto'>
        <Link
          href={`/?category=all`}
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] flex justify-center items-center ${
            category === 'all' ? 'bg-[#000] text-[#fff]' : 'bg-[#ccc]'
          }`}
          scroll={false}
        >
          Tất cả
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/?category=${cat._id}`}
            className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] flex justify-center items-center ${
              category === cat._id ? 'bg-[#000] text-[#fff]' : 'bg-[#ccc]'
            }`}
            scroll={false}
          >
            {cat.title}
          </Link>
        ))}
      </div>
      {/* Video grid */}
      <Suspense
        fallback={
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6'>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className='hidden sm:block md:block lg:block xl:block'>
                <SkeletonVideoCard />
              </div>
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i + 100} className='block sm:hidden'>
                <SkeletonVideoCard />
              </div>
            ))}
          </div>
        }
      >
        <div className='overflow-x-hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-9'>
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
            <div className='col-span-full text-center text-gray-500 py-8'>Không có video nào.</div>
          )}
        </div>
      </Suspense>
      {/* Nút tải thêm */}
      {hasMore && (
        <div className='flex justify-center pb-8 mt-5'>
          <Link
            href={`/?limit=${limit + 12}${category !== 'all' ? `&category=${category}` : ''}`}
            className='px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition'
          >
            Tải thêm video
          </Link>
        </div>
      )}
    </LayoutDefault>
  )
}
