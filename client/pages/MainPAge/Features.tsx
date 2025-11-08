import { useState } from "react";

const contentData = {
  Images: [
    { img: "./owadan5.jpg", title: "EA surat generirle" },
    { img: "./owadan1.jpg", title: "Suratlary üýtget" },
    { img: "./owadan4.jpg", title: "Ýokary hilli suratlary al" },
    { img: "./owadan2.jpg", title: "Suratlary kämilleşdir" },
    { img: "./owadan3.jpg", title: "Surat toplumyny döret" },
    { img: "./owadan5.jpg", title: "Filtr we effektleri ulan" },
  ],
  Video: [
    {
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      title: "Wideolary ýasa",
    },
    {
      img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
      title: "Suratlary kämilleşdir",
    },
    {
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      title: "Effekt we şekil goş",
    },
    {
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      title: "Wideo generirle",
    },
    {
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      title: "Kes we kämilleşdir",
    },
    {
      img: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400&h=300&fit=crop",
      title: "Göçürip al",
    },
  ],
  Icons: [
    {
      img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      title: "Müňlerçe ikonka",
    },
    {
      img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
      title: "Ikonkalary üýtget",
    },
    {
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      title: "Wektor ikonkalar",
    },
    {
      img: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop",
      title: "Ikonka kolleksiýalary",
    },
    {
      img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
      title: "Dürli formatda ýüklemek",
    },
    {
      img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop",
      title: "Ikonka kitaphanasy",
    },
  ],
  "3D Models": [
    {
      img: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=300&fit=crop",
      title: "3D model kitaphanasy",
    },
    {
      img: "https://images.unsplash.com/photo-1626387346567-8a6c2b2d4a7b?w=400&h=300&fit=crop",
      title: "Modelleri görmek",
    },
    {
      img: "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=400&h=300&fit=crop",
      title: "3D model döretmek",
    },
    {
      img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=300&fit=crop",
      title: "3D animasiýa",
    },
    {
      img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
      title: "Tekstura we materiallar",
    },
    {
      img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
      title: "Eksport etmek",
    },
  ],
  "AI Tools": [
    {
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      title: "EA surat generirleme",
    },
    {
      img: "https://images.unsplash.com/photo-1675557009384-88d1ac4946ce?w=400&h=300&fit=crop",
      title: "EA döredijilik",
    },
    {
      img: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=300&fit=crop",
      title: "Suratlary üýtgetmek",
    },
    {
      img: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=300&fit=crop",
      title: "Dizaýn kömekçi",
    },
    {
      img: "https://images.unsplash.com/photo-1686191128892-5ba45d6e08ab?w=400&h=300&fit=crop",
      title: "Surat arassalaýjy",
    },
    {
      img: "https://images.unsplash.com/photo-1686191128985-45e64af4b00f?w=400&h=300&fit=crop",
      title: "Reňk saýlaýjy",
    },
  ],
};

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

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("Images");

  const categories = ["Images", "Video", "Icons", "3D Models", "AI Tools"];

  return (
    <div className="mt-16 p-6  min-h-screen text-white">
      <h3 className="text-2xl md:text-3xl font-semibold mb-10">
        Siziň isleýän mümkinçilikleriňiz we ýeňillikleriňiz
      </h3>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="flex gap-4 md:flex-col md:w-40 overflow-x-auto md:overflow-visible hide-scrollbar">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(item)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                item === activeCategory
                  ? "bg-gray-700 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {contentData[activeCategory].map((item, index) => (
            <FeatureCard
              key={`${activeCategory}-${index}`}
              img={item.img}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
