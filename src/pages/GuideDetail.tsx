
import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/contexts/BlogContext";
import CategorySpecificView from "@/components/guide/CategorySpecificView";

const GuideDetail = () => {
  const { id } = useParams();
  const { guides } = useBlog();
  const [isLiked, setIsLiked] = useState(false);

  const guide = guides.find(g => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen">
        <TravelHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">가이드를 찾을 수 없습니다</h1>
          <Link to="/guides" className="text-primary hover:underline">
            가이드 목록으로 돌아가기
          </Link>
        </div>
        <TravelFooter />
      </div>
    );
  }

  const [likes, setLikes] = useState(guide.likes);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/guides" className="inline-flex items-center text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          가이드 목록으로 돌아가기
        </Link>

        <article>
          <img src={guide.image} alt={guide.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{guide.category}</Badge>
              <Badge variant="outline">{guide.difficulty}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">by {guide.author}</span>
              {guide.readTime && <span className="text-sm text-muted-foreground">읽기 시간: {guide.readTime}</span>}
              {guide.publishDate && <span className="text-sm text-muted-foreground">발행일: {guide.publishDate}</span>}
            </div>
            {guide.description && (
              <p className="text-muted-foreground mb-4">{guide.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{likes}</span>
                </Button>
              </div>
              <ShareButtons title={guide.title} />
            </div>
          </div>

          <div className="prose max-w-none">
            {guide.content.map((section, idx) => (
              <Card key={idx} className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p className="leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}

            {/* 카테고리별 특화 필드 렌더링 */}
            <CategorySpecificView guide={guide} />

            {guide.tips && guide.tips.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">💡 핵심 팁</h3>
                  <ul className="space-y-2">
                    {guide.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Additional Info Sections */}
            {guide.targetAudience && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">🎯 대상자</h3>
                  <p>{guide.targetAudience}</p>
                </CardContent>
              </Card>
            )}

            {guide.requirements && guide.requirements.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">📋 필요 조건</h3>
                  <ul className="space-y-2">
                    {guide.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {guide.whatYouWillLearn && guide.whatYouWillLearn.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">🎓 배울 내용</h3>
                  <ul className="space-y-2">
                    {guide.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </article>
      </div>

      <TravelFooter />
    </div>
  );
};

export default GuideDetail;
