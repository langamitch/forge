import React from "react";
import PostCard from "./PostCard";

const PostGrid = () => {
  const postContent = [
    {
      id: 1,
      title: "Reowned",
      author: "Ethan Chui",
      date: "Dec 15, 2025",
      category: "Portfolio",
    },
    {
      id: 2,
      title: "Watt",
      author: "Sarah Johnson",
      date: "Dec 14, 2025",
      category: "Tool",
    },
    {
      id: 3,
      title: "Nova",
      author: "Mike Chen",
      date: "Dec 13, 2025",
      category: "Ai",
    },
    {
      id: 4,
      title: "The Minolith",
      author: "Emma Wilson",
      date: "Dec 12, 2025",
      category: "E-commerce",
    },
    {
      id: 5,
      title: "Acor",
      author: "Alex Rodriguez",
      date: "Dec 11, 2025",
      category: "E-commerce",
    },
    {
      id: 6,
      title: "Tereso",
      author: "James Lee",
      date: "Dec 10, 2025",
      category: "Agency",
    },
    {
      id: 7,
      title: "Osmo",
      author: "Lisa Chen",
      date: "Dec 9, 2025",
      category: "Non-profit",
    },
    {
      id: 8,
      title: "House Of Corto",
      author: "David Brown",
      date: "Dec 8, 2025",
      category: "Blog",
    },
    {
      id: 9,
      title: "Mojo",
      author: "Rachel Green",
      date: "Dec 7, 2025",
      category: "Agency",
    },
    {
      id: 10,
      title: "Infinite",
      author: "Tom Knight",
      date: "Dec 6, 2025",
      category: "Experimental",
    },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-1 gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
        {postContent.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            category={post.category}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
