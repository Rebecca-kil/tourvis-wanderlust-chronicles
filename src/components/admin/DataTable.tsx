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

            {/* 새로운 필드들 추가 */}
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
            
            {/* Daily Budget Section */}
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

            {/* Attractions Section */}
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

            {/* Travel Tips Section */}
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

        {(type === 'guides' || type === 'stories') && (
          <div>
            <Label htmlFor="edit-author">작성자</Label>
            <Input
              id="edit-author"
              value={editData.author || ''}
              onChange={(e) => setEditData({ ...editData, author: e.target.value })}
            />
          </div>
        )}

        {type === 'guides' && (
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
        )}

        {type === 'benefits' && (
          <>
            <div>
              <Label htmlFor="edit-discount">할인율</Label>
              <Input
                id="edit-discount"
                value={editData.discount || ''}
                onChange={(e) => setEditData({ ...editData, discount: e.target.value })}
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
          </>
        )}

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

        {selectedItem.quickInfo && (
          <div>
            <Label className="font-semibold">한줄 소개</Label>
            <p className="mt-1">{selectedItem.quickInfo}</p>
          </div>
        )}

        <div>
          <Label className="font-semibold">설명</Label>
          <p className="mt-1">{selectedItem.description}</p>
        </div>

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
