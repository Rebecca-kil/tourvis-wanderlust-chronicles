
import { useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
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

        <div>
          <Label className="font-semibold">설명</Label>
          <p className="mt-1">{selectedItem.description}</p>
        </div>

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
