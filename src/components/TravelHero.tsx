import { MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const TravelHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          당신의 꿈꾸던 여행,
          <br />
          <span className="text-travel-sand">지금 시작하세요</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          전 세계 여행지 정보부터 실용적인 가이드까지,
          완벽한 여행을 위한 모든 것을 한곳에서 만나보세요.
        </p>
        
 
        
      </div>
    </section>
  );
};

export default TravelHero;