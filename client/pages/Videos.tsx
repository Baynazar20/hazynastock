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
  Filter, 
  Download, 
  Heart, 
  Play,
  Star,
  Eye,
  Clock,
  Film,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock video data
const videoData = [
  {
    id: 1,
    title: "City Traffic Time Lapse 4K",
    category: "Urban",
    tags: ["city", "traffic", "timelapse", "urban", "4k"],
    price: "$8",
    downloads: 1890,
    views: 5670,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    contributor: "Alex Johnson",
    duration: "0:45",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
    contributor: "Sarah Wilson",
    duration: "1:30",
    resolution: "4K (3840x2160)",
    fps: "60",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    contributor: "Mike Davis",
    duration: "0:10",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    contributor: "Emma Chen",
    duration: "2:15",
    resolution: "HD (1920x1080)",
    fps: "24",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    contributor: "Tom Brown",
    duration: "1:45",
    resolution: "4K (3840x2160)",
    fps: "24",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400&h=300&fit=crop",
    contributor: "Lisa Park",
    duration: "0:30",
    resolution: "4K (3840x2160)",
    fps: "30",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    contributor: "David Kim",
    duration: "3:20",
    resolution: "HD (1920x1080)",
    fps: "30",
    format: "MP4"
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
    thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
    contributor: "Anna Rodriguez",
    duration: "1:15",
    resolution: "4K (3840x2160)",
    fps: "24",
    format: "MP4"
  }
];

const categories = ["All", "Urban", "Nature", "Abstract", "Business", "Food", "Technology", "Sports", "Fashion"];
const durations = ["All", "Under 30s", "30s - 1min", "1-2min", "2min+"];
const resolutions = ["All", "HD (1920x1080)", "4K (3840x2160)", "8K+"];
const frameRates = ["All", "24fps", "30fps", "60fps"];
const sortOptions = ["Latest", "Popular", "Most Downloaded", "Highest Rated", "Duration: Short to Long", "Duration: Long to Short"];

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
  const [previewItem, setPreviewItem] = useState<typeof videoData[0] | null>(null);

  useEffect(() => {
    let filtered = videoData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filter by duration
    if (selectedDuration !== "All") {
      filtered = filtered.filter(video => {
        const duration = video.duration;
        const [minutes, seconds] = duration.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
        
        switch (selectedDuration) {
          case "Under 30s": return totalSeconds < 30;
          case "30s - 1min": return totalSeconds >= 30 && totalSeconds <= 60;
          case "1-2min": return totalSeconds > 60 && totalSeconds <= 120;
          case "2min+": return totalSeconds > 120;
          default: return true;
        }
      });
    }

    // Filter by resolution
    if (selectedResolution !== "All") {
      filtered = filtered.filter(video => video.resolution === selectedResolution);
    }

    // Filter by frame rate
    if (selectedFrameRate !== "All") {
      filtered = filtered.filter(video => video.fps === selectedFrameRate.replace('fps', ''));
    }

    // Filter by price
    if (priceFilter === "Free") {
      filtered = filtered.filter(video => video.price === "Free");
    } else if (priceFilter === "Premium") {
      filtered = filtered.filter(video => video.price !== "Free");
    }

    setFilteredVideos(filtered);
  }, [searchQuery, selectedCategory, selectedDuration, selectedResolution, selectedFrameRate, priceFilter]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  HazynaStock
                </span> Videos Library
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Cinematic videos capturing Central Asian culture, landscapes, and traditions
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos by keyword, category, or style..."
                  className="pl-12 h-12 text-lg bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Content */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Category Tabs */}
            <div className="mb-6">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
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
                <span className="text-sm font-medium text-foreground">Video Filters:</span>
              </div>
              
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
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

              <Select value={selectedResolution} onValueChange={setSelectedResolution}>
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

              <Select value={selectedFrameRate} onValueChange={setSelectedFrameRate}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="FPS" />
                </SelectTrigger>
                <SelectContent>
                  {frameRates.map((fps) => (
                    <SelectItem key={fps} value={fps}>
                      {fps}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
            <div className={cn(
              "gap-6 mb-12",
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "space-y-4"
            )}>
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex" : "hover:scale-[1.02]"
                  )}
                  onClick={() => setPreviewItem(video)}
                >
                  <div className={cn(
                    "relative overflow-hidden",
                    viewMode === "list" ? "w-48 flex-shrink-0" : ""
                  )}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={cn(
                        "object-cover group-hover:scale-105 transition-transform duration-300",
                        viewMode === "grid" ? "w-full aspect-video" : "w-full h-full"
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

                    {/* Video Info Badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                        {video.resolution}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                        {video.fps}fps
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Videos
              </Button>
            </div>
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
    </Layout>
  );
}
