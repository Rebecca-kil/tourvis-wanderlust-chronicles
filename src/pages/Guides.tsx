import { useState } from "react";
import { Compass, Plane, Calendar, Package, TrendingUp, HelpCircle, Search, Filter, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [likedGuides, setLikedGuides] = useState<Set<number>>(new Set());

  const categories = ["전체", "교통", "일정", "준비물", "실용 팁", "트렌드", "FAQ"];

  const guideCategories = [
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
      title: "실용 팁",
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

  const guides = [
    {
      id: 1,
      title: "항공료 50% 절약하는 예약 타이밍과 팁",
      category: "교통",
      readTime: "8분",
      difficulty: "초급",
      tags: ["항공료", "예약", "절약", "팁"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop",
      summary: "항공료를 최대 50%까지 절약할 수 있는 예약 타이밍, 항공사 선택 요령, 숨겨진 할인 혜택 활용법까지 완벽 정리",
      author: "여행 전문가 김철수",
      
      likes: "856",
      content: {
        sections: [
          {
            title: "1. 최적의 예약 타이밍",
            content: "국내선: 출발 1-2개월 전, 국제선: 2-3개월 전이 가장 저렴합니다. 화요일 오후 3시경이 항공료가 가장 낮은 시간대입니다."
          },
          {
            title: "2. 항공사 선택 요령",
            content: "LCC(저비용항공사) vs FSC(일반항공사) 비교, 수하물 정책, 좌석 선택비, 기내식 등 부가비용까지 계산해서 총 비용을 비교하세요."
          },
          {
            title: "3. 할인 혜택 활용법",
            content: "항공사 멤버십, 신용카드 적립, 마일리지 활용, 얼리버드/라스트미닛 특가 등을 적극 활용하면 50% 이상 절약 가능합니다."
          }
        ],
        tips: ["주중 출발이 주말보다 20-30% 저렴", "직항보다 경유가 더 저렴할 수 있음", "취소 가능한 항공권도 고려해보세요"]
      }
    },
    {
      id: 2,
      title: "3박 4일 일본 여행 완벽 일정표 (도쿄-오사카)",
      category: "일정",
      readTime: "12분",
      difficulty: "중급",
      tags: ["일본", "일정", "도쿄", "오사카"],
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=240&fit=crop",
      summary: "첫 일본 여행자를 위한 최적화된 3박 4일 일정표. 교통패스, 숙소 위치, 맛집까지 상세히 안내",
      author: "일본 여행 전문가 이영희",
      
      likes: "1.2k"
    },
    {
      id: 3,
      title: "유럽 배낭여행 짐싸기 완벽 가이드 (체크리스트 포함)",
      category: "준비물",
      readTime: "10분",
      difficulty: "초급",
      tags: ["유럽", "배낭여행", "짐싸기", "체크리스트"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop",
      summary: "20일 유럽 배낭여행에 필요한 모든 준비물을 정리. 계절별 의류, 전자기기, 약품까지 놓치지 말아야 할 필수템들",
      author: "배낭여행러 박민수",
      
      likes: "967"
    },
    {
      id: 4,
      title: "해외여행 시 꼭 알아야 할 현지 문화 에티켓 10가지",
      category: "실용 팁",
      readTime: "6분",
      difficulty: "초급",
      tags: ["문화", "에티켓", "매너", "팁"],
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=240&fit=crop",
      summary: "여행지에서 실수하지 않기 위한 기본 문화 에티켓. 아시아, 유럽, 아메리카 대륙별 주의사항과 팁",
      author: "문화 연구가 최지원",
      
      likes: "634"
    },
    {
      id: 5,
      title: "2024년 뜨는 여행 트렌드: 웰니스 여행과 디지털 디톡스",
      category: "트렌드",
      readTime: "7분",
      difficulty: "초급",
      tags: ["2024", "트렌드", "웰니스", "디지털디톡스"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
      summary: "올해 가장 주목받는 여행 트렌드들을 분석. 웰니스 여행, 지속 가능한 여행, 디지털 디톡스 여행의 모든 것",
      author: "트렌드 분석가 정서연",
      
      likes: "423"
    },
    {
      id: 6,
      title: "여행 보험 가입 시 체크해야 할 필수 항목들",
      category: "FAQ",
      readTime: "9분",
      difficulty: "중급",
      tags: ["보험", "안전", "체크리스트", "필수"],
      image: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=240&fit=crop",
      summary: "여행 보험의 모든 것. 보장 범위, 보험료 비교, 실제 사례를 통한 필수 체크 포인트까지",
      author: "보험 전문가 한진우",
      
      likes: "789"
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === "전체" || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLikeToggle = (guideId: number) => {
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

      {/* Category Overview */}
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
                      {guide.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="text-xs">by {guide.author}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="text-muted-foreground hover:text-red-500"
                        asChild
                      >
                        <Link to={`/guides/${guide.id}`} className="flex items-center">
                          <Heart className={`w-4 h-4 mr-1 ${likedGuides.has(guide.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          {guide.likes}
                        </Link>
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