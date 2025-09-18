import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Sparkles,
  Image as ImageIcon,
  Video,
  Palette,
  Wand2,
  Download,
  Share,
  RefreshCw,
  Settings,
  Star,
  Crown,
  Eye,
  Coins,
  CreditCard,
  Plus,
  Wallet,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock generated content
const generatedSamples = [
  {
    id: 1,
    type: "image",
    prompt: "Traditional Central Asian bazaar with silk road merchants",
    style: "Photorealistic",
    thumbnail: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&h=300&fit=crop",
    resolution: "1024x1024",
    downloadCount: 234
  },
  {
    id: 2,
    type: "image", 
    prompt: "Kazakh yurt in vast steppe landscape at golden hour",
    style: "Artistic",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
    resolution: "1024x1024",
    downloadCount: 189
  },
  {
    id: 3,
    type: "video",
    prompt: "Uzbek traditional dance performance",
    style: "Cinematic",
    thumbnail: "https://images.unsplash.com/photo-1594736797933-d0b22e5c4376?w=300&h=300&fit=crop",
    resolution: "1920x1080",
    downloadCount: 156
  }
];

const aiModels = [
  { id: "dall-e-3", name: "DALL-E 3", type: "image", premium: true, tokens: 15, quality: "Ultra High" },
  { id: "midjourney", name: "Midjourney", type: "image", premium: true, tokens: 12, quality: "High" },
  { id: "stable-diffusion", name: "Stable Diffusion", type: "image", premium: false, tokens: 3, quality: "Good" },
  { id: "firefly", name: "Adobe Firefly", type: "image", premium: true, tokens: 8, quality: "High" },
  { id: "sora", name: "Sora", type: "video", premium: true, tokens: 50, quality: "Ultra High" },
  { id: "runway", name: "Runway Gen-3", type: "video", premium: true, tokens: 35, quality: "High" },
  { id: "pika", name: "Pika Labs", type: "video", premium: false, tokens: 20, quality: "Good" },
];

// Token pricing plans
const tokenPackages = [
  {
    id: "starter",
    name: "Starter Pack",
    tokens: 100,
    price: 9.99,
    bonus: 0,
    popular: false,
    description: "Perfect for trying out AI generation"
  },
  {
    id: "creator",
    name: "Creator Pack",
    tokens: 500,
    price: 39.99,
    bonus: 50,
    popular: true,
    description: "Best value for regular creators"
  },
  {
    id: "professional",
    name: "Professional Pack",
    tokens: 1000,
    price: 69.99,
    bonus: 150,
    popular: false,
    description: "For professional content creators"
  },
  {
    id: "enterprise",
    name: "Enterprise Pack",
    tokens: 5000,
    price: 299.99,
    bonus: 1000,
    popular: false,
    description: "Unlimited creativity for teams"
  }
];

const styles = [
  "Photorealistic", "Artistic", "Traditional", "Modern", "Minimalist", 
  "Vintage", "Cinematic", "Abstract", "Watercolor", "Oil Painting"
];

