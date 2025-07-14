import { useState } from "react";
import { useBlog } from "@/contexts/BlogContext";
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
  const { stories } = useBlog();

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

  const filteredStories = stories.filter(story => {
    const matchesCategory = selectedCategory === "전체" || story.category === selectedCategory;
    const matchesSearch =
      (story.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (story.city?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (story.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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
                      
                    </div>
                    
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-10 h-10">
  <AvatarFallback>{story.author?.[0] || '?'}</AvatarFallback>
</Avatar>
<div>
  <p className="font-medium text-sm">{story.author}</p>
  <p className="text-xs text-muted-foreground">{story.city ?? ''}</p>
</div>
<div className="text-xs text-muted-foreground ml-auto">
  {story.city ? `📍 ${story.city}` : ''}
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
  {story.excerpt || story.description || ''}
</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
  <span>{story.publishDate || story.travelDate || ''}</span>
  <span>{story.readTime ? `${story.readTime} 읽기` : ''}</span>
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