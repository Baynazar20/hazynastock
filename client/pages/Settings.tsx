import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TwoFactorSetupModal from "./Settings/FactorAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Download,
  Eye,
  EyeOff,
  Camera,
  Save,
  Trash2,
  AlertTriangle,
  Key,
  Smartphone,
  Mail,
  Lock,
} from "lucide-react";
import Delete from "./Settings/Delete";

// Mock user settings
const userSettings = {
  profile: {
    name: "Muhammedov Jeyhun",
    username: "muhammedovjeyhun",
    email: "jeyhun.doe@example.com",
    bio: "Digital artist and 3D designer passionate about creating stunning visual experiences.",
    location: "San Francisco, CA",
    website: "https://baynazar.dev",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  notifications: {
    emailDownloads: true,
    emailComments: true,
    emailFollowers: true,
    emailMarketing: false,
    pushDownloads: true,
    pushComments: false,
    pushFollowers: true,
  },
  privacy: {
    profileVisible: true,
    showDownloads: true,
    showFavorites: false,
    allowMessages: true,
    showOnline: true,
  },
  preferences: {
    language: "en",
    theme: "dark",
    downloadQuality: "high",
    autoDownload: false,
    showWatermarks: true,
  },
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState(userSettings);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState<"sms" | "email" | null>(null);

  const updateSetting = (
    section: keyof typeof settings,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Account Settings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your account preferences and customize your experience
            </p>
          </div>
        </section>

        {/* Settings Content */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full flex  grid-cols-5 mb-8 bg-dark-surface2">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          src={settings.profile.avatar}
                          alt={settings.profile.name}
                        />
                        <AvatarFallback>
                          {settings.profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Change Avatar
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG. Max 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={settings.profile.name}
                          onChange={(e) =>
                            updateSetting("profile", "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Surname</Label>
                        <Input
                          id="username"
                          value={settings.profile.username}
                          onChange={(e) =>
                            updateSetting("profile", "username", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Username</Label>
                        <Input
                          id="username"
                          type="email"
                          value="Muhammet"
                          onChange={(e) =>
                            updateSetting("profile", "email", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) =>
                            updateSetting("profile", "email", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2 ">
                        <Label htmlFor="website">Country</Label>
                        <Input
                          id="location"
                          value={settings.profile.location}
                          onChange={(e) =>
                            updateSetting("profile", "location", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2 ">
                        <Label htmlFor="website">Phone Number</Label>
                        <Input
                          id="location"
                          value="+99363446677"
                          onChange={(e) =>
                            updateSetting("profile", "location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-password">New Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button>
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive verification codes via SMS
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMethod("sms");
                            setModalOpen(true);
                          }}
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive verification codes via email
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setMethod("email");
                            setModalOpen(true);
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Authenticator App</Label>
                          <p className="text-sm text-muted-foreground">
                            Use Google Authenticator or similar apps
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <TwoFactorSetupModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    method={method}
                  />
                </>
                <Delete />
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={settings.preferences.language}
                          onValueChange={(value) =>
                            updateSetting("preferences", "language", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="tk">Türkmen</SelectItem>
                            <SelectItem value="kk">Қазақ</SelectItem>
                            <SelectItem value="uz">O'zbek</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select
                          value={settings.preferences.theme}
                          onValueChange={(value) =>
                            updateSetting("preferences", "theme", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Asia</SelectItem>
                            <SelectItem value="light">Europe</SelectItem>
                            <SelectItem value="system">
                              Americas (North America, South America)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Preferences
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
}
