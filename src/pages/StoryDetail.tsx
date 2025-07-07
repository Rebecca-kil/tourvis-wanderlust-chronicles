import { useState } from "react";
import { ArrowLeft, MapPin, Star, Heart, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const StoryDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('댓글 작성:', newComment);
      setNewComment("");
    }
  };

  const story = {
    title: "제주도 한라산 근처 펜션에서 보낸 완벽한 3일",
    location: "제주도, 한국",
    category: "숙소",
    rating: 5,
    likes: 142,
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{story.likes + (isLiked ? 1 : 0)}</span>
                  </Button>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">댓글 3</span>
                  </div>
                </div>
                <ShareButtons title={story.title} />
              </div>
          </div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-line leading-relaxed">
              {story.content}
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">댓글 (3)</h3>
            
            {/* 댓글 작성 */}
            <div className="mb-6">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>나</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="댓글을 작성해보세요..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2 min-h-[80px]" 
                  />
                  <div className="flex justify-end">
                    <Button 
                      size="sm"
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      댓글 달기
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>김</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">김**</span>
                      <span className="text-xs text-muted-foreground">2024.01.16</span>
                    </div>
                    <p className="text-sm">정말 유익한 정보네요! 저도 제주도 여행 계획 중인데 많은 도움이 됐어요.</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-border pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>이</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">이**</span>
                      <span className="text-xs text-muted-foreground">2024.01.17</span>
                    </div>
                    <p className="text-sm">펜션 이름이 궁금해요! 혹시 알려주실 수 있나요?</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>박</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">박**</span>
                      <span className="text-xs text-muted-foreground">2024.01.18</span>
                    </div>
                    <p className="text-sm">한라산 등반 후 바비큐 정말 맛있겠네요! 다음에 꼭 가보겠습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <TravelFooter />
    </div>
  );
};

export default StoryDetail;