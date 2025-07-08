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
  budgetLevel?: string;
  bestTime?: string;
  transportation?: string;
  attractions?: Array<{
    name: string;
    description: string;
    time?: string;
    rating?: number;
  }>;
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
  description?: string;
  readTime?: string;
  targetAudience?: string;
  requirements?: string[];
  whatYouWillLearn?: string[];
  publishDate?: string;
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
  description?: string;
  publishDate?: string;
  readTime?: string;
  travelDate?: string;
  budget?: string;
  companions?: string;
  highlights?: string[];
  challenges?: string[];
  recommendations?: string[];
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
  provider?: string;
  howToUse?: string[];
  restrictions?: string[];
  contactInfo?: string;
  website?: string;
}

interface BlogContextType {
  destinations: Destination[];
  guides: Guide[];
  stories: Story[];
  benefits: Benefit[];
  addDestination: (destination: Omit<Destination, 'id'>) => void;
  addGuide: (guide: Omit<Guide, 'id' | 'likes'>) => void;
  addStory: (story: Omit<Story, 'id' | 'likes' | 'comments'>) => void;
  addBenefit: (benefit: Omit<Benefit, 'id' | 'likes'>) => void;
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  updateGuide: (id: string, guide: Partial<Guide>) => void;
  updateStory: (id: string, story: Partial<Story>) => void;
  updateBenefit: (id: string, benefit: Partial<Benefit>) => void;
  deleteDestination: (id: string) => void;
  deleteGuide: (id: string) => void;
  deleteStory: (id: string) => void;
  deleteBenefit: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Default data with enhanced fields
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
    likes: 856,
    description: '항공료를 절약할 수 있는 실용적인 팁들을 소개합니다.',
    readTime: '5분',
    targetAudience: '항공료 절약을 원하는 모든 여행자'
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
    comments: 89,
    description: '파리에서의 혼자 여행 경험담',
    readTime: '8분',
    travelDate: '2024년 3월'
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
    stock: '87%',
    provider: '제주항공'
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

    setDestinations(savedDestinations ? JSON.parse(savedDestinations) : defaultDestinations);
    setGuides(savedGuides ? JSON.parse(savedGuides) : defaultGuides);
    setStories(savedStories ? JSON.parse(savedStories) : defaultStories);
    setBenefits(savedBenefits ? JSON.parse(savedBenefits) : defaultBenefits);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (destinations.length > 0) {
      localStorage.setItem('blogDestinations', JSON.stringify(destinations));
    }
  }, [destinations]);

  useEffect(() => {
    if (guides.length > 0) {
      localStorage.setItem('blogGuides', JSON.stringify(guides));
    }
  }, [guides]);

  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem('blogStories', JSON.stringify(stories));
    }
  }, [stories]);

  useEffect(() => {
    if (benefits.length > 0) {
      localStorage.setItem('blogBenefits', JSON.stringify(benefits));
    }
  }, [benefits]);

  const addDestination = (destination: Omit<Destination, 'id'>) => {
    const newDestination = {
      ...destination,
      id: Date.now().toString()
    };
    setDestinations(prev => [...prev, newDestination]);
  };

  const addGuide = (guide: Omit<Guide, 'id' | 'likes'>) => {
    const newGuide = {
      ...guide,
      id: Date.now().toString(),
      likes: 0
    };
    setGuides(prev => [...prev, newGuide]);
  };

  const addStory = (story: Omit<Story, 'id' | 'likes' | 'comments'>) => {
    const newStory = {
      ...story,
      id: Date.now().toString(),
      likes: 0,
      comments: 0
    };
    setStories(prev => [...prev, newStory]);
  };

  const addBenefit = (benefit: Omit<Benefit, 'id' | 'likes'>) => {
    const newBenefit = {
      ...benefit,
      id: Date.now().toString(),
      likes: 0
    };
    setBenefits(prev => [...prev, newBenefit]);
  };

  // Update functions
  const updateDestination = (id: string, updatedData: Partial<Destination>) => {
    setDestinations(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const updateGuide = (id: string, updatedData: Partial<Guide>) => {
    setGuides(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const updateStory = (id: string, updatedData: Partial<Story>) => {
    setStories(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const updateBenefit = (id: string, updatedData: Partial<Benefit>) => {
    setBenefits(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  // Delete functions
  const deleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(item => item.id !== id));
  };

  const deleteGuide = (id: string) => {
    setGuides(prev => prev.filter(item => item.id !== id));
  };

  const deleteStory = (id: string) => {
    setStories(prev => prev.filter(item => item.id !== id));
  };

  const deleteBenefit = (id: string) => {
    setBenefits(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BlogContext.Provider value={{
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
  return context;
};
