import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PreviewModal from "@/components/PreviewModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Download,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

// Mock image data
const imageData = [
  {
    id: 1,
    title: "Mountain Landscape at Golden Hour",
    category: "Nature",
    tags: ["landscape", "mountain", "sunset", "nature", "golden hour"],
    price: "Free",
    downloads: 2340,
    views: 8750,
    rating: 4.9,
    thumbnail:
      "./image_cat/1.jpg",
    contributor: "Aman Kekilow",
    resolution: "6000x4000",
    orientation: "landscape",
    dominantColor: "#F59E0B",
    type: "image",
  },
  {
    id: 2,
    title: "Modern Abstract Geometric Pattern",
    category: "Abstract",
    tags: ["abstract", "geometric", "pattern", "modern", "design"],
    price: "$3",
    downloads: 1890,
    views: 5670,
    type: "image",
    rating: 4.7,
    thumbnail:
      "./image_cat/2.jpg",
    contributor: "Bahar Saryyeva",
    resolution: "4000x6000",
    orientation: "portrait",
    dominantColor: "#3B82F6",
  },
  {
    id: 3,
    title: "Urban Street Photography",
    category: "Urban",
    tags: ["street", "city", "urban", "people", "lifestyle"],
    price: "$5",
    type: "image",
    downloads: 1456,
    views: 4320,
    rating: 4.8,
    thumbnail:
      "./image_cat/3.jpg",
    contributor: "Dowlet Kakayew",
    resolution: "5000x3000",
    orientation: "landscape",
    dominantColor: "#6B7280",
  },
  {
    id: 4,
    title: "Minimalist Workspace Setup",
    category: "Business",
    tags: ["workspace", "minimal", "office", "desk", "productivity"],
    price: "Free",
    downloads: 3210,
    type: "image",
    views: 9450,
    rating: 4.6,
    thumbnail:
      "./image_cat/9.jpg",
    contributor: "Muhammedov Jeyhun",
    resolution: "4500x3000",
    orientation: "landscape",
    dominantColor: "#F3F4F6",
  },
  {
    id: 5,
    title: "Tropical Beach Paradise",
    category: "Nature",
    tags: ["beach", "tropical", "ocean", "paradise", "vacation"],
    price: "$4",
    downloads: 2100,
    views: 7800,
    type: "image",
    rating: 4.9,
    thumbnail:
      "./image_cat/5.jpg",
    contributor: "Atayewa Jemal",
    resolution: "6000x4000",
    orientation: "landscape",
    dominantColor: "#06B6D4",
  },
  {
    id: 6,
    title: "Vintage Film Camera",
    category: "Technology",
    tags: ["camera", "vintage", "photography", "retro", "film"],
    price: "$3",
    downloads: 1670,
    type: "image",
    views: 3980,
    rating: 4.5,
    thumbnail:
      "./image_cat/10.jpg",
    contributor: "Dowletjan Dowletow",
    resolution: "4000x4000",
    orientation: "square",
    dominantColor: "#8B5CF6",
  },
  {
    id: 7,
    title: "Fresh Organic Vegetables",
    category: "Food",
    tags: ["food", "vegetables", "organic", "fresh", "healthy"],
    price: "Free",
    downloads: 2890,
    type: "image",
    views: 6540,
    rating: 4.7,
    thumbnail:
      "./image_cat/7.jpg",
    contributor: "Kerim Dowranov",
    resolution: "5000x3500",
    orientation: "landscape",
    dominantColor: "#10B981",
  },
  {
    id: 8,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/8.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 9,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/11.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 10,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/12.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 11,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/13.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 12,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/14.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 13,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/15.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 14,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/16.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 15,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/17.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
  {
    id: 16,
    title: "Cozy Reading Corner",
    category: "Lifestyle",
    tags: ["reading", "cozy", "books", "interior", "home"],
    price: "$2",
    downloads: 1340,
    views: 4210,
    type: "image",
    rating: 4.8,
    thumbnail:
      "./image_cat/18.jpg",
    contributor: "Bayramov Niyazmyrat",
    resolution: "3000x4500",
    orientation: "portrait",
    dominantColor: "#D97706",
  },
];

const categories = [
  "All",
  "Nature",
  "Abstract",
  "Urban",
  "Business",
  "Technology",
  "Food",
  "Lifestyle",
];
const orientations = ["All", "Landscape", "Portrait", "Square"];
const resolutions = ["All", "HD (1920x1080)", "4K (3840x2160)", "6K+"];
const sortOptions = [
  "Latest",
  "Popular",
  "Most Downloaded",
  "Highest Rated",
  "Price: Low to High",
  "Price: High to Low",
];

export default function Images() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrientation, setSelectedOrientation] = useState("All");
  const [selectedResolution, setSelectedResolution] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [previewItem, setPreviewItem] = useState<(typeof imageData)[0] | null>(
    null,
  );

  useEffect(() => {
    let filtered = imageData;

    if (searchQuery) {
      filtered = filtered.filter(
        (image) =>
          image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          image.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (image) => image.category === selectedCategory,
      );
    }

    // Filter by orientation
    if (selectedOrientation !== "All") {
      filtered = filtered.filter(
        (image) => image.orientation === selectedOrientation.toLowerCase(),
      );
    }

    // Filter by price
    if (priceFilter === "Free") {
      filtered = filtered.filter((image) => image.price === "Free");
    } else if (priceFilter === "Premium") {
      filtered = filtered.filter((image) => image.price !== "Free");
    }

    setFilteredImages(filtered);
  }, [searchQuery, selectedCategory, selectedOrientation, priceFilter]);

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
                </span>{" "}
                Images Gallery
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover authentic Central Asian imagery from traditional
                bazaars to modern cityscapes
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search images by keyword, style, or category..."
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
            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                {/* Category Tabs */}
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="mb-6"
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
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-dark-surface rounded-lg">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Filters:
                </span>
              </div>

              <Select
                value={selectedOrientation}
                onValueChange={setSelectedOrientation}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Orientation" />
                </SelectTrigger>
                <SelectContent>
                  {orientations.map((orientation) => (
                    <SelectItem key={orientation} value={orientation}>
                      {orientation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedResolution}
                onValueChange={setSelectedResolution}
              >
                <SelectTrigger className="w-40">
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
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredImages.length} images
              </p>
            </div>

            {/* Images Grid */}
            <div
              className={cn(
                "gap-6 mb-12",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6",
              )}
            >
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                    viewMode === "masonry" && "break-inside-avoid",
                  )}
                  onClick={() => setPreviewItem(image)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className={cn(
                        "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                        viewMode === "grid" ? "aspect-square" : "h-auto",
                      )}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Overlay Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Resolution Badge */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-black/70 text-white"
                      >
                        {image.resolution}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mb-[20px]">
              <Button variant="outline" size="lg">
                Load More Images
              </Button>
            </div>
          </div>
          <Footer />
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
