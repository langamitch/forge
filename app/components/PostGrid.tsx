import React from "react";
import PostCard from "./PostCard";

const PostGrid = () => {
  const postContent = [
    {
      id: 1,
      title: "Reowned",
      author: "Ethan Chui",
      date: "2025",
      category: "Portfolio",
    },
    {
      id: 2,
      title: "Watt",
      author: "Sarah Johnson",
      date: "2025",
      category: "Tool",
    },
    {
      id: 3,
      title: "Nova",
      author: "Mike Chen",
      date: "2025",
      category: "Ai",
    },
    {
      id: 4,
      title: "The Minolith",
      author: "Emma Wilson",
      date: "2025",
      category: "E-commerce",
    },
    {
      id: 5,
      title: "Acor",
      author: "Alex Rodriguez",
      date: "2025",
      category: "E-commerce",
    },
    {
      id: 6,
      title: "Tereso",
      author: "James Lee",
      date: "2025",
      category: "Agency",
    },
    {
      id: 7,
      title: "Osmo",
      author: "Lisa Chen",
      date: "2025",
      category: "Non-profit",
    },
    {
      id: 8,
      title: "House Of ESAM",
      author: "David Brown",
      date: "2025",
      category: "Blog",
    },
    {
      id: 9,
      title: "Mojo",
      author: "Rachel Green",
      date: "2025",
      category: "Agency",
    },
    {
      id: 10,
      title: "Infinite",
      author: "Tom Knight",
      date: "2025",
      category: "Experimental",
    },
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-1 p-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
