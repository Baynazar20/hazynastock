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
  Sparkles,
  Star,
  Eye,
  Palette,
  SlidersHorizontal,
  Grid3X3,
  List,
  Home,
  User,
  Settings,
  Mail,
  Phone,
  Calendar,
  Camera,
  Music,
  ShoppingCart,
  Map,
  Clock,
  Shield,
  Zap,
  Globe,
  Package,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

// Mock icon data with actual Lucide icons for demo
const iconData = [
  {
    id: 1,
    title: "Business Icon Pack",
    category: "Business",
    tags: ["business", "office", "corporate", "work", "professional"],
    price: "Free",
    downloads: 15230,
    views: 45670,
    rating: 4.9,
    contributor: "IconDesign Co",
    iconCount: 24,
    style: "Outline",
    formats: ["SVG", "PNG", "ICO"],
    icons: [User, Settings, Mail, Calendar, ShoppingCart, Package],
    colors: ["#000000", "#6B7280", "#3B82F6"]
  },
  {
    id: 2,
    title: "UI Interface Icons",
    category: "Interface",
    tags: ["ui", "interface", "app", "web", "navigation"],
    price: "$5",
    downloads: 8920,
    views: 23450,
    rating: 4.8,
    contributor: "UI Masters",
    iconCount: 36,
    style: "Filled",
    formats: ["SVG", "PNG"],
    icons: [Home, Settings, Search, Heart, Download, Star],
    colors: ["#000000", "#ffffff", "#10B981"]
  },
  {
    id: 3,
    title: "Communication Icons",
    category: "Communication",
    tags: ["communication", "social", "media", "chat", "contact"],
    price: "$3",
    downloads: 12560,
    views: 34210,
    rating: 4.7,
    contributor: "Social Icons",
    iconCount: 18,
    style: "Duotone",
    formats: ["SVG", "PNG", "PDF"],
    icons: [Mail, Phone, Globe, Camera, Music, Map],
    colors: ["#3B82F6", "#8B5CF6", "#EC4899"]
  },
  {
    id: 4,
    title: "E-commerce Pack",
    category: "E-commerce",
    tags: ["ecommerce", "shopping", "store", "cart", "payment"],
    price: "$8",
    downloads: 6780,
    views: 18950,
    rating: 4.9,
    contributor: "Shop Icons",
    iconCount: 30,
    style: "Outline",
    formats: ["SVG", "PNG", "ICO", "PDF"],
    icons: [ShoppingCart, Package, Truck, Calendar, Shield, Zap],
    colors: ["#000000", "#F59E0B", "#EF4444"]
  },
  {
    id: 5,
    title: "Technology & Security",
    category: "Technology",
    tags: ["technology", "security", "tech", "digital", "cyber"],
    price: "$12",
    downloads: 4320,
    views: 12340,
    rating: 4.6,
    contributor: "Tech Icons",
    iconCount: 42,
    style: "Filled",
    formats: ["SVG", "PNG"],
    icons: [Shield, Zap, Settings, Globe, Search, Clock],
    colors: ["#1F2937", "#6366F1", "#06B6D4"]
  },
  {
    id: 6,
    title: "Minimalist Set",
    category: "Minimalist",
    tags: ["minimalist", "simple", "clean", "basic", "essential"],
    price: "Free",
    downloads: 23450,
    views: 67890,
    rating: 4.8,
    contributor: "Minimal Design",
    iconCount: 20,
    style: "Outline",
    formats: ["SVG", "PNG"],
    icons: [Home, User, Heart, Star, Calendar, Map],
    colors: ["#000000", "#6B7280"]
  },
  {
    id: 7,
    title: "Social Media Icons",
    category: "Social",
    tags: ["social", "media", "network", "sharing", "community"],
    price: "$4",
    downloads: 18760,
    views: 52340,
    rating: 4.7,
    contributor: "Social Co",
    iconCount: 25,
    style: "Filled",
    formats: ["SVG", "PNG", "ICO"],
    icons: [Heart, Star, User, Globe, Camera, Music],
    colors: ["#1DA1F2", "#E4405F", "#0A66C2", "#25D366"]
  },
  {
    id: 8,
    title: "Weather & Time",
    category: "Weather",
    tags: ["weather", "time", "climate", "forecast", "seasons"],
    price: "$6",
    downloads: 9870,
    views: 28760,
    rating: 4.5,
    contributor: "Weather Icons",
    iconCount: 28,
    style: "Duotone",
    formats: ["SVG", "PNG", "PDF"],
    icons: [Clock, Calendar, Globe, Zap, Shield, Star],
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]
  }
];

