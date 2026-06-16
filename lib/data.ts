import type {
  Skill,
  User,
  SwapRequest,
  Conversation,
  MatchRecommendation,
  Notification,
  ScheduledSession,
} from "./types";

// ── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    id: "1",
    name: "Flutter Development",
    category: "programming",
    description:
      "Build beautiful cross-platform mobile apps with Flutter and Dart.",
    icon: "Smartphone",
    mentorCount: 48,
  },
  {
    id: "2",
    name: "Blender 3D",
    category: "creative",
    description:
      "Create stunning 3D models, animations, and visual effects with Blender.",
    icon: "Box",
    mentorCount: 32,
  },
  {
    id: "3",
    name: "Japanese Language",
    category: "language",
    description:
      "Learn to read, write, and speak Japanese from native speakers and experts.",
    icon: "Languages",
    mentorCount: 67,
  },
  {
    id: "4",
    name: "UI/UX Design",
    category: "design",
    description:
      "Design intuitive user interfaces and seamless user experiences.",
    icon: "Palette",
    mentorCount: 55,
  },
  {
    id: "5",
    name: "Public Speaking",
    category: "business",
    description:
      "Master the art of confident and engaging public presentations.",
    icon: "Mic",
    mentorCount: 29,
  },
  {
    id: "6",
    name: "Video Editing",
    category: "creative",
    description:
      "Edit professional-quality videos using industry-standard tools.",
    icon: "Film",
    mentorCount: 41,
  },
  {
    id: "7",
    name: "Python Programming",
    category: "programming",
    description:
      "Learn Python for web development, data science, automation, and more.",
    icon: "Code",
    mentorCount: 83,
  },
  {
    id: "8",
    name: "Graphic Design",
    category: "design",
    description:
      "Create compelling visual content for print and digital media.",
    icon: "PenTool",
    mentorCount: 59,
  },
  {
    id: "9",
    name: "Guitar",
    category: "music",
    description: "Learn acoustic or electric guitar from beginner to advanced.",
    icon: "Music",
    mentorCount: 37,
  },
  {
    id: "10",
    name: "Photography",
    category: "creative",
    description:
      "Capture stunning photos with professional techniques and composition.",
    icon: "Camera",
    mentorCount: 44,
  },
  {
    id: "11",
    name: "React Development",
    category: "programming",
    description:
      "Build modern web applications with React, hooks, and component patterns.",
    icon: "Code2",
    mentorCount: 72,
  },
  {
    id: "12",
    name: "Digital Marketing",
    category: "business",
    description:
      "Grow brands through SEO, social media, content marketing, and analytics.",
    icon: "TrendingUp",
    mentorCount: 38,
  },
];

// ── Users ───────────────────────────────────────────────────────────────────

