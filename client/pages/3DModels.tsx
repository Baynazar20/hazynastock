import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PreviewModal from "@/components/PreviewModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Footer from "./Footer";
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
  Box,
  Star,
  Eye,
  FileIcon,
  Layers,
  SlidersHorizontal,
  Grid3X3,
  List,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock 3D model data
const modelData = [
  {
    id: 1,
    title: "Modern Office Chair",
    category: "Furniture",
    tags: ["chair", "office", "furniture", "modern", "business"],
    price: "$15",
    downloads: 890,
    views: 2340,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    contributor: "Design Studio",
    fileSize: "2.4 MB",
    polygons: "12,430",
    formats: ["OBJ", "FBX", "GLB"],
    complexity: "Medium",
    rigged: false,
    animated: false,
  },
  {
    id: 2,
    title: "Sci-Fi Spaceship",
    category: "Vehicles",
    tags: ["spaceship", "sci-fi", "vehicle", "futuristic", "space"],
    price: "$25",
    downloads: 1560,
    views: 4320,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    contributor: "3D Artist Pro",
    fileSize: "8.7 MB",
    polygons: "45,680",
    formats: ["OBJ", "FBX", "GLB", "BLEND"],
    complexity: "High",
    rigged: false,
    animated: true,
  },
  {
    id: 3,
    title: "Cartoon Character",
    category: "Characters",
    tags: ["character", "cartoon", "mascot", "3d", "game ready"],
    price: "$30",
    downloads: 2100,
    views: 6540,
    rating: 4.7,
    thumbnail:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=300&fit=crop",
    contributor: "Character Artist",
    fileSize: "5.2 MB",
    polygons: "8,920",
    formats: ["FBX", "GLB", "BLEND"],
    complexity: "Medium",
    rigged: true,
    animated: true,
  },
  {
    id: 4,
    title: "Architectural Building",
    category: "Architecture",
    tags: ["building", "architecture", "modern", "exterior", "commercial"],
    price: "Free",
    downloads: 3210,
    views: 9450,
    rating: 4.6,
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    contributor: "Arch Viz Studio",
    fileSize: "15.6 MB",
    polygons: "89,340",
    formats: ["OBJ", "FBX", "3DS"],
    complexity: "High",
    rigged: false,
    animated: false,
  },
  {
    id: 5,
    title: "Kitchen Appliances Set",
    category: "Props",
    tags: ["kitchen", "appliances", "props", "interior", "home"],
    price: "$12",
    downloads: 1890,
    views: 5210,
    rating: 4.5,
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    contributor: "Interior Designer",
    fileSize: "6.8 MB",
    polygons: "23,560",
    formats: ["OBJ", "FBX", "GLB"],
    complexity: "Medium",
    rigged: false,
    animated: false,
  },
  {
    id: 6,
    title: "Fantasy Sword",
    category: "Weapons",
    tags: ["sword", "fantasy", "weapon", "medieval", "game asset"],
    price: "$8",
    downloads: 2670,
    views: 7890,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    contributor: "Game Assets Co",
    fileSize: "1.9 MB",
    polygons: "5,340",
    formats: ["OBJ", "FBX", "GLB"],
    complexity: "Low",
    rigged: false,
    animated: false,
  },
  {
    id: 7,
    title: "Realistic Tree",
    category: "Nature",
    tags: ["tree", "nature", "realistic", "vegetation", "environment"],
    price: "$10",
    downloads: 1450,
    views: 3980,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    contributor: "Nature 3D",
    fileSize: "4.3 MB",
    polygons: "18,760",
    formats: ["OBJ", "FBX", "GLB"],
    complexity: "Medium",
    rigged: false,
    animated: false,
  },
  {
    id: 8,
    title: "Sports Car",
    category: "Vehicles",
    tags: ["car", "sports", "vehicle", "racing", "automotive"],
    price: "$35",
    downloads: 980,
    views: 2890,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    contributor: "Auto Modeler",
    fileSize: "12.4 MB",
    polygons: "67,890",
    formats: ["OBJ", "FBX", "GLB", "BLEND"],
    complexity: "High",
    rigged: false,
    animated: false,
  },
];

const categories = [
  "All",
  "Furniture",
  "Characters",
  "Vehicles",
  "Architecture",
  "Props",
  "Weapons",
  "Nature",
];
const complexities = ["All", "Low", "Medium", "High"];
const formats = ["All", "OBJ", "FBX", "GLB", "BLEND", "3DS"];
const features = ["All", "Rigged", "Animated", "Game Ready"];
const sortOptions = [
  "Latest",
  "Popular",
  "Most Downloaded",
  "Highest Rated",
  "File Size: Small to Large",
  "Polygons: Low to High",
];

export default function ThreeDModels() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedComplexity, setSelectedComplexity] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredModels, setFilteredModels] = useState(modelData);
  const [previewItem, setPreviewItem] = useState<(typeof modelData)[0] | null>(
    null,
  );

  useEffect(() => {
    let filtered = modelData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (model) =>
          model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (model) => model.category === selectedCategory,
      );
    }

    // Filter by complexity
    if (selectedComplexity !== "All") {
      filtered = filtered.filter(
        (model) => model.complexity === selectedComplexity,
      );
    }

    // Filter by format
    if (selectedFormat !== "All") {
      filtered = filtered.filter((model) =>
        model.formats.includes(selectedFormat),
      );
    }

    // Filter by features
    if (selectedFeature !== "All") {
      filtered = filtered.filter((model) => {
        switch (selectedFeature) {
          case "Rigged":
            return model.rigged;
          case "Animated":
            return model.animated;
          case "Game Ready":
            return (
              model.polygons &&
              parseInt(model.polygons.replace(",", "")) < 20000
            );
          default:
            return true;
        }
      });
    }

    // Filter by price
    if (priceFilter === "Free") {
      filtered = filtered.filter((model) => model.price === "Free");
    } else if (priceFilter === "Premium") {
      filtered = filtered.filter((model) => model.price !== "Free");
    }

    setFilteredModels(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedComplexity,
    selectedFormat,
    selectedFeature,
    priceFilter,
  ]);

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
                3D Models
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Traditional architecture, cultural artifacts, and Central Asian
                design elements in 3D
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search 3D models by name, category, or style..."
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
                  3D Filters:
                </span>
              </div>

              <Select
                value={selectedComplexity}
                onValueChange={setSelectedComplexity}
              >
                <SelectTrigger className="w-32">
                  <Layers className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  {complexities.map((complexity) => (
                    <SelectItem key={complexity} value={complexity}>
                      {complexity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-32">
                  <FileIcon className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredModels.length} 3D models
              </p>
            </div>

            {/* Models Grid/List */}
            <div
              className={cn(
                "gap-6 mb-12",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4",
              )}
            >
              {filteredModels.map((model) => (
                <Card
                  key={model.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex" : "hover:scale-[1.02]",
                  )}
                  onClick={() => setPreviewItem(model)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "list" ? "w-48 flex-shrink-0" : "",
                    )}
                  >
                    <img
                      src={model.thumbnail}
                      alt={model.title}
                      className={cn(
                        "object-cover group-hover:scale-105 transition-transform duration-300",
                        viewMode === "grid"
                          ? "w-full aspect-square"
                          : "w-full h-full",
                      )}
                    />

                    {/* 3D Viewer Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary/90 rounded-lg p-3">
                        <Maximize2 className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {model.rigged && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-600 text-white"
                        >
                          Rigged
                        </Badge>
                      )}
                      {model.animated && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-purple-600 text-white"
                        >
                          Animated
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mb-[20px]">
              <Button variant="outline" size="lg">
                Load More Models
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
