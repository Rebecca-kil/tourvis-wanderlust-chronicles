import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GuideDetail = () => {
  const guide = {
    title: "항공료 50% 절약하는 예약 타이밍과 팁",
    category: "교통",
    difficulty: "초급",
    readTime: "8분",
    author: "여행 전문가 김철수",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop",
    content: [
      {
        title: "1. 최적의 예약 타이밍",
        content: "국내선의 경우 출발 1-2개월 전, 국제선은 2-3개월 전이 가장 저렴합니다. 화요일 오후 3시경이 항공료가 가장 낮은 시간대입니다."
      },
      {
        title: "2. 항공사 선택 요령", 
        content: "LCC(저비용항공사) vs FSC(일반항공사) 비교시 수하물 정책, 좌석 선택비, 기내식 등 부가비용까지 계산해서 총 비용을 비교하세요."
      },
      {
        title: "3. 할인 혜택 활용법",
        content: "항공사 멤버십, 신용카드 적립, 마일리지 활용, 얼리버드/라스트미닛 특가 등을 적극 활용하면 50% 이상 절약 가능합니다."
      }
    ],
    tips: ["주중 출발이 주말보다 20-30% 저렴", "직항보다 경유가 더 저렴할 수 있음", "취소 가능한 항공권도 고려해보세요"]
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
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>by {guide.author}</span>
              <span>{guide.readTime} 읽기</span>
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
          </div>
        </article>
      </div>

      <TravelFooter />
    </div>
  );
};

export default GuideDetail;