export const users: User[] = [
  {
    id: "1",
    fullName: "Sarah Chen",
    username: "sarahchen",
    email: "sarah@example.com",
    avatar: "/avatars/sarah.jpg",
    bio: "Full-stack developer passionate about teaching Flutter and learning creative skills. Love connecting with fellow learners!",
    location: "San Francisco, CA",
    skillsTeach: [
      { skill: skills[0], level: "expert", description: "5+ years building production Flutter apps" },
      { skill: skills[10], level: "advanced", description: "React & Next.js specialist" },
    ],
    skillsLearn: [skills[1], skills[5]],
    portfolio: [
      {
        id: "p1",
        title: "E-Commerce App",
        description: "A full-featured shopping app built with Flutter",
        type: "link",
        url: "https://example.com/project1",
      },
      {
        id: "p2",
        title: "Flutter Certification",
        description: "Google Associate Android Developer",
        type: "certificate",
        url: "https://example.com/cert1",
      },
    ],
    availability: ["morning", "evening", "weekend"],
    growthLevel: 4,
    completedSwaps: 58,
    rating: 4.9,
    reviewCount: 42,
    joinedDate: "2024-03-15",
  },
  {
    id: "2",
    fullName: "Kenji Tanaka",
    username: "kenjitanaka",
    email: "kenji@example.com",
    avatar: "/avatars/kenji.jpg",
    bio: "Native Japanese speaker and certified language teacher. Let me help you master Japanese!",
    location: "Tokyo, Japan",
    skillsTeach: [
      { skill: skills[2], level: "expert", description: "Certified JLPT instructor" },
    ],
    skillsLearn: [skills[0], skills[10]],
    portfolio: [
      {
        id: "p3",
        title: "Japanese Learning Channel",
        description: "YouTube channel with 50k subscribers",
        type: "link",
        url: "https://example.com/channel",
      },
    ],
    availability: ["afternoon", "evening"],
    growthLevel: 3,
    completedSwaps: 24,
    rating: 4.8,
    reviewCount: 19,
    joinedDate: "2024-06-20",
  },
  {
    id: "3",
    fullName: "Marcus Rivera",
    username: "marcusrivera",
    email: "marcus@example.com",
    avatar: "/avatars/marcus.jpg",
    bio: "3D artist and animator. I bring ideas to life in Blender and love learning new programming skills.",
    location: "Austin, TX",
    skillsTeach: [
      { skill: skills[1], level: "advanced", description: "Professional 3D modeling and animation" },
      { skill: skills[5], level: "intermediate", description: "Video editing with DaVinci Resolve" },
    ],
    skillsLearn: [skills[6], skills[0]],
    portfolio: [
      {
        id: "p4",
        title: "3D Character Collection",
        description: "A series of stylized 3D characters",
        type: "image",
        url: "https://example.com/portfolio",
      },
    ],
    availability: ["morning", "weekend"],
    growthLevel: 2,
    completedSwaps: 8,
    rating: 4.7,
    reviewCount: 6,
    joinedDate: "2025-01-10",
  },
  {
    id: "4",
    fullName: "Amira Patel",
    username: "amirapatel",
    email: "amira@example.com",
    avatar: "/avatars/amira.jpg",
    bio: "UI/UX designer with a passion for creating beautiful, accessible interfaces. Always eager to learn!",
    location: "London, UK",
    skillsTeach: [
      { skill: skills[3], level: "expert", description: "Lead designer with 6 years experience" },
      { skill: skills[7], level: "advanced", description: "Brand identity and visual design" },
    ],
    skillsLearn: [skills[2], skills[8]],
    portfolio: [
      {
        id: "p5",
        title: "Design System",
        description: "Comprehensive design system for a SaaS product",
        type: "link",
        url: "https://example.com/design",
      },
    ],
    availability: ["afternoon", "evening", "weekend"],
    growthLevel: 3,
    completedSwaps: 31,
    rating: 4.9,
    reviewCount: 25,
    joinedDate: "2024-08-05",
  },
  {
    id: "5",
    fullName: "David Kim",
    username: "davidkim",
    email: "david@example.com",
    avatar: "/avatars/david.jpg",
    bio: "Public speaking coach and business consultant. Let me help you find your voice!",
    location: "New York, NY",
    skillsTeach: [
      { skill: skills[4], level: "expert", description: "TEDx speaker and communication coach" },
      { skill: skills[11], level: "advanced", description: "Growth marketing strategist" },
    ],
    skillsLearn: [skills[7], skills[6]],
    portfolio: [],
    availability: ["morning", "afternoon"],
    growthLevel: 5,
    completedSwaps: 112,
    rating: 5.0,
    reviewCount: 89,
    joinedDate: "2023-11-01",
  },
  {
    id: "6",
    fullName: "Elena Popova",
    username: "elenapopova",
    email: "elena@example.com",
    avatar: "/avatars/elena.jpg",
    bio: "Professional photographer turned Python enthusiast. Love the intersection of art and technology.",
    location: "Berlin, Germany",
    skillsTeach: [
      { skill: skills[9], level: "expert", description: "Award-winning photographer" },
      { skill: skills[6], level: "intermediate", description: "Python for data visualization" },
    ],
    skillsLearn: [skills[0], skills[3]],
    portfolio: [
      {
        id: "p6",
        title: "Photo Exhibition",
        description: "Solo exhibition at Berlin Art Gallery",
        type: "image",
        url: "https://example.com/exhibition",
      },
    ],
    availability: ["evening", "weekend"],
    growthLevel: 4,
    completedSwaps: 52,
    rating: 4.8,
    reviewCount: 38,
    joinedDate: "2024-02-14",
  },
];

