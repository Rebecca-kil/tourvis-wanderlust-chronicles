import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TravelFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterCategories = {
    "지역": ["아시아", "유럽", "북미", "남미", "아프리카", "오세아니아", "국내"],
    "여행 스타일": ["배낭여행", "호캉스", "가족여행", "커플여행", "혼여행", "출장"],
    "예산": ["저예산", "중간예산", "럭셔리", "무료"],
    "계절": ["봄", "여름", "가을", "겨울", "연중무휴"],
    "테마": ["맛집", "쇼핑", "문화", "자연", "액티비티", "휴양"]
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <section className="py-8 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            필터 {selectedFilters.length > 0 && `(${selectedFilters.length})`}
          </Button>
        </div>

        {/* Filter Content */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  필터
                </h3>
                {selectedFilters.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    전체 해제
                  </Button>
                )}
              </div>

              {/* Selected Filters */}
              {selectedFilters.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter) => (
                      <Badge 
                        key={filter} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-travel"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Object.entries(filterCategories).map(([category, filters]) => (
                  <div key={category}>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <Badge
                          key={filter}
                          variant={selectedFilters.includes(filter) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-travel block text-center"
                          onClick={() => toggleFilter(filter)}
                        >
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Apply Button for Mobile */}
              <div className="md:hidden mt-6 pt-6 border-t">
                <Button 
                  variant="travel" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsFilterOpen(false)}
                >
                  필터 적용하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TravelFilter;