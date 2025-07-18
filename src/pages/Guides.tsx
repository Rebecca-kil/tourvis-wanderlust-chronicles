
import { useState } from "react";
import { Compass, Plane, Calendar, Package, TrendingUp, HelpCircle, Search, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBlog } from "@/contexts/BlogContext";

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [likedGuides, setLikedGuides] = useState<Set<string>>(new Set());
  const { guides } = useBlog();

  const categories = ["전체", "교통", "일정", "준비물", "팁", "FAQ"];

  {/* const guideCategories = [
    {
      id: "transport",
      title: "교통 가이드",
      icon: Plane,
      description: "항공, 기차, 버스 등 교통수단별 예약 팁과 노하우",
      color: "from-travel-ocean to-travel-sky"
    },
    {
      id: "schedule",
      title: "일정 계획",
      icon: Calendar,
      description: "효율적인 여행 일정 짜는 법과 시간 관리 팁",
      color: "from-travel-sunset to-travel-sand"
    },
    {
      id: "packing",
      title: "준비물 리스트",
      icon: Package,
      description: "목적지별, 계절별 필수 준비물과 패킹 가이드",
      color: "from-travel-forest to-travel-sky"
    },
    {
      id: "tips",
      title: "팁",
      icon: Compass,
      description: "현지에서 유용한 생활 팁과 문화 에티켓",
      color: "from-secondary to-travel-sunset"
    },
    {
      id: "trends",
      title: "여행 트렌드",
      icon: TrendingUp,
      description: "최신 여행 트렌드와 인기 여행 스타일 소개",
      color: "from-travel-sky to-travel-ocean"
    },
    {
      id: "faq",
      title: "자주 묻는 질문",
      icon: HelpCircle,
      description: "여행자들이 가장 많이 궁금해하는 질문과 답변",
      color: "from-travel-sand to-travel-forest"
    }
  ];
  */}

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === "전체" || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLikeToggle = (guideId: string) => {
    setLikedGuides(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guideId)) {
        newSet.delete(guideId);
      } else {
        newSet.add(guideId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            여행 가이드
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            처음 여행하는 분부터 여행 고수까지, 모든 여행자를 위한 실용적인 가이드
          </p>
        </div>
      </section>

      {/* Category Overview 
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              카테고리별 가이드
            </h2>
            <p className="text-xl text-muted-foreground">
              필요한 정보를 카테고리별로 쉽게 찾아보세요
            </p>
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-travel-medium transition-travel cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-travel">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
    
        </div>
      </section>
      */}

      {/* Search and Filter */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="가이드 제목이나 키워드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Link key={guide.id} to={`/guides/${guide.id}`}>
                <Card className="group hover:shadow-travel-medium transition-travel cursor-pointer overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-travel"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                        {guide.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {guide.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-travel leading-tight">
                      {guide.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {guide.description}
                    </p>

                    {/* 카테고리별 미리보기 정보 */}
                    {guide.category === '교통' && guide.transportType && (
                      <div className="mb-3 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-medium text-primary">교통수단: {guide.transportType}</span>
                      </div>
                    )}
                    
                    {guide.category === '일정' && guide.totalDuration && (
                      <div className="mb-3 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-medium text-primary">총 기간: {guide.totalDuration}</span>
                      </div>
                    )}
                    
                    {guide.category === '준비물' && guide.packingList && guide.packingList.length > 0 && (
                      <div className="mb-3 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-medium text-primary">준비물: {guide.packingList.slice(0, 2).map(item => item.category).join(', ')}{guide.packingList.length > 2 ? ' 외' : ''}</span>
                      </div>
                    )}
                    
                    {guide.category === '팁' && guide.ticketComparisons && guide.ticketComparisons.length > 0 && (
                      <div className="mb-3 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-medium text-primary">비교 상품: {guide.ticketComparisons.length}개</span>
                      </div>
                    )}
                    
                    {guide.category === 'FAQ' && guide.faqs && guide.faqs.length > 0 && (
                      <div className="mb-3 p-2 bg-muted/50 rounded-md">
                        <span className="text-xs font-medium text-primary">FAQ: {guide.faqs.length}개 질문</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="text-xs">by {guide.author}</span>
                      {guide.readTime && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-xs">{guide.readTime}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLikeToggle(guide.id);
                        }}
                        className={`flex items-center gap-2 ${likedGuides.has(guide.id) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                      >
                        <Heart className={`w-4 h-4 ${likedGuides.has(guide.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{guide.likes}</span>
                      </Button>
                      <Button variant="cta" size="sm">
                        읽어보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <Compass className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 키워드나 카테고리로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>

      <TravelFooter />
    </div>
  );
};

export default Guides;
