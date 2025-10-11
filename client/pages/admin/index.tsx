import React, { useState } from "react";
import {
  Image,
  Video,
  Box,
  Layers,
  X,
  UserRound,
  Play,
  HelpCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export default function CreationPlatform() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const categorie = [
    "All",
    "Designer",
    "Marketer",
    "Photographer",
    "Content creator",
    "Business owner",
    "Filmmaker",
    "Illustrator",
  ];

  const tutorials = [
    {
      id: 1,
      title: "Create branded images and videos with AI",
      image:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop",
      categories: ["Designer", "Content creator"],
    },
    {
      id: 2,
      title: "Localize a global campaign",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      categories: ["Marketer", "Business owner"],
    },
    {
      id: 3,
      title: "Edit images using AI with visual prompt",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      categories: ["Designer", "Photographer"],
    },
    {
      id: 4,
      title: "Generate an SVG sticker with AI",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      categories: ["Designer", "Illustrator"],
    },
    {
      id: 5,
      title: "Render a 3D design with AI",
      image:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop",
      categories: ["Designer", "Filmmaker"],
    },
    {
      id: 6,
      title: "Create social media content",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
      categories: ["Content creator", "Marketer"],
    },
  ];

  const filteredTutorials =
    activeCategory === "All"
      ? tutorials
      : tutorials.filter((t) => t.categories.includes(activeCategory));

  const categories = [
    {
      id: "images",
      name: "Images",
      icon: Image,
      uploadText: "Upload Images",
    },
    {
      id: "videos",
      name: "Videos",
      icon: Video,
      uploadText: "Upload Videos",
    },
    {
      id: "icons",
      name: "Icons",
      icon: Layers,
      uploadText: "Upload Icons",
    },
    {
      id: "3d-models",
      name: "3D Models",
      icon: Box,
      uploadText: "Upload 3D Models",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background text-white">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Welcome, to Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPricingModal(true)}
              className="text-orange-500 hover:text-orange-400 font-medium"
            >
              Pricing
            </button>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <UserRound />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">
              What would you like to create today?
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-[0.5rem] rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-gray-800 border-gray-600"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-lg bg-gray-800">
                      <IconComponent size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-base font-medium text-gray-300">
                      {category.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Upload Section */}
          {selectedCategory && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  {categories.find((c) => c.id === selectedCategory)?.icon &&
                    React.createElement(
                      categories.find((c) => c.id === selectedCategory).icon,
                      {
                        size: 48,
                        className: "mx-auto text-gray-500",
                      },
                    )}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {
                    categories.find((c) => c.id === selectedCategory)
                      ?.uploadText
                  }
                </h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop your files here or click to browse
                </p>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all">
                  Select Files
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Pricing Modal */}
        {showPricingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                  Plans that cover your needs
                </h2>
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Standart */}
                  <div className="bg-gray-800 rounded-2xl p-8 flex flex-col justify-between border border-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Standart</h3>
                      <p className="text-2xl font-bold">
                        Starting at{" "}
                        <span className="text-xl font-extrabold">7.5 USD</span>
                        <span className="text-base font-normal">/month</span>
                      </p>
                      <p className="text-sm text-gray-400 mb-6">
                        40% off billed annually
                      </p>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white w-full py-2 rounded-lg font-medium mb-6">
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

                  {/* Premium */}
                  <div className="bg-gray-800 rounded-2xl p-8 flex flex-col justify-between border border-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Premium</h3>
                      <p className="text-2xl font-bold">
                        Starting at{" "}
                        <span className="text-xl font-extrabold">12 USD</span>
                        <span className="text-base font-normal">/month</span>
                      </p>
                      <p className="text-sm text-gray-400 mb-6">
                        40% off billed annually
                      </p>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white w-full py-2 rounded-lg font-medium mb-6">
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

                  {/* Premium+ */}
                  <div className="bg-gray-800 rounded-2xl p-8 flex flex-col justify-between border border-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Premium+</h3>
                      <p className="text-2xl font-bold">
                        Starting at{" "}
                        <span className="text-xl font-extrabold">15 USD</span>
                        <span className="text-base font-normal">/month</span>
                      </p>
                      <p className="text-sm text-gray-400 mb-6">
                        40% off billed annually
                      </p>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white w-full py-2 rounded-lg font-medium mb-6">
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
            </div>
          </div>
        )}
        <section>
          {" "}
          <div className=" bg-background text-white p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Tutorials</h1>
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>Need more help?</span>
              </button>
            </div>

            {/* Tutorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video bg-gray-900">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Play
                          className="w-8 h-8 text-black ml-1"
                          fill="black"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-medium leading-tight group-hover:text-gray-300 transition-colors">
                    {tutorial.title}
                  </h3>
                </div>
              ))}
            </div>

      
          </div>
        </section>
      </div>
      <Footer />
    </Layout>
  );
}
