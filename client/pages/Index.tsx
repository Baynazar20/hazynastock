import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "./SignIn";
import { ChevronDown, User } from "lucide-react";
import Footer from "./Footer";

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
      "Is my content private and secure? Does Freepik use my inputs or outputs to train its models?",
    answer:
      "Your content is kept private and secure. Freepik does not use your inputs or outputs to train its models unless you explicitly allow it.",
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
    question: "Do I need to attribute to use Freepik stock content?",
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
  let closeTimeout: NodeJS.Timeout;

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
    "Enterprise",
    "Pricing",
    "Contribute",
  ];

  return (
    <main className="min-h-screen bg-background text-white antialiased">
      {/* Navbar */}
      <header className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-8 mr-[-100px] relative">
          <div className="text-3xl font-extrabold tracking-tight">
            HazynaStock
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-gray-300">
            {menuLinks.map((link) => (
              <div
                key={link}
                className="relative group" // Added group class for better hover handling
                onMouseEnter={() => handleMouseEnter(link)}
                onMouseLeave={() => handleMouseLeave(link)}
              >
                <a className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center"></a>
                <button
                  onClick={() => navigate("/Soon")} // ähli link NotFound sahypasyna geçirýär
                  className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center bg-transparent border-none outline-none"
                >
                  {link}
                </button>

                {/* Dropdown */}
                {link === "Stock" && isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-2xl z-50 border border-gray-600/50 overflow-hidden backdrop-blur-sm">
                    <div className="p-2">
                      <a
                        href="/Images"
                        className="group flex items-center px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
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
                          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            Photos
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            High-quality stock images
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
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
                        className="group flex items-center px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
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
                          <h3 className="font-semibold text-white group-hover:text-green-300 transition-colors">
                            Videos
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            Premium video content
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
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
                        className="group flex items-center px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
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
                          <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            3D Models
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            3D assets & graphics
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
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
                        className="group flex items-center px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-red-600/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
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
                          <h3 className="font-semibold text-white group-hover:text-orange-300 transition-colors">
                            Icons
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            Vector icons & symbols
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
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
          <div className="hidden md:block flex-1 relative max-w-sm">
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
      </header>

      {/* Hero */}
      <section className="px-6">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="text-center pt-12 pb-8">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Creative work, reimagined with AI
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Top AI image, video, and audio models. Professional tools plus
              stock content you'll love.
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
              Join <span className="font-semibold">700,000</span> creative
              teams, marketers, and designers worldwide.
            </span>
          </h2>

          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-18 mt-10 opacity-80">
            <img src="./google.png" alt="Google" className="h-24" />
            <img src="./bank.png" alt="Nubank" className="h-24" />
            <img src="./fish.png" alt="HelloFresh" className="h-24" />
            <img src="./google.png" alt="CocaCola" className="h-24" />
            <img src="./bank.png" alt="Ogilvy" className="h-24" />
          </div>

          {/* Features */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold mb-10">
              The features you need, the simplicity you want
            </h3>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Sidebar */}
              <div className="flex gap-4 md:flex-col md:w-40 overflow-x-auto md:overflow-visible hide-scrollbar">
                {[
                  "Images",
                  "Video",
                  "Audio",
                  "Illustrations",
                  "Design",
                  "All AI tools",
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      item === "Images"
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                <FeatureCard img="./owadan5.jpg" title="Generate an AI image" />
                <FeatureCard
                  img="./owadan1.jpg"
                  title="Chat with AI to transform images"
                />
                <FeatureCard
                  img="./owadan4.jpg"
                  title="Find high-quality images"
                />
                <FeatureCard
                  img="./owadan2.jpg"
                  title="Find high-quality images"
                />
                <FeatureCard
                  img="./owadan3.jpg"
                  title="Find high-quality images"
                />
                <FeatureCard
                  img="./owadan5.jpg"
                  title="Find high-quality images"
                />
              </div>
            </div>
          </div>
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
                <h3 className="text-lg font-semibold mb-2">
                  The all-in-one suite for creatives
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Power your creativity with leading GenAI models, pro features,
                  and a vast stock library — all in one platform. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
                <div className="absolute top-6 right-6 text-gray-500">🎨</div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px]relative">
                <h3 className="text-lg font-semibold mb-2">
                  AI you can trust: private and secure
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your data is never used to train AI — ours or third-party.
                  You're fully protected with advanced security and full rights.
                  Stay consistent, adapt assets easily, and create confidently
                  with powerful tools built for real workflows like yours.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <h3 className="text-lg font-semibold mb-2">
                  Easy to use, with professional results
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Stay consistent, adapt assets easily, and create confidently
                  with powerful tools built for real workflows like yours. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
                <div className="absolute top-6 right-6 text-gray-500">✏️</div>
              </div>

              {/* Card 4 */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors h-[220px] relative">
                <h3 className="text-lg font-semibold mb-2">
                  Join the creators shaping AI's future
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Be part of a global community of top creatives. Get early
                  access to new tools, share your work, and stay inspired. Stay
                  consistent, adapt assets easily, and create confidently with
                  powerful tools built for real workflows like yours.
                </p>
                <div className="absolute top-6 right-6 text-gray-500">💬</div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-background text-white py-16 px-4 ">
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
                <h3 className="text-xl font-semibold mb-2">Individuals</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Create professional, on-brand visuals fast with AI-powered
                  tools and high-quality stock assets.
                </p>
                <p className="text-2xl font-bold">
                  Starting at{" "}
                  <span className="text-4xl font-extrabold">5 EUR</span>
                  <span className="text-base font-normal">/month</span>
                </p>
                <p className="text-sm text-zinc-400 mb-6">
                  37% off billed annually
                </p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-2 rounded-lg font-medium mb-6">
                  Show individual plans
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "AI generation and editing of images, videos, icons, mockups, and music",
                    "Train custom AI models for on-brand visuals: styles, objects, colors, and characters",
                    "Upscale images up to 10K resolution with Magnific and videos up to 4K with Topaz",
                    "Access to Premium stock content: 250M+ photos, vectors, templates, and more",
                    "Priority speed for image and video generation with ChatGPT, Kling, and Veo 3",
                    "Commercial AI license for professionals",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Teams */}
            <div className="bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface2 rounded-2xl p-8 flex flex-col justify-between border border-blue-500">
              <div>
                <h3 className="text-xl font-semibold mb-2">Teams</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Collaborate with your team on AI-driven projects and premium
                  stock assets.
                </p>
                <p className="text-2xl font-bold">
                  22.50 EUR
                  <span className="text-base font-normal"> per user/month</span>
                </p>
                <p className="text-sm text-zinc-400 mb-6">
                  37% off billed annually
                </p>
                <button className="bg-white text-black hover:bg-zinc-200 w-full py-2 rounded-lg font-medium mb-6">
                  Get a plan
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "Everything in individual plans, and:",
                    "Unlimited image generation and editing",
                    "Control team credit usage",
                    "Unified admin and billing",
                    "Secured asset storage",
                    "Team collaboration and sharing",
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
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Get the best for your organization with a dedicated account
                  manager and priority support.
                </p>
                <p className="text-2xl font-bold">Custom</p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-2 rounded-lg font-medium mb-6">
                  Learn more
                </button>

                <ul className="space-y-3 text-sm">
                  {[
                    "Everything in team plans, and:",
                    "Legal indemnification for AI-generated content",
                    "Rights over your AI-generated content",
                    "SSO and enterprise-level security & compliance",
                    "Expert guidance, training, and technical support",
                    "Unlimited users, flexible credits",
                    "3-month evaluation period",
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
      <div className="text-center pt-12 pb-8">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Creative work, reimagined with AI
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Top AI image, video, and audio models. Professional tools plus stock
          content you'll love.
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
