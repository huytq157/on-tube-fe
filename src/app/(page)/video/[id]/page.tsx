import LayoutDefault from '@/components/layouts/default/LayoutDefault'
import { Col, Row } from 'antd'
import { notFound } from 'next/navigation'
import VideoDetail from '@/components/card/VideoDetail'
import VideoItem from '@/components/card/VideoItem'
import PlayList from '@/components/shared/Playlist'

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
  thumbnail: string
  totalView: number
  publishedDate: string
  createdAt: string
  description: string
  playlist: string
  tags: string[]
  allowComments: boolean
}

async function getVideo(id: string): Promise<Video | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.data as Video
}

async function getRecommendVideos(id: string): Promise<Video[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/list/recommend/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data.data) ? (data.data as Video[]) : []
}

export default async function VideoDetailPage({ params, searchParams }: any) {
  const video = await getVideo(params.id)
  if (!video) return notFound()
  const recommendVideos = await getRecommendVideos(params.id)
  const fromPlaylist = searchParams?.from === 'playlist'
  const playlistId = searchParams?.playlistId || ''

  return (
    <LayoutDefault>
      <div className='md:px-[3.3%] sm:px-0 pb-[20px] h-full'>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
            <VideoDetail id={video._id} video={video} />
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6}>
            <PlayList
              playlistId={playlistId}
              fromPlaylist={fromPlaylist}
              currentVideoId={video._id}
            />
            <div className='flex flex-col gap-4'>
              {recommendVideos.length > 0 ? (
                recommendVideos.map((video) => <VideoItem key={video._id} video={video} />)
              ) : (
                <div className='text-gray-500 text-center'>Không có video đề xuất.</div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  )
}
