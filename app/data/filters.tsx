// data/filters.ts
export type Filter = {
  id: string;
  label: string;
  icon?: string;
};

export const filters: Filter[] = [
  { id: "all", label: "All", icon: "interests" },
  { id: "portfolio", label: "Portfolio", icon: "work" },
  { id: "utilities", label: "Utilities", icon: "build" },
  { id: "ai", label: "AI", icon: "robot" },
  { id: "e-commerce", label: "E-commerce", icon: "shopping_basket" },
  { id: "agency", label: "Agency", icon: "apartment" },
  { id: "non-profit", label: "Non-profit", icon: "volunteer_activism" },
  { id: "blog", label: "Blog", icon: "article" },
  { id: "personal", label: "Personal", icon: "person" },
  { id: "mobile-app", label: "Mobile App", icon: "mobile_3" },
  { id: "desktop-app", label: "Desktop App", icon: "desktop_windows" },
  { id: "development", label: "Development", icon: "code_blocks" },
  { id: "design", label: "Design", icon: "palette" },
  { id: "saas", label: "SAAS", icon: "cloud" },
  { id: "finance", label: "Finance", icon: "attach_money" },
  { id: "fashion", label: "Fashion", icon: "checkroom" },
  { id: "health", label: "Health", icon: "health_and_safety" },
  { id: "art", label: "Art", icon: "brush" },
  { id: "homeware", label: "Homeware", icon: "home" },
  { id: "music", label: "Music", icon: "graphic_eq" },
  { id: "gaming", label: "Gaming", icon: "sports_esports" },
  { id: "news", label: "News", icon: "newspaper" },
  { id: "real-estate", label: "Real Estate", icon: "home" },
  { id: "nft", label: "NFT", icon: "currency_bitcoin" },
  { id: "sports", label: "Sports", icon: "sports_soccer" },
  { id: "tech", label: "Tech", icon: "memory" },
  { id: "f1", label: "F1", icon: "sports_motorsports" },
  { id: "web3", label: "Web3", icon: "public" },
  { id: "food-and-drinks", label: "Food & Drinks", icon: "restaurant" },
  { id: "beauty", label: "Beauty", icon: "spa" },
  { id: "photography", label: "Photography", icon: "photo_camera" },
  { id: "motion", label: "Motion", icon: "movie" },
  { id: "education", label: "Education", icon: "school" },
];
