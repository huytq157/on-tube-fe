export default function SkeletonVideoCard() {
  return (
    <div className='border border-gray-200 rounded-xl p-4 bg-white shadow animate-pulse'>
      <div className='w-full aspect-video bg-gray-200 rounded mb-4' />
      <div className='h-5 bg-gray-200 rounded w-3/4 mb-2' />
      <div className='h-4 bg-gray-100 rounded w-1/2' />
    </div>
  )
}
