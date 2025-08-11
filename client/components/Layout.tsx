import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Image,
  Video,
  Box,
  Sparkles,
  Home,
  User,
  Upload,
  Settings,
  Menu,
  X,
  Bell,
  Globe,
  Zap,
  Star,
  Target
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Images", href: "/images", icon: Image },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "3D Models", href: "/3d-models", icon: Box },
  { name: "Icons", href: "/icons", icon: Sparkles },
];

const aiNavigation = [
  { name: "Generate AI", href: "/generate-ai", icon: Zap, featured: true },
  { name: "Brand AI", href: "/brand-ai", icon: Target, featured: true },
];

const userNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Contributor", href: "/contributor", icon: Upload },
  { name: "Settings", href: "/settings", icon: Settings },
];

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Рус����ий" },
  { code: "tk", name: "Türkmen" },
  { code: "kk", name: "Қазақ" },
  { code: "uz", name: "O'zbek" },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-80 md:w-72 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-white fill-current" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  HazynaStock
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Central Asia Media</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* AI Generation Section */}
          <div className="px-4 pt-6 pb-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-3">
              AI Tools
            </div>
            {aiNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-2",
                    "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20",
                    "hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/30",
                    "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
                    isActivePath(item.href) && "from-amber-500/25 to-orange-500/25 border-amber-500/40"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                  <Star className="ml-auto h-4 w-4 text-amber-500 fill-current animate-pulse" />
                </Link>
              );
            })}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-3 space-y-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-3">
              Browse
            </div>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActivePath(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Navigation */}
          <div className="border-t border-sidebar-border px-4 py-4 space-y-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-3">
              Account
            </div>
            {userNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActivePath(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-3 md:px-4 lg:px-6">
          <div className="flex items-center space-x-2 md:space-x-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden touch-friendly h-10 w-10 p-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="relative flex-1 max-w-sm md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-10 bg-background h-9 md:h-10 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-3">
            {/* Language Selector - Hidden on mobile */}
            <div className="hidden md:block">
              <Select defaultValue="en">
                <SelectTrigger className="w-auto border-none bg-transparent">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="touch-friendly h-10 w-10 p-0">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Upload Button */}
            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 touch-friendly h-8 md:h-9 px-2 md:px-4">
              <Upload className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden md:inline">Upload</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
