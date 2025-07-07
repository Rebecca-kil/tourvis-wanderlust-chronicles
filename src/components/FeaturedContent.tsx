import { useState } from "react";
import { Calendar, Eye, ThumbsUp, Share2, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  
  const categories = ["전체", "여행지", "여행 가이드", "여행 이야기", "혜택"];
  
  const allPosts = [
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
    },
    {
      id: 4,
      title: "오사카 도톤보리 맛집 투어",
      excerpt: "오사카의 대표 번화가 도톤보리에서 꼭 먹어야 할 현지 맛집들을 소개합니다. 타코야키부터 오코노미야키까지...",
      category: "여행지",
      author: "미식가 정수진",
      date: "2024.01.08",
      views: "3.2k",
      likes: "198",
      tags: ["오사카", "일본", "도톤보리", "맛집"],
      image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&h=240&fit=crop"
    },
    {
      id: 5,
      title: "혼자 떠나는 유럽 기차여행 완전정복",
      excerpt: "유럽 기차여행을 혼자서도 안전하고 즐겁게 떠날 수 있는 모든 팁을 알려드립니다. 유레일패스부터 숙소 예약까지...",
      category: "여행 가이드",
      author: "솔로트래블러 박민호",
      date: "2024.01.07",
      views: "2.8k",
      likes: "142",
      tags: ["유럽", "기차여행", "혼여행", "유레일패스"],
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=240&fit=crop"
    },
    {
      id: 6,
      title: "베트남 다낭 3박4일 완벽 일정",
      excerpt: "베트남 다낭에서 보낸 완벽한 3박4일! 해변 리조트부터 현지 맛집, 액티비티까지 모든 것을 담았습니다...",
      category: "여행 이야기",
      author: "여행블로거 이영희",
      date: "2024.01.05",
      views: "1.9k",
      likes: "89",
      tags: ["베트남", "다낭", "리조트", "해변"],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=240&fit=crop"
    },
    {
      id: 7,
      title: "항공료 50% 할인받는 꿀팁 대공개",
      excerpt: "항공료를 반값에 예약하는 방법들을 모두 공개합니다. 마일리지 활용법부터 특가 시즌까지...",
      category: "혜택",
      author: "절약여행전문가 김철수",
      date: "2024.01.03",
      views: "5.1k",
      likes: "312",
      tags: ["항공료", "할인", "마일리지", "특가"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop"
    },
    {
      id: 8,
      title: "싱가포르 호커센터 완전정복",
      excerpt: "싱가포르 여행의 필수코스 호커센터! 현지인들이 추천하는 진짜 맛집들만 골라서 소개합니다...",
      category: "여행지",
      author: "현지전문가 최영수",
      date: "2024.01.01",
      views: "2.6k",
      likes: "167",
      tags: ["싱가포르", "호커센터", "현지음식", "맛집"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=240&fit=crop"
    },
    {
      id: 9,
      title: "발리 우붓에서의 힐링 스테이",
      excerpt: "발리 우붓의 정글 리조트에서 보낸 5일간의 힐링 여행기. 요가 클래스부터 전통 마사지까지...",
      category: "여행 이야기",
      author: "힐링여행가 조미영",
      date: "2023.12.28",
      views: "3.4k",
      likes: "201",
      tags: ["발리", "우붓", "힐링", "리조트"],
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=240&fit=crop"
    },
    {
      id: 10,
      title: "겨울 홋카이도 여행 완벽 가이드",
      excerpt: "겨울 홋카이도의 매력을 모두 담은 완벽한 가이드입니다. 삿포로 눈축제부터 온천까지...",
      category: "여행 가이드",
      author: "겨울여행전문가 한지훈",
      date: "2023.12.25",
      views: "4.3k",
      likes: "278",
      tags: ["홋카이도", "겨울여행", "삿포로", "온천"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop"
    },
    {
      id: 11,
      title: "호텔 업그레이드 무료로 받는 방법",
      excerpt: "호텔에서 무료 업그레이드를 받을 수 있는 실전 팁들을 모두 공개합니다. 체크인 시간부터 대화법까지...",
      category: "혜택",
      author: "호텔전문가 서현주",
      date: "2023.12.22",
      views: "6.2k",
      likes: "387",
      tags: ["호텔", "업그레이드", "무료", "팁"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=240&fit=crop"
    },
    {
      id: 12,
      title: "태국 치앙마이 디지털노마드 생활기",
      excerpt: "치앙마이에서 3개월간 디지털노마드로 생활한 경험을 공유합니다. 카페, 숙소, 생활비까지...",
      category: "여행 이야기",
      author: "디지털노마드 김태현",
      date: "2023.12.20",
      views: "2.1k",
      likes: "126",
      tags: ["치앙마이", "태국", "디지털노마드", "장기체류"],
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=240&fit=crop"
    }
  ];
  
  const filteredPosts = selectedCategory === "전체" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              인기 여행 콘텐츠
            </h2>
            <p className="text-muted-foreground text-lg">
              지금 가장 많이 읽히는 여행 정보를 확인해보세요
            </p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-travel"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
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