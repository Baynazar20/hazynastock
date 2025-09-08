import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "./SignIn";
import { ChevronDown, User } from "lucide-react";
import Footer from "./Footer";
import Features from "./Features";

function SideImageCard({
  src,
  aspect,
  style = {},
}: {
  src: string;
  aspect: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${aspect}`}
      style={{
        transition: "transform 0.2s ease-out",
        ...style,
      }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question:
      "Is my content private and secure? Does HazynaStock use my inputs or outputs to train its models?",
    answer:
      "Your content is kept private and secure. HazynaStock does not use your inputs or outputs to train its models unless you explicitly allow it.",
  },
  {
    question:
      "How do credits work, and how many generations do I get per tool?",
    answer:
      "Credits are used for AI generation tools. Each tool specifies how many generations are allowed per credit.",
  },
  {
    question:
      "Can I use AI-generated content commercially, and do I own the rights to it?",
    answer:
      "Yes, AI-generated content can be used commercially, and you own the rights to it, subject to the platform's terms.",
  },
  {
    question: "Do I need to attribute to use HazynaStock stock content?",
    answer:
      "Attribution is required for free plans. Premium subscribers are not required to provide attribution.",
  },
  {
    question: "Do you offer legal indemnification for AI and stock content?",
    answer:
      "Yes, legal indemnification is offered for eligible AI and stock content to protect you from third-party claims.",
  },
];

export default function Page() {
  const [scale, setScale] = useState(1);
  const [sideOffset, setSideOffset] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let closeTimeout: NodeJS.Timeout;
  const pricingRef = React.useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/Searching");
    }
  };

  const handleSignInSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleMouseEnter = (link: string) => {
    if (link === "Stock") {
      clearTimeout(closeTimeout);
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = (link: string) => {
    if (link === "Stock") {
      closeTimeout = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 5000); // 5 sekunt garaş
    }
  };

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Orta surat üçin ulaltmak
      const newScale = Math.min(1 + scrollY / 600, 1.5);
      setScale(newScale);

      // Gapdalky suratlar üçin süýşme
      const newOffset = Math.min(scrollY / 10, 50); // max 50px süýşme
      setSideOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks = [
    "AI Suite",
    "Stock",
    "Pricing",
    "Contributors",
    "About Us",
  ];

  return (
    <main className="min-h-screen bg-background text-white antialiased overflow-y-auto">
      {/* Navbar */}
      <header className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="text-2xl font-extrabold tracking-tight">
            <img src="./hazyna.png" className="max-w-[130px]" alt="" />
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <User />
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Sign in
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-8 mr-[-100px] relative">
            <div className="text-3xl font-extrabold tracking-tight">
              <img src="./hazyna.png" className="max-w-[130px]" alt="" />
            </div>

            <nav className="hidden md:flex gap-8 text-sm text-gray-300">
              {menuLinks.map((link) => (
                <div
                  key={link}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(link)}
                  onMouseLeave={() => handleMouseLeave(link)}
                >
                  <button
                    onClick={() => {
                      if (link === "Pricing") {
                        handleScrollToPricing();
                      } else {
                        navigate("/Soon");
                      }
                    }}
                    className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center bg-transparent border-none outline-none"
                  >
                    {link}
                  </button>
                  {link === "Stock" && isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden backdrop-blur-sm">
                      <div className="p-2">
                        <a
                          href="/Images"
                          className="group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 shadow-md group-hover:shadow-blue-500/25 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              Photos
                            </h3>
                            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                              High-quality stock images
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>

                        <a
                          href="/Videos"
                          className="group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500 shadow-md group-hover:shadow-green-500/25 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              Videos
                            </h3>
                            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                              Premium video content
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>

                        <a
                          href="/3d-models"
                          className="group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500 shadow-md group-hover:shadow-purple-500/25 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              3D Models
                            </h3>
                            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                              3D assets & graphics
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>

                        <a
                          href="/Icons"
                          className="group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.01]"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500 shadow-md group-hover:shadow-orange-500/25 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              Illustrations
                            </h3>
                            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                              Vector icons & symbols
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 w-full max-w-xl md:justify-end">
            <div className="hidden md:block relative max-w-sm w-full">
              <input
                aria-label="Search"
                className="w-full rounded-full bg-gray-800 px-4 py-3 placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Search assets or start creating"
                onKeyDown={handleKeyDown}
              />
            </div>

            {user ? (
              <User />
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 py-4 border-t border-gray-700">
            {/* Mobile Search */}
            <div className="mb-4">
              <input
                aria-label="Search"
                className="w-full rounded-full bg-gray-800 px-4 py-3 placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Search assets or start creating"
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {menuLinks.map((link) => (
                <div key={link}>
                  <button
                    onClick={() => {
                      if (link === "Stock") {
                        setIsDropdownOpen(!isDropdownOpen);
                      } else {
                        navigate("/Soon");
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-300 hover:text-white">
                      {link}
                    </span>
                    {link === "Stock" && (
                      <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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
                    )}
                  </button>

                  {/* Mobile Stock Dropdown */}
                  {link === "Stock" && isDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <a
                        href="/Images"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Photos</h3>
                          <p className="text-xs text-gray-400">
                            High-quality stock images
                          </p>
                        </div>
                      </a>

                      <a
                        href="/Videos"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Videos</h3>
                          <p className="text-xs text-gray-400">
                            Premium video content
                          </p>
                        </div>
                      </a>

                      <a
                        href="/3d-models"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">3D Models</h3>
                          <p className="text-xs text-gray-400">
                            3D assets & graphics
                          </p>
                        </div>
                      </a>

                      <a
                        href="/Icons"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Icons</h3>
                          <p className="text-xs text-gray-400">
                            Vector icons & symbols
                          </p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="px-6">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="text-center pt-12 pb-8">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              HazynaStock
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Professional AI tools to create branded posters — plus stock
              images, video, icons and 3D models — tailored for Central Asia.
            </p>
            <div className="mt-6">
              <button
                className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow"
                onClick={() => navigate("/Soon")}
              >
                Get started for free →
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Çep tarap */}
            <div className="md:col-span-3  flex-col gap-6 hidden xl:flex">
              <SideImageCard
                src="./owadan2.jpg"
                aspect="aspect-[16/9]"
                style={{ transform: `translateX(-${sideOffset}px)` }}
              />
              <SideImageCard
                src="./owadan1.jpg"
                aspect="aspect-square"
                style={{ transform: `translateX(-${sideOffset}px)` }}
              />
            </div>

            {/* Orta surat */}
            <div className="md:col-span-6 relative z-30">
              <div
                className="rounded-2xl overflow-hidden sticky top-20"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <img
                  src="./owadan5.jpg"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Sag tarap */}
            <div className="md:col-span-3 relative z-10 hidden xl:block">
              <SideImageCard
                src="./hs.jpg"
                aspect="aspect-[9/16]"
                style={{
                  transform: `translateX(${sideOffset}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-background text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-medium">
            You bring the vision.{" "}
            <span className="font-semibold">We help you go further.</span>
            <span className="text-gray-400">
              {" "}
              Join creative teams, marketers and designers in Central Asia.
            </span>
          </h2>

          {/* Logos */}
          <div className="relative w-full overflow-hidden mt-[35px] opacity-80">
            <div className="flex animate-marquee space-x-20">
              <img src="./1.png" alt="Wabrum" className="h-24" />
              <img src="./2.png" alt="Bezen" className="h-24" />
              <img src="./3.png" alt="Harman Consulting" className="h-24" />
              <img src="./4.png" alt="Maslahat Cozgut" className="h-24" />

              {/* Duplicate logolar */}
              <img src="./1.png" alt="Wabrum" className="h-24" />
              <img src="./2.png" alt="Bezen" className="h-24" />
              <img src="./3.png" alt="Harman Consulting" className="h-24" />
              <img src="./4.png" alt="Maslahat Cozgut" className="h-24" />
            </div>
          </div>

          <Features />
        </div>
        {/* Why Choose Section */}
        <section className="bg-background text-white py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-300">
              Why choose HazynaStock?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 h-[220px] transition-colors relative">
                <h3 className="text-xl font-semibold mb-2">
                  The all-in-one suite for creatives
                </h3>
                <p className="text-gray-400 text-md leading-relaxed">
                  Power your creativity with leading GenAI models, pro features,
                  and a vast stock library — all in one platform. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px]relative">
                <h3 className="text-xl font-semibold mb-2">
                  AI you can trust: private and secure
                </h3>
                <p className="text-gray-400 text-md leading-relaxed">
                  Your data is never used to train AI — ours or third-party.
                  You're fully protected with advanced security and full rights.
                  Stay consistent, adapt assets easily, and create confidently
                  with powerful tools built for real workflows like yours.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <h3 className="text-xl font-semibold mb-2">
                  Easy to use, with professional results
                </h3>
                <p className="text-gray-400 text-md leading-relaxed">
                  Stay consistent, adapt assets easily, and create confidently
                  with powerful tools built for real workflows like yours. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <h3 className="text-xl font-semibold mb-2">
                  Join the creators shaping AI's future
                </h3>
                <p className="text-gray-400 text-md leading-relaxed">
                  Be part of a global community of top creatives. Get early
                  access to new tools, share your work, and stay inspired. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section
        className="bg-background text-white py-16 px-4 "
        ref={pricingRef}
      >
        <div className="max-w-6xl mx-auto mt-[-70px]">
          {/* Title */}
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Plans that cover your needs
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Individuals */}
            <div className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 rounded-2xl p-8 flex flex-col justify-between border border-zinc-800">
              <div>
                <h3 className="text-xl font-semibold mb-2">Standart</h3>
                <p className="text-2xl font-bold">
                  Starting at{" "}
                  <span className="text-[1.25rem] font-extrabold">7.5 USD</span>
                  <span className="text-base font-normal">/month</span>
                </p>
                <p className="text-sm text-zinc-400 mb-6">
                  40% off billed annually
                </p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-2 rounded-lg font-medium mb-6">
                  Show Standart plans
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "360 stock assets",
                    "50 AI generation images tokens",
                    "Free image editing tools",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Teams */}
            <div className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 rounded-2xl p-8 flex flex-col justify-between border border-zinc-800">
              <div>
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-2xl font-bold">
                  Starting at{" "}
                  <span className="text-[1.25rem] font-extrabold">12 USD</span>
                  <span className="text-base font-normal">/month</span>
                </p>
                <p className="text-sm text-zinc-400 mb-6">
                  40% off billed annually
                </p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-2 rounded-lg font-medium mb-6">
                  Show Premium plans
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "360 stock assets",
                    "100 AI generation images tokens",
                    "Free image editing tools",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 rounded-2xl p-8 flex flex-col justify-between border border-zinc-800">
              <div>
                <h3 className="text-xl font-semibold mb-2">Premium+</h3>
                <p className="text-2xl font-bold">
                  Starting at{" "}
                  <span className="text-[1.25rem] font-extrabold">15 USD</span>
                  <span className="text-base font-normal">/month</span>
                </p>
                <p className="text-sm text-zinc-400 mb-6">
                  40% off billed annually
                </p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-2 rounded-lg font-medium mb-6">
                  Show Premium+ plans
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "900 stock assets",
                    "200 AI generation images tokens",
                    "Free image editing tools",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background text-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-4">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-lg font-medium hover:text-gray-300 transition">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-3 text-gray-400 text-sm transition-all duration-300 overflow-hidden ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignInSuccess={function (userData: any): void {
          throw new Error("Function not implemented.");
        }}
      />

      <Footer />
    </main>
  );
}

function ImageCard({
  src,
  aspect = "aspect-[16/9]",
}: {
  src: string;
  aspect?: string;
}) {
  return (
    <div className={`${aspect} rounded-2xl overflow-hidden`}>
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

function FeatureCard({ img, title }: { img: string; title: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
      <img
        src={img}
        alt={title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white font-medium">
        {title}
      </div>
    </div>
  );
}
