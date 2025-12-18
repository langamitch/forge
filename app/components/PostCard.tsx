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
          <div className="bg-gray-200 border border-gray-300 rounded-lg w-full aspect-video">image place</div>
        </a>

        <div className="grid grid-cols-12 gap-x-2">
          <div className="flex flex-col col-start-1 col-span-5">
            <p className="text-black font-normal sans text-[14px] tracking-[-0.4px]">
              {title}
            </p>
            <p className="muted font-normal sans text-[12px] tracking-[-0.4px]">
              {author}
            </p>
          </div>
          <div className="col-start-6 col-span-3">{category}</div>
          <div className="col-start-9 col-span-4 text-right">
            {date && <p className="muted text-[12px]">{date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
