import { useState } from "react";
import { Heart, MapPin, Utensils, Camera, Search, Filter, ThumbsUp, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "숙소", "맛집", "액티비티", "문화체험", "쇼핑", "교통"];

  const storyCategories = [
    {
      id: "accommodation",
      title: "숙소 후기",
      icon: MapPin,
      description: "호텔, 펜션, 게스트하우스 등 다양한 숙소 실제 후기",
      color: "from-travel-ocean to-travel-sky",
      count: "1,247개"
    },
    {
      id: "restaurant",
      title: "맛집 탐방",
      icon: Utensils,
      description: "현지인도 인정하는 진짜 맛집들의 솔직한 리뷰",
      color: "from-travel-sunset to-travel-sand",
      count: "2,156개"
    },
    {
      id: "activity",
      title: "액티비티 체험",
      icon: Camera,
      description: "스노클링, 하이킹, 투어 등 다양한 액티비티 후기",
      color: "from-travel-forest to-travel-sky",
      count: "892개"
    },
    {
      id: "culture",
      title: "문화 체험",
      icon: Heart,
      description: "현지 문화와 축제, 전통 체험의 생생한 이야기",
      color: "from-secondary to-travel-sunset",
      count: "654개"
    }
  ];

  const stories = [
    {
      id: 1,
      title: "제주도 한라산 근처 펜션에서 보낸 완벽한 3일",
      category: "숙소",
      location: "제주도, 한국",
      author: {
        name: "여행러버 김민지",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=40&h=40&fit=crop&crop=face",
        level: "여행 고수"
      },
      date: "2024.01.15",
      readTime: "5분",
      rating: 5,
      tags: ["숙소", "제주도", "펜션", "한라산"],
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      summary: "한라산이 창문 너머로 보이는 펜션에서의 힐링 타임. 조용하고 깨끗한 환경, 친절한 사장님, 그리고 아침에 보는 일출까지! 제주도 여행에서 가장 만족스러웠던 숙소 경험을 공유합니다.",
      likes: 156,
      comments: 23,
      
    },
    {
      id: 2,
      title: "부산 자갈치시장 숨은 맛집 3곳 완전 정복!",
      category: "맛집",
      location: "부산, 한국",
      author: {
        name: "맛집헌터 박정우",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        level: "맛집 전문가"
      },
      date: "2024.01.12",
      readTime: "8분",
      rating: 4.5,
      tags: ["맛집", "부산", "자갈치시장", "해산물"],
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      summary: "자갈치시장에서 30년 장사하신 할머니가 추천해주신 진짜 맛집들! 관광객은 모르는 현지인만 아는 숨은 맛집 3곳을 다녀왔습니다. 가격도 저렴하고 맛은 정말 끝내줘요!",
      likes: 289,
      comments: 45,
      
    },
    {
      id: 3,
      title: "방콕 플로팅 마켓에서 보트 타기 + 코코넛 아이스크림 후기",
      category: "액티비티",
      location: "방콕, 태국",
      author: {
        name: "아시아여행가 이수진",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        level: "여행 전문가"
      },
      date: "2024.01.10",
      readTime: "6분",
      rating: 4,
      tags: ["액티비티", "방콕", "플로팅마켓", "보트투어"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      summary: "담넌사두억 플로팅 마켓에서의 특별한 하루! 새벽 5시에 출발해서 보트를 타고 시장을 돌아다니며 현지 음식을 맛보는 경험. 코코넛 껍질에 파는 아이스크림이 정말 별미였어요!",
      likes: 194,
      comments: 31,
      
    },
    {
      id: 4,
      title: "일본 료칸에서 경험한 진짜 일본 문화 (온천 + 카이세키)",
      category: "문화체험",
      location: "교토, 일본",
      author: {
        name: "문화탐방가 최영호",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        level: "문화 애호가"
      },
      date: "2024.01.08",
      readTime: "10분",
      rating: 5,
      tags: ["문화체험", "일본", "료칸", "온천", "카이세키"],
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop",
      summary: "교토의 전통 료칸에서 하룻밤. 다다미 방에서 잠자기, 노천온천에서 힐링, 그리고 정성스럽게 차려진 카이세키 요리까지. 일본의 전통 문화를 온몸으로 느낄 수 있었던 소중한 경험이었습니다.",
      likes: 267,
      comments: 38,
      
    },
    {
      id: 5,
      title: "베트남 하롱베이 크루즈 투어 솔직 후기 (사기 피하는 법 포함)",
      category: "액티비티",
      location: "하롱베이, 베트남",
      author: {
        name: "백패커 한지민",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        level: "배낭여행러"
      },
      date: "2024.01.05",
      readTime: "12분",
      rating: 3.5,
      tags: ["액티비티", "베트남", "하롱베이", "크루즈"],
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop",
      summary: "하롱베이 2박 3일 크루즈 투어의 진실! 예쁜 사진 뒤에 숨겨진 현실과 바가지 피하는 방법, 그리고 정말 추천할 만한 크루즈 업체까지. 솔직하고 디테일한 후기입니다.",
      likes: 142,
      comments: 67,
      
    },
    {
      id: 6,
      title: "파리 몽마르트르 에어비앤비 1주일 살기 후기",
      category: "숙소",
      location: "파리, 프랑스",
      author: {
        name: "디지털노마드 김서연",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        level: "장기여행자"
      },
      date: "2024.01.03",
      readTime: "15분",
      rating: 4.5,
      tags: ["숙소", "파리", "에어비앤비", "몽마르트르"],
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      summary: "파리 현지인처럼 살아보기 프로젝트! 몽마르트르 언덕의 작은 아파트에서 1주일간 머물며 느낀 진짜 파리 생활. 동네 베이커리, 마르셰, 그리고 현지인들과의 소소한 일상까지.",
      likes: 203,
      comments: 29,
      
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesCategory = selectedCategory === "전체" || story.category === selectedCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            여행 이야기
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            실제 여행자들의 생생한 경험담과 솔직한 후기를 만나보세요
          </p>
        </div>
      </section>

      {/* Category Overview 
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              카테고리별 후기
            </h2>
            <p className="text-xl text-muted-foreground">
              다양한 분야의 실제 경험담을 확인해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-travel-medium transition-travel cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-bounce`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-travel">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {category.description}
                  </p>
                  
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
*/}

      {/* Search and Filter */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="제목이나 여행지로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {filteredStories.map((story) => (
              <Link key={story.id} to={`/stories/${story.id}`}>
                <Card className="group hover:shadow-travel-medium transition-travel cursor-pointer overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-travel"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                          {story.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 ${i < story.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ⭐
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={story.author.avatar} />
                          <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{story.author.name}</p>
                          <p className="text-xs text-muted-foreground">{story.author.level}</p>
                        </div>
                        <div className="text-xs text-muted-foreground ml-auto">
                          📍 {story.location}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {story.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-travel">
                        {story.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {story.summary}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <span>{story.date}</span>
                          <span>{story.readTime} 읽기</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {story.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {story.comments}
                          </Button>
                        </div>
                        <Button variant="cta" size="sm">
                          전체 읽기
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 키워드나 카테고리로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>

      <TravelFooter />
    </div>
  );
};

export default Stories;