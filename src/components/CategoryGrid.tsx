import { MapPin, Compass, Heart, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const categories = [
    {
      title: "여행지",
      description: "국가·도시·지역별 여행 정보와 추천 코스를 만나보세요",
      icon: MapPin,
      color: "from-travel-ocean to-travel-sky",
      items: ["도시 가이드", "추천 코스", "숨은 명소", "계절별 여행지"],
      link: "/destinations"
    },
    {
      title: "여행 가이드",
      description: "교통, 일정, 준비물 등 실용적인 여행 팁을 확인하세요",
      icon: Compass,
      color: "from-travel-sunset to-travel-sand",
      items: ["교통 가이드", "일정 계획", "준비물 리스트", "여행 트렌드"],
      link: "/guides"
    },
    {
      title: "여행 이야기",
      description: "실제 여행자들의 생생한 경험과 후기를 읽어보세요",
      icon: Heart,
      color: "from-travel-forest to-travel-sky",
      items: ["숙소 후기", "맛집 추천", "액티비티", "현지 체험"],
      link: "/stories"
    },
    {
      title: "혜택",
      description: "할인 정보와 특가 이벤트로 더 저렴하게 여행하세요",
      icon: Gift,
      color: "from-secondary to-travel-sunset",
      items: ["할인 항공권", "호텔 특가", "투어 쿠폰", "시즌 이벤트"],
      link: "/benefits"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            여행의 모든 것을 한곳에서
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            당신의 완벽한 여행을 위해 필요한 모든 정보와 서비스를 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-travel-medium transition-travel cursor-pointer">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-travel">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <ul className="space-y-1 mb-4">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Link to={category.link}>
                  <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-travel">
                    자세히 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;