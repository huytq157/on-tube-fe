'use client'

import VideoCard from '@/components/card/VideoCard'
import LayoutDefault from '@/components/layouts/default/LayoutDefault'
import CardVideoSkeleton from '@/components/skeleton/CardVideoSkelenton'
import { useSearchVideoQuery } from '@/redux/api/videoApi'
import { useSearchChannelQuery } from '@/redux/api/channelApi'
import { Col, Row, Tabs } from 'antd'
import { useSearchParams } from 'next/navigation'
import ChannelItem from '@/components/card/ChannelItem'
import VideoItem from '@/components/card/VideoItem'
import { useMediaQuery } from 'react-responsive'

const PageResult = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q')
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { data: videoResults, isLoading: isLoadingVideos } = useSearchVideoQuery(searchTerm || '', {
    skip: !searchTerm,
  })

  const { data: channelResults, isLoading: isLoadingChannels } = useSearchChannelQuery(
    searchTerm || '',
    {
      skip: !searchTerm,
    }
  )

  const tabItems = [
    {
      label: 'Videos',
      key: '1',
      children: (
        <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-5'>
          {isLoadingVideos ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          ) : videoResults && videoResults.results?.length > 0 ? (
            videoResults.results.map((item: any) => (
              <div key={item._id}>
                {isMobile ? <VideoItem video={item} /> : <VideoCard video={item} />}
              </div>
            ))
          ) : (
            <p>
              Không tìm thấy video cho từ khóa <strong>&ldquo;{searchTerm}&rdquo;</strong>
            </p>
          )}
        </div>
      ),
    },
    {
      label: 'Kênh',
      key: '2',
      children: (
        <div className='flex justify-center md:w-[50%] sm:w-full'>
          <Row gutter={[18, 48]}>
            {isLoadingChannels ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            ) : channelResults && channelResults.results?.length > 0 ? (
              channelResults.results.map((item: any) => (
                <Col key={item?._id} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                  <ChannelItem sub={item} />
                </Col>
              ))
            ) : (
              <p>
                Không tìm thấy kênh cho từ khóa <strong>&ldquo;{searchTerm}&rdquo;</strong>
              </p>
            )}
          </Row>
        </div>
      ),
    },
  ]

  return (
    <LayoutDefault>
      <Tabs
        defaultActiveKey='1'
        tabBarStyle={{
          color: '#333',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
        items={tabItems}
      />
    </LayoutDefault>
  )
}

export default PageResult
