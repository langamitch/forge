"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "./PostCard";

const PostGrid = () => {
  const [posts, setPosts] = useState<
    Array<{
      id: string;
      url: string;
      title: string;
      author: string;
      date: string;
      category: string;
      imagePath?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from("website_submissions")
          .select("*");

        if (error) throw error;

        const mappedPosts = data.map((submission) => ({
          id: submission.id,
          url: submission.website_url,
          title: submission.website_title,
          author: submission.authors[0]?.name || "Unknown",
          date: new Date(submission.created_at).getFullYear().toString(),
          category: submission.categories[0] || "Uncategorized",
          imagePath: submission.image_path,
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid sm:grid-cols-1 p-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          url={post.url}
          title={post.title}
          category={post.category}
          author={post.author}
          date={post.date}
          imagePath={post.imagePath}
        />
      ))}
    </div>
  );
};

export default PostGrid;