// ── Current User (logged-in user) ───────────────────────────────────────────

export const currentUser: User = users[0];

// ── Swap Requests ───────────────────────────────────────────────────────────

export const swapRequests: SwapRequest[] = [
  {
    id: "sr1",
    requesterId: "1",
    requesterName: "Sarah Chen",
    requesterAvatar: "/avatars/sarah.jpg",
    receiverId: "2",
    receiverName: "Kenji Tanaka",
    receiverAvatar: "/avatars/kenji.jpg",
    skillOffered: skills[0],
    skillWanted: skills[2],
    message:
      "Hi Kenji! I'd love to learn Japanese. I can teach you Flutter development in return. Would you like to do a skill swap?",
    status: "accepted",
    createdAt: "2025-06-10T09:00:00Z",
  },
  {
    id: "sr2",
    requesterId: "3",
    requesterName: "Marcus Rivera",
    requesterAvatar: "/avatars/marcus.jpg",
    receiverId: "1",
    receiverName: "Sarah Chen",
    receiverAvatar: "/avatars/sarah.jpg",
    skillOffered: skills[1],
    skillWanted: skills[0],
    message:
      "Hey Sarah! I saw your Flutter portfolio and I'm really impressed. I can teach you Blender 3D if you're interested!",
    status: "pending",
    createdAt: "2025-06-12T14:30:00Z",
  },
  {
    id: "sr3",
    requesterId: "1",
    requesterName: "Sarah Chen",
    requesterAvatar: "/avatars/sarah.jpg",
    receiverId: "5",
    receiverName: "David Kim",
    receiverAvatar: "/avatars/david.jpg",
    skillOffered: skills[10],
    skillWanted: skills[4],
    message:
      "Hi David! I need help with public speaking for tech conferences. I can teach you React in exchange!",
    status: "completed",
    createdAt: "2025-05-20T10:00:00Z",
  },
  {
    id: "sr4",
    requesterId: "4",
    requesterName: "Amira Patel",
    requesterAvatar: "/avatars/amira.jpg",
    receiverId: "1",
    receiverName: "Sarah Chen",
    receiverAvatar: "/avatars/sarah.jpg",
    skillOffered: skills[3],
    skillWanted: skills[0],
    message:
      "Hi Sarah! I'd love to learn Flutter for prototyping. I can teach you UI/UX design principles!",
    status: "accepted",
    createdAt: "2025-06-08T16:00:00Z",
  },
];

// ── Conversations ───────────────────────────────────────────────────────────

