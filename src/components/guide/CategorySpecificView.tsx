import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Guide } from "@/contexts/BlogContext";

interface CategorySpecificViewProps {
  guide: Guide;
}

const CategorySpecificView = ({ guide }: CategorySpecificViewProps) => {
  if (guide.category === '교통') {
    return (
      <div className="space-y-6">
        {guide.transportType && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">🚗 교통수단 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">교통수단:</span> {guide.transportType}
                </div>
                {guide.priceRange && (
                  <div>
                    <span className="font-semibold">가격대:</span> {guide.priceRange}
                  </div>
                )}
                {guide.reservationPeriod && (
                  <div className="col-span-2">
                    <span className="font-semibold">예약 권장 기간:</span> {guide.reservationPeriod}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {guide.bookingTips && guide.bookingTips.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">💡 예약 꿀팁</h3>
              <ul className="space-y-2">
                {guide.bookingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (guide.category === '일정') {
    return (
      <div className="space-y-6">
        {(guide.totalDuration || guide.budgetEstimate) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">📅 일정 개요</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.totalDuration && (
                  <div>
                    <span className="font-semibold">총 기간:</span> {guide.totalDuration}
                  </div>
                )}
                {guide.budgetEstimate && (
                  <div>
                    <span className="font-semibold">예상 예산:</span> {guide.budgetEstimate}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {guide.itineraryDays && guide.itineraryDays.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">🗓️ 일정별 계획</h3>
              <div className="space-y-4">
                {guide.itineraryDays.map((day, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Day {day.day}: {day.title}</h4>
                    <ul className="text-sm text-muted-foreground mt-2">
                      {day.activities.map((activity, actIdx) => (
                        <li key={actIdx}>• {activity}</li>
                      ))}
                    </ul>
                    {day.budget && (
                      <p className="text-sm text-primary mt-2">예산: {day.budget}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (guide.category === '준비물') {
    return (
      <div className="space-y-6">
        {guide.packingList && guide.packingList.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">🎒 카테고리별 준비물</h3>
              <div className="space-y-4">
                {guide.packingList.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold flex items-center gap-2">
                      {category.category}
                      {category.optional && <Badge variant="outline">선택사항</Badge>}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {category.items.map((item, itemIdx) => (
                        <Badge key={itemIdx} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {guide.seasonalItems && guide.seasonalItems.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">🌤️ 계절별 추가 아이템</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.seasonalItems.map((seasonal, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold">{seasonal.season}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {seasonal.items.map((item, itemIdx) => (
                        <Badge key={itemIdx} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (guide.category === '팁') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guide.localTips && guide.localTips.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">🏠 현지 생활 팁</h3>
                <ul className="space-y-2">
                  {guide.localTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {guide.culturalTips && guide.culturalTips.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">🎭 문화 에티켓</h3>
                <ul className="space-y-2">
                  {guide.culturalTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {guide.safeTips && guide.safeTips.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">🛡️ 안전 팁</h3>
                <ul className="space-y-2">
                  {guide.safeTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {guide.moneyTips && guide.moneyTips.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">💰 돈 관리 팁</h3>
                <ul className="space-y-2">
                  {guide.moneyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (guide.category === 'FAQ') {
    return (
      <div className="space-y-6">
        {guide.faqs && guide.faqs.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">❓ 자주 묻는 질문</h3>
              <div className="space-y-4">
                {guide.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-semibold text-primary mb-2">Q: {faq.question}</h4>
                    <p className="text-muted-foreground">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return null;
};

export default CategorySpecificView;