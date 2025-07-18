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
    guides: ["교통", "일정", "준비물", "팁", "트렌드", "FAQ"],
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

  // Travel tips state
  const [travelTips, setTravelTips] = useState<string[]>([]);
  const [newTip, setNewTip] = useState("");

  // Attractions management
  const [attractions, setAttractions] = useState<Array<{name: string; description: string; time?: string; rating?: number}>>([]);
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    time: "",
    rating: 4.5
  });

  // New states for guides, stories, and benefits
  const [guideContent, setGuideContent] = useState<Array<{title: string; content: string}>>([]);
  const [newGuideSection, setNewGuideSection] = useState({ title: "", content: "" });
  const [guideTips, setGuideTips] = useState<string[]>([]);
  const [newGuideTip, setNewGuideTip] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);
  const [newLearning, setNewLearning] = useState("");
  
  const [storyHighlights, setStoryHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [storyChallenges, setStoryChallenges] = useState<string[]>([]);
  const [newChallenge, setNewChallenge] = useState("");
  const [storyRecommendations, setStoryRecommendations] = useState<string[]>([]);
  const [newRecommendation, setNewRecommendation] = useState("");

  const [benefitFeatures, setBenefitFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [benefitConditions, setBenefitConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState("");
  const [howToUse, setHowToUse] = useState<string[]>([]);
  const [newHowToUse, setNewHowToUse] = useState("");
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [newRestriction, setNewRestriction] = useState("");

  // 가이드 카테고리별 state들
  const [selectedGuideCategory, setSelectedGuideCategory] = useState("교통");
  
  // 교통 가이드 관련 state
  const [transportBookingTips, setTransportBookingTips] = useState<string[]>([]);
  const [newTransportTip, setNewTransportTip] = useState("");
  
  // 일정 가이드 관련 state
  const [itineraryDays, setItineraryDays] = useState<Array<{day: number; title: string; activities: string[]; budget?: string; tips?: string[]}>>([]);
  const [newItineraryDay, setNewItineraryDay] = useState({day: 1, title: "", activities: [""], budget: "", tips: [""]});
  
  // 준비물 가이드 관련 state
  const [packingList, setPackingList] = useState<Array<{category: string; items: string[]; optional?: boolean}>>([]);
  const [seasonalItems, setSeasonalItems] = useState<Array<{season: string; items: string[]}>>([]);
  const [newPackingCategory, setNewPackingCategory] = useState({category: "", items: [""], optional: false});
  const [newSeasonalItem, setNewSeasonalItem] = useState({season: "", items: [""]});
  
  // 팁 가이드 관련 state
  const [localTips, setLocalTips] = useState<string[]>([]);
  const [culturalTips, setCulturalTips] = useState<string[]>([]);
  const [safeTips, setSafeTips] = useState<string[]>([]);
  const [moneyTips, setMoneyTips] = useState<string[]>([]);
  const [newLocalTip, setNewLocalTip] = useState("");
  const [newCulturalTip, setNewCulturalTip] = useState("");
  const [newSafeTip, setNewSafeTip] = useState("");
  const [newMoneyTip, setNewMoneyTip] = useState("");
  
  // FAQ 가이드 관련 state
  const [faqs, setFaqs] = useState<Array<{question: string; answer: string; category?: string}>>([]);
  const [newFaq, setNewFaq] = useState({question: "", answer: "", category: ""});

  const addAttraction = () => {
    if (newAttraction.name.trim() && newAttraction.description.trim()) {
      setAttractions(prev => [...prev, {
        name: newAttraction.name.trim(),
        description: newAttraction.description.trim(),
        time: newAttraction.time.trim() || undefined,
        rating: newAttraction.rating
      }]);
      setNewAttraction({
        name: "",
        description: "",
        time: "",
        rating: 4.5
      });
    }
  };

  const removeAttraction = (index: number) => {
    setAttractions(prev => prev.filter((_, i) => i !== index));
  };

  // New helper functions for guides
  const addGuideSection = () => {
    if (newGuideSection.title.trim() && newGuideSection.content.trim()) {
      setGuideContent(prev => [...prev, newGuideSection]);
      setNewGuideSection({ title: "", content: "" });
    }
  };

  const removeGuideSection = (index: number) => {
    setGuideContent(prev => prev.filter((_, i) => i !== index));
  };

  const addGuideTip = () => {
    if (newGuideTip.trim() && !guideTips.includes(newGuideTip.trim())) {
      setGuideTips(prev => [...prev, newGuideTip.trim()]);
      setNewGuideTip("");
    }
  };

  const removeGuideTip = (tipToRemove: string) => {
    setGuideTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements(prev => [...prev, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setRequirements(prev => prev.filter(req => req !== reqToRemove));
  };

  const addLearning = () => {
    if (newLearning.trim() && !whatYouWillLearn.includes(newLearning.trim())) {
      setWhatYouWillLearn(prev => [...prev, newLearning.trim()]);
      setNewLearning("");
    }
  };

  const removeLearning = (learningToRemove: string) => {
    setWhatYouWillLearn(prev => prev.filter(learning => learning !== learningToRemove));
  };

  // New helper functions for stories
  const addHighlight = () => {
    if (newHighlight.trim() && !storyHighlights.includes(newHighlight.trim())) {
      setStoryHighlights(prev => [...prev, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const removeHighlight = (highlightToRemove: string) => {
    setStoryHighlights(prev => prev.filter(highlight => highlight !== highlightToRemove));
  };

  const addChallenge = () => {
    if (newChallenge.trim() && !storyChallenges.includes(newChallenge.trim())) {
      setStoryChallenges(prev => [...prev, newChallenge.trim()]);
      setNewChallenge("");
    }
  };

  const removeChallenge = (challengeToRemove: string) => {
    setStoryChallenges(prev => prev.filter(challenge => challenge !== challengeToRemove));
  };

  const addRecommendation = () => {
    if (newRecommendation.trim() && !storyRecommendations.includes(newRecommendation.trim())) {
      setStoryRecommendations(prev => [...prev, newRecommendation.trim()]);
      setNewRecommendation("");
    }
  };

  const removeRecommendation = (recToRemove: string) => {
    setStoryRecommendations(prev => prev.filter(rec => rec !== recToRemove));
  };

  // New helper functions for benefits
  const addFeature = () => {
    if (newFeature.trim() && !benefitFeatures.includes(newFeature.trim())) {
      setBenefitFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setBenefitFeatures(prev => prev.filter(feature => feature !== featureToRemove));
  };

  const addCondition = () => {
    if (newCondition.trim() && !benefitConditions.includes(newCondition.trim())) {
      setBenefitConditions(prev => [...prev, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const removeCondition = (conditionToRemove: string) => {
    setBenefitConditions(prev => prev.filter(condition => condition !== conditionToRemove));
  };

  const addHowToUseStep = () => {
    if (newHowToUse.trim() && !howToUse.includes(newHowToUse.trim())) {
      setHowToUse(prev => [...prev, newHowToUse.trim()]);
      setNewHowToUse("");
    }
  };

  const removeHowToUseStep = (stepToRemove: string) => {
    setHowToUse(prev => prev.filter(step => step !== stepToRemove));
  };

  const addRestriction = () => {
    if (newRestriction.trim() && !restrictions.includes(newRestriction.trim())) {
      setRestrictions(prev => [...prev, newRestriction.trim()]);
      setNewRestriction("");
    }
  };

  const removeRestriction = (restrictionToRemove: string) => {
    setRestrictions(prev => prev.filter(restriction => restriction !== restrictionToRemove));
  };

  // 카테고리별 가이드 헬퍼 함수들
  const addTransportTip = () => {
    if (newTransportTip.trim() && !transportBookingTips.includes(newTransportTip.trim())) {
      setTransportBookingTips(prev => [...prev, newTransportTip.trim()]);
      setNewTransportTip("");
    }
  };

  const removeTransportTip = (tipToRemove: string) => {
    setTransportBookingTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addItineraryDay = () => {
    if (newItineraryDay.title.trim()) {
      setItineraryDays(prev => [...prev, {
        ...newItineraryDay,
        activities: newItineraryDay.activities.filter(a => a.trim()),
        tips: newItineraryDay.tips?.filter(t => t.trim())
      }]);
      setNewItineraryDay({day: newItineraryDay.day + 1, title: "", activities: [""], budget: "", tips: [""]});
    }
  };

  const removeItineraryDay = (index: number) => {
    setItineraryDays(prev => prev.filter((_, i) => i !== index));
  };

  const addPackingCategory = () => {
    if (newPackingCategory.category.trim()) {
      setPackingList(prev => [...prev, {
        ...newPackingCategory,
        items: newPackingCategory.items.filter(i => i.trim())
      }]);
      setNewPackingCategory({category: "", items: [""], optional: false});
    }
  };

  const removePackingCategory = (index: number) => {
    setPackingList(prev => prev.filter((_, i) => i !== index));
  };

  const addSeasonalItem = () => {
    if (newSeasonalItem.season.trim()) {
      setSeasonalItems(prev => [...prev, {
        ...newSeasonalItem,
        items: newSeasonalItem.items.filter(i => i.trim())
      }]);
      setNewSeasonalItem({season: "", items: [""]});
    }
  };

  const removeSeasonalItem = (index: number) => {
    setSeasonalItems(prev => prev.filter((_, i) => i !== index));
  };

  const addLocalTip = () => {
    if (newLocalTip.trim() && !localTips.includes(newLocalTip.trim())) {
      setLocalTips(prev => [...prev, newLocalTip.trim()]);
      setNewLocalTip("");
    }
  };

  const removeLocalTip = (tipToRemove: string) => {
    setLocalTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addCulturalTip = () => {
    if (newCulturalTip.trim() && !culturalTips.includes(newCulturalTip.trim())) {
      setCulturalTips(prev => [...prev, newCulturalTip.trim()]);
      setNewCulturalTip("");
    }
  };

  const removeCulturalTip = (tipToRemove: string) => {
    setCulturalTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addSafeTip = () => {
    if (newSafeTip.trim() && !safeTips.includes(newSafeTip.trim())) {
      setSafeTips(prev => [...prev, newSafeTip.trim()]);
      setNewSafeTip("");
    }
  };

  const removeSafeTip = (tipToRemove: string) => {
    setSafeTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addMoneyTip = () => {
    if (newMoneyTip.trim() && !moneyTips.includes(newMoneyTip.trim())) {
      setMoneyTips(prev => [...prev, newMoneyTip.trim()]);
      setNewMoneyTip("");
    }
  };

  const removeMoneyTip = (tipToRemove: string) => {
    setMoneyTips(prev => prev.filter(tip => tip !== tipToRemove));
  };

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFaqs(prev => [...prev, newFaq]);
      setNewFaq({question: "", answer: "", category: ""});
    }
  };

  const removeFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent, contentType: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (contentType === "여행지") {
      // Parse daily budget if provided
      let dailyBudget = undefined;
      const accommodation = formData.get('dest-accommodation') as string;
      const food = formData.get('dest-food') as string;
      const transport = formData.get('dest-transport') as string;
      
      if (accommodation || food || transport) {
        dailyBudget = {
          accommodation: accommodation ? `${Number(accommodation).toLocaleString()}원` : "",
          food: food ? `${Number(food).toLocaleString()}원` : "",
          transport: transport ? `${Number(transport).toLocaleString()}원` : ""
        };
      }

      addDestination({
        title: formData.get('dest-title') as string,
        city: formData.get('dest-city') as string,
        image: formData.get('dest-image') as string,
        description: formData.get('dest-description') as string,
        price: formData.get('dest-price') ? Number(formData.get('dest-price')) : undefined,
        duration: formData.get('dest-duration') as string || undefined,
        quickInfo: formData.get('dest-quick-info') as string || undefined,
        budgetLevel: formData.get('dest-budget-level') as string || undefined,
        bestTime: formData.get('dest-best-time') as string || undefined,
        transportation: formData.get('dest-transportation') as string || undefined,
        flightBookingUrl: formData.get('dest-flight-url') as string || undefined,
        accommodationBookingUrl: formData.get('dest-accommodation-url') as string || undefined,
        tourBookingUrl: formData.get('dest-tour-url') as string || undefined,
        travelTips: travelTips.length > 0 ? travelTips : undefined,
        attractions: attractions.length > 0 ? attractions : undefined,
        dailyBudget,
        tags: selectedTags
      });
      
      // Reset all states
      setTravelTips([]);
      setAttractions([]);
    } else if (contentType === "가이드") {
      const category = formData.get('guide-category') as string;
      
      let guideData: any = {
        title: formData.get('guide-title') as string,
        author: formData.get('guide-author') as string,
        category,
        difficulty: formData.get('guide-difficulty') as string,
        image: formData.get('guide-image') as string,
        description: formData.get('guide-description') as string || undefined,
        readTime: formData.get('guide-read-time') as string || undefined,
        targetAudience: formData.get('guide-target-audience') as string || undefined,
        publishDate: formData.get('guide-publish-date') as string || undefined,
        content: guideContent.length > 0 ? guideContent : [],
        tips: guideTips.length > 0 ? guideTips : [],
        requirements: requirements.length > 0 ? requirements : undefined,
        whatYouWillLearn: whatYouWillLearn.length > 0 ? whatYouWillLearn : undefined,
        tags: selectedTags
      };

      // 카테고리별 추가 데이터
      if (category === '교통') {
        guideData = {
          ...guideData,
          transportType: formData.get('transport-type') as string || undefined,
          bookingTips: transportBookingTips.length > 0 ? transportBookingTips : undefined,
          priceRange: formData.get('price-range') as string || undefined,
          reservationPeriod: formData.get('reservation-period') as string || undefined,
        };
      } else if (category === '일정') {
        guideData = {
          ...guideData,
          itineraryDays: itineraryDays.length > 0 ? itineraryDays : undefined,
          totalDuration: formData.get('total-duration') as string || undefined,
          budgetEstimate: formData.get('budget-estimate') as string || undefined,
        };
      } else if (category === '준비물') {
        guideData = {
          ...guideData,
          packingList: packingList.length > 0 ? packingList : undefined,
          seasonalItems: seasonalItems.length > 0 ? seasonalItems : undefined,
        };
      } else if (category === '팁') {
        guideData = {
          ...guideData,
          localTips: localTips.length > 0 ? localTips : undefined,
          culturalTips: culturalTips.length > 0 ? culturalTips : undefined,
          safeTips: safeTips.length > 0 ? safeTips : undefined,
          moneyTips: moneyTips.length > 0 ? moneyTips : undefined,
        };
      } else if (category === 'FAQ') {
        guideData = {
          ...guideData,
          faqs: faqs.length > 0 ? faqs : undefined,
        };
      }

      addGuide(guideData);
      
      // Reset all guide-related states
      setGuideContent([]);
      setGuideTips([]);
      setRequirements([]);
      setWhatYouWillLearn([]);
      setTransportBookingTips([]);
      setItineraryDays([]);
      setPackingList([]);
      setSeasonalItems([]);
      setLocalTips([]);
      setCulturalTips([]);
      setSafeTips([]);
      setMoneyTips([]);
      setFaqs([]);
    } else if (contentType === "여행 이야기") {
      addStory({
        title: formData.get('story-title') as string,
        author: formData.get('story-author') as string,
        city: formData.get('story-city') as string || undefined,
        category: formData.get('story-category') as string,
        image: formData.get('story-image') as string,
        excerpt: formData.get('story-excerpt') as string,
        content: formData.get('story-content') as string,
        description: formData.get('story-description') as string || undefined,
        publishDate: formData.get('story-publish-date') as string || undefined,
        readTime: formData.get('story-read-time') as string || undefined,
        travelDate: formData.get('story-travel-date') as string || undefined,
        budget: formData.get('story-budget') as string || undefined,
        companions: formData.get('story-companions') as string || undefined,
        highlights: storyHighlights.length > 0 ? storyHighlights : undefined,
        challenges: storyChallenges.length > 0 ? storyChallenges : undefined,
        recommendations: storyRecommendations.length > 0 ? storyRecommendations : undefined,
        tags: selectedTags
      });
      
      setStoryHighlights([]);
      setStoryChallenges([]);
      setStoryRecommendations([]);
    } else if (contentType === "혜택") {
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
        provider: formData.get('benefit-provider') as string || undefined,
        contactInfo: formData.get('benefit-contact-info') as string || undefined,
        website: formData.get('benefit-website') as string || undefined,
        features: benefitFeatures.length > 0 ? benefitFeatures : [],
        conditions: benefitConditions.length > 0 ? benefitConditions : [],
        howToUse: howToUse.length > 0 ? howToUse : undefined,
        restrictions: restrictions.length > 0 ? restrictions : undefined,
        tags: selectedTags
      });
      
      setBenefitFeatures([]);
      setBenefitConditions([]);
      setHowToUse([]);
      setRestrictions([]);
    }
    
    setSelectedTags([]);
    setTravelTips([]);
    setAttractions([]);
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

  const addTravelTip = () => {
    if (newTip.trim() && !travelTips.includes(newTip.trim())) {
      setTravelTips(prev => [...prev, newTip.trim()]);
      setNewTip("");
    }
  };

  const removeTravelTip = (tipToRemove: string) => {
    setTravelTips(prev => prev.filter(tip => tip !== tipToRemove));
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

          {/* Enhanced Destinations Form */}
          <TabsContent value="destinations">
            <Card>
              <CardHeader>
                <CardTitle>새 여행지 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "여행지")} className="space-y-6">
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
                    <Textarea id="dest-description" name="dest-description" placeholder="여행지에 대한 상세 설명..." rows={4} required />
                  </div>

                  <div>
                    <Label htmlFor="dest-quick-info">한줄 소개</Label>
                    <Input id="dest-quick-info" name="dest-quick-info" placeholder="여행지의 매력을 한 줄로 표현해주세요" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dest-price">가격</Label>
                      <div className="relative">
                        <Input 
                          id="dest-price" 
                          name="dest-price" 
                          type="number" 
                          placeholder="500000"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">원</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dest-duration">소요 시간</Label>
                      <Input id="dest-duration" name="dest-duration" placeholder="3박 4일" />
                    </div>
                  </div>

                  {/* 새로운 필드들 추가 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dest-budget-level">예산 수준</Label>
                      <Select name="dest-budget-level">
                        <SelectTrigger>
                          <SelectValue placeholder="예산 수준 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="저렴">저렴</SelectItem>
                          <SelectItem value="중간">중간</SelectItem>
                          <SelectItem value="높음">높음</SelectItem>
                          <SelectItem value="럭셔리">럭셔리</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dest-best-time">최적 시기</Label>
                      <Input id="dest-best-time" name="dest-best-time" placeholder="4-6월, 9-11월" />
                    </div>
                    <div>
                      <Label htmlFor="dest-transportation">교통 정보</Label>
                      <Input id="dest-transportation" name="dest-transportation" placeholder="항공 1.5시간" />
                    </div>
                  </div>

                  {/* Booking URLs Section */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">예약 링크</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="dest-flight-url">항공권 검색 URL</Label>
                        <Input id="dest-flight-url" name="dest-flight-url" type="url" placeholder="https://www.kayak.com/flights" />
                      </div>
                      <div>
                        <Label htmlFor="dest-accommodation-url">숙박 검색 URL</Label>
                        <Input id="dest-accommodation-url" name="dest-accommodation-url" type="url" placeholder="https://www.booking.com" />
                      </div>
                      <div>
                        <Label htmlFor="dest-tour-url">투어티켓 검색 URL</Label>
                        <Input id="dest-tour-url" name="dest-tour-url" type="url" placeholder="https://www.viator.com" />
                      </div>
                    </div>
                  </div>

                  {/* Daily Budget Section */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">일일 예산</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dest-accommodation">숙박비</Label>
                        <div className="relative">
                          <Input 
                            id="dest-accommodation" 
                            name="dest-accommodation" 
                            type="number" 
                            placeholder="50000"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">원</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="dest-food">식비</Label>
                        <div className="relative">
                          <Input 
                            id="dest-food" 
                            name="dest-food" 
                            type="number" 
                            placeholder="30000"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">원</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="dest-transport">교통비</Label>
                        <div className="relative">
                          <Input 
                            id="dest-transport" 
                            name="dest-transport" 
                            type="number" 
                            placeholder="20000"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">원</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attractions Section */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">주요 명소</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="attraction-name">명소 이름</Label>
                        <Input
                          id="attraction-name"
                          value={newAttraction.name}
                          onChange={(e) => setNewAttraction(prev => ({...prev, name: e.target.value}))}
                          placeholder="명소 이름"
                        />
                      </div>
                      <div>
                        <Label htmlFor="attraction-time">소요시간</Label>
                        <Input
                          id="attraction-time"
                          value={newAttraction.time}
                          onChange={(e) => setNewAttraction(prev => ({...prev, time: e.target.value}))}
                          placeholder="2시간"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="attraction-description">명소 설명</Label>
                      <Textarea
                        id="attraction-description"
                        value={newAttraction.description}
                        onChange={(e) => setNewAttraction(prev => ({...prev, description: e.target.value}))}
                        placeholder="명소에 대한 설명"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="attraction-rating">평점</Label>
                      <Input
                        id="attraction-rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={newAttraction.rating}
                        onChange={(e) => setNewAttraction(prev => ({...prev, rating: Number(e.target.value)}))}
                        className="w-24"
                      />
                      <Button type="button" onClick={addAttraction} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {attractions.map((attraction, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {attraction.name} ({attraction.time}) ⭐{attraction.rating}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeAttraction(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Travel Tips Section */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">여행 팁</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTip}
                        onChange={(e) => setNewTip(e.target.value)}
                        placeholder="새로운 여행 팁을 입력하세요"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTravelTip())}
                      />
                      <Button type="button" onClick={addTravelTip} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {travelTips.map((tip, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tip}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeTravelTip(tip)}
                          />
                        </Badge>
                      ))}
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

          {/* Enhanced Guides Form */}
          <TabsContent value="guides">
            <Card>
              <CardHeader>
                <CardTitle>새 가이드 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "가이드")} className="space-y-6">
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
                      <Select name="guide-category" value={selectedGuideCategory} onValueChange={setSelectedGuideCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="교통">교통</SelectItem>
                          <SelectItem value="일정">일정</SelectItem>
                          <SelectItem value="준비물">준비물</SelectItem>
                          <SelectItem value="팁">팁</SelectItem>
                          <SelectItem value="FAQ">FAQ</SelectItem>
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
                    <Label htmlFor="guide-description">가이드 설명</Label>
                    <Textarea id="guide-description" name="guide-description" placeholder="가이드에 대한 간단한 설명..." rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="guide-read-time">예상 읽기 시간</Label>
                      <Input id="guide-read-time" name="guide-read-time" placeholder="5분" />
                    </div>
                    <div>
                      <Label htmlFor="guide-target-audience">대상 독자</Label>
                      <Input id="guide-target-audience" name="guide-target-audience" placeholder="초보 여행자" />
                    </div>
                    <div>
                      <Label htmlFor="guide-publish-date">발행일</Label>
                      <Input id="guide-publish-date" name="guide-publish-date" type="date" />
                    </div>
                  </div>

                  {/* Guide Content Sections */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">가이드 내용 섹션</Label>
                    <div className="space-y-2">
                      <Input
                        value={newGuideSection.title}
                        onChange={(e) => setNewGuideSection(prev => ({...prev, title: e.target.value}))}
                        placeholder="섹션 제목"
                      />
                      <Textarea
                        value={newGuideSection.content}
                        onChange={(e) => setNewGuideSection(prev => ({...prev, content: e.target.value}))}
                        placeholder="섹션 내용"
                        rows={3}
                      />
                      <Button type="button" onClick={addGuideSection} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        섹션 추가
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {guideContent.map((section, index) => (
                        <div key={index} className="border p-3 rounded">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{section.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{section.content}</p>
                            </div>
                            <X 
                              className="w-4 h-4 cursor-pointer hover:text-red-500 ml-2" 
                              onClick={() => removeGuideSection(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guide Tips */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">핵심 팁</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newGuideTip}
                        onChange={(e) => setNewGuideTip(e.target.value)}
                        placeholder="새로운 팁"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGuideTip())}
                      />
                      <Button type="button" onClick={addGuideTip} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {guideTips.map((tip, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tip}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeGuideTip(tip)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">필요 조건</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="새로운 필요 조건"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      />
                      <Button type="button" onClick={addRequirement} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {req}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeRequirement(req)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* What You Will Learn */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">배울 내용</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newLearning}
                        onChange={(e) => setNewLearning(e.target.value)}
                        placeholder="배울 수 있는 내용"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearning())}
                      />
                      <Button type="button" onClick={addLearning} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {whatYouWillLearn.map((learning, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {learning}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeLearning(learning)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 카테고리별 특화 필드들 */}
                  {selectedGuideCategory === '교통' && (
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="text-lg font-semibold text-primary">교통 가이드 전용 필드</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="transport-type">교통수단 유형</Label>
                          <Select name="transport-type">
                            <SelectTrigger>
                              <SelectValue placeholder="교통수단 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="항공">항공</SelectItem>
                              <SelectItem value="기차">기차</SelectItem>
                              <SelectItem value="버스">버스</SelectItem>
                              <SelectItem value="렌터카">렌터카</SelectItem>
                              <SelectItem value="지하철">지하철</SelectItem>
                              <SelectItem value="택시">택시</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price-range">가격대</Label>
                          <Input id="price-range" name="price-range" placeholder="예: 10만원-50만원" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reservation-period">예약 권장 기간</Label>
                        <Input id="reservation-period" name="reservation-period" placeholder="예: 출발 2-3개월 전" />
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">예약 꿀팁</Label>
                        <div className="flex gap-2">
                          <Input
                            value={newTransportTip}
                            onChange={(e) => setNewTransportTip(e.target.value)}
                            placeholder="교통수단별 예약 팁"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTransportTip())}
                          />
                          <Button type="button" onClick={addTransportTip} size="sm">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {transportBookingTips.map((tip, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tip}
                              <X 
                                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                onClick={() => removeTransportTip(tip)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGuideCategory === '일정' && (
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="text-lg font-semibold text-primary">일정 가이드 전용 필드</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="total-duration">총 여행 기간</Label>
                          <Input id="total-duration" name="total-duration" placeholder="예: 3박 4일" />
                        </div>
                        <div>
                          <Label htmlFor="budget-estimate">예산 예상</Label>
                          <Input id="budget-estimate" name="budget-estimate" placeholder="예: 100만원 (1인 기준)" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">일정별 계획</Label>
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-1">
                            <Label>Day</Label>
                            <Input
                              type="number"
                              value={newItineraryDay.day}
                              onChange={(e) => setNewItineraryDay(prev => ({...prev, day: Number(e.target.value)}))}
                              min="1"
                            />
                          </div>
                          <div className="col-span-3">
                            <Label>제목</Label>
                            <Input
                              value={newItineraryDay.title}
                              onChange={(e) => setNewItineraryDay(prev => ({...prev, title: e.target.value}))}
                              placeholder="당일 테마"
                            />
                          </div>
                          <div className="col-span-4">
                            <Label>주요 활동</Label>
                            <Input
                              value={newItineraryDay.activities[0] || ""}
                              onChange={(e) => setNewItineraryDay(prev => ({...prev, activities: [e.target.value]}))}
                              placeholder="주요 활동 (쉼표로 구분)"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>예산</Label>
                            <Input
                              value={newItineraryDay.budget}
                              onChange={(e) => setNewItineraryDay(prev => ({...prev, budget: e.target.value}))}
                              placeholder="10만원"
                            />
                          </div>
                          <div className="col-span-2">
                            <Button type="button" onClick={addItineraryDay} size="sm" className="w-full">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {itineraryDays.map((day, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <span className="font-semibold">Day {day.day}: {day.title}</span>
                                <p className="text-sm text-muted-foreground">{day.activities.join(', ')}</p>
                                {day.budget && <span className="text-xs text-primary">예산: {day.budget}</span>}
                              </div>
                              <Button 
                                type="button" 
                                onClick={() => removeItineraryDay(index)} 
                                size="sm" 
                                variant="ghost"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGuideCategory === '준비물' && (
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="text-lg font-semibold text-primary">준비물 가이드 전용 필드</h3>
                      
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">카테고리별 준비물</Label>
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-3">
                            <Label>카테고리</Label>
                            <Input
                              value={newPackingCategory.category}
                              onChange={(e) => setNewPackingCategory(prev => ({...prev, category: e.target.value}))}
                              placeholder="의류, 전자제품 등"
                            />
                          </div>
                          <div className="col-span-6">
                            <Label>아이템들</Label>
                            <Input
                              value={newPackingCategory.items[0] || ""}
                              onChange={(e) => setNewPackingCategory(prev => ({...prev, items: [e.target.value]}))}
                              placeholder="아이템들을 쉼표로 구분"
                            />
                          </div>
                          <div className="col-span-1">
                            <Label>선택</Label>
                            <div className="flex items-center h-10">
                              <input
                                type="checkbox"
                                checked={newPackingCategory.optional}
                                onChange={(e) => setNewPackingCategory(prev => ({...prev, optional: e.target.checked}))}
                                className="mr-2"
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <Button type="button" onClick={addPackingCategory} size="sm" className="w-full">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {packingList.map((category, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <span className="font-semibold">{category.category} {category.optional && '(선택)'}</span>
                                <p className="text-sm text-muted-foreground">{category.items.join(', ')}</p>
                              </div>
                              <Button 
                                type="button" 
                                onClick={() => removePackingCategory(index)} 
                                size="sm" 
                                variant="ghost"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">계절별 추가 아이템</Label>
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-2">
                            <Label>계절</Label>
                            <Select value={newSeasonalItem.season} onValueChange={(value) => setNewSeasonalItem(prev => ({...prev, season: value}))}>
                              <SelectTrigger>
                                <SelectValue placeholder="계절" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="봄">봄</SelectItem>
                                <SelectItem value="여름">여름</SelectItem>
                                <SelectItem value="가을">가을</SelectItem>
                                <SelectItem value="겨울">겨울</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-8">
                            <Label>아이템들</Label>
                            <Input
                              value={newSeasonalItem.items[0] || ""}
                              onChange={(e) => setNewSeasonalItem(prev => ({...prev, items: [e.target.value]}))}
                              placeholder="계절별 필요 아이템들"
                            />
                          </div>
                          <div className="col-span-2">
                            <Button type="button" onClick={addSeasonalItem} size="sm" className="w-full">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {seasonalItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <span className="font-semibold">{item.season}</span>
                                <p className="text-sm text-muted-foreground">{item.items.join(', ')}</p>
                              </div>
                              <Button 
                                type="button" 
                                onClick={() => removeSeasonalItem(index)} 
                                size="sm" 
                                variant="ghost"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGuideCategory === '팁' && (
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="text-lg font-semibold text-primary">팁 가이드 전용 필드</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">현지 생활 팁</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newLocalTip}
                              onChange={(e) => setNewLocalTip(e.target.value)}
                              placeholder="현지에서 유용한 팁"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocalTip())}
                            />
                            <Button type="button" onClick={addLocalTip} size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {localTips.map((tip, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {tip}
                                <X 
                                  className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                  onClick={() => removeLocalTip(tip)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">문화 에티켓</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newCulturalTip}
                              onChange={(e) => setNewCulturalTip(e.target.value)}
                              placeholder="문화적 주의사항"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCulturalTip())}
                            />
                            <Button type="button" onClick={addCulturalTip} size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {culturalTips.map((tip, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {tip}
                                <X 
                                  className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                  onClick={() => removeCulturalTip(tip)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">안전 팁</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newSafeTip}
                              onChange={(e) => setNewSafeTip(e.target.value)}
                              placeholder="안전 관련 팁"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSafeTip())}
                            />
                            <Button type="button" onClick={addSafeTip} size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {safeTips.map((tip, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {tip}
                                <X 
                                  className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                  onClick={() => removeSafeTip(tip)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">돈 관리 팁</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newMoneyTip}
                              onChange={(e) => setNewMoneyTip(e.target.value)}
                              placeholder="환전, 결제 관련 팁"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMoneyTip())}
                            />
                            <Button type="button" onClick={addMoneyTip} size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {moneyTips.map((tip, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {tip}
                                <X 
                                  className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                  onClick={() => removeMoneyTip(tip)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGuideCategory === 'FAQ' && (
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="text-lg font-semibold text-primary">FAQ 가이드 전용 필드</h3>
                      
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">자주 묻는 질문</Label>
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-5">
                            <Label>질문</Label>
                            <Input
                              value={newFaq.question}
                              onChange={(e) => setNewFaq(prev => ({...prev, question: e.target.value}))}
                              placeholder="자주 묻는 질문"
                            />
                          </div>
                          <div className="col-span-5">
                            <Label>답변</Label>
                            <Input
                              value={newFaq.answer}
                              onChange={(e) => setNewFaq(prev => ({...prev, answer: e.target.value}))}
                              placeholder="질문에 대한 답변"
                            />
                          </div>
                          <div className="col-span-2">
                            <Button type="button" onClick={addFaq} size="sm" className="w-full">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {faqs.map((faq, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex-1">
                                <p className="font-semibold">Q: {faq.question}</p>
                                <p className="text-sm text-muted-foreground">A: {faq.answer}</p>
                              </div>
                              <Button 
                                type="button" 
                                onClick={() => removeFaq(index)} 
                                size="sm" 
                                variant="ghost"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

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

          {/* Enhanced Stories Form */}
          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle>새 여행 이야기 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "여행 이야기")} className="space-y-6">
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
                    <Label htmlFor="story-description">이야기 설명</Label>
                    <Textarea id="story-description" name="story-description" placeholder="이야기에 대한 간단한 설명..." rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="story-excerpt">요약</Label>
                    <Textarea id="story-excerpt" name="story-excerpt" placeholder="여행 이야기의 간단한 요약..." rows={3} required />
                  </div>
                  <div>
                    <Label htmlFor="story-content">본문</Label>
                    <Textarea id="story-content" name="story-content" placeholder="여행 이야기의 상세한 내용을 작성해주세요..." rows={10} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="story-publish-date">발행일</Label>
                      <Input id="story-publish-date" name="story-publish-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="story-read-time">예상 읽기 시간</Label>
                      <Input id="story-read-time" name="story-read-time" placeholder="8분" />
                    </div>
                    <div>
                      <Label htmlFor="story-travel-date">여행 날짜</Label>
                      <Input id="story-travel-date" name="story-travel-date" placeholder="2024년 3월" />
                    </div>
                    <div>
                      <Label htmlFor="story-budget">예산</Label>
                      <Input id="story-budget" name="story-budget" placeholder="100만원" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="story-companions">동행자</Label>
                    <Input id="story-companions" name="story-companions" placeholder="혼자 / 친구 2명 / 가족" />
                  </div>

                  {/* Story Highlights */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">여행 하이라이트</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        placeholder="특별했던 순간"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                      />
                      <Button type="button" onClick={addHighlight} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {storyHighlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {highlight}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeHighlight(highlight)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Story Challenges */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">여행 중 어려웠던 점</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newChallenge}
                        onChange={(e) => setNewChallenge(e.target.value)}
                        placeholder="어려웠던 점"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChallenge())}
                      />
                      <Button type="button" onClick={addChallenge} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {storyChallenges.map((challenge, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {challenge}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeChallenge(challenge)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Story Recommendations */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">추천 사항</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newRecommendation}
                        onChange={(e) => setNewRecommendation(e.target.value)}
                        placeholder="다른 여행자들에게 추천하고 싶은 것"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecommendation())}
                      />
                      <Button type="button" onClick={addRecommendation} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {storyRecommendations.map((rec, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {rec}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeRecommendation(rec)}
                          />
                        </Badge>
                      ))}
                    </div>
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

          {/* Enhanced Benefits Form */}
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>새 혜택 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "혜택")} className="space-y-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="benefit-valid-until">유효기간</Label>
                      <Input id="benefit-valid-until" name="benefit-valid-until" placeholder="2024.03.31" />
                    </div>
                    <div>
                      <Label htmlFor="benefit-provider">제공업체</Label>
                      <Input id="benefit-provider" name="benefit-provider" placeholder="제주항공" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="benefit-image">이미지 URL</Label>
                    <Input id="benefit-image" name="benefit-image" type="url" placeholder="https://example.com/image.jpg" required />
                  </div>
                  <div>
                    <Label htmlFor="benefit-description">설명</Label>
                    <Textarea id="benefit-description" name="benefit-description" placeholder="혜택에 대한 상세 설명..." required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="benefit-contact-info">연락처</Label>
                      <Input id="benefit-contact-info" name="benefit-contact-info" placeholder="1588-1234" />
                    </div>
                    <div>
                      <Label htmlFor="benefit-website">웹사이트</Label>
                      <Input id="benefit-website" name="benefit-website" type="url" placeholder="https://example.com" />
                    </div>
                  </div>

                  {/* Benefit Features */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">주요 혜택</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="새로운 혜택"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      />
                      <Button type="button" onClick={addFeature} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {benefitFeatures.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {feature}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeFeature(feature)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefit Conditions */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">이용 조건</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="새로운 조건"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
                      />
                      <Button type="button" onClick={addCondition} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {benefitConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {condition}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeCondition(condition)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* How to Use */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">이용 방법</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newHowToUse}
                        onChange={(e) => setNewHowToUse(e.target.value)}
                        placeholder="이용 방법 단계"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHowToUseStep())}
                      />
                      <Button type="button" onClick={addHowToUseStep} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {howToUse.map((step, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {step}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeHowToUseStep(step)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Restrictions */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">제한 사항</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newRestriction}
                        onChange={(e) => setNewRestriction(e.target.value)}
                        placeholder="제한 사항"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRestriction())}
                      />
                      <Button type="button" onClick={addRestriction} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {restrictions.map((restriction, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {restriction}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeRestriction(restriction)}
                          />
                        </Badge>
                      ))}
                    </div>
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
