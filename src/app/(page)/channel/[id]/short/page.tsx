'use client'

import VideoCard from '@/components/card/VideoCard'
import VideoItem from '@/components/card/VideoItem'
import CardVideoSkeleton from '@/components/skeleton/CardVideoSkelenton'
import { useGetChannelVideoQuery } from '@/redux/api/channelApi'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ShortChannel = () => {
  const params = useParams()
  const { id } = params
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [sortBy, setSortBy] = useState<string>('newest')

  const { data: videos, isLoading } = useGetChannelVideoQuery({
    id,
    isPublic: true,
    page: 1,
    limit: 12,
    videoType: 'short',
    sortBy: sortBy,
  })

  return (
    <div>
      <div className='flex gap-2 mb-3'>
        <button
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            sortBy === 'newest' ? 'bg-[#000] text-[#fff]' : 'bg-[#ccc]'
          }`}
          onClick={() => setSortBy('newest')}
        >
          Mới nhất
        </button>
        <button
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            sortBy === 'oldest' ? 'bg-[#000] text-[#fff]' : 'bg-[#ccc]'
          }`}
          onClick={() => setSortBy('oldest')}
        >
          Cũ nhất
        </button>
      </div>

      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-2 gap-y-5'>
        {videos?.data?.map((video: any) => (
          <div key={video._id}>
            {isMobile ? <VideoItem video={video} /> : <VideoCard video={video} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShortChannel
