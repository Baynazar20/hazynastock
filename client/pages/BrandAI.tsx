import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Target,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  RefreshCw,
  Star,
  CheckCircle,
  Building2,
  Package,
  Palette,
  Users,
  TrendingUp,
  Award,
  Zap,
  Heart,
  Share
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandInfo {
  name: string;
  industry: string;
  values: string;
  targetAudience: string;
}

interface ProductInfo {
  name: string;
  category: string;
  keyFeatures: string;
  mood: string;
  colors: string;
}

const steps = [
  { id: 1, title: "Brand Information", icon: Building2 },
  { id: 2, title: "Product Information", icon: Package },
  { id: 3, title: "Generate Posters", icon: Sparkles },
  { id: 4, title: "Download & Enhance", icon: Download },
];

const industries = [
  "Technology", "Fashion", "Food & Beverage", "Automotive", "Healthcare", 
  "Beauty & Cosmetics", "Sports & Fitness", "Finance", "Education", "Travel"
];

const productCategories = [
  "Electronics", "Clothing", "Food Products", "Beverages", "Services",
  "Software", "Accessories", "Home & Garden", "Health Products", "Beauty Products"
];

const moodOptions = [
  "Professional", "Energetic", "Luxurious", "Friendly", "Modern", 
  "Traditional", "Bold", "Elegant", "Playful", "Sophisticated"
];

// Mock generated poster options
const mockPosters = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop",
    style: "Modern Minimalist",
    description: "Clean design with product focus"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
    style: "Bold & Energetic", 
    description: "Dynamic layout with vibrant colors"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
    style: "Luxury Premium",
    description: "Elegant design for high-end appeal"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=600&fit=crop",
    style: "Traditional Heritage",
    description: "Classic approach with cultural elements"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop",
    style: "Creative Artistic",
    description: "Unique artistic interpretation"
  }
];

