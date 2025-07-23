export interface VideoCard {
  id: string
  video: {
    _id: string
    title: string
    description: string
    videoUrl: string
    totalView: number
    createdAt: any
    tags: string[]
    allowComments: boolean
    videoThumbnail: string
  }
}

export interface VideoCards {
  item: {
    _id: string
    title: string
    totalView: number
    createdAt: Date
    videoUrl: string
    videoThumbnail: string
    isPublic: boolean
    publishedDate: Date
    writer: {
      _id: string
      avatar: string
      name: string
    }
  }
}

export interface PlayListCard {
  playlist: {
    _id: string
    title: string
    isPublic: boolean
    videos: Array<{
      _id: string
      title: string
      videoThumbnail: string
      videoUrl: string
    }>
  }
}

export interface User {
  _id: string
  avatar: string
  name: string
}

export interface Reply {
  _id: string
  comment: string
  user: User
  createdAt: Date
  updatedAt: Date
  replies?: Reply[]
}

export interface CommentItems {
  comment: {
    _id: string
    createdAt: Date
    comment: string
    user: User
    replies: Reply[]
  }
}

export interface ChannelItems {
  sub: {
    _id: string
    avatar: string
    name: string
    email: string
    description: string
  }
}

export interface VideoItemProp {
  video: {
    _id: string
    videoThumbnail: string
    title: string
    writer: {
      _id: string
      name: string
    }
    totalView: number
    createdAt: string
  }
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface CommentsProps {
  videoId: string | any
  video: any
}

export interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>
  thumbnailUrl: string
  onDelete: () => void
}

export interface Playlist {
  _id: string
  title: string
  isPublic: boolean
  videos: { _id: string }[]
}

export interface ModalProps {
  open: boolean
  setIsModalOpen: (value: boolean) => void
  videoId?: string
  video?: any
}

export interface VideoPlaylistProps {
  video: {
    playlist: string
    _id: string
  }
}

export interface SearchProps {
  showSearch: boolean
  setShowSearch: (value: boolean) => void
}

export interface VideoUploadProps {
  onUpload: (file: File) => Promise<void>
  uploading: boolean
  uploadProgress: number
  videoUrl: string
  onDeleteVideo: () => void
}
