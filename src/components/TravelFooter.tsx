import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TravelFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">투어비스 트레블로그</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
             당신의 완벽한 여행을 위한 모든 것을 제공합니다.
            </p>
           
          </div>

       {/* 
          <div>
            <h3 className="font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#destinations" className="text-background/80 hover:text-background transition-travel">여행지</a></li>
              <li><a href="#guides" className="text-background/80 hover:text-background transition-travel">여행 가이드</a></li>
              <li><a href="#stories" className="text-background/80 hover:text-background transition-travel">여행 이야기</a></li>
              <li><a href="#benefits" className="text-background/80 hover:text-background transition-travel">혜택</a></li>
              <li><a href="#search" className="text-background/80 hover:text-background transition-travel">검색</a></li>
            </ul>
          </div>

       
          <div>
            <h3 className="font-semibold mb-4">인기 카테고리</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-background/80 hover:text-background transition-travel">국내 여행</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-travel">아시아 여행</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-travel">유럽 여행</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-travel">배낭여행</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-travel">맛집 투어</a></li>
            </ul>
          </div>

      
          <div>
            <h3 className="font-semibold mb-4">뉴스레터 구독</h3>
            <p className="text-background/80 text-sm mb-4">
              최신 여행 정보와 특가 혜택을 받아보세요
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="이메일 주소를 입력하세요"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button variant="secondary" size="sm" className="w-full">
                구독하기
              </Button>
            </div>       
          </div>
       */}
        </div>




        {/* Contact Info */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-background/60" />
              <span className="text-background/80">1522-5149</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-background/60" />
              <span className="text-background/80">info@tidesquare.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-background/60" />
              <span className="text-background/80">서울특별시 중구 남대문로 78, 8층 에이호(명동1가, 타임워크명동빌딩)</span>
            </div>            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-background/80">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 투어비스 블로그. All rights reserved.</p>
          </div>
          {/*}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-background transition-travel">이용약관</a>
            <a href="#" className="hover:text-background transition-travel">개인정보처리방침</a>
            <a href="#" className="hover:text-background transition-travel">고객센터</a>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
};

export default TravelFooter;