import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "../SignIn";
import { ChevronDown, Globe, User } from "lucide-react";
import Footer from "../../components/Footer";
import Features from "./Features";
import { Palette, Lock, SquarePen, MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

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

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "tm", name: "Türkmen" },
  { code: "kk", name: "Қazakh" },
  { code: "uz", name: "O'zbek" },
  { code: "Tj", name: "Tajik" },
  { code: "Kg", name: "Kyrgyz" },
];

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
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/Searching");
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleMouseEnter = (link: string) => {
    if (link === "Stock") {
      setIsDropdownOpen(true);
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    }
  };

  const handleMouseLeave = (link: string) => {
    if (link === "Stock") {
      closeTimeout = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };
  const handleChange = (value: string) => {
    setCurrentLang(value);
    i18n.changeLanguage(value);
  };

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const newScale = Math.min(1 + scrollY / 600, 1.5);
      setScale(newScale);

      const newOffset = Math.min(scrollY / 10, 50);
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
            <img src="./hazyna.png" className="max-w-[200px]" alt="" />
          </div>

          <div className="flex items-center gap-3">
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
              <img src="./hazyna.png" className="max-w-[200px]" alt="" />
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
                    <div className="absolute left-0 mt-2 w-[400px] bg-black text-white rounded-2xl shadow-2xl z-50 border border-gray-800 p-6">
                      <div className="flex flex-col gap-3">
                        {/* Photos */}
                        <a
                          href="/Images"
                          className="group flex items-center gap-4 rounded-xl p-1 transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-300 text-md hover:text-white">
                              Photos
                            </h3>
                          </div>
                        </a>

                        {/* Videos */}
                        <a
                          href="/Videos"
                          className="group flex items-center gap-4 rounded-xl p-1 transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-300 text-md hover:text-white">
                              {t("videos")}
                            </h3>
                          </div>
                        </a>

                        {/* 3D Models */}
                        <a
                          href="/3d-models"
                          className="group flex items-center gap-4 rounded-xl p-1 transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-300 text-md hover:text-white">
                              3D Models
                            </h3>
                          </div>
                        </a>

                        {/* Illustrations */}
                        <a
                          href="/Icons"
                          className="group flex items-center gap-4 rounded-xl p-1  transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-300 text-md hover:text-white">
                              Illustrations
                            </h3>
                          </div>
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
                className="w-[300px] rounded-full ml-[55px] bg-gray-800 px-4 py-3 placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Search assets or start creating"
                onKeyDown={handleKeyDown}
              />
            </div>

            {user ? (
              <User />
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="px-6 py-3 mr-[10px] rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => handleChange(currentLang === "en" ? "tm" : "en")}
              className="w-10 h-10 rounded-full overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-gray-600"
              aria-label="Switch language"
            >
              <img
                src={
                  currentLang === "en"
                    ? "https://flagcdn.com/w80/us.png"
                    : "https://flagcdn.com/w80/tm.png"
                }
                alt={currentLang === "en" ? "English" : "Turkmen"}
                className="w-full h-full object-cover"
              />
            </button>
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
                  {link === "Stock" && isDropdownOpen && (
                    <div
                      className="ml-4 mt-2 space-y-2"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <a
                        href="/Images"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <h3 className="font-medium text-white">Photos</h3>
                        </div>
                      </a>

                      <a
                        href="/Videos"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <h3 className="font-medium text-white">Videos</h3>
                        </div>
                      </a>

                      <a
                        href="/3d-models"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <h3 className="font-medium text-white">3D Models</h3>
                        </div>
                      </a>

                      <a
                        href="/Icons"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <h3 className="font-medium text-white">
                            Illustrations
                          </h3>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    The all-in-one suite for creatives
                  </h3>
                  <Palette className="text-gray" />
                </div>

                <p className="text-gray-400 text-md leading-relaxed">
                  Power your creativity with leading GenAI models, pro features,
                  and a vast stock library — all in one platform.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px]relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold mb-2">
                    AI you can trust: private and secure
                  </h3>
                  <Lock />
                </div>
                <p className="text-gray-400 text-md leading-relaxed">
                  Your data is never used to train AI — ours or third-party.
                  You're fully protected with advanced security and full rights.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold mb-2">
                    Easy to use, with professional results
                  </h3>
                  <SquarePen />
                </div>
                <p className="text-gray-400 text-md leading-relaxed">
                  Stay consistent, adapt assets easily, and create confidently
                  with powerful tools built for real workflows like yours.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold mb-2">
                    Join the creators shaping AI's future
                  </h3>
                  <MessageSquareText />
                </div>
                <p className="text-gray-400 text-md leading-relaxed">
                  Be part of a global community of top creatives. Get early
                  access to new tools, share your work, and stay inspired.
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
