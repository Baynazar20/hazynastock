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
  Image as ImageIcon,
  Video,
  Box,
  Sparkles,
  Star,
  TrendingUp,
  Eye,
  ChevronDown,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Mountain Landscape at Sunset",
    category: "Nature",
    tags: ["landscape", "mountain", "sunset", "nature"],
    price: "$3",
    downloads: 1234,
    views: 5678,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    contributor: "John Doe",
    featured: true
  },
  {
    id: 2,
    type: "video",
    title: "City Traffic Time Lapse",
    category: "Urban",
    tags: ["city", "traffic", "timelapse", "urban"],
    price: "$5",
    downloads: 890,
    views: 3456,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    contributor: "Jane Smith",
    duration: "0:30"
  },
  {
    id: 3,
    type: "3d",
    title: "Modern Chair 3D Model",
    category: "Furniture",
    tags: ["chair", "furniture", "modern", "3d"],
    price: "$12",
    downloads: 456,
    views: 2134,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    contributor: "Alex Johnson"
  },
  {
    id: 4,
    type: "icon",
    title: "Business Icon Pack",
    category: "Business",
    tags: ["business", "icons", "pack", "office"],
    price: "Free",
    downloads: 2345,
    views: 8901,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    contributor: "Sarah Wilson"
  },
  {
    id: 5,
    type: "image",
    title: "Abstract Geometric Pattern",
    category: "Abstract",
    tags: ["abstract", "geometric", "pattern", "design"],
    price: "$3",
    downloads: 678,
    views: 1234,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    contributor: "Mike Davis"
  },
  {
    id: 6,
    type: "video",
    title: "Ocean Waves Slow Motion",
    category: "Nature",
    tags: ["ocean", "waves", "water", "slow motion"],
    price: "$8",
    downloads: 345,
    views: 1567,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
    contributor: "Emma Brown",
    duration: "1:45"
  }
];

const categories = ["All", "Nature", "Urban", "Abstract", "Business", "Furniture"];
const sortOptions = ["Latest", "Popular", "Most Downloaded", "Highest Rated"];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(mediaItems);
  const [previewItem, setPreviewItem] = useState<typeof mediaItems[0] | null>(null);

  useEffect(() => {
    let filtered = mediaItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, selectedType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "3d": return <Box className="h-4 w-4" />;
      case "icon": return <Sparkles className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 py-16 md:py-20 px-4 md:px-6">
          <div className="absolute inset-0 geometric-pattern opacity-20"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl">
                  <Star className="h-8 w-8 md:h-10 md:w-10 text-white fill-current" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                HazynaStock
              </span>
              <br />
              <span className="text-foreground text-2xl md:text-4xl lg:text-5xl">Central Asia Media Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover authentic Central Asian content - from traditional bazaars to modern cityscapes.
              High-quality images, videos, 3D models, and icons celebrating our rich cultural heritage.
            </p>
            
            {/* Enhanced Search */}
            <div className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl border border-amber-500/20">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bazaars, landscapes, patterns..."
                    className="pl-12 h-12 md:h-14 text-base md:text-lg bg-background border-amber-500/20 focus:border-amber-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-40 h-10 md:h-12 touch-friendly">
                      <SelectValue placeholder="Media Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="3d">3D Models</SelectItem>
                      <SelectItem value="icon">Icons</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="lg" className="h-10 md:h-12 px-6 md:px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 touch-friendly">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Cultural Quick Search Tags */}
            <div className="max-w-4xl mx-auto mt-6">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {["Traditional Architecture", "Silk Road", "Nomadic Culture", "Carpets & Textiles", "Bazaars"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300 mobile-nav-item"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Featured Content</h2>
                <p className="text-muted-foreground">Handpicked content celebrating Central Asian heritage</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto touch-friendly">
                <Crown className="h-4 w-4 mr-2 text-amber-500" />
                View All Featured
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {mediaItems.filter(item => item.featured).map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setPreviewItem(item)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>by {item.contributor}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{item.price}</span>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {item.downloads}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {item.views}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Gallery */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-dark-surface relative">
          <div className="absolute inset-0 central-asian-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Filters */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse Collection</h2>
                <p className="text-muted-foreground">Authentic content from across Central Asia</p>
              </div>

              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <TabsList className="flex min-w-max bg-dark-surface2 p-1 gap-1">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white text-xs md:text-sm mobile-nav-item whitespace-nowrap px-3 py-2 flex-shrink-0"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-2 block">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 touch-friendly">
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
                <div className="flex items-end">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto touch-friendly">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredItems.length} results
              </p>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 border-amber-500/10 hover:border-amber-500/30 touch-friendly"
                  onClick={() => setPreviewItem(item)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === "video" && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/50 rounded-full p-2">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        {item.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {item.duration}
                          </div>
                        )}
                      </>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-foreground mb-1 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{item.contributor}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary text-sm">{item.price}</span>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {item.downloads}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
