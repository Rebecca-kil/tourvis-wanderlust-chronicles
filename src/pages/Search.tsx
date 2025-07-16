import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, User, BookOpen, Gift } from "lucide-react";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/contexts/BlogContext";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { guides, stories, benefits, destinations } = useBlog();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const searchResults = () => {
    if (!searchQuery.trim()) return { guides: [], stories: [], benefits: [], destinations: [] };

    const query = searchQuery.toLowerCase();

    const filteredGuides = guides.filter(guide =>
      guide.title.toLowerCase().includes(query) ||
      guide.author.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query) ||
      (guide.description && guide.description.toLowerCase().includes(query))
    );

    const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(query) ||
      story.author.toLowerCase().includes(query) ||
      story.category.toLowerCase().includes(query) ||
      (story.city && story.city.toLowerCase().includes(query)) ||
      story.excerpt.toLowerCase().includes(query)
    );

    const filteredBenefits = benefits.filter(benefit =>
      benefit.title.toLowerCase().includes(query) ||
      benefit.description.toLowerCase().includes(query) ||
      benefit.category.toLowerCase().includes(query)
    );

    const filteredDestinations = destinations.filter(destination =>
      destination.title.toLowerCase().includes(query) ||
      destination.city.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query)
    );

    return {
      guides: filteredGuides,
      stories: filteredStories,
      benefits: filteredBenefits,
      destinations: filteredDestinations
    };
  };

  const results = searchResults();
  const totalResults = results.guides.length + results.stories.length + results.benefits.length + results.destinations.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Search Header */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">검색 결과</h1>
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="여행지나 키워드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 text-lg py-3"
              />
            </form>
            {searchQuery && (
              <p className="text-muted-foreground">
                "<span className="text-foreground font-medium">{searchQuery}</span>"에 대한 검색 결과 ({totalResults}개)
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {totalResults === 0 && searchQuery ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 키워드로 검색해보세요</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Destinations */}
              {results.destinations.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">여행지 ({results.destinations.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.destinations.map((destination) => (
                      <Link key={destination.id} to={`/destinations/${destination.id}`}>
                        <Card className="group hover:shadow-lg transition-all cursor-pointer">
                          <div className="relative overflow-hidden">
                            <img 
                              src={destination.image || "/placeholder.svg"} 
                              alt={destination.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                              {destination.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              📍 {destination.city}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {destination.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Guides */}
              {results.guides.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <User className="w-6 h-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">여행 가이드 ({results.guides.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.guides.map((guide) => (
                      <Link key={guide.id} to={`/guides/${guide.id}`}>
                        <Card className="group hover:shadow-lg transition-all cursor-pointer">
                          <div className="relative overflow-hidden">
                            <img 
                              src={guide.image} 
                              alt={guide.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge variant="outline" className="mb-2">
                              {guide.category}
                            </Badge>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {guide.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              👤 {guide.author}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {guide.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories */}
              {results.stories.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">여행 이야기 ({results.stories.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.stories.map((story) => (
                      <Link key={story.id} to={`/stories/${story.id}`}>
                        <Card className="group hover:shadow-lg transition-all cursor-pointer">
                          <div className="relative overflow-hidden">
                            <img 
                              src={story.image} 
                              alt={story.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge variant="outline" className="mb-2">
                              {story.category}
                            </Badge>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {story.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {story.city ? `📍 ${story.city} • ` : ''}👤 {story.author}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {story.excerpt}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {results.benefits.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Gift className="w-6 h-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">혜택 ({results.benefits.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.benefits.map((benefit) => (
                      <Link key={benefit.id} to={`/benefits/${benefit.id}`}>
                        <Card className="group hover:shadow-lg transition-all cursor-pointer">
                          <div className="relative overflow-hidden">
                            <img 
                              src={benefit.image} 
                              alt={benefit.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            />
                            {benefit.isHot && (
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-red-500 text-white">🔥 HOT</Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <Badge variant="outline" className="mb-2">
                              {benefit.category}
                            </Badge>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {benefit.title}
                            </h3>
                            {benefit.discount && (
                              <div className="text-lg font-bold text-red-600 mb-2">
                                {benefit.discount} OFF
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {benefit.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <TravelFooter />
    </div>
  );
};

export default SearchPage;