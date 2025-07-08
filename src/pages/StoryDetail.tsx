
import { useState } from "react";
import { ArrowLeft, MapPin, Star, Heart, MessageCircle, Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useBlog } from "@/contexts/BlogContext";

const StoryDetail = () => {
  const { id } = useParams();
  const { stories } = useBlog();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const story = stories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen">
        <TravelHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">여행 이야기를 찾을 수 없습니다</h1>
          <Link to="/stories" className="text-primary hover:underline">
            여행 이야기 목록으로 돌아가기
          </Link>
        </div>
        <TravelFooter />
      </div>
    );
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('댓글 작성:', newComment);
      setNewComment("");
    }
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
            </div>
            <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{story.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{story.author}</span>
              </div>
              {story.city && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {story.city}
                </div>
              )}
              {story.publishDate && <span className="text-sm text-muted-foreground">{story.publishDate}</span>}
              {story.readTime && <span className="text-sm text-muted-foreground">읽기 시간: {story.readTime}</span>}
            </div>
            {story.description && (
              <p className="text-muted-foreground mb-4">{story.description}</p>
            )}
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
                  <span className="text-sm text-muted-foreground">댓글 {story.comments}</span>
                </div>
              </div>
              <ShareButtons title={story.title} />
            </div>
          </div>

          {/* Travel Details */}
          {(story.travelDate || story.budget || story.companions) && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">여행 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {story.travelDate && (
                    <div>
                      <span className="text-sm text-muted-foreground">여행 날짜</span>
                      <p className="font-medium">{story.travelDate}</p>
                    </div>
                  )}
                  {story.budget && (
                    <div>
                      <span className="text-sm text-muted-foreground">예산</span>
                      <p className="font-medium">{story.budget}</p>
                    </div>
                  )}
                  {story.companions && (
                    <div>
                      <span className="text-sm text-muted-foreground">동행</span>
                      <p className="font-medium">{story.companions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="prose max-w-none mb-8">
            <div className="whitespace-pre-line leading-relaxed">
              {story.content}
            </div>
          </div>

          {/* Highlights */}
          {story.highlights && story.highlights.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">✨ 여행 하이라이트</h3>
                <ul className="space-y-2">
                  {story.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Challenges */}
          {story.challenges && story.challenges.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">⚠️ 어려웠던 점</h3>
                <ul className="space-y-2">
                  {story.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {story.recommendations && story.recommendations.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">💡 추천사항</h3>
                <ul className="space-y-2">
                  {story.recommendations.map((recommendation, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 댓글 섹션 */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">댓글 ({story.comments})</h3>
            
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

            {/* 샘플 댓글들 */}
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>김</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">김**</span>
                      <span className="text-xs text-muted-foreground">2024.01.16</span>
                    </div>
                    <p className="text-sm">정말 유익한 정보네요! 저도 여행 계획 중인데 많은 도움이 됐어요.</p>
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
