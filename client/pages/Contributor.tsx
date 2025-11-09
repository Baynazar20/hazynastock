import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Package,
  Download,
  Star,
  Image as ImageIcon,
  Users,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock contributor data
const contributorStats = {
  totalEarnings: 12847.5,
  monthlyEarnings: 2456.3,
  totalDownloads: 45670,
  totalViews: 234580,
  totalUploads: 89,
  averageRating: 4.7,
  pendingPayment: 1234.56,
  nextPaymentDate: "2024-02-01",
};

const publicStats = {
  totalUsers: 12840,
  totalDownloads: 564321,
  totalCreators: 742,
  totalContent: 19840,
  averageRating: 4.6,
  totalCreatorEarnings: 354000, // manat
};

export default function Contributor() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
              Upload your creative content, track earnings, and grow your
              portfolio
            </p>
          </div>
        </section>

        <section className="py-12 px-6">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Total Users */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Ulanyjy sany
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Registered users
                </div>
              </CardContent>
            </Card>

            {/* Total Downloads */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Total Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.totalDownloads.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  All time downloads
                </div>
              </CardContent>
            </Card>

            {/* Total Creators */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Total Creators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.totalCreators.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active contributors
                </div>
              </CardContent>
            </Card>

            {/* Content Items */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Content Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.totalContent.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Published materials
                </div>
              </CardContent>
            </Card>

            {/* Average Rating */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Average Rating of Creators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.averageRating}
                </div>
                <div className="flex items-center text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-3 w-3",
                        star <= publicStats.averageRating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Total Earnings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Total Earnings (Creators)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {publicStats.totalCreatorEarnings.toLocaleString()} TMT
                </div>
                <div className="text-sm text-muted-foreground">
                  Paid to contributors
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}
