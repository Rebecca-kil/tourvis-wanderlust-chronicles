import { useState } from "react";
import { Search, Menu, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const TravelHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "여행지", href: "/destinations" },
    { name: "여행 가이드", href: "/guides" },
    { name: "여행 이야기", href: "/stories" },
    { name: "혜택", href: "/benefits" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-travel-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-foreground">투어비스 블로그</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-travel font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="여행지나 키워드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="여행지나 키워드 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-foreground hover:text-primary transition-travel font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TravelHeader;