export default function GenerateAI() {
  const [activeTab, setActiveTab] = useState("generate");
  const [selectedModel, setSelectedModel] = useState("dall-e-3");
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userTokens, setUserTokens] = useState(47); // Mock user token balance

  const handleGenerate = () => {
    const model = aiModels.find(m => m.id === selectedModel);
    const requiredTokens = model?.tokens || 0;

    if (userTokens >= requiredTokens) {
      setIsGenerating(true);
      // Simulate generation and token deduction
      setTimeout(() => {
        setIsGenerating(false);
        setUserTokens(prev => prev - requiredTokens);
      }, 3000);
    } else {
      // Show insufficient tokens message (in real app, would show modal)
      alert(`Insufficient tokens! You need ${requiredTokens} tokens but only have ${userTokens}.`);
    }
  };

  const selectedModelData = aiModels.find(m => m.id === selectedModel);
  const canGenerate = prompt.trim() && userTokens >= (selectedModelData?.tokens || 0);

  return (
    <Layout>
      <div className="min-h-screen bg-background relative">
        {/* Central Asian Pattern Background */}
        <div className="absolute inset-0 central-asian-pattern opacity-5 pointer-events-none"></div>
        
        {/* Hero Section with Central Asian Inspiration */}
        <section className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 py-16 px-4 md:px-6">
          <div className="absolute inset-0 geometric-pattern opacity-30"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl animate-pulse">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Star className="h-6 w-6 text-amber-400 fill-current animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                AI Generation Studio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create stunning Central Asian inspired content with the power of artificial intelligence. 
              From traditional bazaars to modern cityscapes, bring your vision to life.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-600">50K+</div>
                <div className="text-sm text-muted-foreground">Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">7</div>
                <div className="text-sm text-muted-foreground">AI Models</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">4K</div>
                <div className="text-sm text-muted-foreground">Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-600">3-50</div>
                <div className="text-sm text-muted-foreground">Tokens</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Token Balance Display */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4 sm:mb-0">
                <div className="h-10 w-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Your Token Balance</div>
                  <div className="text-2xl font-bold text-foreground">{userTokens} tokens</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/40 hover:from-amber-500/30 hover:to-orange-500/30"
                onClick={() => setActiveTab("tokens")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Buy Tokens
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="w-full overflow-x-auto scrollbar-hide mb-8">
                <TabsList className="flex min-w-max bg-dark-surface2 p-1 gap-1">
                  <TabsTrigger
                    value="generate"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white whitespace-nowrap px-4 py-2 flex-shrink-0"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Generate
                  </TabsTrigger>
                  <TabsTrigger
                    value="tokens"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white whitespace-nowrap px-4 py-2 flex-shrink-0"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Buy Tokens
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white whitespace-nowrap px-4 py-2 flex-shrink-0"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger
                    value="models"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white whitespace-nowrap px-4 py-2 flex-shrink-0"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Models
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="generate" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Generation Panel */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-amber-500/20 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                        <CardTitle className="flex items-center">
                          <Wand2 className="h-5 w-5 mr-2 text-amber-600" />
                          Create Your Vision
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6">
                        {/* Prompt Input */}
                        <div className="space-y-2">
                          <Label htmlFor="prompt" className="text-base font-medium">
                            Describe what you want to create
                          </Label>
                          <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A traditional Uzbek bazaar with colorful textiles, spices, and merchants in traditional clothing..."
                            className="min-h-[120px] text-base border-amber-500/20 focus:border-amber-500/50"
                          />
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="outline" className="cursor-pointer hover:bg-amber-500/10">
                              + Traditional Architecture
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-orange-500/10">
                              + Cultural Patterns
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-red-500/10">
                              + Silk Road
                            </Badge>
                          </div>
                        </div>

                        {/* Settings Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>AI Model</Label>
                            <Select value={selectedModel} onValueChange={setSelectedModel}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {aiModels.filter(m => m.type === "image").map((model) => (
                                  <SelectItem key={model.id} value={model.id}>
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center">
                                        {model.name}
                                        {model.premium && (
                                          <Crown className="h-3 w-3 ml-2 text-amber-500" />
                                        )}
                                      </div>
                                      <div className="flex items-center gap-1 text-amber-600">
                                        <Coins className="h-3 w-3" />
                                        <span className="text-xs font-medium">{model.tokens}</span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {selectedModelData && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Coins className="h-3 w-3" />
                                <span>Costs {selectedModelData.tokens} tokens • {selectedModelData.quality} quality</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Style</Label>
                            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {styles.map((style) => (
                                  <SelectItem key={style} value={style}>
                                    {style}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Generate Button */}
                        <div className="space-y-3">
                          {selectedModelData && userTokens < selectedModelData.tokens && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <div className="flex items-center gap-2 text-red-600 text-sm">
                                <Coins className="h-4 w-4" />
                                <span>Insufficient tokens! You need {selectedModelData.tokens} but have {userTokens}.</span>
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={handleGenerate}
                            disabled={!canGenerate || isGenerating}
                            className="w-full h-12 text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 touch-friendly"
                          >
                            {isGenerating ? (
                              <>
                                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                                Generating Magic...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                Generate Content
                                {selectedModelData && (
                                  <span className="ml-2 bg-white/20 px-2 py-1 rounded text-xs">
                                    {selectedModelData.tokens} tokens
                                  </span>
                                )}
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Token & Model Info */}
                  <div className="space-y-6">
                    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Coins className="h-5 w-5 mr-2 text-amber-600" />
                          Token Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Current Balance:</span>
                            <span className="font-semibold text-foreground">{userTokens} tokens</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Selected Model:</span>
                            <span className="font-semibold text-foreground">{selectedModelData?.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Cost per Generation:</span>
                            <span className="font-semibold text-amber-600 flex items-center gap-1">
                              <Coins className="h-3 w-3" />
                              {selectedModelData?.tokens || 0}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Generations Available:</span>
                              <span className="font-semibold text-green-600">
                                {selectedModelData ? Math.floor(userTokens / selectedModelData.tokens) : 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        {userTokens < 20 && (
                          <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <div className="flex items-center gap-2 text-orange-600 text-sm mb-2">
                              <TrendingUp className="h-4 w-4" />
                              <span className="font-medium">Low Balance Warning</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Consider purchasing more tokens to continue creating.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-red-500/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Generation Tips</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Be specific about Central Asian cultural elements</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Include time of day and lighting preferences</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Mention traditional colors and patterns</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tokens" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Purchase Tokens</h3>
                  <p className="text-muted-foreground">Choose the perfect token package for your creative needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                  {tokenPackages.map((pkg) => (
                    <Card key={pkg.id} className={cn(
                      "relative transition-all duration-300 hover:shadow-xl",
                      pkg.popular
                        ? "border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 transform scale-105"
                        : "border-muted hover:border-amber-500/30"
                    )}>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <div className="mt-2">
                          <div className="text-3xl font-bold text-foreground">
                            ${pkg.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.description}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Coins className="h-5 w-5 text-amber-600" />
                            <span className="text-2xl font-bold text-amber-600">
                              {pkg.tokens.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">tokens</span>
                          </div>
                          {pkg.bonus > 0 && (
                            <div className="text-sm text-green-600 font-medium">
                              + {pkg.bonus} bonus tokens!
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>DALL-E 3 generations:</span>
                            <span className="font-medium">~{Math.floor((pkg.tokens + pkg.bonus) / 15)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Stable Diffusion:</span>
                            <span className="font-medium">~{Math.floor((pkg.tokens + pkg.bonus) / 3)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Video generations:</span>
                            <span className="font-medium">~{Math.floor((pkg.tokens + pkg.bonus) / 35)}</span>
                          </div>
                        </div>

                        <Button
                          className={cn(
                            "w-full touch-friendly",
                            pkg.popular
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                              : ""
                          )}
                          variant={pkg.popular ? "default" : "outline"}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Purchase
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-amber-600" />
                    Payment Information
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Instant token delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>No expiration date</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground">Generated Gallery</h3>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                    {generatedSamples.length} Items
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {generatedSamples.map((item) => (
                    <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 card-hover">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={item.thumbnail}
                          alt={item.prompt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            {item.resolution}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-foreground line-clamp-2 mb-2">
                          {item.prompt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Style: {item.style}</span>
                          <span>{item.downloadCount} downloads</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="models" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Available AI Models</h3>
                  <p className="text-muted-foreground">Choose from our collection of premium AI models</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {aiModels.map((model) => (
                    <Card key={model.id} className={cn(
                      "transition-all duration-300 hover:shadow-lg",
                      model.premium && "border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5"
                    )}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            {model.type === "image" ? (
                              <ImageIcon className="h-5 w-5 mr-2" />
                            ) : (
                              <Video className="h-5 w-5 mr-2" />
                            )}
                            <div>
                              <div className="font-semibold">{model.name}</div>
                              <div className="text-xs text-muted-foreground font-normal">
                                {model.quality} Quality
                              </div>
                            </div>
                          </div>
                          {model.premium && (
                            <Crown className="h-5 w-5 text-amber-500" />
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Type:</span>
                            <Badge variant="outline" className="capitalize">
                              {model.type}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Cost per generation:</span>
                            <div className="flex items-center gap-1 text-amber-600 font-semibold">
                              <Coins className="h-4 w-4" />
                              <span>{model.tokens}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Quality:</span>
                            <Badge className={cn(
                              model.quality === "Ultra High" && "bg-gradient-to-r from-purple-500 to-pink-500",
                              model.quality === "High" && "bg-gradient-to-r from-amber-500 to-orange-500",
                              model.quality === "Good" && "bg-green-600"
                            )}>
                              {model.quality}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Your generations:</span>
                            <span className="font-semibold text-foreground">
                              {Math.floor(userTokens / model.tokens)}
                            </span>
                          </div>

                          <Button
                            onClick={() => {
                              setSelectedModel(model.id);
                              setActiveTab("generate");
                            }}
                            disabled={userTokens < model.tokens}
                            variant={model.premium ? "default" : "outline"}
                            className={cn(
                              "w-full touch-friendly",
                              model.premium && "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                            )}
                          >
                            {userTokens < model.tokens ? (
                              <>
                                <Coins className="h-4 w-4 mr-2" />
                                Need {model.tokens - userTokens} more tokens
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4 mr-2" />
                                Use Model
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-4">Model Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Model</th>
                          <th className="text-center p-2">Tokens</th>
                          <th className="text-center p-2">Quality</th>
                          <th className="text-center p-2">Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aiModels.filter(m => m.type === "image").map((model) => (
                          <tr key={model.id} className="border-b border-muted">
                            <td className="p-2 font-medium">{model.name}</td>
                            <td className="p-2 text-center">
                              <span className="flex items-center justify-center gap-1">
                                <Coins className="h-3 w-3 text-amber-600" />
                                {model.tokens}
                              </span>
                            </td>
                            <td className="p-2 text-center">{model.quality}</td>
                            <td className="p-2 text-center">
                              {model.tokens > 12 ? "Slower" : model.tokens > 6 ? "Medium" : "Fast"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
}
