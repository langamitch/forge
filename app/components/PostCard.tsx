import React from "react";

type PostCardProps = {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
};

const PostCard: React.FC<PostCardProps> = ({
  title = "Untitled",
  category = "Uncategorized",
  author = "Unknown",
  date,
}) => {
  return (
    <div>
      <div className="flex flex-col min-w-25 p-2 space-y-2">
        <a href="#">
          <div className="bg-gray-200 border border-gray-300 rounded-sm w-full aspect-video">
            image here
          </div>
        </a>

        <div className="grid grid-cols-12 gap-x-2">
          <div className="flex flex-col col-start-1 col-span-5">
            <p className="text-black font-medium helvetica text-[14px] tracking-[-0.4px]">
              {title}
            </p>
            <p className="muted font-medium helvetica text-[14px] tracking-[-0.4px]">
              {author}
            </p>
          </div>
          <div className="col-start-6 helvetica col-span-5 font-medium text-[14px]">
            {category}
          </div>
          <div className="col-start-11 helvetica col-span-2 text-right">
            {date && <p className="text-[14px] helvetica text-black">{date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
