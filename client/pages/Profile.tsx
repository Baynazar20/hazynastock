import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Download,
  Heart,
  Star,
  Calendar,
  MapPin,
  Mail,
  Globe,
  Edit,
  Settings,
  Package,
  Eye,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Video,
  Box,
  Sparkles
} from "lucide-react";

// Mock user data
const userData = {
  name: "Muhammedov Jeyhun",
  username: "muhammedovjeyhun",
  email: "jeyhun.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinDate: "March 2023",
  location: "San Francisco, CA",
  website: "https://baynazar.dev",
  bio: "Digital artist and 3D designer passionate about creating stunning visual experiences. Specializing in architectural visualization and game assets.",
  verified: true,
  totalDownloads: 45670,
  totalViews: 234580,
  totalLikes: 12340,
  rating: 4.8,
  following: 234,
};

// Mock user's content
const userContent = [
  {
    id: 1,
    type: "image",
    title: "Mountain Landscape",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    downloads: 2340,
    views: 8750,
    likes: 456,
    price: "Free",
    uploadDate: "2024-01-15"
  },
  {
    id: 2,
    type: "video",
    title: "City Timelapse",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    downloads: 1890,
    views: 5670,
    likes: 234,
    price: "$8",
    uploadDate: "2024-01-10"
  },
  {
    id: 3,
    type: "3d",
    title: "Modern Chair",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    downloads: 890,
    views: 2340,
    likes: 123,
    price: "$15",
    uploadDate: "2024-01-05"
  }
];

const downloadHistory = [
  {
    id: 1,
    title: "Abstract Background Pack",
    type: "image",
    author: "Creative Studio",
    downloadDate: "2024-01-20",
    price: "$5"
  },
  {
    id: 2,
    title: "UI Icon Set",
    type: "icon",
    author: "Icon Masters",
    downloadDate: "2024-01-18",
    price: "Free"
  },
  {
    id: 3,
    title: "Nature Video Collection",
    type: "video",
    author: "Nature Films",
    downloadDate: "2024-01-15",
    price: "$12"
  }
];

const favorites = [
  {
    id: 1,
    title: "Minimalist Workspace",
    type: "image",
    author: "Design Co",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    title: "3D Character Model",
    type: "3d",
    author: "3D Artist",
    thumbnail: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=150&h=150&fit=crop"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "3d": return <Box className="h-4 w-4" />;
      case "icon": return <Sparkles className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Profile Header */}
        <section className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar and Basic Info */}
              <div className="text-center md:text-left">
                <div className="relative mb-4">
                  <Avatar className="w-32 h-32 mx-auto md:mx-0">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-2xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {userData.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                      <Star className="h-4 w-4 text-primary-foreground fill-current" />
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{userData.name}</h1>
                <p className="text-lg text-muted-foreground mb-1">@{userData.username}</p>
                {userData.verified && (
                  <Badge className="mb-4">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Verified Creator
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{userData.totalDownloads.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{userData.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-foreground">{userData.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bio and Details */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
                <p className="text-muted-foreground">{userData.bio}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {userData.joinDate}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={userData.website} className="hover:text-primary transition-colors">{userData.website}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-dark-surface2">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  My Content
                </TabsTrigger>
                <TabsTrigger value="downloads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Favorites
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">$2,847</div>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% this month
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">1,234</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Last 30 days
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Content Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">47</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Package className="h-3 w-3 mr-1" />
                        Published
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">94%</div>
                      <Progress value={94} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Your "Mountain Landscape" was downloaded 15 times today</span>
                        <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">New follower: @designlover</span>
                        <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Your "City Timelapse" received 5-star rating</span>
                        <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">My Uploads</h3>
                  <Button>
                    <Package className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userContent.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary">
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary">
                            {item.price}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              {item.downloads}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {item.likes}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Uploaded {new Date(item.uploadDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="downloads" className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Download History</h3>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {downloadHistory.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(item.type)}
                            <div>
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">by {item.author}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-foreground">{item.price}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(item.downloadDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Favorite Items</h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favorites.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary">
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white">
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">by {item.author}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
}
