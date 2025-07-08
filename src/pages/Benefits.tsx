
import { useState } from "react";
import { Gift, Percent, Calendar, Ticket, Search, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBlog } from "@/contexts/BlogContext";

const Benefits = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { benefits } = useBlog();

  const categories = ["전체", "항공", "숙박", "투어", "렌터카", "액티비티", "쇼핑"];

  const benefitCategories = [
    {
      id: "flight",
      title: "항공료 할인",
      icon: Percent,
      description: "국내외 항공료 최대 50% 할인 혜택",
      color: "from-travel-ocean to-travel-sky",
      count: `${benefits.filter(b => b.category === '항공').length}개`
    },
    {
      id: "hotel",
      title: "숙박 특가",
      icon: Gift,
      description: "호텔, 펜션, 리조트 특가 이벤트",
      color: "from-travel-sunset to-travel-sand",
      count: `${benefits.filter(b => b.category === '숙박').length}개`
    },
    {
      id: "tour",
      title: "투어 쿠폰",
      icon: Ticket,
      description: "현지 투어 및 체험 활동 할인 쿠폰",
      color: "from-travel-forest to-travel-sky",
      count: `${benefits.filter(b => b.category === '투어').length}개`
    },
    {
      id: "seasonal",
      title: "시즌 특가",
      icon: Calendar,
      description: "계절별 한정 특가 상품 모음",
      color: "from-secondary to-travel-sunset",
      count: `${benefits.filter(b => b.type === '시즌특가').length}개`
    }
  ];

  const filteredBenefits = benefits.filter(benefit => {
    const matchesCategory = selectedCategory === "전체" || benefit.category === selectedCategory;
    const matchesSearch = benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         benefit.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockColor = (stock?: string) => {
    if (!stock) return "text-gray-600";
    const percentage = parseInt(stock);
    if (percentage > 50) return "text-green-600";
    if (percentage > 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            여행 혜택
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            최고의 할인 혜택과 특가 이벤트로 더 저렴하게 여행하세요
          </p>
        </div>
      </section>

      {/* Hot Deals Alert */}
      <section className="py-6 bg-red-50 dark:bg-red-950/20">
        <div className="container mx-auto px-4">
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              🔥 <strong>긴급 특가!</strong> 현재 등록된 혜택들을 놓치지 마세요!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Category Overview 
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              카테고리별 혜택
            </h2>
            <p className="text-xl text-muted-foreground">
              원하는 분야의 할인 혜택을 쉽게 찾아보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitCategories.map((category) => (
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
                placeholder="상품명이나 여행지로 검색..."
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

      {/* Benefits List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBenefits.map((benefit) => (
              <Link key={benefit.id} to={`/benefits/${benefit.id}`}>
                <Card className="group hover:shadow-travel-medium transition-travel cursor-pointer overflow-hidden relative">
                {benefit.isHot && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500 text-white font-medium">
                      🔥 HOT
                    </Badge>
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-travel"
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
                      {benefit.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {benefit.type}
                    </Badge>
                    <div className="text-right">
                      {benefit.discount && (
                        <div className="text-2xl font-bold text-red-600">
                          {benefit.discount} OFF
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-travel">
                    {benefit.title}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {benefit.originalPrice && (
                        <span className="text-lg line-through text-muted-foreground">
                          {benefit.originalPrice}
                        </span>
                      )}
                      {benefit.salePrice && (
                        <span className="text-xl font-bold text-red-600">
                          {benefit.salePrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                    {benefit.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {benefit.conditions.slice(0, 2).map((condition, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {condition}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">~{benefit.validUntil}</span>
                    </div>
                    {benefit.stock && (
                      <div className={`flex items-center ${getStockColor(benefit.stock)}`}>
                        <span className="text-xs">재고 {benefit.stock}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="cta" size="lg" className="w-full">
                    상세보기
                  </Button>
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredBenefits.length === 0 && (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
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

export default Benefits;
