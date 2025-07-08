
import { useState } from "react";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import ShareButtons from "@/components/ShareButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlog } from "@/contexts/BlogContext";

const BenefitDetail = () => {
  const { id } = useParams();
  const { benefits } = useBlog();
  const [isLiked, setIsLiked] = useState(false);

  const benefit = benefits.find(b => b.id === id);

  if (!benefit) {
    return (
      <div className="min-h-screen">
        <TravelHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">혜택을 찾을 수 없습니다</h1>
          <Link to="/benefits" className="text-primary hover:underline">
            혜택 목록으로 돌아가기
          </Link>
        </div>
        <TravelFooter />
      </div>
    );
  }

  const [likes, setLikes] = useState(benefit.likes);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
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
              <p className="text-muted-foreground leading-relaxed mb-4">{benefit.description}</p>
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
                <ShareButtons title={benefit.title} />
              </div>
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
            {benefit.howToUse && benefit.howToUse.length > 0 && (
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
            )}

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

            {/* Restrictions */}
            {benefit.restrictions && benefit.restrictions.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">🚫 제한 사항</h3>
                  <ul className="space-y-2">
                    {benefit.restrictions.map((restriction, idx) => (
                      <li key={idx} className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Info */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  {benefit.discount && (
                    <div className="text-4xl font-bold text-red-600 mb-2">{benefit.discount} OFF</div>
                  )}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {benefit.originalPrice && (
                      <span className="text-xl line-through text-muted-foreground">{benefit.originalPrice}</span>
                    )}
                    {benefit.salePrice && (
                      <span className="text-2xl font-bold text-red-600">{benefit.salePrice}</span>
                    )}
                  </div>
                  {benefit.validUntil && (
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>~{benefit.validUntil}</span>
                    </div>
                  )}
                  {benefit.stock && (
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
                  )}
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
                  {benefit.contactInfo && <div>{benefit.contactInfo}</div>}
                  {benefit.provider && <div>제공업체: {benefit.provider}</div>}
                  {benefit.website && (
                    <div>
                      <a href={benefit.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        웹사이트 방문
                      </a>
                    </div>
                  )}
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
