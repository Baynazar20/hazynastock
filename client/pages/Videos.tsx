import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PreviewModal from "@/components/PreviewModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Download,
  Heart,
  Play,
  Clock,
  Film,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import Pagination from "@/components/Pagination";

const videoData = [
  {
    id: 1,
    title: "Future Technology 2025",
    category: "Technology",
    tags: ["future", "technology", "innovation"],
    price: "$8",
    downloads: 1890,
    views: 5670,
    rating: 4.8,
    thumbnail: "https://img.youtube.com/vi/eGc14QIEF2o/maxresdefault.jpg",
    video: "https://www.youtube.com/watch?v=eGc14QIEF2o",
    contributor: "Aman Kekilow",
    duration: "9:56",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4",
  },
  {
    id: 2,
    title: "Ocean Waves Slow Motion",
    category: "Nature",
    tags: ["ocean", "waves", "water", "slow motion", "peaceful"],
    price: "$12",
    downloads: 2340,
    views: 7890,
    rating: 4.9,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    contributor: "Bahar Saryyeva",
    duration: "10:53",
    resolution: "4K (3840x2160)",
    fps: "60",
    format: "MP4",
  },
  {
    id: 3,
    title: "Abstract Particle Animation",
    category: "Abstract",
    tags: ["abstract", "particles", "animation", "motion graphics", "loop"],
    price: "$15",
    downloads: 1560,
    views: 4320,
    rating: 4.7,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    contributor: "Dowlet Kakayew",
    duration: "0:15",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4",
  },
  {
    id: 4,
    title: "Corporate Meeting Room",
    category: "Business",
    tags: ["business", "meeting", "corporate", "office", "professional"],
    price: "Free",
    downloads: 3210,
    views: 9450,
    rating: 4.6,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    contributor: "Muhammedov Jeyhun",
    duration: "0:15",
    resolution: "HD (1920x1080)",
    fps: "24",
    format: "MP4",
  },
  {
    id: 5,
    title: "Cooking Food Preparation",
    category: "Food",
    tags: ["cooking", "food", "kitchen", "preparation", "chef"],
    price: "$6",
    downloads: 2100,
    views: 6540,
    rating: 4.8,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    contributor: "Atayewa Jemal",
    duration: "0:60",
    resolution: "4K (3840x2160)",
    fps: "24",
    format: "MP4",
  },
  {
    id: 6,
    title: "Technology Circuit Animation",
    category: "Technology",
    tags: ["technology", "circuit", "digital", "animation", "futuristic"],
    price: "$10",
    downloads: 1670,
    views: 3980,
    rating: 4.5,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    contributor: "Dowletjan Dowletow",
    duration: "0:15",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4",
  },
  {
    id: 7,
    title: "Workout Fitness Training",
    category: "Sports",
    tags: ["fitness", "workout", "training", "gym", "health"],
    price: "$5",
    downloads: 1890,
    views: 5210,
    rating: 4.7,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    contributor: "Kerim Dowranov",
    duration: "0:15",
    resolution: "HD (1920x1080)",
    fps: "30",
    format: "MP4",
  },
  {
    id: 8,
    title: "Fashion Model Portrait",
    category: "Fashion",
    tags: ["fashion", "model", "portrait", "beauty", "style"],
    price: "$20",
    downloads: 980,
    views: 2890,
    rating: 4.9,
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    contributor: "Bayramov Niyazmyrat",
    duration: "12:18",
    resolution: "4K (3840x2160)",
    fps: "24",
    format: "MP4",
  },
];

