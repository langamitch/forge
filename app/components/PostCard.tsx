import React from 'react'

const PostCard = () => {
  return (
    <div>
      <div className='flex flex-col'>
        <a href="#">
            <div>image here</div>
        </a>

        <div className='grid grid-cols-12 gap-x-2'>
            <div className="flex flex-col col-start-1 col-span-5">
                <p className="text-black font-normal sans text-[14px] tracking-[-0.4px] ">Reown</p>
                <p className="muted font-normal sans text-[14px] tracking-[-0.4px] ">Undisturbed Connection</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
