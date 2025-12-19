import PostGrid from "./components/PostGrid";
import CategoryFilter from "./components/CategoryFilter";
import Hero from "./components/Hero";
import BottomNavbar from "./components/BottomNavbar";
import Loader from "./components/Loader";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="relative mt-[100vh] bg-white z-10">
        <CategoryFilter />

        <PostGrid />

        <BottomNavbar />
      </div>
    </>
  );
}