const categories = [
  "All",
  "Urban",
  "Nature",
  "Abstract",
  "Business",
  "Food",
  "Technology",
  "Sports",
  "Fashion",
];
const durations = ["All", "Under 30s", "30s - 1min", "1-2min", "2min+"];
const resolutions = ["All", "HD (1920x1080)", "4K (3840x2160)", "8K+"];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedResolution, setSelectedResolution] = useState("All");
  const [selectedFrameRate, setSelectedFrameRate] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredVideos, setFilteredVideos] = useState(videoData);
  const [previewItem, setPreviewItem] = useState<(typeof videoData)[0] | null>(
    null,
  );
  const [likedItems, setLikedItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  useEffect(() => {
    let filtered = videoData;
    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (video) => video.category === selectedCategory,
      );
    }

    // Filter by duration
    if (selectedDuration !== "All") {
      filtered = filtered.filter((video) => {
        const duration = video.duration;
        const [minutes, seconds] = duration.split(":").map(Number);
        const totalSeconds = minutes * 60 + seconds;

        switch (selectedDuration) {
          case "Under 30s":
            return totalSeconds < 30;
          case "30s - 1min":
            return totalSeconds >= 30 && totalSeconds <= 60;
          case "1-2min":
            return totalSeconds > 60 && totalSeconds <= 120;
          case "2min+":
            return totalSeconds > 120;
          default:
            return true;
        }
      });
    }

    // Filter by resolution
    if (selectedResolution !== "All") {
      filtered = filtered.filter(
        (video) => video.resolution === selectedResolution,
      );
    }

    // Filter by frame rate
    if (selectedFrameRate !== "All") {
      filtered = filtered.filter(
        (video) => video.fps === selectedFrameRate.replace("fps", ""),
      );
    }

    // Filter by price
    if (priceFilter === "Free") {
      filtered = filtered.filter((video) => video.price === "Free");
    } else if (priceFilter === "Premium") {
      filtered = filtered.filter((video) => video.price !== "Free");
    }

    setFilteredVideos(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedDuration,
    selectedResolution,
    selectedFrameRate,
    priceFilter,
  ]);

  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Filters and Content */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Category Tabs */}
            <div className="mb-6">
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <TabsList className="flex min-w-max bg-dark-surface2 p-1 gap-1">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs lg:text-sm whitespace-nowrap px-3 py-2 flex-shrink-0"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-dark-surface rounded-lg">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Video Filters:
                </span>
              </div>

              <Select
                value={selectedDuration}
                onValueChange={setSelectedDuration}
              >
                <SelectTrigger className="w-32">
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedResolution}
                onValueChange={setSelectedResolution}
              >
                <SelectTrigger className="w-40">
                  <Film className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Resolution" />
                </SelectTrigger>
                <SelectContent>
                  {resolutions.map((resolution) => (
                    <SelectItem key={resolution} value={resolution}>
                      {resolution}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredVideos.length} videos
              </p>
            </div>

            {/* Videos Grid/List */}
            <div
              className={cn(
                "gap-6 mb-12",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4",
              )}
            >
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex" : "hover:scale-[1.02]",
                  )}
                  onClick={() => setPreviewItem(video)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "list" ? "w-48 flex-shrink-0" : "",
                    )}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={cn(
                        "object-cover group-hover:scale-105 transition-transform duration-300",
                        viewMode === "grid"
                          ? "w-full aspect-video"
                          : "w-full h-full",
                      )}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary/90 rounded-full p-4">
                        <Play className="h-8 w-8 text-primary-foreground fill-current" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-black/70 text-white"
                      >
                        {video.resolution}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-black/70 text-white"
                      >
                        {video.fps}fps
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0",
                          likedItems.has(video.id) && "text-red-500", // Like edilende reňk üýtger
                        )}
                        onClick={(e) => {
                          e.stopPropagation(); // Modal açylmagyň öňüni al
                          toggleLike(video.id);
                        }}
                      >
                        <Heart
                          className="h-4 w-4"
                          fill={
                            likedItems.has(video.id) ? "currentColor" : "none"
                          }
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </section>

        {/* Preview Modal */}
        {previewItem && (
          <PreviewModal
            isOpen={!!previewItem}
            onClose={() => setPreviewItem(null)}
            item={previewItem}
          />
        )}
      </div>
      <Footer />
    </Layout>
  );
}
