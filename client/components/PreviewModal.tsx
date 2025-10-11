import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Heart,
  UserRoundPlus,
  Star,
  Play,
  Share,
  Flag,
  Package,
  Maximize2,
  Image as ImageIcon,
  Video,
  Box,
  Sparkles,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    type?: string;
    title: string;
    category: string;
    tags: string[];
    price: string;
    downloads: number;
    views: number;
    rating: number;
    thumbnail: string;
    contributor: string;
    resolution?: string;
    duration?: string;
    fileSize?: string;
    formats?: string[];
    polygons?: string;
    iconCount?: number;
    style?: string;
    orientation?: string;
    fps?: string;
    complexity?: string;
    rigged?: boolean;
    animated?: boolean;
    dominantColor?: string;
    video?: URL;
  };
}

export default function PreviewModal({
  isOpen,
  onClose,
  item,
}: PreviewModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "3d":
        return <Box className="h-4 w-4" />;
      case "icon":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const link = document.createElement("a");
      link.href = item.thumbnail;
      link.download = `${item.title.replace(/\s+/g, "_")}.${getFileExtension(item.thumbnail)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Downloaded: ${item.title}`);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  const getFileExtension = (url: string) => {
    return url.split(".").pop()?.toLowerCase() || "jpg";
  };

  const handleImageClick = () => {
    window.open(item.thumbnail, "_blank");
  };

  const renderPreviewContent = () => {
    switch (item.type) {
      case "video":
        return (
          <div
            onClick={() => window.open(item.video, "_blank")}
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0"
              >
                <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 fill-current" />
              </Button>
            </div>
            {item.duration && (
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 bg-black/80 text-white text-xs sm:text-sm px-2 py-1 rounded">
                {item.duration}
              </div>
            )}
          </div>
        );

      case "3d":
        return (
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              onClick={() => window.open(item.thumbnail, "_blank")}
              className="w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
              <Button
                variant="secondary"
                size="lg"
                className="text-xs sm:text-sm md:text-base"
              >
                <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2" />
                View in 3D
              </Button>
            </div>
          </div>
        );

      case "icon":
        return (
          <div className="aspect-square bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 h-full">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => window.open(item.thumbnail, "_blank")}
                >
                  {getTypeIcon("icon")}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => window.open(item.thumbnail, "_blank")}
            />
          </div>
        );
    }
  };

  const renderTechnicalDetails = () => {
    const details = [];

    if (item.resolution)
      details.push({ label: "Resolution", value: item.resolution });
    if (item.fileSize)
      details.push({ label: "File Size", value: item.fileSize });
    if (item.duration)
      details.push({ label: "Duration", value: item.duration });
    if (item.fps)
      details.push({ label: "Frame Rate", value: `${item.fps}fps` });
    if (item.polygons)
      details.push({ label: "Polygons", value: item.polygons });
    if (item.iconCount)
      details.push({ label: "Icon Count", value: `${item.iconCount} icons` });
    if (item.style) details.push({ label: "Style", value: item.style });
    if (item.orientation)
      details.push({ label: "Orientation", value: item.orientation });

    return details;
  };

  const reportReasons = [
    "Low quality image",
    "Image contains errors",
    "Image won't open",
    "Other reason",
  ];

  const handleReportSubmit = () => {
    console.log("Report reason:", selectedReportReason);
    setIsReportModalOpen(false);
    setSelectedReportReason("");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-3 sm:p-4 md:p-6">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="text-base sm:text-lg md:text-xl font-bold pr-8">
              {item.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Preview Section */}
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
              {renderPreviewContent()}

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button
                  className="flex-1 h-11 sm:h-10 text-sm sm:text-base font-medium"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
                <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn("h-11 sm:h-9", isLiked && "text-red-500")}
                  >
                    <Heart
                      className={cn("h-4 w-4", isLiked && "fill-current")}
                    />
                  </Button>
                  <Button variant="outline" size="sm" className="h-11 sm:h-9">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReportModalOpen(true)}
                    className="h-11 sm:h-9"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {renderTechnicalDetails().length > 0 && (
                <div className="bg-muted/50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                  <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">
                    Technical Details
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2">
                    {renderTechnicalDetails().map((detail, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm py-1"
                      >
                        <span className="text-muted-foreground font-medium sm:font-normal">
                          {detail.label}:
                        </span>
                        <span className="font-semibold sm:font-medium text-foreground">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {getTypeIcon(item.type || "other")}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {item.category}
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="text-center bg-muted/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="text-base sm:text-lg font-semibold text-foreground">
                    {item.downloads.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Downloads
                  </div>
                </div>
                <div className="text-center bg-muted/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="text-base sm:text-lg font-semibold text-foreground">
                    {item.views.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Views
                  </div>
                </div>
                <div className="text-center bg-muted/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="flex items-center justify-center">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="text-base sm:text-lg font-semibold text-foreground">
                      {item.rating}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Rating
                  </div>
                </div>
                <div className="text-center bg-muted/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="text-base sm:text-lg font-semibold text-primary">
                    {item.price}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Price
                  </div>
                </div>
              </div>

              {/* Contributor Card */}
              <div className="flex items-center gap-2 sm:gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
                  <AvatarImage src="" alt={item.contributor} />
                  <AvatarFallback className="text-xs sm:text-sm">
                    {item.contributor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm sm:text-base truncate">
                    {item.contributor}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Creator
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 shrink-0"
                >
                  <UserRoundPlus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Follow</span>
                </Button>
              </div>

              {/* License Info */}
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground text-sm sm:text-base">
                    License
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Standard license included. Commercial use allowed.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] bg-gray-900 border-gray-800 p-4 sm:p-6">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="text-white text-lg sm:text-xl font-semibold text-center">
              Report content
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-center text-xs sm:text-sm">
              Send your feedback and we'll use this information to improve.
            </p>

            <div className="space-y-2">
              <label className="text-white text-xs sm:text-sm font-medium block">
                Why are you reporting this?
              </label>

              <div className="relative">
                <select
                  value={selectedReportReason}
                  onChange={(e) => setSelectedReportReason(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2.5 sm:py-2 text-xs sm:text-sm appearance-none cursor-pointer hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select an option</option>
                  {reportReasons.map((reason) => (
                    <option key={reason} value={reason} className="bg-gray-800">
                      {reason}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-white text-xs sm:text-sm font-medium block">
                Description (optional)
              </label>
              <textarea
                placeholder="Which issue have you found?"
                className="w-full bg-gray-800 border h-[200px] sm:h-[250px] md:h-[300px] border-gray-700 text-white rounded-md px-3 py-2 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
              <Button
                onClick={() => setIsReportModalOpen(false)}
                variant="outline"
                className="h-10 sm:h-10 text-xs sm:text-sm text-white border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReportSubmit}
                disabled={!selectedReportReason}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 h-10 sm:h-10 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
