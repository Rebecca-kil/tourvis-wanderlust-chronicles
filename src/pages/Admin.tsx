import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, X, Tag, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useBlog } from "@/contexts/BlogContext";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("destinations");
  const { addDestination, addGuide, addStory, addBenefit, destinations, setDestinations } = useBlog();

  // Tags management
  const [tags, setTags] = useState({
    destinations: ["국내", "해외", "아시아", "유럽", "미국", "일본"],
    guides: ["교통", "숙박", "관광", "음식", "쇼핑", "팁"],
    stories: ["국내여행", "해외여행", "배낭여행", "가족여행", "혼행", "커플여행"],
    benefits: ["항공", "숙박", "관광", "쇼핑", "카드", "포인트"]
  });
  const [newTagInputs, setNewTagInputs] = useState({
    destinations: "",
    guides: "",
    stories: "",
    benefits: ""
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent, contentType: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (contentType === "여행지") {
      addDestination({
        title: formData.get('dest-title') as string,
        city: formData.get('dest-city') as string,
        image: formData.get('dest-image') as string,
        description: formData.get('dest-description') as string,
        price: formData.get('dest-price') ? Number(formData.get('dest-price')) : undefined,
        duration: formData.get('dest-duration') as string || undefined,
        tags: selectedTags,
        quickInfo: formData.get('dest-quickinfo') as string,
        travelTips: (formData.get('dest-tips') as string)?.split('\n').map(tip => tip.trim()).filter(Boolean),
        dailyBudget: {
          accommodation: formData.get('dest-budget-accommodation') as string,
          food: formData.get('dest-budget-food') as string,
          transport: formData.get('dest-budget-transport') as string
        }
      });
    } else if (contentType === "가이드") {
      const contentText = formData.get('guide-content') as string;
      const tipsText = formData.get('guide-tips') as string;
      
      // Parse content sections
      const contentSections = contentText.split('\n\n').map(section => {
        const lines = section.trim().split('\n');
        return {
          title: lines[0],
          content: lines.slice(1).join(' ')
        };
      }).filter(section => section.title && section.content);
      
      addGuide({
        title: formData.get('guide-title') as string,
        author: formData.get('guide-author') as string,
        category: formData.get('guide-category') as string,
        difficulty: formData.get('guide-difficulty') as string,
        image: formData.get('guide-image') as string,
        content: contentSections,
        tips: tipsText.split(',').map(tip => tip.trim()).filter(tip => tip),
        tags: selectedTags,
        likes: 0,
        comments: []
      });
    } else if (contentType === "여행 이야기") {
      addStory({
        title: formData.get('story-title') as string,
        author: formData.get('story-author') as string,
        city: formData.get('story-city') as string || undefined,
        category: formData.get('story-category') as string,
        image: formData.get('story-image') as string,
        excerpt: formData.get('story-excerpt') as string,
        content: formData.get('story-content') as string,
        tags: selectedTags,
        likes: 0,
        comments: []
      });
    } else if (contentType === "혜택") {
      const featuresText = formData.get('benefit-features') as string;
      const conditionsText = formData.get('benefit-conditions') as string;
      
      addBenefit({
        title: formData.get('benefit-title') as string,
        category: formData.get('benefit-category') as string,
        type: formData.get('benefit-type') as string,
        discount: formData.get('benefit-discount') as string || undefined,
        originalPrice: formData.get('benefit-original-price') as string || undefined,
        salePrice: formData.get('benefit-sale-price') as string || undefined,
        validUntil: formData.get('benefit-valid-until') as string || undefined,
        image: formData.get('benefit-image') as string,
        description: formData.get('benefit-description') as string,
        features: featuresText.split(',').map(feature => feature.trim()).filter(feature => feature),
        conditions: conditionsText.split(',').map(condition => condition.trim()).filter(condition => condition),
        tags: selectedTags,
        likes: 0,
        comments: []
      });
    }
    
    setSelectedTags([]);
    (e.target as HTMLFormElement).reset();
    
    toast({
      title: "콘텐츠 저장됨",
      description: `${contentType} 콘텐츠가 성공적으로 저장되었습니다.`,
    });
  };

  const addTag = (category: keyof typeof tags) => {
    const newTagValue = newTagInputs[category].trim();
    if (newTagValue && !tags[category].includes(newTagValue)) {
      setTags(prev => ({
        ...prev,
        [category]: [...prev[category], newTagValue]
      }));
      setNewTagInputs(prev => ({
        ...prev,
        [category]: ""
      }));
    }
  };

  const removeTag = (category: keyof typeof tags, tagToRemove: string) => {
    setTags(prev => ({
      ...prev,
      [category]: prev[category].filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleEditSave = (updated: any) => {
    setDestinations(
      destinations.map((dest: any) => dest.id === updated.id ? { ...dest, ...updated } : dest)
    );
    setModalOpen(false);
    toast({ title: "수정 완료", description: "여행지 정보가 수정되었습니다." });
  };

  // DestinationModal component (inner, above return)
  const DestinationModal = ({ open, onClose, destination, isEditMode, onSave }: any) => {
    const [editData, setEditData] = useState(destination);
    useEffect(() => { setEditData(destination); }, [destination]);
    if (!open || !destination) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name.startsWith("dailyBudget.")) {
        setEditData((prev: any) => ({
          ...prev,
          dailyBudget: { ...prev.dailyBudget, [name.split(".")[1]]: value }
        }));
      } else if (name === "travelTips") {
        setEditData((prev: any) => ({ ...prev, travelTips: value.split('\n') }));
      } else {
        setEditData((prev: any) => ({ ...prev, [name]: value }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(editData);
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
          {isEditMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-2">여행지 정보 수정</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">제목</Label>
                  <Input id="edit-title" name="title" value={editData.title} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="edit-city">도시/국가</Label>
                  <Input id="edit-city" name="city" value={editData.city} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-image">이미지 URL</Label>
                <Input id="edit-image" name="image" value={editData.image} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="edit-description">설명</Label>
                <Textarea id="edit-description" name="description" value={editData.description} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">가격</Label>
                  <Input id="edit-price" name="price" value={editData.price || ''} onChange={handleChange} type="number" />
                </div>
                <div>
                  <Label htmlFor="edit-duration">소요 시간</Label>
                  <Input id="edit-duration" name="duration" value={editData.duration || ''} onChange={handleChange} />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-quickinfo">Quick Info</Label>
                <Textarea id="edit-quickinfo" name="quickInfo" value={editData.quickInfo || ''} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="edit-tips">Travel Tips (한 줄에 하나씩)</Label>
                <Textarea id="edit-tips" name="travelTips" value={(editData.travelTips || []).join('\n')} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-budget-accommodation">숙박</Label>
                  <Input id="edit-budget-accommodation" name="dailyBudget.accommodation" value={editData.dailyBudget?.accommodation || ''} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="edit-budget-food">식비</Label>
                  <Input id="edit-budget-food" name="dailyBudget.food" value={editData.dailyBudget?.food || ''} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="edit-budget-transport">교통</Label>
                  <Input id="edit-budget-transport" name="dailyBudget.transport" value={editData.dailyBudget?.transport || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>취소</Button>
                <Button type="submit">저장</Button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">여행지 상세 정보</h2>
              <div className="mb-2"><b>Quick Info:</b> {destination.quickInfo || '-'}</div>
              <div className="mb-2">
                <b>Travel Tips:</b>
                <ul className="list-disc pl-5">
                  {(destination.travelTips || []).map((tip: string, idx: number) => <li key={idx}>{tip}</li>)}
                </ul>
              </div>
              <div className="mb-2">
                <b>Budget Guide:</b>
                <ul>
                  <li>숙박: {destination.dailyBudget?.accommodation || '-'}</li>
                  <li>식비: {destination.dailyBudget?.food || '-'}</li>
                  <li>교통: {destination.dailyBudget?.transport || '-'}</li>
                </ul>
              </div>
              <div className="flex justify-end">
                <Button onClick={onClose}>닫기</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <TravelHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          메인으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">관리자 페이지</h1>
          <p className="text-muted-foreground">여행 콘텐츠를 추가하고 관리하세요</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="destinations">여행지</TabsTrigger>
            <TabsTrigger value="guides">가이드</TabsTrigger>
            <TabsTrigger value="stories">이야기</TabsTrigger>
            <TabsTrigger value="benefits">혜택</TabsTrigger>
            <TabsTrigger value="tags">태그 관리</TabsTrigger>
          </TabsList>

          {/* Destinations Form */}
          <TabsContent value="destinations">
            <Card>
              <CardHeader>
                <CardTitle>새 여행지 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "여행지")} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dest-title">제목</Label>
                      <Input id="dest-title" name="dest-title" placeholder="여행지 이름" required />
                    </div>
                    <div>
                      <Label htmlFor="dest-city">도시/국가</Label>
                      <Input id="dest-city" name="dest-city" placeholder="서울, 대한민국" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dest-image">이미지 URL</Label>
                    <Input id="dest-image" name="dest-image" type="url" placeholder="https://example.com/image.jpg" required />
                  </div>
                  <div>
                    <Label htmlFor="dest-description">설명</Label>
                    <Textarea id="dest-description" name="dest-description" placeholder="여행지에 대한 상세 설명..." required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dest-price">가격 (원)</Label>
                      <Input id="dest-price" name="dest-price" type="number" placeholder="500000" />
                    </div>
                    <div>
                      <Label htmlFor="dest-duration">소요 시간</Label>
                      <Input id="dest-duration" name="dest-duration" placeholder="3박 4일" />
                    </div>
                  </div>
                  <div>
                    <Label>카테고리 태그</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.destinations.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTagSelection(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    여행지 추가
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Form */}
          <TabsContent value="guides">
            <Card>
              <CardHeader>
                <CardTitle>새 가이드 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "가이드")} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guide-title">제목</Label>
                      <Input id="guide-title" name="guide-title" placeholder="가이드 제목" required />
                    </div>
                    <div>
                      <Label htmlFor="guide-author">작성자</Label>
                      <Input id="guide-author" name="guide-author" placeholder="작성자 이름" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guide-category">카테고리</Label>
                      <Select name="guide-category">
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="교통">교통</SelectItem>
                          <SelectItem value="숙박">숙박</SelectItem>
                          <SelectItem value="관광">관광</SelectItem>
                          <SelectItem value="음식">음식</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guide-difficulty">난이도</Label>
                      <Select name="guide-difficulty">
                        <SelectTrigger>
                          <SelectValue placeholder="난이도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="초급">초급</SelectItem>
                          <SelectItem value="중급">중급</SelectItem>
                          <SelectItem value="고급">고급</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guide-image">이미지 URL</Label>
                    <Input id="guide-image" name="guide-image" type="url" placeholder="https://example.com/image.jpg" required />
                  </div>
                  <div>
                    <Label htmlFor="guide-content">가이드 내용 (섹션별로 구분해서 작성)</Label>
                    <Textarea id="guide-content" name="guide-content" placeholder="1. 첫 번째 섹션 제목&#10;내용 설명...&#10;&#10;2. 두 번째 섹션 제목&#10;내용 설명..." rows={8} required />
                  </div>
                  <div>
                    <Label htmlFor="guide-tips">핵심 팁 (쉼표로 구분)</Label>
                    <Textarea id="guide-tips" name="guide-tips" placeholder="팁1, 팁2, 팁3" rows={3} />
                  </div>
                  <div>
                    <Label>추가 태그</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.guides.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTagSelection(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    가이드 추가
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stories Form */}
          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle>새 여행 이야기 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "여행 이야기")} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="story-title">제목</Label>
                      <Input id="story-title" name="story-title" placeholder="여행 이야기 제목" required />
                    </div>
                    <div>
                      <Label htmlFor="story-author">작성자</Label>
                      <Input id="story-author" name="story-author" placeholder="작성자 이름" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="story-city">도시/국가</Label>
                      <Input id="story-city" name="story-city" placeholder="파리, 프랑스" />
                    </div>
                    <div>
                      <Label htmlFor="story-category">여행 타입</Label>
                      <Select name="story-category">
                        <SelectTrigger>
                          <SelectValue placeholder="여행 타입 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="국내여행">국내여행</SelectItem>
                          <SelectItem value="해외여행">해외여행</SelectItem>
                          <SelectItem value="배낭여행">배낭여행</SelectItem>
                          <SelectItem value="가족여행">가족여행</SelectItem>
                          <SelectItem value="혼행">혼행</SelectItem>
                          <SelectItem value="커플여행">커플여행</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="story-image">이미지 URL</Label>
                    <Input id="story-image" name="story-image" type="url" placeholder="https://example.com/image.jpg" required />
                  </div>
                  <div>
                    <Label htmlFor="story-excerpt">요약</Label>
                    <Textarea id="story-excerpt" name="story-excerpt" placeholder="여행 이야기의 간단한 요약..." rows={3} required />
                  </div>
                  <div>
                    <Label htmlFor="story-content">본문</Label>
                    <Textarea id="story-content" name="story-content" placeholder="여행 이야기의 상세한 내용을 작성해주세요..." rows={10} required />
                  </div>
                  <div>
                    <Label>카테고리 태그</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.stories.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTagSelection(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    이야기 추가
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benefits Form */}
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>새 혜택 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "혜택")} className="space-y-4">
                  <div>
                    <Label htmlFor="benefit-title">제목</Label>
                    <Input id="benefit-title" name="benefit-title" placeholder="혜택 제목" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="benefit-category">카테고리</Label>
                      <Select name="benefit-category">
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="항공">항공</SelectItem>
                          <SelectItem value="숙박">숙박</SelectItem>
                          <SelectItem value="관광">관광</SelectItem>
                          <SelectItem value="쇼핑">쇼핑</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="benefit-type">타입</Label>
                      <Select name="benefit-type">
                        <SelectTrigger>
                          <SelectValue placeholder="타입 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="할인">할인</SelectItem>
                          <SelectItem value="적립">적립</SelectItem>
                          <SelectItem value="무료">무료</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="benefit-discount">할인율</Label>
                      <Input id="benefit-discount" name="benefit-discount" placeholder="30%" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="benefit-original-price">원가</Label>
                      <Input id="benefit-original-price" name="benefit-original-price" placeholder="150,000원" />
                    </div>
                    <div>
                      <Label htmlFor="benefit-sale-price">할인가</Label>
                      <Input id="benefit-sale-price" name="benefit-sale-price" placeholder="105,000원" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="benefit-valid-until">유효기간</Label>
                    <Input id="benefit-valid-until" name="benefit-valid-until" placeholder="2024.03.31" />
                  </div>
                  <div>
                    <Label htmlFor="benefit-image">이미지 URL</Label>
                    <Input id="benefit-image" name="benefit-image" type="url" placeholder="https://example.com/image.jpg" required />
                  </div>
                  <div>
                    <Label htmlFor="benefit-description">설명</Label>
                    <Textarea id="benefit-description" name="benefit-description" placeholder="혜택에 대한 상세 설명..." required />
                  </div>
                  <div>
                    <Label htmlFor="benefit-features">주요 혜택 (쉼표로 구분)</Label>
                    <Textarea id="benefit-features" name="benefit-features" placeholder="혜택1, 혜택2, 혜택3" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="benefit-conditions">이용 조건 (쉼표로 구분)</Label>
                    <Textarea id="benefit-conditions" name="benefit-conditions" placeholder="조건1, 조건2, 조건3" rows={3} />
                  </div>
                  <div>
                    <Label>카테고리 태그</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.benefits.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTagSelection(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    혜택 추가
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tags Management */}
          <TabsContent value="tags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(tags).map(([category, categoryTags]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      {category === 'destinations' && '여행지'}
                      {category === 'guides' && '가이드'}
                      {category === 'stories' && '이야기'}
                      {category === 'benefits' && '혜택'}
                      {' '}태그 관리
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="새 태그 입력..."
                        value={newTagInputs[category as keyof typeof newTagInputs]}
                        onChange={(e) => setNewTagInputs(prev => ({
                          ...prev,
                          [category]: e.target.value
                        }))}
                        onKeyPress={(e) => e.key === 'Enter' && addTag(category as keyof typeof tags)}
                      />
                      <Button 
                        onClick={() => addTag(category as keyof typeof tags)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categoryTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeTag(category as keyof typeof tags, tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "destinations" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">여행지 목록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">제목</th>
                  <th className="px-4 py-2 border-b">도시/국가</th>
                  <th className="px-4 py-2 border-b">Quick Info</th>
                  <th className="px-4 py-2 border-b">상세</th>
                  <th className="px-4 py-2 border-b">수정</th>
                </tr>
              </thead>
              <tbody>
                {destinations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted-foreground">등록된 여행지가 없습니다.</td>
                  </tr>
                ) : (
                  destinations.map(dest => (
                    <tr key={dest.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{dest.title}</td>
                      <td className="px-4 py-2">{dest.city}</td>
                      <td className="px-4 py-2">{dest.quickInfo || '-'}</td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedDestination(dest); setEditMode(false); setModalOpen(true); }}>상세보기</Button>
                      </td>
                      <td className="px-4 py-2">
                        <Button size="sm" variant="secondary" onClick={() => { setSelectedDestination(dest); setEditMode(true); setModalOpen(true); }}>수정</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <DestinationModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            destination={selectedDestination}
            isEditMode={editMode}
            onSave={handleEditSave}
          />
        </div>
      )}
      <TravelFooter />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-2">여행지 정보 수정</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">제목</Label>
                <Input id="edit-title" name="title" value={editData.title} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="edit-city">도시/국가</Label>
                <Input id="edit-city" name="city" value={editData.city} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image">이미지 URL</Label>
              <Input id="edit-image" name="image" value={editData.image} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="edit-description">설명</Label>
              <Textarea id="edit-description" name="description" value={editData.description} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">가격</Label>
                <Input id="edit-price" name="price" value={editData.price || ''} onChange={handleChange} type="number" />
              </div>
              <div>
                <Label htmlFor="edit-duration">소요 시간</Label>
                <Input id="edit-duration" name="duration" value={editData.duration || ''} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-quickinfo">Quick Info</Label>
              <Textarea id="edit-quickinfo" name="quickInfo" value={editData.quickInfo || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="edit-tips">Travel Tips (한 줄에 하나씩)</Label>
              <Textarea id="edit-tips" name="travelTips" value={(editData.travelTips || []).join('\n')} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-budget-accommodation">숙박</Label>
                <Input id="edit-budget-accommodation" name="dailyBudget.accommodation" value={editData.dailyBudget?.accommodation || ''} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="edit-budget-food">식비</Label>
                <Input id="edit-budget-food" name="dailyBudget.food" value={editData.dailyBudget?.food || ''} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="edit-budget-transport">교통</Label>
                <Input id="edit-budget-transport" name="dailyBudget.transport" value={editData.dailyBudget?.transport || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>취소</Button>
              <Button type="submit">저장</Button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">여행지 상세 정보</h2>
            <div className="mb-2"><b>Quick Info:</b> {destination.quickInfo || '-'}</div>
            <div className="mb-2">
              <b>Travel Tips:</b>
              <ul className="list-disc pl-5">
                {(destination.travelTips || []).map((tip: string, idx: number) => <li key={idx}>{tip}</li>)}
              </ul>
            </div>
            <div className="mb-2">
              <b>Budget Guide:</b>
              <ul>
                <li>숙박: {destination.dailyBudget?.accommodation || '-'}</li>
                <li>식비: {destination.dailyBudget?.food || '-'}</li>
                <li>교통: {destination.dailyBudget?.transport || '-'}</li>
              </ul>
            </div>
            <div className="flex justify-end">
              <Button onClick={onClose}>닫기</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 메인 Admin 컴포넌트 내 여행지 목록 추가 ---

// ... (기존 코드)

// 목록, 상세/수정 모달 상태 및 탭 상태 추가
const [activeTab, setActiveTab] = useState("destinations");
const [modalOpen, setModalOpen] = useState(false);
const [editMode, setEditMode] = useState(false);
const [selectedDestination, setSelectedDestination] = useState(null);

// 여행지 정보 수정 함수
const { destinations, setDestinations } = useBlog();
const handleEditSave = (updated) => {
  setDestinations(prev => prev.map(d => d.id === updated.id ? { ...d, ...updated } : d));
  setModalOpen(false);
};

// 여행지 목록 UI (여행지 탭 하단에 추가)
{activeTab === "destinations" && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">여행지 목록</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">제목</th>
            <th className="px-4 py-2 border-b">도시/국가</th>
            <th className="px-4 py-2 border-b">Quick Info</th>
            <th className="px-4 py-2 border-b">상세</th>
            <th className="px-4 py-2 border-b">수정</th>
          </tr>
        </thead>
        <tbody>
          {destinations.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-muted-foreground">등록된 여행지가 없습니다.</td>
            </tr>
          ) : (
            destinations.map(dest => (
              <tr key={dest.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{dest.title}</td>
                <td className="px-4 py-2">{dest.city}</td>
                <td className="px-4 py-2">{dest.quickInfo || '-'}</td>
                <td className="px-4 py-2">
                  <Button size="sm" variant="outline" onClick={() => { setSelectedDestination(dest); setEditMode(false); setModalOpen(true); }}>상세보기</Button>
                </td>
                <td className="px-4 py-2">
                  <Button size="sm" variant="secondary" onClick={() => { setSelectedDestination(dest); setEditMode(true); setModalOpen(true); }}>수정</Button>
                </td>
              </tr>
export default Admin;