export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type GrowthLevel = 1 | 2 | 3 | 4 | 5;

export interface GrowthRank {
  level: GrowthLevel;
  name: string;
  emoji: string;
  requirement: number;
}

export const GROWTH_RANKS: GrowthRank[] = [
  { level: 1, name: "Seed", emoji: "🌱", requirement: 0 },
  { level: 2, name: "Sprout", emoji: "🌿", requirement: 5 },
  { level: 3, name: "Bloom", emoji: "🌸", requirement: 20 },
  { level: 4, name: "Tree", emoji: "🌳", requirement: 50 },
  { level: 5, name: "Forest", emoji: "🌲", requirement: 100 },
];

export type SwapStatus = "pending" | "accepted" | "rejected" | "completed";

export type Availability = "morning" | "afternoon" | "evening" | "weekend";

export type Category =
  | "programming"
  | "design"
  | "language"
  | "creative"
  | "business"
  | "music"
  | "fitness"
  | "cooking";

export interface Skill {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon: string;
  mentorCount: number;
}

export interface UserSkill {
  skill: Skill;
  level: SkillLevel;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video" | "link" | "certificate";
  url: string;
  thumbnail?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  communication: number;
  teachingQuality: number;
  reliability: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  skillsTeach: UserSkill[];
  skillsLearn: Skill[];
  portfolio: PortfolioItem[];
  availability: Availability[];
  growthLevel: GrowthLevel;
  completedSwaps: number;
  rating: number;
  reviewCount: number;
  joinedDate: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  skillOffered: Skill;
  skillWanted: Skill;
  message: string;
  status: SwapStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "system";
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  skillExchange: {
    skill1: string;
    skill2: string;
  };
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface MatchRecommendation {
  user: User;
  matchPercentage: number;
  isPerfectMatch: boolean;
  matchedSkills: {
    theyTeach: Skill;
    youTeach: Skill;
  }[];
}

export interface Notification {
  id: string;
  type: "swap_request" | "swap_accepted" | "swap_completed" | "message" | "review" | "match" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
  avatar?: string;
}

export interface ReviewFormData {
  communication: number;
  teachingQuality: number;
  reliability: number;
  comment: string;
}

export type SessionMode = "online" | "in_person";

export interface ScheduledSession {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  skill: string;
  date: string;
  time: string;
  mode: SessionMode;
  notes?: string;
}