export const conversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      { id: "1", name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
      { id: "2", name: "Kenji Tanaka", avatar: "/avatars/kenji.jpg" },
    ],
    skillExchange: { skill1: "Flutter", skill2: "Japanese" },
    messages: [
      {
        id: "m1",
        senderId: "2",
        content: "Konnichiwa Sarah! Ready for our first lesson?",
        timestamp: "2025-06-11T10:00:00Z",
        type: "text",
      },
      {
        id: "m2",
        senderId: "1",
        content: "Yes! I'm so excited. Should we start with hiragana?",
        timestamp: "2025-06-11T10:02:00Z",
        type: "text",
      },
      {
        id: "m3",
        senderId: "2",
        content:
          "Great idea! Let me share a practice sheet. And I've been working on that Flutter widget you showed me.",
        timestamp: "2025-06-11T10:05:00Z",
        type: "text",
      },
      {
        id: "m4",
        senderId: "1",
        content: "Awesome! Let's schedule our next session for Thursday evening?",
        timestamp: "2025-06-11T10:08:00Z",
        type: "text",
      },
    ],
    lastMessage: "Awesome! Let's schedule our next session for Thursday evening?",
    lastMessageTime: "2025-06-11T10:08:00Z",
    unreadCount: 0,
  },
  {
    id: "conv2",
    participants: [
      { id: "1", name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
      { id: "4", name: "Amira Patel", avatar: "/avatars/amira.jpg" },
    ],
    skillExchange: { skill1: "Flutter", skill2: "UI/UX Design" },
    messages: [
      {
        id: "m5",
        senderId: "4",
        content:
          "Hi Sarah! I put together some design principles for your Flutter app. Want to review them together?",
        timestamp: "2025-06-09T15:00:00Z",
        type: "text",
      },
      {
        id: "m6",
        senderId: "1",
        content:
          "That would be amazing! I've been struggling with the color palette for my new project.",
        timestamp: "2025-06-09T15:05:00Z",
        type: "text",
      },
      {
        id: "m7",
        senderId: "4",
        content: "I'll send you a Figma file with some options. Also, can you help me with Flutter animations?",
        timestamp: "2025-06-09T15:10:00Z",
        type: "text",
      },
    ],
    lastMessage: "I'll send you a Figma file with some options. Also, can you help me with Flutter animations?",
    lastMessageTime: "2025-06-09T15:10:00Z",
    unreadCount: 1,
  },
  {
    id: "conv3",
    participants: [
      { id: "1", name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
      { id: "5", name: "David Kim", avatar: "/avatars/david.jpg" },
    ],
    skillExchange: { skill1: "React", skill2: "Public Speaking" },
    messages: [
      {
        id: "m8",
        senderId: "5",
        content:
          "Great job on your last presentation practice! Your pacing has improved a lot.",
        timestamp: "2025-06-05T09:00:00Z",
        type: "text",
      },
      {
        id: "m9",
        senderId: "1",
        content:
          "Thanks David! Your tips on storytelling really helped. How's the React project going?",
        timestamp: "2025-06-05T09:15:00Z",
        type: "text",
      },
    ],
    lastMessage: "Thanks David! Your tips on storytelling really helped. How's the React project going?",
    lastMessageTime: "2025-06-05T09:15:00Z",
    unreadCount: 0,
  },
];

// ── Match Recommendations ───────────────────────────────────────────────────

export const matchRecommendations: MatchRecommendation[] = [
  {
    user: users[1],
    matchPercentage: 95,
    isPerfectMatch: true,
    matchedSkills: [
      { theyTeach: skills[2], youTeach: skills[0] },
    ],
  },
  {
    user: users[2],
    matchPercentage: 82,
    isPerfectMatch: false,
    matchedSkills: [
      { theyTeach: skills[1], youTeach: skills[0] },
    ],
  },
  {
    user: users[3],
    matchPercentage: 88,
    isPerfectMatch: false,
    matchedSkills: [
      { theyTeach: skills[3], youTeach: skills[10] },
    ],
  },
  {
    user: users[4],
    matchPercentage: 91,
    isPerfectMatch: true,
    matchedSkills: [
      { theyTeach: skills[4], youTeach: skills[10] },
    ],
  },
  {
    user: users[5],
    matchPercentage: 78,
    isPerfectMatch: false,
    matchedSkills: [
      { theyTeach: skills[9], youTeach: skills[0] },
    ],
  },
];

// ── Stats ───────────────────────────────────────────────────────────────────

export const communityStats = {
  totalUsers: 12847,
  totalSkills: 248,
  successfulSwaps: 34521,
  communityRating: 4.8,
};

// ── Categories ──────────────────────────────────────────────────────────────

export const categories = [
  { id: "programming", name: "Programming", icon: "Code", count: 156 },
  { id: "design", name: "Design", icon: "Palette", count: 89 },
  { id: "language", name: "Languages", icon: "Languages", count: 67 },
  { id: "creative", name: "Creative", icon: "Sparkles", count: 73 },
  { id: "business", name: "Business", icon: "Briefcase", count: 45 },
  { id: "music", name: "Music", icon: "Music", count: 32 },
  { id: "fitness", name: "Fitness", icon: "Dumbbell", count: 28 },
  { id: "cooking", name: "Cooking", icon: "ChefHat", count: 19 },
];

// ── Notifications ─────────────────────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "swap_request",
    title: "New Swap Request",
    description: "Marcus Rivera wants to swap Blender 3D for your Flutter Development",
    timestamp: "2025-06-12T14:30:00Z",
    read: false,
    link: "/swaps",
    avatar: "/avatars/marcus.jpg",
  },
  {
    id: "n2",
    type: "swap_accepted",
    title: "Swap Accepted!",
    description: "Amira Patel accepted your UI/UX Design swap request",
    timestamp: "2025-06-11T16:00:00Z",
    read: false,
    link: "/chat",
    avatar: "/avatars/amira.jpg",
  },
  {
    id: "n3",
    type: "message",
    title: "New Message",
    description: "Kenji Tanaka sent you a message about your Japanese lesson",
    timestamp: "2025-06-11T10:08:00Z",
    read: false,
    link: "/chat",
    avatar: "/avatars/kenji.jpg",
  },
  {
    id: "n4",
    type: "match",
    title: "Perfect Match Found!",
    description: "We found a 95% match for your learning goals",
    timestamp: "2025-06-10T09:00:00Z",
    read: true,
    link: "/dashboard",
  },
  {
    id: "n5",
    type: "review",
    title: "New Review",
    description: "David Kim left you a 5-star review for Public Speaking",
    timestamp: "2025-06-09T12:00:00Z",
    read: true,
    link: "/profile/sarahchen",
    avatar: "/avatars/david.jpg",
  },
  {
    id: "n6",
    type: "swap_completed",
    title: "Swap Completed",
    description: "Your skill swap with David Kim has been marked as complete",
    timestamp: "2025-06-08T18:00:00Z",
    read: true,
    link: "/swaps",
    avatar: "/avatars/david.jpg",
  },
  {
    id: "n7",
    type: "system",
    title: "Level Up!",
    description: "Congratulations! You reached Level 4 — Tree 🌳",
    timestamp: "2025-06-07T10:00:00Z",
    read: true,
    link: "/dashboard",
  },
];

