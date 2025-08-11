import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload,
  DollarSign,
  TrendingUp,
  BarChart3,
  Package,
  Eye,
  Download,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  Video,
  Box,
  Sparkles,
  FileText,
  CreditCard,
  Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock contributor data
const contributorStats = {
  totalEarnings: 12847.50,
  monthlyEarnings: 2456.30,
  totalDownloads: 45670,
  totalViews: 234580,
  totalUploads: 89,
  averageRating: 4.7,
  pendingPayment: 1234.56,
  nextPaymentDate: "2024-02-01"
};

// Mock uploaded content with status
const uploadedContent = [
  {
    id: 1,
    title: "Modern Office Interior",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop",
    status: "approved",
    uploads: "2024-01-15",
    downloads: 2340,
    views: 8750,
    earnings: 234.50,
    price: "$5"
  },
  {
    id: 2,
    title: "City Traffic Timelapse",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop",
    status: "pending",
    uploads: "2024-01-20",
    downloads: 0,
    views: 125,
    earnings: 0,
    price: "$12"
  },
  {
    id: 3,
    title: "3D Character Model",
    type: "3d",
    thumbnail: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=200&h=150&fit=crop",
    status: "rejected",
    uploads: "2024-01-18",
    downloads: 0,
    views: 45,
    earnings: 0,
    price: "$25",
    rejectionReason: "Quality does not meet standards"
  }
];

// Mock earnings history
const earningsHistory = [
  { month: "January 2024", amount: 2456.30, downloads: 4567 },
  { month: "December 2023", amount: 3124.80, downloads: 5234 },
  { month: "November 2023", amount: 2789.45, downloads: 4876 },
  { month: "October 2023", amount: 2234.12, downloads: 3456 }
];

export default function Contributor() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadType, setUploadType] = useState("image");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    
    return (
      <Badge className={cn("capitalize", variants[status] || "")}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

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
        {/* Header */}
        <section className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Contributor Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your creative content, track earnings, and grow your portfolio
            </p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-dark-surface2">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Upload
                </TabsTrigger>
                <TabsTrigger value="earnings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  My Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                {/* Stats Overview */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Total Earnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        ${contributorStats.totalEarnings.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +18% this month
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Total Downloads
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {contributorStats.totalDownloads.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Across all content
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Content Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {contributorStats.totalUploads}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Published items
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Average Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        {contributorStats.averageRating}
                      </div>
                      <div className="flex items-center text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={cn(
                              "h-3 w-3",
                              star <= contributorStats.averageRating 
                                ? "fill-yellow-500 text-yellow-500" 
                                : "text-gray-300"
                            )} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pending Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pending Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          ${contributorStats.pendingPayment.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Next payment: {new Date(contributorStats.nextPaymentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button>
                        <Banknote className="h-4 w-4 mr-2" />
                        Payment Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Recent Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">This Month's Downloads</span>
                        <span className="font-medium">4,567</span>
                      </div>
                      <Progress value={76} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>76% of monthly goal</span>
                        <span>Goal: 6,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload New Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Content Type Selection */}
                    <div className="space-y-2">
                      <Label>Content Type</Label>
                      <Select value={uploadType} onValueChange={setUploadType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="3d">3D Model</SelectItem>
                          <SelectItem value="icon">Icon Pack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium text-foreground mb-2">Drop your files here</h3>
                      <p className="text-muted-foreground mb-4">Or click to browse files</p>
                      <Button>Choose Files</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: JPG, PNG, MP4, MOV, OBJ, FBX, GLB
                      </p>
                    </div>

                    {/* Content Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="Enter content title..." />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nature">Nature</SelectItem>
                              <SelectItem value="urban">Urban</SelectItem>
                              <SelectItem value="abstract">Abstract</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Free</Button>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">$</span>
                              <Input id="price" type="number" placeholder="0.00" className="w-24" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Describe your content..." 
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags</Label>
                          <Input id="tags" placeholder="nature, landscape, mountains..." />
                          <p className="text-xs text-muted-foreground">
                            Separate tags with commas
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        ${contributorStats.monthlyEarnings.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        ${contributorStats.pendingPayment.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">
                        ${(contributorStats.totalEarnings - contributorStats.pendingPayment).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Earnings History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {earningsHistory.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <div className="font-medium text-foreground">{entry.month}</div>
                            <div className="text-sm text-muted-foreground">
                              {entry.downloads.toLocaleString()} downloads
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-foreground">
                            ${entry.amount.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">My Uploads</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {uploadedContent.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-20 h-15 object-cover rounded"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              {getStatusBadge(item.status)}
                              <Badge variant="outline">
                                {getTypeIcon(item.type)}
                                <span className="ml-1 capitalize">{item.type}</span>
                              </Badge>
                            </div>
                            
                            {item.status === "rejected" && item.rejectionReason && (
                              <div className="text-sm text-red-600 mb-2">
                                Rejection reason: {item.rejectionReason}
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Price:</span>
                                <div className="font-medium">{item.price}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Downloads:</span>
                                <div className="font-medium">{item.downloads.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Views:</span>
                                <div className="font-medium">{item.views.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Earnings:</span>
                                <div className="font-medium">${item.earnings.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Uploaded:</span>
                                <div className="font-medium">{new Date(item.uploads).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            {item.status === "rejected" && (
                              <Button size="sm">Resubmit</Button>
                            )}
                          </div>
                        </div>
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
