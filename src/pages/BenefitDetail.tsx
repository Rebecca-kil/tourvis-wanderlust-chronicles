import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BenefitDetail = () => {
  const benefit = {
    title: "제주항공 국내선 항공료 30% 할인",
    category: "항공",
    type: "할인",
    discount: "30%",
    originalPrice: "150,000원",
    salePrice: "105,000원",
    validUntil: "2024.03.31",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop",
    description: "제주항공 국내선 전 노선 30% 할인! 김포-제주, 김포-부산 등 인기 노선 포함. 3월 말까지 한정 특가",
    isHot: true,
    stock: "87%",
    features: [
      "국내선 전 노선 30% 할인",
      "김포-제주, 김포-부산 등 인기 노선 포함",
      "3월 말까지 한정 특가",
      "좌석 선택 무료",
      "수하물 15kg 포함"
    ],
    conditions: [
      "예약 기간: ~2024.03.31",
      "탑승 기간: ~2024.04.30", 
      "좌석 한정 (선착순)",
      "환불/변경 수수료 별도",
      "중복 할인 불가"
    ],
    howToUse: [
      "제주항공 공식 홈페이지 접속",
      "원하는 항공편 선택",
      "예약 페이지에서 할인코드 입력",
      "할인 적용 확인 후 결제 완료"
    ]
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/benefits" className="inline-flex items-center text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          혜택 목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img src={benefit.image} alt={benefit.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{benefit.category}</Badge>
                <Badge variant="outline">{benefit.type}</Badge>
                {benefit.isHot && <Badge className="bg-red-500 text-white">🔥 HOT</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{benefit.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>

            {/* Features */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">🎯 주요 혜택</h3>
                <ul className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">📋 이용 방법</h3>
                <ol className="space-y-3">
                  {benefit.howToUse.map((step, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">⚠️ 이용 조건</h3>
                <ul className="space-y-2">
                  {benefit.conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Info */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{benefit.discount} OFF</div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-xl line-through text-muted-foreground">{benefit.originalPrice}</span>
                    <span className="text-2xl font-bold text-red-600">{benefit.salePrice}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>~{benefit.validUntil}</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-1">남은 수량</div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: benefit.stock }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium">{benefit.stock} 남음</div>
                  </div>
                  <Button variant="cta" size="lg" className="w-full">
                    지금 예약하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">문의하기</h3>
                <div className="space-y-2 text-sm">
                  <div>📞 고객센터: 1588-1234</div>
                  <div>⏰ 운영시간: 09:00~18:00</div>
                  <div>📧 이메일: help@tourvis.com</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <TravelFooter />
    </div>
  );
};

export default BenefitDetail;