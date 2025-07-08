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

  // 기존 mock data: 실제로는 API에서 가져올 데이터 (삭제 금지, 참고용)
  /*
  const mockDestination = {
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
  */

  // 실제 context 데이터 구조를 mock data와 통일 (필드가 없을 경우 fallback 값 적용)
  const destinationRaw = destinations.find(
    (dest) => String(dest.id) === String(id)
  );

  if (!destinationRaw) {
    return (
      <div className="min-h-screen flex flex-col">
        <TravelHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-muted-foreground">여행지 정보를 찾을 수 없습니다.</div>
        </div>
        <TravelFooter />
      </div>
    );
  }

  // 데이터 구조 통일: 모든 렌더링은 destinationData 객체만 사용
  const destinationData = {
    id: destinationRaw.id,
    name: destinationRaw.name || destinationRaw.title || '-',
    country: destinationRaw.country || destinationRaw.city || '-',
    region: destinationRaw.region || (destinationRaw.tags ? destinationRaw.tags[0] : '-') || '-',
    rating: destinationRaw.rating || 4.8,
    reviewCount: destinationRaw.reviewCount || 0,
    duration: destinationRaw.duration || '-',
    budget: destinationRaw.budget || (destinationRaw.dailyBudget ? `${destinationRaw.dailyBudget.accommodation || ''} / ${destinationRaw.dailyBudget.food || ''} / ${destinationRaw.dailyBudget.transport || ''}` : '-') || '-',
    tags: destinationRaw.tags || [],
    image: destinationRaw.image || '',
    description: destinationRaw.description || '',
    highlights: destinationRaw.highlights || [],
    bestTime: destinationRaw.bestTime || destinationRaw.quickInfo || '-',
    detailInfo: destinationRaw.detailInfo || {
      transportation: destinationRaw.transportation || '-',
      accommodation: destinationRaw.accommodation || '-',
      currency: destinationRaw.currency || '-',
      language: destinationRaw.language || '-',
      attractions: destinationRaw.attractions || [],
      tips: destinationRaw.travelTips || [],
      dailyBudget: destinationRaw.dailyBudget || {
        accommodation: '-',
        food: '-',
        transport: '-',
        activity: '-',
      }
    }
  };

  // 이하 렌더링은 destinationData를 기준으로 진행

  return (
    <div className="min-h-screen">
      <TravelHeader />
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={destinationData.image} 
          alt={destinationData.name}
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
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destinationData.name}</h1>
                <p className="text-xl text-white/90 mb-4">{destinationData.country}</p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{destinationData.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{destinationData.reviewCount} 리뷰</span>
                  <span>•</span>
                  <span>{destinationData.region}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <ShareButtons title={destinationData.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 이하 기존 JSX 렌더링 코드 유지 (destinationData 기준) */}
      {/* ... (생략) ... */}
      <TravelFooter />
    </div>
  );
};

export default DestinationDetail;