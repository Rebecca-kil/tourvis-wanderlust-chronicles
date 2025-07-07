import { useState } from "react";
import { MapPin, Star, Clock, Users, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBlog } from "@/contexts/BlogContext";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const { destinations } = useBlog();

  const regions = ["전체", "국내", "해외", "아시아", "유럽", "북미", "남미"];

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = selectedRegion === "전체" || dest.tags.includes(selectedRegion);
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            세계 여행지 둘러보기
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            전 세계 매력적인 여행지들의 상세 정보와 추천 코스를 만나보세요
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="여행지나 국가명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Link key={destination.id} to={`/destinations/${destination.id}`}>
                <Card className="group hover:shadow-travel-medium transition-travel cursor-pointer overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-travel"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                        {destination.tags[0]}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-travel">
                        {destination.title}
                      </h3>
                      <span className="text-muted-foreground text-sm">{destination.city}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {destination.description}
                    </p>
                    
                    {destination.price && (
                      <div className="mb-4">
                        <span className="text-lg font-bold text-primary">
                          {destination.price.toLocaleString()}원
                        </span>
                        {destination.duration && (
                          <span className="text-muted-foreground ml-2">/ {destination.duration}</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="cta" size="sm" className="w-full">
                      상세보기
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 키워드나 지역으로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>

      <TravelFooter />
    </div>
  );
};

export default Destinations;