import { useState } from "react";
import { ArrowLeft, Plus, X, Tag, Settings, Database } from "lucide-react";
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
import { DataTable } from "@/components/admin/DataTable";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("destinations");
  const { 
    destinations, 
    guides, 
    stories, 
    benefits,
    addDestination, 
    addGuide, 
    addStory, 
    addBenefit,
    updateDestination,
    updateGuide,
    updateStory,
    updateBenefit,
    deleteDestination,
    deleteGuide,
    deleteStory,
    deleteBenefit
  } = useBlog();
  
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
        tags: selectedTags
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
        tags: selectedTags
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
        tags: selectedTags
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
        tags: selectedTags
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="destinations">여행지</TabsTrigger>
            <TabsTrigger value="guides">가이드</TabsTrigger>
            <TabsTrigger value="stories">이야기</TabsTrigger>
            <TabsTrigger value="benefits">혜택</TabsTrigger>
            <TabsTrigger value="tags">태그 관리</TabsTrigger>
            <TabsTrigger value="manage">데이터 관리</TabsTrigger>
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

          {/* Data Management Tab */}
          <TabsContent value="manage">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    데이터 관리
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="destinations-list" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="destinations-list">여행지 관리</TabsTrigger>
                      <TabsTrigger value="guides-list">가이드 관리</TabsTrigger>
                      <TabsTrigger value="stories-list">이야기 관리</TabsTrigger>
                      <TabsTrigger value="benefits-list">혜택 관리</TabsTrigger>
                    </TabsList>

                    <TabsContent value="destinations-list">
                      <DataTable
                        data={destinations}
                        type="destinations"
                        onUpdate={updateDestination}
                        onDelete={deleteDestination}
                      />
                    </TabsContent>

                    <TabsContent value="guides-list">
                      <DataTable
                        data={guides}
                        type="guides"
                        onUpdate={updateGuide}
                        onDelete={deleteGuide}
                      />
                    </TabsContent>

                    <TabsContent value="stories-list">
                      <DataTable
                        data={stories}
                        type="stories"
                        onUpdate={updateStory}
                        onDelete={deleteStory}
                      />
                    </TabsContent>

                    <TabsContent value="benefits-list">
                      <DataTable
                        data={benefits}
                        type="benefits"
                        onUpdate={updateBenefit}
                        onDelete={deleteBenefit}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TravelFooter />
    </div>
  );
};

export default Admin;
