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
  Globe,
  Zap,
  Star,
  Target,
  PanelLeftClose,
  PanelRightClose,
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
  { name: "Illustrations", href: "/icons", icon: Sparkles },
];

const aiNavigation = [
  { name: "AI Tools", href: "/generate-ai", icon: Zap, featured: true },
  { name: "Hazyna AI", href: "/brand-ai", icon: Target, featured: true },
];

const userNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Contributor", href: "/contributor", icon: Upload },
  { name: "Settings", href: "/settings", icon: Settings },
];

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "tk", name: "Türkmen" },
  { code: "kk", name: "Қazakh" },
  { code: "uz", name: "O'zbek" },
  { code: "Tj", name: "Tajik" },
  { code: "Kg", name: "Kyrgyz" },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleDesktopSidebar = () => {
    setCollapsed(!collapsed);
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
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-y-hidden",
          "w-[85vw] max-w-80 md:w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-72",
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-16 items-center border-b border-sidebar-border transition-all duration-300",
              collapsed ? "justify-center px-2" : "justify-between px-6",
            )}
          >
            {!collapsed ? (
              <Link to="/" className="flex items-center space-x-3">
                <img
                  className="max-w-[85%] transition-all duration-300"
                  src="/hazyna.png"
                  alt="Hazyna"
                />
              </Link>
            ) : (
              <button
                onClick={toggleDesktopSidebar}
                className="flex items-center justify-center w-10 h-10 my-[10px]"
              >
                <PanelRightClose className="h-6 w-6 text-sidebar-foreground transition-all duration-300" />
              </button>
            )}

            {/* Sidebar açyk wagtynda sag tarapda ýapmak button */}
            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground lg:flex hidden" // diňe desktopda görkezilýär
                onClick={toggleDesktopSidebar} // sidebar ýapýar
              >
                <PanelLeftClose className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile üçin ýapmak düwmesi */}
            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-sidebar-foreground"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav
            className={cn(
              "flex-1 py-4 space-y-2 transition-all duration-300",
              collapsed ? "px-2" : "px-4",
            )}
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center text-sm font-medium rounded-xl transition-all duration-200",
                    "hover:scale-105 hover:shadow-lg",
                    isActivePath(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed
                      ? "justify-center pb-[1rem] pt-[0.5rem]py-4 px-2 mx-1"
                      : "px-4 py-3 mx-2",
                  )}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.name : ""}
                >
                  <Icon
                    className={cn(
                      "transition-all duration-200",
                      collapsed ? "h-6 w-6" : "h-5 w-5 mr-3",
                    )}
                  />

                  {!collapsed && (
                    <span className="transition-all duration-300 opacity-100">
                      {item.name}
                    </span>
                  )}

                  {/* Hover tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* AI Generation Section */}
          <div
            className={cn(
              "pt-4 pb-3 transition-all duration-300",
              collapsed ? "px-2" : "px-4",
            )}
          >
            {!collapsed && (
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 px-3">
                AI Tools
              </div>
            )}

            {aiNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group relative flex items-center text-sm font-medium rounded-xl transition-all duration-200 mb-3",
                    "bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-2 border-amber-500/25",
                    "hover:from-amber-500/25 hover:to-orange-500/25 hover:border-amber-500/40 hover:scale-105 hover:shadow-xl",
                    "text-amber-600 dark:text-amber-400",
                    isActivePath(item.href) &&
                      "from-amber-500/30 to-orange-500/30 border-amber-500/50 shadow-lg",
                    collapsed
                      ? "justify-center py-4 px-2 mx-1"
                      : "px-4 py-4 mx-2",
                  )}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.name : ""}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      collapsed ? "justify-center" : "w-full",
                    )}
                  >
                    <Icon
                      className={cn(
                        "transition-all duration-200",
                        collapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                      )}
                    />

                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        <Star className="h-4 w-4 text-amber-500 fill-current animate-pulse" />
                      </>
                    )}
                  </div>

                  {/* Premium badge for collapsed state */}
                  {collapsed && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                  )}

                  {/* Hover tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                      {item.name} ⭐
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Navigation */}
          <div
            className={cn(
              "border-t border-sidebar-border py-4 space-y-2 transition-all duration-300",
              collapsed ? "px-2" : "px-4",
            )}
          >
            {!collapsed && (
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 px-3">
                Account
              </div>
            )}

            {userNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center text-sm font-medium rounded-xl transition-all duration-200",
                    "hover:scale-105 hover:shadow-lg",
                    isActivePath(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed
                      ? "justify-center py-3 px-2 mx-1"
                      : "px-4 py-3 mx-2",
                  )}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.name : ""}
                >
                  <Icon
                    className={cn(
                      "transition-all duration-200",
                      collapsed ? "h-6 w-6" : "h-5 w-5 mr-3",
                    )}
                  />

                  {!collapsed && (
                    <span className="transition-all duration-300">
                      {item.name}
                    </span>
                  )}

                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          "lg:ml-72",
          collapsed && "lg:ml-20",
        )}
      >
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

            <div className="flex items-center relative flex-1 max-w-sm md:max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground mr-3 hidden lg:flex hover:bg-sidebar-accent/20 transition-all duration-200"
                onClick={toggleDesktopSidebar}
                title={collapsed ? "Sidebar aç" : "Sidebar gizle"}
              ></Button>
              {collapsed && (
                <img
                  src="/hazyna.png"
                  alt="Hazyna"
                  className="h-9 w-auto ml-[-3rem]"
                />
              )}

              <div className="relative ml-[100px] flex-1  ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-8 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-10 pr-3 bg-background w-[700px] h-9 md:h-10 text-sm md:text-base rounded-xl border-2 focus:border-primary/30 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-3">
            <div className="hidden md:block">
              <Select defaultValue="en">
                <SelectTrigger className="w-auto border-none bg-transparent rounded-xl transition-all duration-200">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="rounded-lg"
                    >
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
