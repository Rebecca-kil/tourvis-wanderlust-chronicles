import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Destination {
  id: string;
  title: string;
  city: string;
  image: string;
  description: string;
  price?: number;
  duration?: string;
  tags: string[];
  quickInfo?: string;
  travelTips?: string[];
  dailyBudget?: {
    accommodation: string;
    food: string;
    transport: string;
  };
}

export interface BlogContextType {
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  guides: Guide[];
  stories: Story[];
  benefits: Benefit[];
  addDestination: (destination: Omit<Destination, 'id'>) => void;
  addGuide: (guide: Omit<Guide, 'id'>) => void;
  addStory: (story: Omit<Story, 'id'>) => void;
  addBenefit: (benefit: Omit<Benefit, 'id'>) => void;
}


export interface Guide {
  id: string;
  title: string;
  author: string;
  category: string;
  difficulty: string;
  image: string;
  content: Array<{ title: string; content: string; }>;
  tips: string[];
  tags: string[];
  likes: number;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  city?: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
}

export interface Benefit {
  id: string;
  title: string;
  category: string;
  type: string;
  discount?: string;
  originalPrice?: string;
  salePrice?: string;
  validUntil?: string;
  image: string;
  description: string;
  features: string[];
  conditions: string[];
  tags: string[];
  likes: number;
  isHot?: boolean;
  stock?: string;
}



const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Default data
const defaultDestinations: Destination[] = [
  {
    id: '1',
    title: '제주도 자연 탐험',
    city: '제주도, 대한민국',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d3e?w=800&h=400&fit=crop',
    description: '아름다운 제주도의 자연을 만끽할 수 있는 완벽한 여행 코스입니다.',
    price: 450000,
    duration: '3박 4일',
    tags: ['국내', '자연', '휴양']
  }
];

const defaultGuides: Guide[] = [
  {
    id: '1',
    title: '항공료 50% 절약하는 예약 타이밍과 팁',
    author: '여행 전문가 김철수',
    category: '교통',
    difficulty: '초급',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop',
    content: [
      {
        title: '1. 최적의 예약 타이밍',
        content: '국내선의 경우 출발 1-2개월 전, 국제선은 2-3개월 전이 가장 저렴합니다.'
      }
    ],
    tips: ['주중 출발이 주말보다 20-30% 저렴', '직항보다 경유가 더 저렴할 수 있음'],
    tags: ['교통', '절약'],
    likes: 856
  }
];

const defaultStories: Story[] = [
  {
    id: '1',
    title: '파리 혼자 여행 7일의 기록',
    author: '여행러버',
    city: '파리, 프랑스',
    category: '해외여행',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=400&fit=crop',
    excerpt: '파리에서의 7일간 혼자 여행하며 느낀 감동과 경험을 공유합니다.',
    content: '파리에서의 혼자 여행은 정말 특별한 경험이었습니다...',
    tags: ['해외여행', '혼행'],
    likes: 1234,
    comments: 89
  }
];

const defaultBenefits: Benefit[] = [
  {
    id: '1',
    title: '제주항공 국내선 항공료 30% 할인',
    category: '항공',
    type: '할인',
    discount: '30%',
    originalPrice: '150,000원',
    salePrice: '105,000원',
    validUntil: '2024.03.31',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop',
    description: '제주항공 국내선 전 노선 30% 할인! 김포-제주, 김포-부산 등 인기 노선 포함.',
    features: ['국내선 전 노선 30% 할인', '김포-제주, 김포-부산 등 인기 노선 포함'],
    conditions: ['예약 기간: ~2024.03.31', '탑승 기간: ~2024.04.30'],
    tags: ['항공', '할인'],
    likes: 234,
    isHot: true,
    stock: '87%'
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDestinations = localStorage.getItem('blogDestinations');
    const savedGuides = localStorage.getItem('blogGuides');
    const savedStories = localStorage.getItem('blogStories');
    const savedBenefits = localStorage.getItem('blogBenefits');
    if (savedDestinations) setDestinations(JSON.parse(savedDestinations));
    if (savedGuides) setGuides(JSON.parse(savedGuides));
    if (savedStories) setStories(JSON.parse(savedStories));
    if (savedBenefits) setBenefits(JSON.parse(savedBenefits));
  }, []);

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem('blogDestinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('blogGuides', JSON.stringify(guides));
  }, [guides]);

  useEffect(() => {
    localStorage.setItem('blogStories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('blogBenefits', JSON.stringify(benefits));
  }, [benefits]);

  // 여행지 추가 함수
  const addDestination = (destination: Omit<Destination, 'id'>) => {
    setDestinations(prev => [...prev, { ...destination, id: Date.now().toString() }]);
  };

  // 가이드 추가 함수
  const addGuide = (guide: Omit<Guide, 'id'>) => {
    setGuides(prev => [...prev, { ...guide, id: Date.now().toString() }]);
  };

  // 여행 이야기 추가 함수
  const addStory = (story: Omit<Story, 'id'>) => {
    setStories(prev => [...prev, { ...story, id: Date.now().toString() }]);
  };

  // 혜택 추가 함수
  const addBenefit = (benefit: Omit<Benefit, 'id'>) => {
    setBenefits(prev => [...prev, { ...benefit, id: Date.now().toString() }]);
  };

  return (
    <BlogContext.Provider value={{
      destinations,
      setDestinations, // 여행지 목록 직접 수정 가능 (수정/삭제 등)
      guides,
      stories,
      benefits,
      addDestination,
      addGuide,
      addStory,
      addBenefit
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context as BlogContextType;
};