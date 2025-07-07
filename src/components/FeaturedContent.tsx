import { Calendar, Eye, ThumbsUp, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedContent = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "제주도 3박 4일 완벽 가이드: 숨은 명소부터 맛집까지",
      excerpt: "제주도 여행을 계획하고 계신가요? 현지인이 추천하는 진짜 제주도 여행 코스를 소개합니다. 관광객들이 잘 모르는 숨은 명소와 현지 맛집까지...",
      category: "여행지",
      author: "여행작가 김민수",
      date: "2024.01.15",
      views: "2.3k",
      likes: "156",
      tags: ["제주도", "국내여행", "3박4일", "맛집"],
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73def?w=400&h=240&fit=crop"
    },
    {
      id: 2,
      title: "유럽 배낭여행 준비 완벽 가이드: 예산부터 루트까지",
      excerpt: "첫 유럽 배낭여행을 계획하고 계신가요? 20일간의 유럽 여행 경험을 바탕으로 실용적인 팁과 예산 계획, 추천 루트를 공유합니다...",
      category: "여행 가이드",
      author: "배낭여행러 이지은",
      date: "2024.01.12",
      views: "4.1k",
      likes: "283",
      tags: ["유럽", "배낭여행", "예산", "루트"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop"
    },
    {
      id: 3,
      title: "방콕 스트리트푸드 투어: 현지인 추천 맛집 10선",
      excerpt: "태국 방콕의 진짜 맛을 찾아서! 현지인들이 진짜로 가는 스트리트푸드 맛집들을 직접 다녀왔습니다. 가격대비 최고의 맛집들을 소개합니다...",
      category: "여행 이야기",
      author: "푸드트래블러 박지호",
      date: "2024.01.10",
      views: "1.8k",
      likes: "94",
      tags: ["방콕", "태국", "스트리트푸드", "맛집"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              인기 여행 콘텐츠
            </h2>
            <p className="text-muted-foreground text-lg">
              지금 가장 많이 읽히는 여행 정보를 확인해보세요
            </p>
          </div>
          <Button variant="outline" size="lg">
            전체 보기
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-travel-medium transition-travel cursor-pointer overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-travel"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-travel leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    by {post.author}
                  </span>
                  <Button variant="cta" size="sm">
                    읽어보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;