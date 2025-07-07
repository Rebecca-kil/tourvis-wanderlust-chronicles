import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StoryDetail = () => {
  const story = {
    title: "제주도 한라산 근처 펜션에서 보낸 완벽한 3일",
    location: "제주도, 한국",
    category: "숙소",
    rating: 5,
    author: {
      name: "여행러버 김민지",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=40&h=40&fit=crop&crop=face"
    },
    date: "2024.01.15",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop",
    content: `
# 제주도에서의 완벽한 3일

제주도 여행을 계획하면서 가장 고민이 되었던 것이 숙소 선택이었습니다. 호텔도 좋지만, 제주도만의 특별함을 느끼고 싶어서 한라산 근처의 작은 펜션을 예약했어요.

## 첫날: 도착과 첫인상

공항에서 렌터카를 픽업하고 펜션으로 향했습니다. 길을 따라 드라이브하는 동안 보이는 제주도의 풍경이 정말 아름다웠어요. 펜션에 도착하니 사장님이 친절하게 맞아주시며 주변 맛집과 관광지를 추천해주셨습니다.

펜션은 정말 깔끔하고 아늑했어요. 특히 창문 너머로 보이는 한라산의 모습이 압권이었습니다. 

## 둘째날: 한라산 등반

이른 아침, 한라산 등반을 위해 5시에 일어났습니다. 펜션에서 등반로 입구까지 차로 10분 정도밖에 걸리지 않아서 정말 편했어요.

등반 후 펜션으로 돌아와서 사장님이 준비해주신 제주 흑돼지 바비큐를 맛볼 수 있었습니다. 등반으로 지친 몸에 정말 든든했어요.

## 마지막 날: 아쉬운 이별

마지막 날 아침, 펜션 마당에서 바라본 일출이 정말 아름다웠습니다. 3일 동안 머물렀지만 정말 편안하고 힐링되는 시간이었어요.

## 총 평가

- **위치**: 한라산과 가까운 최고의 위치 ⭐⭐⭐⭐⭐
- **청결도**: 매우 깨끗하고 잘 관리됨 ⭐⭐⭐⭐⭐  
- **서비스**: 사장님의 친절한 안내 ⭐⭐⭐⭐⭐
- **가격**: 합리적인 가격 ⭐⭐⭐⭐

제주도 여행을 계획하신다면 이 펜션을 정말 추천드려요!
    `
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/stories" className="inline-flex items-center text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          여행 이야기 목록으로 돌아가기
        </Link>

        <article>
          <img src={story.image} alt={story.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{story.category}</Badge>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < story.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={story.author.avatar} />
                  <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{story.author.name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {story.location}
              </div>
              <span className="text-sm text-muted-foreground">{story.date}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-line leading-relaxed">
              {story.content}
            </div>
          </div>
        </article>
      </div>

      <TravelFooter />
    </div>
  );
};

export default StoryDetail;