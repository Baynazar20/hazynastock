import { t } from "i18next";
import {
  Instagram,
  Github,
  Mail,
  Home,
  Video,
  Image,
  Box,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("socialMedia")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/hazynastock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  @hazynastock
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hazynastock.com"
                  className="flex items-center  transition-colors hover:text-gray-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  info@hazynastock.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Home className="w-5 h-5 mr-2" />
                  {t("home")}
                </a>
              </li>
              <li>
                <a
                  href="/Images"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Image className="w-5 h-5 mr-2 " />
                  {t("images")}
                </a>
              </li>
              <li>
                <a
                  href="/Videos"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Video className="w-5 h-5 mr-2" />
                  {t("videos")}
                </a>
              </li>
              <li>
                <a
                  href="/3DModels"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Box className="w-5 h-5 mr-2" />
                  {t("3dModels")}
                </a>
              </li>
              <li>
                <a
                  href="/3DModels"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("illustrations")}
                </a>
              </li>
            </ul>
          </div>

          {/* AI Assistant Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">EA gurallary</h3>
            <p className="text-gray-300 mb-4">
              Akylly EA kömekçimiz size ýol görkezmek, soraglara jogap bermek 
              we iş akymyňyzy ýeňilleşdirmek üçin 24/7 elýeterlidir.
            </p>
            <ul className="space-y-3">
              <a
                href="/brand-ai"
                className="flex items-center transition-colors hover:text-gray-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                EA gurallar
              </a>

              <li>
                <a
                  href="/generate-ai"
                  className="flex items-center transition-colors hover:text-gray-300"
                >
                  <Target className="w-5 h-5 mr-2" />
                  HazynaAI
                </a>
              </li>
            </ul>
          </div>

          {/* E-poçta Agzalyk Bölümi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Täzeliklere agza bol</h3>

            {isSubscribed ? (
              <div className="bg-green-800 text-green-100 p-3 rounded-md text-center">
                Siz üstünlikli hasaba alyndyňyz! Täzelenmeler e-poçtaňyza iberilýär.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="E-mail girizmek..."
                  className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-background font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Agza bolmak...
                    </>
                  ) : (
                    "Agza bol"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HazynaStock. Ähli hukuklar goragly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
