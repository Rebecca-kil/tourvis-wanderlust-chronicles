import { useParams } from "react-router-dom";
import { MapPin, Star, Clock, Users, Calendar, DollarSign, Info, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DestinationDetail = () => {
  const { id } = useParams();

  // Mock data - 실제로는 API에서 가져올 데이터
  const destination = {
    id: 1,
    name: "제주도",
    country: "대한민국",
    region: "국내",
    rating: 4.8,
    reviewCount: 1247,
    duration: "2-4일",
    budget: "중간",
    tags: ["자연", "힐링", "드라이브", "맛집"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73def?w=800&h=400&fit=crop",
    description: "한국의 대표 힐링 여행지, 아름다운 자연과 독특한 문화가 어우러진 섬",
    highlights: ["한라산", "성산일출봉", "우도", "협재해수욕장"],
    bestTime: "4-6월, 9-11월",
    detailInfo: {
      transportation: "김포공항에서 1시간 30분, KTX + 버스 4시간",
      accommodation: "리조트, 펜션, 게스트하우스 다양",
      currency: "원화(KRW)",
      language: "한국어",
      attractions: [
        { name: "한라산", description: "한국 최고봉으로 등반과 트레킹 코스가 유명", time: "6-8시간", rating: 4.9 },
        { name: "성산일출봉", description: "유네스코 세계자연유산, 일출 명소", time: "2시간", rating: 4.8 },
        { name: "우도", description: "제주 동쪽 작은 섬, 자전거 투어 인기", time: "반나절", rating: 4.7 },
        { name: "협재해수욕장", description: "에메랄드빛 바다와 하얀 모래사장", time: "2-3시간", rating: 4.6 }
      ],
      tips: [
        "렌터카 예약은 미리 하는 것이 좋습니다",
        "날씨 변화가 심하니 여러 벌의 옷을 준비하세요",
        "현지 흑돼지와 해산물을 꼭 맛보세요",
        "성수기에는 숙박비가 2-3배 오를 수 있습니다"
      ],
      dailyBudget: {
        accommodation: "50,000~150,000원",
        food: "30,000~50,000원",
        transport: "40,000~60,000원",
        activity: "20,000~80,000원"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Link to="/destinations" className="inline-flex items-center text-white mb-4 hover:text-white/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              여행지 목록으로 돌아가기
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
                <p className="text-xl text-white/90 mb-4">{destination.country}</p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{destination.reviewCount} 리뷰</span>
                  <span>•</span>
                  <span>{destination.region}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <ShareButtons title={destination.name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">추천 기간</h3>
                <p className="text-sm text-muted-foreground">{destination.duration}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">예산 수준</h3>
                <p className="text-sm text-muted-foreground">{destination.budget}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">최적 시기</h3>
                <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">교통</h3>
                <p className="text-sm text-muted-foreground">항공 1.5시간</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">여행지 소개</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Attractions */}
              <div>
                <h2 className="text-2xl font-bold mb-4">주요 명소</h2>
                <div className="space-y-4">
                  {destination.detailInfo.attractions.map((attraction, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{attraction.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{attraction.rating}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{attraction.description}</p>
                        <Badge variant="outline" className="text-xs">소요시간: {attraction.time}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div>
                <h2 className="text-2xl font-bold mb-4">여행 팁</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {destination.detailInfo.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start">
                          <Info className="w-4 h-4 mr-3 mt-1 text-primary flex-shrink-0" />
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Budget Guide */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">1일 예산 가이드</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">숙박</span>
                      <span className="text-sm font-medium">{destination.detailInfo.dailyBudget.accommodation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">식비</span>
                      <span className="text-sm font-medium">{destination.detailInfo.dailyBudget.food}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">교통</span>
                      <span className="text-sm font-medium">{destination.detailInfo.dailyBudget.transport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">액티비티</span>
                      <span className="text-sm font-medium">{destination.detailInfo.dailyBudget.activity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Book CTA */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">지금 예약하고 떠나세요!</h3>
                  <p className="text-sm text-muted-foreground mb-4">최저가 항공권과 숙박을 한번에</p>
                  <Button variant="cta" size="lg" className="w-full mb-2">
                    항공권 검색
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    숙박 검색
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <TravelFooter />
    </div>
  );
};

export default DestinationDetail;