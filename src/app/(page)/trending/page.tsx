'use client'

import VideoCard from '@/components/card/VideoCard'
import VideoItem from '@/components/card/VideoItem'
import LayoutDefault from '@/components/layouts/default/LayoutDefault'
import CardVideoSkeleton from '@/components/skeleton/CardVideoSkelenton'
import { useGetVideoTrendingQuery } from '@/redux/api/videoApi'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { LoadingOutlined } from '@ant-design/icons'
import Head from 'next/head'

dayjs.extend(isSameOrAfter)

const Trending = () => {
  const [videoType, setVideoType] = useState('long')
  const [page, setPage] = useState(1)
  const [videos, setVideos] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [filterLoading, setFilterLoading] = useState(false)

  const { data: trendings, isLoading } = useGetVideoTrendingQuery({
    page,
    limit: isMobile ? 5 : 12,
    videoType: videoType,
  })

  useEffect(() => {
    if (trendings) {
      if (page === 1) {
        setVideos(trendings?.data)
      } else {
        setVideos((prev) => [...prev, ...trendings?.data])
      }
      setHasMore(trendings.hasMore)
      setFilterLoading(false)
    }
  }, [trendings])

  const handleVideoTypeClick = (videoType: string | any) => {
    setFilterLoading(true)
    setVideoType(videoType)
    setPage(1)
    setHasMore(false)
    setVideos([])
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1)
      }
    },
    [hasMore, isLoading]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [handleObserver])

  return (
    <LayoutDefault>
      <Head>
        <title>Xu hướng - On Tube</title>
        <meta name='description' content='Khám phá video xu hướng mới nhất trên On Tube.' />
        <meta property='og:title' content='Xu hướng - On Tube' />
        <meta
          property='og:description'
          content='Khám phá video xu hướng mới nhất trên On Tube, nơi hội tụ những nội dung hấp dẫn và độc đáo.'
        />
        <meta property='og:image' content='/default-thumbnail.jpg' />
        <meta property='og:type' content='website' />
      </Head>
      <div className='flex gap-3 mb-3'>
        <button
          onClick={() => handleVideoTypeClick('long')}
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            videoType === 'long' ? 'bg-[#333] text-[#fff]' : 'bg-[#ccc] text-[#000]'
          }`}
        >
          Video
        </button>
        <button
          onClick={() => handleVideoTypeClick('short')}
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            videoType === 'short' ? 'bg-[#333] text-[#fff]' : 'bg-[#ccc] text-[#000]'
          }`}
        >
          Short
        </button>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-5'>
        {filterLoading || isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          : videos.map((item: any) => (
              <div key={item._id}>
                {isMobile ? <VideoItem video={item} /> : <VideoCard video={item} />}
              </div>
            ))}
      </div>

      <div ref={loaderRef} className='h-[40px] flex justify-center items-center'>
        {hasMore && !isLoading && <Spin indicator={<LoadingOutlined spin />} size='large' />}
        {!hasMore && <p>...</p>}
      </div>
    </LayoutDefault>
  )
}

export default Trending