// ── Scheduled Sessions ────────────────────────────────────────────────────

export const scheduledSessions: ScheduledSession[] = [
  {
    id: "ss1",
    partnerId: "2",
    partnerName: "Kenji Tanaka",
    partnerAvatar: "/avatars/kenji.jpg",
    skill: "Japanese Language",
    date: "2025-06-15",
    time: "15:00",
    mode: "online",
    notes: "Hiragana practice and basic greetings",
  },
  {
    id: "ss2",
    partnerId: "4",
    partnerName: "Amira Patel",
    partnerAvatar: "/avatars/amira.jpg",
    skill: "UI/UX Design",
    date: "2025-06-16",
    time: "10:00",
    mode: "online",
    notes: "Color theory and design systems",
  },
  {
    id: "ss3",
    partnerId: "5",
    partnerName: "David Kim",
    partnerAvatar: "/avatars/david.jpg",
    skill: "Public Speaking",
    date: "2025-06-18",
    time: "14:00",
    mode: "in_person",
    notes: "Conference talk rehearsal",
  },
];

// ── Reviews ─────────────────────────────────────────────────────────────────

export const reviews = [
  {
    id: "r1",
    reviewerId: "2",
    reviewerName: "Kenji Tanaka",
    reviewerAvatar: "/avatars/kenji.jpg",
    rating: 5,
    communication: 5,
    teachingQuality: 5,
    reliability: 5,
    comment:
      "Sarah is an amazing Flutter teacher! She explains complex concepts clearly and is always patient. Highly recommend!",
    date: "2025-06-01",
  },
  {
    id: "r2",
    reviewerId: "5",
    reviewerName: "David Kim",
    reviewerAvatar: "/avatars/david.jpg",
    rating: 5,
    communication: 5,
    teachingQuality: 5,
    reliability: 4,
    comment:
      "Incredible React skills and very responsive. Our skill swap was one of the best learning experiences I've had.",
    date: "2025-05-28",
  },
  {
    id: "r3",
    reviewerId: "4",
    reviewerName: "Amira Patel",
    reviewerAvatar: "/avatars/amira.jpg",
    rating: 4,
    communication: 5,
    teachingQuality: 4,
    reliability: 5,
    comment:
      "Great experience learning Flutter basics. Sarah made the sessions fun and engaging!",
    date: "2025-05-15",
  },
];
