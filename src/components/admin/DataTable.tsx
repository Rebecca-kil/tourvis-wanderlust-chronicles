import { useState } from "react";
import { Edit, Eye, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Destination, Guide, Story, Benefit } from "@/contexts/BlogContext";

interface DataTableProps {
  data: (Destination | Guide | Story | Benefit)[];
  type: 'destinations' | 'guides' | 'stories' | 'benefits';
  onUpdate: (id: string, updatedData: any) => void;
  onDelete: (id: string) => void;
}

export const DataTable = ({ data, type, onUpdate, onDelete }: DataTableProps) => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [newTip, setNewTip] = useState("");
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    time: "",
    rating: 4.5
  });

  // New states for managing complex fields
  const [newGuideSection, setNewGuideSection] = useState({ title: "", content: "" });
  const [newGuideTip, setNewGuideTip] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newLearning, setNewLearning] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newChallenge, setNewChallenge] = useState("");
  const [newRecommendation, setNewRecommendation] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newHowToUse, setNewHowToUse] = useState("");
  const [newRestriction, setNewRestriction] = useState("");

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditData({ ...item });
    setIsEditing(true);
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsEditing(false);
  };

  const handleSave = () => {
    onUpdate(selectedItem.id, editData);
    setSelectedItem(null);
    setIsEditing(false);
    toast({
      title: "저장 완료",
      description: "데이터가 성공적으로 업데이트되었습니다.",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      onDelete(id);
      toast({
        title: "삭제 완료",
        description: "데이터가 성공적으로 삭제되었습니다.",
      });
    }
  };

  const addTravelTip = () => {
    if (newTip.trim() && editData.travelTips) {
      const updatedTips = [...(editData.travelTips || []), newTip.trim()];
      setEditData({ ...editData, travelTips: updatedTips });
      setNewTip("");
    } else if (newTip.trim()) {
      setEditData({ ...editData, travelTips: [newTip.trim()] });
      setNewTip("");
    }
  };

  const removeTravelTip = (tipToRemove: string) => {
    const updatedTips = editData.travelTips?.filter((tip: string) => tip !== tipToRemove) || [];
    setEditData({ ...editData, travelTips: updatedTips });
  };

  const addAttractionToEdit = () => {
    if (newAttraction.name.trim() && newAttraction.description.trim()) {
      const updatedAttractions = [...(editData.attractions || []), {
        name: newAttraction.name.trim(),
        description: newAttraction.description.trim(),
        time: newAttraction.time.trim() || undefined,
        rating: newAttraction.rating
      }];
      setEditData({ ...editData, attractions: updatedAttractions });
      setNewAttraction({
        name: "",
        description: "",
        time: "",
        rating: 4.5
      });
    }
  };

  const removeAttractionFromEdit = (index: number) => {
    const updatedAttractions = editData.attractions?.filter((_: any, i: number) => i !== index) || [];
    setEditData({ ...editData, attractions: updatedAttractions });
  };

  // Guide-specific functions
  const addGuideSectionToEdit = () => {
    if (newGuideSection.title.trim() && newGuideSection.content.trim()) {
      const updatedContent = [...(editData.content || []), newGuideSection];
      setEditData({ ...editData, content: updatedContent });
      setNewGuideSection({ title: "", content: "" });
    }
  };

  const removeGuideSectionFromEdit = (index: number) => {
    const updatedContent = editData.content?.filter((_: any, i: number) => i !== index) || [];
    setEditData({ ...editData, content: updatedContent });
  };

  const addGuideTipToEdit = () => {
    if (newGuideTip.trim()) {
      const updatedTips = [...(editData.tips || []), newGuideTip.trim()];
      setEditData({ ...editData, tips: updatedTips });
      setNewGuideTip("");
    }
  };

  const removeGuideTipFromEdit = (tipToRemove: string) => {
    const updatedTips = editData.tips?.filter((tip: string) => tip !== tipToRemove) || [];
    setEditData({ ...editData, tips: updatedTips });
  };

  const addRequirementToEdit = () => {
    if (newRequirement.trim()) {
      const updatedRequirements = [...(editData.requirements || []), newRequirement.trim()];
      setEditData({ ...editData, requirements: updatedRequirements });
      setNewRequirement("");
    }
  };

  const removeRequirementFromEdit = (reqToRemove: string) => {
    const updatedRequirements = editData.requirements?.filter((req: string) => req !== reqToRemove) || [];
    setEditData({ ...editData, requirements: updatedRequirements });
  };

  const addLearningToEdit = () => {
    if (newLearning.trim()) {
      const updatedLearning = [...(editData.whatYouWillLearn || []), newLearning.trim()];
      setEditData({ ...editData, whatYouWillLearn: updatedLearning });
      setNewLearning("");
    }
  };

  const removeLearningFromEdit = (learningToRemove: string) => {
    const updatedLearning = editData.whatYouWillLearn?.filter((learning: string) => learning !== learningToRemove) || [];
    setEditData({ ...editData, whatYouWillLearn: updatedLearning });
  };

  // Story-specific functions
  const addHighlightToEdit = () => {
    if (newHighlight.trim()) {
      const updatedHighlights = [...(editData.highlights || []), newHighlight.trim()];
      setEditData({ ...editData, highlights: updatedHighlights });
      setNewHighlight("");
    }
  };

  const removeHighlightFromEdit = (highlightToRemove: string) => {
    const updatedHighlights = editData.highlights?.filter((highlight: string) => highlight !== highlightToRemove) || [];
    setEditData({ ...editData, highlights: updatedHighlights });
  };

  const addChallengeToEdit = () => {
    if (newChallenge.trim()) {
      const updatedChallenges = [...(editData.challenges || []), newChallenge.trim()];
      setEditData({ ...editData, challenges: updatedChallenges });
      setNewChallenge("");
    }
  };

  const removeChallengeFromEdit = (challengeToRemove: string) => {
    const updatedChallenges = editData.challenges?.filter((challenge: string) => challenge !== challengeToRemove) || [];
    setEditData({ ...editData, challenges: updatedChallenges });
  };

  const addRecommendationToEdit = () => {
    if (newRecommendation.trim()) {
      const updatedRecommendations = [...(editData.recommendations || []), newRecommendation.trim()];
      setEditData({ ...editData, recommendations: updatedRecommendations });
      setNewRecommendation("");
    }
  };

  const removeRecommendationFromEdit = (recToRemove: string) => {
    const updatedRecommendations = editData.recommendations?.filter((rec: string) => rec !== recToRemove) || [];
    setEditData({ ...editData, recommendations: updatedRecommendations });
  };

  // Benefit-specific functions
  const addFeatureToEdit = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...(editData.features || []), newFeature.trim()];
      setEditData({ ...editData, features: updatedFeatures });
      setNewFeature("");
    }
  };

  const removeFeatureFromEdit = (featureToRemove: string) => {
    const updatedFeatures = editData.features?.filter((feature: string) => feature !== featureToRemove) || [];
    setEditData({ ...editData, features: updatedFeatures });
  };

  const addConditionToEdit = () => {
    if (newCondition.trim()) {
      const updatedConditions = [...(editData.conditions || []), newCondition.trim()];
      setEditData({ ...editData, conditions: updatedConditions });
      setNewCondition("");
    }
  };

  const removeConditionFromEdit = (conditionToRemove: string) => {
    const updatedConditions = editData.conditions?.filter((condition: string) => condition !== conditionToRemove) || [];
    setEditData({ ...editData, conditions: updatedConditions });
  };

  const addHowToUseToEdit = () => {
    if (newHowToUse.trim()) {
      const updatedHowToUse = [...(editData.howToUse || []), newHowToUse.trim()];
      setEditData({ ...editData, howToUse: updatedHowToUse });
      setNewHowToUse("");
    }
  };

  const removeHowToUseFromEdit = (stepToRemove: string) => {
    const updatedHowToUse = editData.howToUse?.filter((step: string) => step !== stepToRemove) || [];
    setEditData({ ...editData, howToUse: updatedHowToUse });
  };

  const addRestrictionToEdit = () => {
    if (newRestriction.trim()) {
      const updatedRestrictions = [...(editData.restrictions || []), newRestriction.trim()];
      setEditData({ ...editData, restrictions: updatedRestrictions });
      setNewRestriction("");
    }
  };

  const removeRestrictionFromEdit = (restrictionToRemove: string) => {
    const updatedRestrictions = editData.restrictions?.filter((restriction: string) => restriction !== restrictionToRemove) || [];
    setEditData({ ...editData, restrictions: updatedRestrictions });
  };

  const getColumns = () => {
    switch (type) {
      case 'destinations':
        return ['제목', '도시', '가격', '태그', '작업'];
      case 'guides':
        return ['제목', '작성자', '카테고리', '난이도', '좋아요', '작업'];
      case 'stories':
        return ['제목', '작성자', '카테고리', '좋아요', '댓글', '작업'];
      case 'benefits':
        return ['제목', '카테고리', '타입', '할인율', '좋아요', '작업'];
      default:
        return [];
    }
  };

  const renderCellContent = (item: any, column: string) => {
    switch (column) {
      case '제목':
        return item.title;
      case '도시':
        return (item as Destination).city;
      case '가격':
        return (item as Destination).price ? `${(item as Destination).price?.toLocaleString()}원` : '-';
      case '작성자':
        return (item as Guide | Story).author;
      case '카테고리':
        return item.category;
      case '난이도':
        return (item as Guide).difficulty;
      case '타입':
        return (item as Benefit).type;
      case '할인율':
        return (item as Benefit).discount || '-';
      case '좋아요':
        return (item as Guide | Story | Benefit).likes || 0;
      case '댓글':
        return (item as Story).comments || 0;
      case '태그':
        return (
          <div className="flex flex-wrap gap-1">
            {item.tags?.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags?.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>
        );
      default:
        return '';
    }
  };

  const renderEditForm = () => {
    if (!selectedItem || !isEditing) return null;

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <Label htmlFor="edit-title">제목</Label>
          <Input
            id="edit-title"
            value={editData.title || ''}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
        </div>

        {/* Common fields */}
        <div>
          <Label htmlFor="edit-description">설명</Label>
          <Textarea
            id="edit-description"
            value={editData.description || ''}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="edit-image">이미지 URL</Label>
          <Input
            id="edit-image"
            value={editData.image || ''}
            onChange={(e) => setEditData({ ...editData, image: e.target.value })}
          />
        </div>

        {/* Destination-specific fields */}
        {type === 'destinations' && (
          <>
            <div>
              <Label htmlFor="edit-city">도시</Label>
              <Input
                id="edit-city"
                value={editData.city || ''}
                onChange={(e) => setEditData({ ...editData, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-price">가격</Label>
              <Input
                id="edit-price"
                type="number"
                value={editData.price || ''}
                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="edit-duration">소요 시간</Label>
              <Input
                id="edit-duration"
                value={editData.duration || ''}
                onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-quick-info">한줄 소개</Label>
              <Input
                id="edit-quick-info"
                value={editData.quickInfo || ''}
                onChange={(e) => setEditData({ ...editData, quickInfo: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <Label htmlFor="edit-budget-level">예산 수준</Label>
                <Input
                  id="edit-budget-level"
                  value={editData.budgetLevel || ''}
                  onChange={(e) => setEditData({ ...editData, budgetLevel: e.target.value })}
                  placeholder="중간"
                />
              </div>
              <div>
                <Label htmlFor="edit-best-time">최적 시기</Label>
                <Input
                  id="edit-best-time"
                  value={editData.bestTime || ''}
                  onChange={(e) => setEditData({ ...editData, bestTime: e.target.value })}
                  placeholder="4-6월, 9-11월"
                />
              </div>
              <div>
                <Label htmlFor="edit-transportation">교통 정보</Label>
                <Input
                  id="edit-transportation"
                  value={editData.transportation || ''}
                  onChange={(e) => setEditData({ ...editData, transportation: e.target.value })}
                  placeholder="항공 1.5시간"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="font-semibold">일일 예산</Label>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <Label htmlFor="edit-accommodation">숙박비</Label>
                  <Input
                    id="edit-accommodation"
                    value={editData.dailyBudget?.accommodation || ''}
                    onChange={(e) => setEditData({ 
                      ...editData, 
                      dailyBudget: { 
                        ...editData.dailyBudget, 
                        accommodation: e.target.value 
                      } 
                    })}
                    placeholder="50,000원"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-food">식비</Label>
                  <Input
                    id="edit-food"
                    value={editData.dailyBudget?.food || ''}
                    onChange={(e) => setEditData({ 
                      ...editData, 
                      dailyBudget: { 
                        ...editData.dailyBudget, 
                        food: e.target.value 
                      } 
                    })}
                    placeholder="30,000원"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-transport">교통비</Label>
                  <Input
                    id="edit-transport"
                    value={editData.dailyBudget?.transport || ''}
                    onChange={(e) => setEditData({ 
                      ...editData, 
                      dailyBudget: { 
                        ...editData.dailyBudget, 
                        transport: e.target.value 
                      } 
                    })}
                    placeholder="20,000원"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">주요 명소</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={newAttraction.name}
                  onChange={(e) => setNewAttraction(prev => ({...prev, name: e.target.value}))}
                  placeholder="명소 이름"
                />
                <Input
                  value={newAttraction.time}
                  onChange={(e) => setNewAttraction(prev => ({...prev, time: e.target.value}))}
                  placeholder="소요시간"
                />
              </div>
              <Textarea
                value={newAttraction.description}
                onChange={(e) => setNewAttraction(prev => ({...prev, description: e.target.value}))}
                placeholder="명소 설명"
                rows={2}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={newAttraction.rating}
                  onChange={(e) => setNewAttraction(prev => ({...prev, rating: Number(e.target.value)}))}
                  className="w-24"
                  placeholder="평점"
                />
                <Button type="button" onClick={addAttractionToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.attractions?.map((attraction: any, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {attraction.name}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeAttractionFromEdit(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">여행 팁</Label>
              <div className="flex gap-2">
                <Input
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  placeholder="새로운 여행 팁"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTravelTip())}
                />
                <Button type="button" onClick={addTravelTip} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.travelTips?.map((tip: string, index: number) => (
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
          </>
        )}

        {/* Guide-specific fields */}
        {type === 'guides' && (
          <>
            <div>
              <Label htmlFor="edit-author">작성자</Label>
              <Input
                id="edit-author"
                value={editData.author || ''}
                onChange={(e) => setEditData({ ...editData, author: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">카테고리</Label>
                <Input
                  id="edit-category"
                  value={editData.category || ''}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-difficulty">난이도</Label>
                <Select value={editData.difficulty || ''} onValueChange={(value) => setEditData({ ...editData, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-read-time">읽기 시간</Label>
                <Input
                  id="edit-read-time"
                  value={editData.readTime || ''}
                  onChange={(e) => setEditData({ ...editData, readTime: e.target.value })}
                  placeholder="5분"
                />
              </div>
              <div>
                <Label htmlFor="edit-target-audience">대상 독자</Label>
                <Input
                  id="edit-target-audience"
                  value={editData.targetAudience || ''}
                  onChange={(e) => setEditData({ ...editData, targetAudience: e.target.value })}
                  placeholder="초보 여행자"
                />
              </div>
              <div>
                <Label htmlFor="edit-publish-date">발행일</Label>
                <Input
                  id="edit-publish-date"
                  type="date"
                  value={editData.publishDate || ''}
                  onChange={(e) => setEditData({ ...editData, publishDate: e.target.value })}
                />
              </div>
            </div>

            {/* Guide Content Sections */}
            <div className="space-y-2">
              <Label className="font-semibold">가이드 내용 섹션</Label>
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
                  rows={2}
                />
                <Button type="button" onClick={addGuideSectionToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {editData.content?.map((section: any, index: number) => (
                  <div key={index} className="border p-2 rounded text-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-xs">{section.title}</h5>
                        <p className="text-xs text-muted-foreground">{section.content.substring(0, 50)}...</p>
                      </div>
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeGuideSectionFromEdit(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guide Tips */}
            <div className="space-y-2">
              <Label className="font-semibold">핵심 팁</Label>
              <div className="flex gap-2">
                <Input
                  value={newGuideTip}
                  onChange={(e) => setNewGuideTip(e.target.value)}
                  placeholder="새로운 팁"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGuideTipToEdit())}
                />
                <Button type="button" onClick={addGuideTipToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.tips?.map((tip: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tip}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeGuideTipFromEdit(tip)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label className="font-semibold">필요 조건</Label>
              <div className="flex gap-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="새로운 필요 조건"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirementToEdit())}
                />
                <Button type="button" onClick={addRequirementToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.requirements?.map((req: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeRequirementFromEdit(req)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* What You Will Learn */}
            <div className="space-y-2">
              <Label className="font-semibold">배울 내용</Label>
              <div className="flex gap-2">
                <Input
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  placeholder="배울 수 있는 내용"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearningToEdit())}
                />
                <Button type="button" onClick={addLearningToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.whatYouWillLearn?.map((learning: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {learning}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeLearningFromEdit(learning)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Story-specific fields */}
        {type === 'stories' && (
          <>
            <div>
              <Label htmlFor="edit-author">작성자</Label>
              <Input
                id="edit-author"
                value={editData.author || ''}
                onChange={(e) => setEditData({ ...editData, author: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-city">도시/국가</Label>
                <Input
                  id="edit-city"
                  value={editData.city || ''}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">카테고리</Label>
                <Input
                  id="edit-category"
                  value={editData.category || ''}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-excerpt">요약</Label>
              <Textarea
                id="edit-excerpt"
                value={editData.excerpt || ''}
                onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="edit-content">본문</Label>
              <Textarea
                id="edit-content"
                value={editData.content || ''}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="edit-publish-date">발행일</Label>
                <Input
                  id="edit-publish-date"
                  type="date"
                  value={editData.publishDate || ''}
                  onChange={(e) => setEditData({ ...editData, publishDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-read-time">읽기 시간</Label>
                <Input
                  id="edit-read-time"
                  value={editData.readTime || ''}
                  onChange={(e) => setEditData({ ...editData, readTime: e.target.value })}
                  placeholder="8분"
                />
              </div>
              <div>
                <Label htmlFor="edit-travel-date">여행 날짜</Label>
                <Input
                  id="edit-travel-date"
                  value={editData.travelDate || ''}
                  onChange={(e) => setEditData({ ...editData, travelDate: e.target.value })}
                  placeholder="2024년 3월"
                />
              </div>
              <div>
                <Label htmlFor="edit-budget">예산</Label>
                <Input
                  id="edit-budget"
                  value={editData.budget || ''}
                  onChange={(e) => setEditData({ ...editData, budget: e.target.value })}
                  placeholder="100만원"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-companions">동행자</Label>
              <Input
                id="edit-companions"
                value={editData.companions || ''}
                onChange={(e) => setEditData({ ...editData, companions: e.target.value })}
                placeholder="혼자 / 친구 2명 / 가족"
              />
            </div>

            {/* Story Highlights */}
            <div className="space-y-2">
              <Label className="font-semibold">여행 하이라이트</Label>
              <div className="flex gap-2">
                <Input
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="특별했던 순간"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlightToEdit())}
                />
                <Button type="button" onClick={addHighlightToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.highlights?.map((highlight: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {highlight}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeHighlightFromEdit(highlight)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Story Challenges */}
            <div className="space-y-2">
              <Label className="font-semibold">어려웠던 점</Label>
              <div className="flex gap-2">
                <Input
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="어려웠던 점"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChallengeToEdit())}
                />
                <Button type="button" onClick={addChallengeToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.challenges?.map((challenge: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {challenge}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeChallengeFromEdit(challenge)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Story Recommendations */}
            <div className="space-y-2">
              <Label className="font-semibold">추천 사항</Label>
              <div className="flex gap-2">
                <Input
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  placeholder="추천하고 싶은 것"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecommendationToEdit())}
                />
                <Button type="button" onClick={addRecommendationToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.recommendations?.map((rec: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {rec}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeRecommendationFromEdit(rec)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Benefit-specific fields */}
        {type === 'benefits' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-category">카테고리</Label>
                <Input
                  id="edit-category"
                  value={editData.category || ''}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">타입</Label>
                <Select value={editData.type || ''} onValueChange={(value) => setEditData({ ...editData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="할인">할인</SelectItem>
                    <SelectItem value="적립">적립</SelectItem>
                    <SelectItem value="무료">무료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-discount">할인율</Label>
                <Input
                  id="edit-discount"
                  value={editData.discount || ''}
                  onChange={(e) => setEditData({ ...editData, discount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-original-price">원가</Label>
                <Input
                  id="edit-original-price"
                  value={editData.originalPrice || ''}
                  onChange={(e) => setEditData({ ...editData, originalPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-sale-price">할인가</Label>
                <Input
                  id="edit-sale-price"
                  value={editData.salePrice || ''}
                  onChange={(e) => setEditData({ ...editData, salePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-valid-until">유효기간</Label>
                <Input
                  id="edit-valid-until"
                  value={editData.validUntil || ''}
                  onChange={(e) => setEditData({ ...editData, validUntil: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-provider">제공업체</Label>
                <Input
                  id="edit-provider"
                  value={editData.provider || ''}
                  onChange={(e) => setEditData({ ...editData, provider: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contact-info">연락처</Label>
                <Input
                  id="edit-contact-info"
                  value={editData.contactInfo || ''}
                  onChange={(e) => setEditData({ ...editData, contactInfo: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-website">웹사이트</Label>
                <Input
                  id="edit-website"
                  value={editData.website || ''}
                  onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                />
              </div>
            </div>

            {/* Benefit Features */}
            <div className="space-y-2">
              <Label className="font-semibold">주요 혜택</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="새로운 혜택"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeatureToEdit())}
                />
                <Button type="button" onClick={addFeatureToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.features?.map((feature: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeFeatureFromEdit(feature)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefit Conditions */}
            <div className="space-y-2">
              <Label className="font-semibold">이용 조건</Label>
              <div className="flex gap-2">
                <Input
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="새로운 조건"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConditionToEdit())}
                />
                <Button type="button" onClick={addConditionToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.conditions?.map((condition: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {condition}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeConditionFromEdit(condition)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div className="space-y-2">
              <Label className="font-semibold">이용 방법</Label>
              <div className="flex gap-2">
                <Input
                  value={newHowToUse}
                  onChange={(e) => setNewHowToUse(e.target.value)}
                  placeholder="이용 방법 단계"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHowToUseToEdit())}
                />
                <Button type="button" onClick={addHowToUseToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.howToUse?.map((step: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {step}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeHowToUseFromEdit(step)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Restrictions */}
            <div className="space-y-2">
              <Label className="font-semibold">제한 사항</Label>
              <div className="flex gap-2">
                <Input
                  value={newRestriction}
                  onChange={(e) => setNewRestriction(e.target.value)}
                  placeholder="제한 사항"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRestrictionToEdit())}
                />
                <Button type="button" onClick={addRestrictionToEdit} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.restrictions?.map((restriction: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {restriction}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeRestrictionFromEdit(restriction)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderViewContent = () => {
    if (!selectedItem || isEditing) return null;

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <Label className="font-semibold">제목</Label>
          <p className="mt-1">{selectedItem.title}</p>
        </div>

        {selectedItem.description && (
          <div>
            <Label className="font-semibold">설명</Label>
            <p className="mt-1">{selectedItem.description}</p>
          </div>
        )}

        {/* Destination-specific view */}
        {type === 'destinations' && (
          <>
            {selectedItem.city && (
              <div>
                <Label className="font-semibold">도시</Label>
                <p className="mt-1">{selectedItem.city}</p>
              </div>
            )}

            {selectedItem.budgetLevel && (
              <div>
                <Label className="font-semibold">예산 수준</Label>
                <p className="mt-1">{selectedItem.budgetLevel}</p>
              </div>
            )}

            {selectedItem.bestTime && (
              <div>
                <Label className="font-semibold">최적 시기</Label>
                <p className="mt-1">{selectedItem.bestTime}</p>
              </div>
            )}

            {selectedItem.transportation && (
              <div>
                <Label className="font-semibold">교통 정보</Label>
                <p className="mt-1">{selectedItem.transportation}</p>
              </div>
            )}

            {selectedItem.attractions && selectedItem.attractions.length > 0 && (
              <div>
                <Label className="font-semibold">주요 명소</Label>
                <div className="mt-1 space-y-2">
                  {selectedItem.attractions.map((attraction: any, index: number) => (
                    <div key={index} className="text-sm border-l-2 border-muted pl-2">
                      <p className="font-medium">{attraction.name}</p>
                      <p className="text-muted-foreground">{attraction.description}</p>
                      {attraction.time && <p className="text-xs">소요시간: {attraction.time}</p>}
                      {attraction.rating && <p className="text-xs">평점: ⭐{attraction.rating}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.quickInfo && (
              <div>
                <Label className="font-semibold">한줄 소개</Label>
                <p className="mt-1">{selectedItem.quickInfo}</p>
              </div>
            )}

            {selectedItem.dailyBudget && (
              <div>
                <Label className="font-semibold">일일 예산</Label>
                <div className="mt-1 space-y-1">
                  {selectedItem.dailyBudget.accommodation && (
                    <p className="text-sm">숙박비: {selectedItem.dailyBudget.accommodation}</p>
                  )}
                  {selectedItem.dailyBudget.food && (
                    <p className="text-sm">식비: {selectedItem.dailyBudget.food}</p>
                  )}
                  {selectedItem.dailyBudget.transport && (
                    <p className="text-sm">교통비: {selectedItem.dailyBudget.transport}</p>
                  )}
                </div>
              </div>
            )}

            {selectedItem.travelTips && selectedItem.travelTips.length > 0 && (
              <div>
                <Label className="font-semibold">여행 팁</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.travelTips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Guide-specific view */}
        {type === 'guides' && (
          <>
            {selectedItem.author && (
              <div>
                <Label className="font-semibold">작성자</Label>
                <p className="mt-1">{selectedItem.author}</p>
              </div>
            )}

            {selectedItem.category && (
              <div>
                <Label className="font-semibold">카테고리</Label>
                <p className="mt-1">{selectedItem.category}</p>
              </div>
            )}

            {selectedItem.difficulty && (
              <div>
                <Label className="font-semibold">난이도</Label>
                <p className="mt-1">{selectedItem.difficulty}</p>
              </div>
            )}

            {selectedItem.readTime && (
              <div>
                <Label className="font-semibold">읽기 시간</Label>
                <p className="mt-1">{selectedItem.readTime}</p>
              </div>
            )}

            {selectedItem.targetAudience && (
              <div>
                <Label className="font-semibold">대상 독자</Label>
                <p className="mt-1">{selectedItem.targetAudience}</p>
              </div>
            )}

            {selectedItem.content && selectedItem.content.length > 0 && (
              <div>
                <Label className="font-semibold">가이드 내용</Label>
                <div className="mt-1 space-y-2">
                  {selectedItem.content.map((section: any, index: number) => (
                    <div key={index} className="text-sm border-l-2 border-muted pl-2">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-muted-foreground">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.tips && selectedItem.tips.length > 0 && (
              <div>
                <Label className="font-semibold">핵심 팁</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.tips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.requirements && selectedItem.requirements.length > 0 && (
              <div>
                <Label className="font-semibold">필요 조건</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.requirements.map((req: string, index: number) => (
                    <li key={index} className="text-sm">• {req}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.whatYouWillLearn && selectedItem.whatYouWillLearn.length > 0 && (
              <div>
                <Label className="font-semibold">배울 내용</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.whatYouWillLearn.map((learning: string, index: number) => (
                    <li key={index} className="text-sm">• {learning}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Story-specific view */}
        {type === 'stories' && (
          <>
            {selectedItem.author && (
              <div>
                <Label className="font-semibold">작성자</Label>
                <p className="mt-1">{selectedItem.author}</p>
              </div>
            )}

            {selectedItem.city && (
              <div>
                <Label className="font-semibold">도시/국가</Label>
                <p className="mt-1">{selectedItem.city}</p>
              </div>
            )}

            {selectedItem.category && (
              <div>
                <Label className="font-semibold">카테고리</Label>
                <p className="mt-1">{selectedItem.category}</p>
              </div>
            )}

            {selectedItem.excerpt && (
              <div>
                <Label className="font-semibold">요약</Label>
                <p className="mt-1">{selectedItem.excerpt}</p>
              </div>
            )}

            {selectedItem.readTime && (
              <div>
                <Label className="font-semibold">읽기 시간</Label>
                <p className="mt-1">{selectedItem.readTime}</p>
              </div>
            )}

            {selectedItem.travelDate && (
              <div>
                <Label className="font-semibold">여행 날짜</Label>
                <p className="mt-1">{selectedItem.travelDate}</p>
              </div>
            )}

            {selectedItem.budget && (
              <div>
                <Label className="font-semibold">예산</Label>
                <p className="mt-1">{selectedItem.budget}</p>
              </div>
            )}

            {selectedItem.companions && (
              <div>
                <Label className="font-semibold">동행자</Label>
                <p className="mt-1">{selectedItem.companions}</p>
              </div>
            )}

            {selectedItem.highlights && selectedItem.highlights.length > 0 && (
              <div>
                <Label className="font-semibold">여행 하이라이트</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="text-sm">• {highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.challenges && selectedItem.challenges.length > 0 && (
              <div>
                <Label className="font-semibold">어려웠던 점</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="text-sm">• {challenge}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.recommendations && selectedItem.recommendations.length > 0 && (
              <div>
                <Label className="font-semibold">추천 사항</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm">• {rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.content && (
              <div>
                <Label className="font-semibold">본문</Label>
                <p className="mt-1 text-sm">{selectedItem.content.substring(0, 200)}...</p>
              </div>
            )}
          </>
        )}

        {/* Benefit-specific view */}
        {type === 'benefits' && (
          <>
            {selectedItem.category && (
              <div>
                <Label className="font-semibold">카테고리</Label>
                <p className="mt-1">{selectedItem.category}</p>
              </div>
            )}

            {selectedItem.type && (
              <div>
                <Label className="font-semibold">타입</Label>
                <p className="mt-1">{selectedItem.type}</p>
              </div>
            )}

            {selectedItem.discount && (
              <div>
                <Label className="font-semibold">할인율</Label>
                <p className="mt-1">{selectedItem.discount}</p>
              </div>
            )}

            {selectedItem.originalPrice && (
              <div>
                <Label className="font-semibold">원가</Label>
                <p className="mt-1">{selectedItem.originalPrice}</p>
              </div>
            )}

            {selectedItem.salePrice && (
              <div>
                <Label className="font-semibold">할인가</Label>
                <p className="mt-1">{selectedItem.salePrice}</p>
              </div>
            )}

            {selectedItem.validUntil && (
              <div>
                <Label className="font-semibold">유효기간</Label>
                <p className="mt-1">{selectedItem.validUntil}</p>
              </div>
            )}

            {selectedItem.provider && (
              <div>
                <Label className="font-semibold">제공업체</Label>
                <p className="mt-1">{selectedItem.provider}</p>
              </div>
            )}

            {selectedItem.contactInfo && (
              <div>
                <Label className="font-semibold">연락처</Label>
                <p className="mt-1">{selectedItem.contactInfo}</p>
              </div>
            )}

            {selectedItem.website && (
              <div>
                <Label className="font-semibold">웹사이트</Label>
                <p className="mt-1">{selectedItem.website}</p>
              </div>
            )}

            {selectedItem.features && selectedItem.features.length > 0 && (
              <div>
                <Label className="font-semibold">주요 혜택</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm">• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.conditions && selectedItem.conditions.length > 0 && (
              <div>
                <Label className="font-semibold">이용 조건</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.conditions.map((condition: string, index: number) => (
                    <li key={index} className="text-sm">• {condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.howToUse && selectedItem.howToUse.length > 0 && (
              <div>
                <Label className="font-semibold">이용 방법</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.howToUse.map((step: string, index: number) => (
                    <li key={index} className="text-sm">{index + 1}. {step}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.restrictions && selectedItem.restrictions.length > 0 && (
              <div>
                <Label className="font-semibold">제한 사항</Label>
                <ul className="mt-1 space-y-1">
                  {selectedItem.restrictions.map((restriction: string, index: number) => (
                    <li key={index} className="text-sm">• {restriction}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {selectedItem.tags && selectedItem.tags.length > 0 && (
          <div>
            <Label className="font-semibold">태그</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedItem.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedItem.image && (
          <div>
            <Label className="font-semibold">이미지</Label>
            <img 
              src={selectedItem.image} 
              alt={selectedItem.title}
              className="mt-1 w-full h-32 object-cover rounded"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === 'destinations' && '여행지 목록'}
          {type === 'guides' && '가이드 목록'}
          {type === 'stories' && '이야기 목록'}
          {type === 'benefits' && '혜택 목록'}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({data.length}개)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {getColumns().map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {getColumns().slice(0, -1).map((column) => (
                  <TableCell key={column}>
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>상세보기</DialogTitle>
                        </DialogHeader>
                        {renderViewContent()}
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>수정하기</DialogTitle>
                        </DialogHeader>
                        {renderEditForm()}
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setSelectedItem(null)}>
                            취소
                          </Button>
                          <Button onClick={handleSave}>
                            저장
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            등록된 데이터가 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
