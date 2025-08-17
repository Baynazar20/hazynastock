import {
  Instagram,
  Github,
  Mail,
  Home,
  Video,
  Image,
  Box,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-rose-500 transition-colors"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  @hazynaStock
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-gray-400 transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  github.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:youremail@gmail.com"
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  hazyaStock@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Images"
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <Image className="w-5 h-5 mr-2" />
                  Images
                </a>
              </li>
              <li>
                <a
                  href="/Videos"
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Videos
                </a>
              </li>
              <li>
                <a
                  href="/3DModels"
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <Box className="w-5 h-5 mr-2" />
                  3D Models
                </a>
              </li>
            </ul>
          </div>

          {/* AI Assistant Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Assistant</h3>
            <p className="text-gray-300 mb-4">
              Our smart AI assistant is available 24/7 to guide you, answer
              questions, and make your workflow easier.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with the latest news, features, and special offers.
              Join our growing community today!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HazynaStock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