export default function BrandAI() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  
  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    name: "",
    industry: "",
    values: "",
    targetAudience: ""
  });
  
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    category: "",
    keyFeatures: "",
    mood: "",
    colors: ""
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(3);
    }, 3000);
  };

  const canProceedStep1 = brandInfo.name && brandInfo.industry && brandInfo.values && brandInfo.targetAudience;
  const canProceedStep2 = productInfo.name && productInfo.category && productInfo.keyFeatures && productInfo.mood;

  return (
    <Layout>
      <div className="min-h-screen bg-background relative">
        {/* Central Asian Pattern Background */}
        <div className="absolute inset-0 central-asian-pattern opacity-5 pointer-events-none"></div>
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 py-16 px-4 md:px-6">
          <div className="absolute inset-0 geometric-pattern opacity-30"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Star className="h-6 w-6 text-pink-400 fill-current animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Brand AI Studio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create compelling advertising posters that perfectly capture your brand's essence and product appeal. 
              Powered by AI, tailored to your brand values.
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4 px-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all",
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white"
                        : "border-muted bg-background text-muted-foreground"
                    )}>
                      {currentStep > step.id ? (
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-2 transition-all min-w-4",
                        currentStep > step.id ? "bg-blue-500" : "bg-muted"
                      )}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground text-center px-4">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: Brand Information */}
            {currentStep === 1 && (
              <Card className="border-blue-500/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    Brand Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brandName">Brand Name *</Label>
                      <Input
                        id="brandName"
                        value={brandInfo.name}
                        onChange={(e) => setBrandInfo({...brandInfo, name: e.target.value})}
                        placeholder="Enter your brand name"
                        className="border-blue-500/20 focus:border-blue-500/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Industry *</Label>
                      <Select value={brandInfo.industry} onValueChange={(value) => setBrandInfo({...brandInfo, industry: value})}>
                        <SelectTrigger className="border-blue-500/20">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandValues">Brand Values & Mission *</Label>
                    <Textarea
                      id="brandValues"
                      value={brandInfo.values}
                      onChange={(e) => setBrandInfo({...brandInfo, values: e.target.value})}
                      placeholder="Describe your brand's core values, mission, and what makes it unique..."
                      className="min-h-[100px] border-blue-500/20 focus:border-blue-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience *</Label>
                    <Textarea
                      id="targetAudience"
                      value={brandInfo.targetAudience}
                      onChange={(e) => setBrandInfo({...brandInfo, targetAudience: e.target.value})}
                      placeholder="Describe your ideal customers (age, interests, lifestyle, preferences)..."
                      className="min-h-[100px] border-blue-500/20 focus:border-blue-500/50"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNext}
                      disabled={!canProceedStep1}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Product Information */}
            {currentStep === 2 && (
              <Card className="border-purple-500/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-purple-600" />
                    Product Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        value={productInfo.name}
                        onChange={(e) => setProductInfo({...productInfo, name: e.target.value})}
                        placeholder="Enter product name"
                        className="border-purple-500/20 focus:border-purple-500/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Product Category *</Label>
                      <Select value={productInfo.category} onValueChange={(value) => setProductInfo({...productInfo, category: value})}>
                        <SelectTrigger className="border-purple-500/20">
                          <SelectValue placeholder="Select product category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyFeatures">Key Features & Benefits *</Label>
                    <Textarea
                      id="keyFeatures"
                      value={productInfo.keyFeatures}
                      onChange={(e) => setProductInfo({...productInfo, keyFeatures: e.target.value})}
                      placeholder="What makes your product special? List main features and benefits..."
                      className="min-h-[100px] border-purple-500/20 focus:border-purple-500/50"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Desired Mood/Tone *</Label>
                      <Select value={productInfo.mood} onValueChange={(value) => setProductInfo({...productInfo, mood: value})}>
                        <SelectTrigger className="border-purple-500/20">
                          <SelectValue placeholder="Select mood for the poster" />
                        </SelectTrigger>
                        <SelectContent>
                          {moodOptions.map((mood) => (
                            <SelectItem key={mood} value={mood}>
                              {mood}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="colors">Preferred Colors (optional)</Label>
                      <Input
                        id="colors"
                        value={productInfo.colors}
                        onChange={(e) => setProductInfo({...productInfo, colors: e.target.value})}
                        placeholder="e.g., Blue, Gold, White"
                        className="border-purple-500/20 focus:border-purple-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={handleGenerate}
                      disabled={!canProceedStep2 || isGenerating}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Posters
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Generated Posters */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card className="border-pink-500/20 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-pink-500/10 to-red-500/10">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-pink-600" />
                        Generated Posters
                      </div>
                      <Badge className="bg-gradient-to-r from-pink-500 to-red-500">
                        5 Options
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Choose your favorite poster design. Each option is crafted based on your brand and product information.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                      {mockPosters.map((poster) => (
                        <Card 
                          key={poster.id}
                          className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedPoster === poster.id 
                              ? "ring-2 ring-pink-500 bg-pink-500/5" 
                              : "hover:ring-1 hover:ring-pink-500/50"
                          )}
                          onClick={() => setSelectedPoster(poster.id)}
                        >
                          <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                            <img
                              src={poster.thumbnail}
                              alt={poster.style}
                              className="w-full h-full object-cover"
                            />
                            {selectedPoster === poster.id && (
                              <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-pink-600 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-medium text-sm">{poster.style}</h4>
                            <p className="text-xs text-muted-foreground">{poster.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePrevious}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <Button 
                        onClick={handleNext}
                        disabled={!selectedPoster}
                        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                      >
                        Proceed to Download
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Download & Enhancement */}
            {currentStep === 4 && selectedPoster && (
              <div className="space-y-6">
                <Card className="border-green-500/20 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                    <CardTitle className="flex items-center">
                      <Download className="h-5 w-5 mr-2 text-green-600" />
                      Download & Enhance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Selected Poster Preview */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Selected Design</h3>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={mockPosters.find(p => p.id === selectedPoster)?.thumbnail}
                            alt="Selected poster"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">{mockPosters.find(p => p.id === selectedPoster)?.style}</h4>
                          <p className="text-sm text-muted-foreground">
                            {mockPosters.find(p => p.id === selectedPoster)?.description}
                          </p>
                        </div>
                      </div>

                      {/* Download Options */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Download Options</h3>
                          <div className="space-y-3">
                            <Button className="w-full justify-between bg-gradient-to-r from-green-500 to-emerald-500">
                              <span>Download HD (1920x2560)</span>
                              <span className="text-xs">Free</span>
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              <span>Download 4K (3840x5120)</span>
                              <span className="text-xs">5 tokens</span>
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              <span>Download Print Ready (300 DPI)</span>
                              <span className="text-xs">8 tokens</span>
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Enhancement Options</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-between">
                              <span>Add Custom Text</span>
                              <span className="text-xs">3 tokens</span>
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              <span>Background Variations</span>
                              <span className="text-xs">5 tokens</span>
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              <span>Color Scheme Adjustments</span>
                              <span className="text-xs">2 tokens</span>
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1">
                            <Heart className="h-4 w-4 mr-2" />
                            Save to Favorites
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={handlePrevious}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Selection
                      </Button>
                      <Button 
                        onClick={() => setCurrentStep(1)}
                        variant="outline"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Create Another Poster
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
