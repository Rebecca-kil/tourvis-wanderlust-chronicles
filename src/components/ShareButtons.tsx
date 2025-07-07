import { useState } from "react";
import { Share, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonsProps {
  title?: string;
  url?: string;
}

const ShareButtons = ({ title = document.title, url = window.location.href }: ShareButtonsProps) => {
  const { toast } = useToast();

  const handleKakaoShare = () => {
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: '투어비스 블로그에서 확인하세요',
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    } else {
      // 카카오톡 앱이 없는 경우 카카오톡 공유 URL로 리다이렉트
      const shareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "링크가 복사되었습니다",
        description: "클립보드에 URL이 복사되었습니다.",
      });
    } catch (err) {
      console.error('URL 복사 실패:', err);
      toast({
        title: "복사 실패",
        description: "URL 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="w-4 h-4 mr-2" />
          공유하기
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleKakaoShare}>
          <div className="w-4 h-4 mr-2 bg-yellow-500 rounded-sm flex items-center justify-center">
            <span className="text-xs font-bold text-black">K</span>
          </div>
          카카오톡
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyUrl}>
          <Copy className="w-4 h-4 mr-2" />
          URL 복사
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;