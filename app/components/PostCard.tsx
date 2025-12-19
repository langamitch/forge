import React from "react";

type PostCardProps = {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
  imagePath?: string;
};

const PostCard: React.FC<PostCardProps> = ({
  title = "Untitled",
  category = "Uncategorized",
  author = "Unknown",
  date,
  imagePath,
}) => {
  // Construct the full image URL
  const imageUrl = imagePath
    ? `https://vbcvredghjxiirqxroqg.supabase.co/storage/v1/object/public/media/${encodeURIComponent(
        imagePath
      )}`
    : null;

  return (
    <div>
      <div className="flex flex-col min-w-25 p-2 space-y-2">
        <a href="#">
          <div className="bg-gray-200 border border-gray-300 rounded-sm w-full aspect-video">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded-sm"
                onError={(e) => {
                  console.error("Failed to load image:", imageUrl);
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
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
