'use client'

import React, { useState } from 'react'
import VideoCard from '@/components/card/VideoCard'
import LayoutDefault from '@/components/layouts/default/LayoutDefault'
import CardVideoSkeleton from '@/components/skeleton/CardVideoSkelenton'
import { useGetlikeVideoQuery } from '@/redux/api/videoApi'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useUser } from '@/hook/AuthContext'
import VideoItem from '@/components/card/VideoItem'
import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'

dayjs.extend(isSameOrAfter)

const Favourite = () => {
  const [videoType, setVideoType] = useState('long')
  const { isAuthenticated } = useUser()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const { data: favouries, isLoading } = useGetlikeVideoQuery(
    { videoType: videoType },
    {
      skip: !isAuthenticated,
    }
  )

  return (
    <LayoutDefault>
      <Head>
        <title>Video Yêu Thích - On Tube</title>
        <meta name='description' content='Khám phá các video yêu thích của bạn trên On Tube.' />
        <meta property='og:title' content='Video Yêu Thích - On Tube' />
        <meta
          property='og:description'
          content='Khám phá các video yêu thích của bạn trên On Tube, nơi bạn có thể tìm thấy tất cả các video mà bạn đã yêu thích.'
        />
        <meta property='og:image' content='/default-thumbnail.jpg' />
        <meta property='og:type' content='website' />
      </Head>
      <div className='flex gap-3 mb-3'>
        <button
          onClick={() => setVideoType('long')}
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            videoType === 'long' ? 'bg-[#333] text-[#fff]' : 'bg-[#ccc] text-[#000]'
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setVideoType('short')}
          type='button'
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            videoType === 'short' ? 'bg-[#333] text-[#fff]' : 'bg-[#ccc] text-[#000]'
          }`}
        >
          Short
        </button>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-5'>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          : favouries?.data
              .filter(
                (item: any) =>
                  item.isPublic && dayjs().isSameOrAfter(dayjs(item.publishedDate), 'day')
              )
              .map((item: any) => (
                <div key={item._id}>
                  {isMobile ? <VideoItem video={item} /> : <VideoCard video={item} />}
                </div>
              ))}
      </div>
    </LayoutDefault>
  )
}

export default Favourite
