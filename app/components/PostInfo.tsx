import React from 'react'

const PostInfo = () => {

    const post = {
        id: '1',
        date_added: 'Dec 19, 2025',
        views: '11K Views',
        description: 'It has been 14 years  since I got into design. I now have clear principles, the main one being . It is easy to print generic solutions, but what we designers are hired for is our unique point of view and creative thinking. Usability combined with aesthetics is the key to memorable and enjoyable products.',
        type: 'Portfolio, E-commerce',
        framework: 'Next.js, Tailwind CSS',
        url: 'https://example.com',
        title: 'Kons',}

  return (
    <div>
      <div className='p-4'> 
        <div></div>
        <div className='gap-1 flex flex-col'>
            <h1 className="text-black sans text-[18px] capitalize">{post.title}</h1>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
            <button className='bg-black border-none sans text-semibold text-white text-[16px] px-3 py-1 rounded-full'>Visit</button>
            </a>
            <p className='text-[#777777] text-medium text-[14px] '>{post.date_added}</p>
            <p className='text-[#777777] text-medium text-[14px] '>{post.views}</p>

        </div>

        <div className='mt-4'>
            <p>{post.description}</p>
        </div>
        <div className='flex flex-row'>
            <div className='w-[50%] mt-4'>
            <p className='text-black'>Type</p>
            <p>{post.type}</p>
            </div>
            <div className=''>
                <p>Frameworks</p>
                <p>{post.framework}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostInfo
