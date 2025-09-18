import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, User } from "lucide-react";
import { useState } from "react";

interface UserProfileDropdownProps {
  user: any;
  onSignOut: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white text-sm font-medium">{user.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
          >
            <div className="p-3 border-b border-gray-700">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                My Projects
              </a>
              <hr className="border-gray-700 my-2" />
              <button
                onClick={onSignOut}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