const categories = ["All", "Business", "Interface", "Communication", "E-commerce", "Technology", "Minimalist", "Social", "Weather"];
const styles = ["All", "Outline", "Filled", "Duotone"];
const formats = ["All", "SVG", "PNG", "ICO", "PDF"];
const iconCounts = ["All", "1-20", "21-40", "40+"];
const sortOptions = ["Latest", "Popular", "Most Downloaded", "Highest Rated", "Price: Low to High", "Icon Count: Low to High"];

export default function Icons() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedIconCount, setSelectedIconCount] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredIcons, setFilteredIcons] = useState(iconData);
  const [previewItem, setPreviewItem] = useState<typeof iconData[0] | null>(null);

  useEffect(() => {
    let filtered = iconData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(pack =>
        pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(pack => pack.category === selectedCategory);
    }

    // Filter by style
    if (selectedStyle !== "All") {
      filtered = filtered.filter(pack => pack.style === selectedStyle);
    }

    // Filter by format
    if (selectedFormat !== "All") {
      filtered = filtered.filter(pack => pack.formats.includes(selectedFormat));
    }

    // Filter by icon count
    if (selectedIconCount !== "All") {
      filtered = filtered.filter(pack => {
        const count = pack.iconCount;
        switch (selectedIconCount) {
          case "1-20": return count <= 20;
          case "21-40": return count > 20 && count <= 40;
          case "40+": return count > 40;
          default: return true;
        }
      });
    }

    // Filter by price
    if (priceFilter === "Free") {
      filtered = filtered.filter(pack => pack.price === "Free");
    } else if (priceFilter === "Premium") {
      filtered = filtered.filter(pack => pack.price !== "Free");
    }

    setFilteredIcons(filtered);
  }, [searchQuery, selectedCategory, selectedStyle, selectedFormat, selectedIconCount, priceFilter]);

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
                </span> Icons Library
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Traditional patterns, cultural symbols, and modern icons inspired by Central Asian heritage
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search icon packs by name, category, or style..."
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
                <span className="text-sm font-medium text-foreground">Icon Filters:</span>
              </div>
              
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger className="w-28">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-28">
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

              <Select value={selectedIconCount} onValueChange={setSelectedIconCount}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Icon Count" />
                </SelectTrigger>
                <SelectContent>
                  {iconCounts.map((count) => (
                    <SelectItem key={count} value={count}>
                      {count}
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
                <SelectTrigger className="w-52">
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
                Showing {filteredIcons.length} icon packs
              </p>
            </div>

            {/* Icons Grid/List */}
            <div className={cn(
              "gap-6 mb-12",
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "space-y-4"
            )}>
              {filteredIcons.map((pack) => (
                <Card
                  key={pack.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex" : "hover:scale-[1.02]"
                  )}
                  onClick={() => setPreviewItem(pack)}
                >
                  <div className={cn(
                    "relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
                    viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"
                  )}>
                    {/* Icon Preview Grid */}
                    <div className="absolute inset-0 p-6">
                      <div className="grid grid-cols-3 gap-3 h-full">
                        {pack.icons.slice(0, 6).map((Icon, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200"
                            style={{ 
                              transitionDelay: `${index * 50}ms`,
                              color: pack.colors[index % pack.colors.length] 
                            }}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Style Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          pack.style === "Outline" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                          pack.style === "Filled" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                          pack.style === "Duotone" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        )}
                      >
                        {pack.style}
                      </Badge>
                    </div>

                    {/* Icon Count */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                        {pack.iconCount} icons
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Color Palette */}
                    <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {pack.colors.slice(0, 3).map((color, index) => (
                        <div 
                          key={index}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <CardContent className={cn(
                    "p-4",
                    viewMode === "list" ? "flex-1" : ""
                  )}>
                    <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {pack.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>by {pack.contributor}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{pack.rating}</span>
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex justify-between">
                          <span>Style:</span>
                          <span>{pack.style}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Formats:</span>
                          <span>{pack.formats.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-primary">{pack.price}</span>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {pack.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {pack.views.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Format Tags */}
                    <div className="flex flex-wrap gap-1">
                      {pack.formats.slice(0, 3).map((format) => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                      {pack.formats.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pack.formats.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mb-[20px]">
              <Button variant="outline" size="lg">
                Load More Icon Packs
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
