import { useState } from "react";
import { MapPin, Star, Clock, Users, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = ["전체", "아시아", "유럽", "북미", "남미", "오세아니아", "국내"];

  const destinations = [
    {
      id: 1,
      name: "제주도",
      country: "대한민국",
      region: "국내",
      rating: 4.8,
      reviewCount: 1247,
      duration: "2-4일",
      budget: "중간",
      tags: ["자연", "힐링", "드라이브", "맛집"],
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73def?w=400&h=300&fit=crop",
      description: "한국의 대표 힐링 여행지, 아름다운 자연과 독특한 문화가 어우러진 섬",
      highlights: ["한라산", "성산일출봉", "우도", "협재해수욕장"],
      bestTime: "4-6월, 9-11월",
      detailInfo: {
        transportation: "김포공항에서 1시간 30분, KTX + 버스 4시간",
        accommodation: "리조트, 펜션, 게스트하우스 다양",
        currency: "원화(KRW)",
        language: "한국어",
        attractions: [
          { name: "한라산", description: "한국 최고봉으로 등반과 트레킹 코스가 유명", time: "6-8시간" },
          { name: "성산일출봉", description: "유네스코 세계자연유산, 일출 명소", time: "2시간" },
          { name: "우도", description: "제주 동쪽 작은 섬, 자전거 투어 인기", time: "반나절" },
          { name: "협재해수욕장", description: "에메랄드빛 바다와 하얀 모래사장", time: "2-3시간" }
        ],
        tips: [
          "렌터카 예약은 미리 하는 것이 좋습니다",
          "날씨 변화가 심하니 여러 벌의 옷을 준비하세요",
          "현지 흑돼지와 해산물을 꼭 맛보세요",
          "성수기에는 숙박비가 2-3배 오를 수 있습니다"
        ]
      }
    },
    {
      id: 2,
      name: "도쿄",
      country: "일본",
      region: "아시아",
      rating: 4.7,
      reviewCount: 2156,
      duration: "3-5일",
      budget: "높음",
      tags: ["도시", "문화", "쇼핑", "맛집"],
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      description: "전통과 현대가 공존하는 일본의 수도, 무한한 즐거움이 기다리는 메가시티",
      highlights: ["시부야", "아사쿠사", "긴자", "하라주쿠"],
      bestTime: "3-5월, 9-11월"
    },
    {
      id: 3,
      name: "파리",
      country: "프랑스",
      region: "유럽",
      rating: 4.9,
      reviewCount: 3421,
      duration: "4-7일",
      budget: "높음",
      tags: ["문화", "예술", "로맨틱", "역사"],
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      description: "세계에서 가장 로맨틱한 도시, 예술과 문화의 중심지",
      highlights: ["에펠탑", "루브르 박물관", "노트르담", "샹젤리제"],
      bestTime: "4-6월, 9-10월"
    },
    {
      id: 4,
      name: "뉴욕",
      country: "미국",
      region: "북미",
      rating: 4.6,
      reviewCount: 1892,
      duration: "4-6일",
      budget: "높음",
      tags: ["도시", "문화", "쇼핑", "엔터테인먼트"],
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
      description: "꿈의 도시 뉴욕, 24시간 잠들지 않는 세계의 중심",
      highlights: ["타임스퀘어", "센트럴파크", "자유의 여신상", "브루클린 브릿지"],
      bestTime: "4-6월, 9-11월"
    },
    {
      id: 5,
      name: "방콕",
      country: "태국",
      region: "아시아",
      rating: 4.5,
      reviewCount: 1643,
      duration: "3-5일",
      budget: "저렴",
      tags: ["문화", "맛집", "쇼핑", "스파"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "동남아시아의 관문, 저렴한 비용으로 즐기는 이국적인 문화와 맛",
      highlights: ["왓 포", "차이나타운", "카오산 로드", "플로팅 마켓"],
      bestTime: "11-2월"
    },
    {
      id: 6,
      name: "로마",
      country: "이탈리아",
      region: "유럽",
      rating: 4.8,
      reviewCount: 2743,
      duration: "3-5일",
      budget: "중간",
      tags: ["역사", "문화", "맛집", "예술"],
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
      description: "영원한 도시 로마, 고대 로마의 흔적과 이탈리아 정취를 만끽",
      highlights: ["콜로세움", "바티칸", "트레비 분수", "판테온"],
      bestTime: "4-6월, 9-10월"
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = selectedRegion === "전체" || dest.region === selectedRegion;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                      alt={destination.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-travel"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                        {destination.region}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {destination.rating}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-travel">
                        {destination.name}
                      </h3>
                      <span className="text-muted-foreground text-sm">{destination.country}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {destination.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{destination.reviewCount} 리뷰</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">주요 명소:</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">최적 시기: </span>
                        <span className="font-medium">{destination.bestTime}</span>
                      </div>
                      <Button variant="cta" size="sm">
                        상세보기
                      </Button>
                    </div>
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