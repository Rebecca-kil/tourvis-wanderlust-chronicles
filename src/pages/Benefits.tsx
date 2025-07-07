import { useState } from "react";
import { Gift, Percent, Calendar, Ticket, Search, Filter, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Benefits = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "항공", "숙박", "투어", "렌터카", "액티비티", "쇼핑"];

  const benefitCategories = [
    {
      id: "flight",
      title: "항공료 할인",
      icon: Percent,
      description: "국내외 항공료 최대 50% 할인 혜택",
      color: "from-travel-ocean to-travel-sky",
      count: "45개"
    },
    {
      id: "hotel",
      title: "숙박 특가",
      icon: Gift,
      description: "호텔, 펜션, 리조트 특가 이벤트",
      color: "from-travel-sunset to-travel-sand",
      count: "128개"
    },
    {
      id: "tour",
      title: "투어 쿠폰",
      icon: Ticket,
      description: "현지 투어 및 체험 활동 할인 쿠폰",
      color: "from-travel-forest to-travel-sky",
      count: "73개"
    },
    {
      id: "seasonal",
      title: "시즌 특가",
      icon: Calendar,
      description: "계절별 한정 특가 상품 모음",
      color: "from-secondary to-travel-sunset",
      count: "92개"
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "제주항공 국내선 항공료 30% 할인",
      category: "항공",
      type: "할인",
      discount: "30%",
      originalPrice: "150,000원",
      salePrice: "105,000원",
      validUntil: "2024.03.31",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop",
      description: "제주항공 국내선 전 노선 30% 할인! 김포-제주, 김포-부산 등 인기 노선 포함. 3월 말까지 한정 특가",
      conditions: ["예약 기간: ~2024.03.31", "탑승 기간: ~2024.04.30", "좌석 한정"],
      isHot: true,
      isLimited: true,
      stock: "87%"
    },
    {
      id: 2,
      title: "부산 해운대 오션뷰 호텔 50% 특가",
      category: "숙박",
      type: "특가",
      discount: "50%",
      originalPrice: "200,000원",
      salePrice: "100,000원",
      validUntil: "2024.02.29",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=240&fit=crop",
      description: "해운대 정면 오션뷰가 보이는 프리미엄 호텔! 조식 포함, 수영장 이용 가능. 2월 한정 반값 특가",
      conditions: ["체크인: 2024.02.01~28", "조식 포함", "수영장/스파 무료 이용"],
      isHot: true,
      isLimited: false,
      stock: "43%"
    },
    {
      id: 3,
      title: "방콕 시내 투어 + 태국 마사지 패키지",
      category: "투어",
      type: "쿠폰",
      discount: "25%",
      originalPrice: "80,000원",
      salePrice: "60,000원",
      validUntil: "2024.04.15",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop",
      description: "방콕 주요 명소 투어 + 2시간 전통 태국 마사지가 포함된 패키지 상품. 한국어 가이드 포함",
      conditions: ["최소 2인 예약", "한국어 가이드", "픽업/드롭 서비스"],
      isHot: false,
      isLimited: true,
      stock: "22%"
    },
    {
      id: 4,
      title: "전국 렌터카 봄맞이 할인 이벤트",
      category: "렌터카",
      type: "시즌특가",
      discount: "40%",
      originalPrice: "60,000원/일",
      salePrice: "36,000원/일",
      validUntil: "2024.05.31",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=240&fit=crop",
      description: "봄 여행 시즌 맞이 렌터카 할인! 소형차부터 SUV까지 다양한 차종. 보험료 포함 가격",
      conditions: ["최소 2일 대여", "보험료 포함", "무제한 주행"],
      isHot: false,
      isLimited: false,
      stock: "76%"
    },
    {
      id: 5,
      title: "유럽 패키지 여행 얼리버드 30% 할인",
      category: "투어",
      type: "얼리버드",
      discount: "30%",
      originalPrice: "1,500,000원",
      salePrice: "1,050,000원",
      validUntil: "2024.02.20",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop",
      description: "5월 출발 유럽 5개국 8일 패키지 여행 얼리버드 특가! 항공료, 숙박, 식사, 가이드 모두 포함",
      conditions: ["5월 출발", "항공료 포함", "전 일정 한국어 가이드"],
      isHot: true,
      isLimited: true,
      stock: "12%"
    },
    {
      id: 6,
      title: "일본 온천 리조트 겨울 특가 패키지",
      category: "숙박",
      type: "시즌특가",
      discount: "35%",
      originalPrice: "300,000원",
      salePrice: "195,000원",
      validUntil: "2024.02.28",
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=240&fit=crop",
      description: "일본 유명 온천 리조트 겨울 마지막 특가! 노천온천, 카이세키 요리, 료칸 체험까지",
      conditions: ["2박 3일 패키지", "카이세키 요리 포함", "온천 무제한 이용"],
      isHot: false,
      isLimited: true,
      stock: "67%"
    }
  ];

  const filteredBenefits = benefits.filter(benefit => {
    const matchesCategory = selectedCategory === "전체" || benefit.category === selectedCategory;
    const matchesSearch = benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         benefit.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockColor = (stock: string) => {
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
              🔥 <strong>긴급 특가!</strong> 제주항공 30% 할인 마감 임박 (23시간 남음) • 유럽 패키지 85% 마감
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Category Overview */}
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
                {benefit.isLimited && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="outline" className="bg-white/90 text-xs">
                      한정수량
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
                      <div className="text-2xl font-bold text-red-600">
                        {benefit.discount} OFF
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-travel">
                    {benefit.title}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg line-through text-muted-foreground">
                        {benefit.originalPrice}
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        {benefit.salePrice}
                      </span>
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
                    <div className={`flex items-center ${getStockColor(benefit.stock)}`}>
                      <span className="text-xs">재고 {benefit.stock}</span>
                    </div>
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