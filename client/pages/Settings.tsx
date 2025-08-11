import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user settings
const userSettings = {
  profile: {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Digital artist and 3D designer passionate about creating stunning visual experiences.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  notifications: {
    emailDownloads: true,
    emailComments: true,
    emailFollowers: true,
    emailMarketing: false,
    pushDownloads: true,
    pushComments: false,
    pushFollowers: true
  },
  privacy: {
    profileVisible: true,
    showDownloads: true,
    showFavorites: false,
    allowMessages: true,
    showOnline: true
  },
  preferences: {
    language: "en",
    theme: "dark",
    downloadQuality: "high",
    autoDownload: false,
    showWatermarks: true
  }
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState(userSettings);
  const [showPassword, setShowPassword] = useState(false);

  const updateSetting = (section: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
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
              <TabsList className="grid w-full grid-cols-5 mb-8 bg-dark-surface2">
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
                        <AvatarImage src={settings.profile.avatar} alt={settings.profile.name} />
                        <AvatarFallback>{settings.profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Change Avatar
                        </Button>
                        <p className="text-sm text-muted-foreground">JPG, PNG. Max 2MB.</p>
                      </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={settings.profile.name}
                          onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          value={settings.profile.username}
                          onChange={(e) => updateSetting('profile', 'username', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={settings.profile.email}
                          onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={settings.profile.location}
                          onChange={(e) => updateSetting('profile', 'location', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          type="url" 
                          value={settings.profile.website}
                          onChange={(e) => updateSetting('profile', 'website', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={settings.profile.bio}
                        onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
                        className="min-h-[100px]"
                      />
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

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Download Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone downloads your content</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.emailDownloads}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailDownloads', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Comments & Reviews</Label>
                        <p className="text-sm text-muted-foreground">Get notified about comments and reviews on your content</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.emailComments}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailComments', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Followers</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.emailFollowers}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailFollowers', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.emailMarketing}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailMarketing', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Download Alerts</Label>
                        <p className="text-sm text-muted-foreground">Real-time notifications for downloads</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.pushDownloads}
                        onCheckedChange={(checked) => updateSetting('notifications', 'pushDownloads', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Comments & Reviews</Label>
                        <p className="text-sm text-muted-foreground">Instant notifications for new comments</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.pushComments}
                        onCheckedChange={(checked) => updateSetting('notifications', 'pushComments', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Followers</Label>
                        <p className="text-sm text-muted-foreground">Notifications for new followers</p>
                      </div>
                      <Switch 
                        checked={settings.notifications.pushFollowers}
                        onCheckedChange={(checked) => updateSetting('notifications', 'pushFollowers', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <Switch 
                        checked={settings.privacy.profileVisible}
                        onCheckedChange={(checked) => updateSetting('privacy', 'profileVisible', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Download Count</Label>
                        <p className="text-sm text-muted-foreground">Display how many times your content has been downloaded</p>
                      </div>
                      <Switch 
                        checked={settings.privacy.showDownloads}
                        onCheckedChange={(checked) => updateSetting('privacy', 'showDownloads', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Favorites</Label>
                        <p className="text-sm text-muted-foreground">Let others see your favorite content</p>
                      </div>
                      <Switch 
                        checked={settings.privacy.showFavorites}
                        onCheckedChange={(checked) => updateSetting('privacy', 'showFavorites', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                      </div>
                      <Switch 
                        checked={settings.privacy.allowMessages}
                        onCheckedChange={(checked) => updateSetting('privacy', 'allowMessages', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">Display when you're online</p>
                      </div>
                      <Switch 
                        checked={settings.privacy.showOnline}
                        onCheckedChange={(checked) => updateSetting('privacy', 'showOnline', checked)}
                      />
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
                        <Label htmlFor="current-password">Current Password</Label>
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
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <Button>
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Authentication</Label>
                        <p className="text-sm text-muted-foreground">Receive verification codes via SMS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Setup
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Authentication</Label>
                        <p className="text-sm text-muted-foreground">Receive verification codes via email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Setup
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Authenticator App</Label>
                        <p className="text-sm text-muted-foreground">Use Google Authenticator or similar apps</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Setup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                      <div>
                        <Label className="text-red-600">Delete Account</Label>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                        <Select value={settings.preferences.language} onValueChange={(value) => updateSetting('preferences', 'language', value)}>
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
                        <Label>Theme</Label>
                        <Select value={settings.preferences.theme} onValueChange={(value) => updateSetting('preferences', 'theme', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Download Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default Download Quality</Label>
                      <Select value={settings.preferences.downloadQuality} onValueChange={(value) => updateSetting('preferences', 'downloadQuality', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Quality</SelectItem>
                          <SelectItem value="medium">Medium Quality</SelectItem>
                          <SelectItem value="high">High Quality</SelectItem>
                          <SelectItem value="original">Original Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-download after purchase</Label>
                        <p className="text-sm text-muted-foreground">Automatically start downloads after purchase</p>
                      </div>
                      <Switch 
                        checked={settings.preferences.autoDownload}
                        onCheckedChange={(checked) => updateSetting('preferences', 'autoDownload', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show watermarks in previews</Label>
                        <p className="text-sm text-muted-foreground">Display watermarks on preview images</p>
                      </div>
                      <Switch 
                        checked={settings.preferences.showWatermarks}
                        onCheckedChange={(checked) => updateSetting('preferences', 'showWatermarks', checked)}
                      />
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
