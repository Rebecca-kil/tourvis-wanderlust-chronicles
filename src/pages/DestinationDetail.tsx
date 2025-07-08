
import { useParams } from "react-router-dom";
import { MapPin, Star, Clock, Users, Calendar, DollarSign, Info, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlog } from "@/contexts/BlogContext";

const DestinationDetail = () => {
  const { id } = useParams();
  const { destinations } = useBlog();

  // 실제 데이터에서 해당 여행지 찾기
  const destination = destinations.find(dest => dest.id === id);

  // 데이터가 없으면 404 처리
  if (!destination) {
    return (
      <div className="min-h-screen">
        <TravelHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">여행지를 찾을 수 없습니다</h1>
          <Link to="/destinations" className="text-primary hover:underline">
            여행지 목록으로 돌아가기
          </Link>
        </div>
        <TravelFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.title}
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
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.title}</h1>
                <p className="text-xl text-white/90 mb-4">{destination.city}</p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <span>•</span>
                  <span>1247 리뷰</span>
                  <span>•</span>
                  <span>국내</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <ShareButtons title={destination.title} />
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
                <p className="text-sm text-muted-foreground">{destination.duration || "정보 없음"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">예산 수준</h3>
                <p className="text-sm text-muted-foreground">{destination.budgetLevel || "정보 없음"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">최적 시기</h3>
                <p className="text-sm text-muted-foreground">{destination.bestTime || "정보 없음"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">교통</h3>
                <p className="text-sm text-muted-foreground">{destination.transportation || "정보 없음"}</p>
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
                {destination.quickInfo && (
                  <p className="text-sm text-muted-foreground italic mb-4">{destination.quickInfo}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {destination.tags?.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">주요 명소</h2>
                  <div className="space-y-4">
                    {destination.attractions.map((attraction, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{attraction.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{attraction.rating || "4.5"}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3">{attraction.description}</p>
                          <Badge variant="outline" className="text-xs">소요시간: {attraction.time || "2시간"}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Tips */}
              {destination.travelTips && destination.travelTips.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">여행 팁</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {destination.travelTips.map((tip, idx) => (
                          <div key={idx} className="flex items-start">
                            <Info className="w-4 h-4 mr-3 mt-1 text-primary flex-shrink-0" />
                            <p className="text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Budget Guide */}
              {destination.dailyBudget && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">1일 예산 가이드</h3>
                    <div className="space-y-3">
                      {destination.dailyBudget.accommodation && (
                        <div className="flex justify-between">
                          <span className="text-sm">숙박</span>
                          <span className="text-sm font-medium">{destination.dailyBudget.accommodation}</span>
                        </div>
                      )}
                      {destination.dailyBudget.food && (
                        <div className="flex justify-between">
                          <span className="text-sm">식비</span>
                          <span className="text-sm font-medium">{destination.dailyBudget.food}</span>
                        </div>
                      )}
                      {destination.dailyBudget.transport && (
                        <div className="flex justify-between">
                          <span className="text-sm">교통</span>
                          <span className="text-sm font-medium">{destination.dailyBudget.transport}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

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
