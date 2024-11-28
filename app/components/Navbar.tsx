import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background bg-opacity-70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                gotiny
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <button
              disabled
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium opacity-75 cursor-not-allowed"
            >
              Logged in as Guest
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
