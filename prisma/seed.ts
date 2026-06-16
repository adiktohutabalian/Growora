import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Skills (12 skills) ────────────────────────────────────────────────
  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { name: "Flutter Development" },
      update: {},
      create: {
        name: "Flutter Development",
        category: "programming",
        description: "Build beautiful cross-platform mobile apps with Flutter and Dart.",
        icon: "Smartphone",
        mentorCount: 48,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Blender 3D" },
      update: {},
      create: {
        name: "Blender 3D",
        category: "creative",
        description: "Create stunning 3D models, animations, and visual effects with Blender.",
        icon: "Box",
        mentorCount: 32,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Japanese Language" },
      update: {},
      create: {
        name: "Japanese Language",
        category: "language",
        description: "Learn to read, write, and speak Japanese from native speakers and experts.",
        icon: "Languages",
        mentorCount: 67,
      },
    }),
    prisma.skill.upsert({
      where: { name: "UI/UX Design" },
      update: {},
      create: {
        name: "UI/UX Design",
        category: "design",
        description: "Design intuitive user interfaces and seamless user experiences.",
        icon: "Palette",
        mentorCount: 55,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Public Speaking" },
      update: {},
      create: {
        name: "Public Speaking",
        category: "business",
        description: "Master the art of confident and engaging public presentations.",
        icon: "Mic",
        mentorCount: 29,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Video Editing" },
      update: {},
      create: {
        name: "Video Editing",
        category: "creative",
        description: "Edit professional-quality videos using industry-standard tools.",
        icon: "Film",
        mentorCount: 41,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Python Programming" },
      update: {},
      create: {
        name: "Python Programming",
        category: "programming",
        description: "Learn Python for web development, data science, automation, and more.",
        icon: "Code",
        mentorCount: 83,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Graphic Design" },
      update: {},
      create: {
        name: "Graphic Design",
        category: "design",
        description: "Create compelling visual content for print and digital media.",
        icon: "PenTool",
        mentorCount: 59,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Guitar" },
      update: {},
      create: {
        name: "Guitar",
        category: "music",
        description: "Learn acoustic or electric guitar from beginner to advanced.",
        icon: "Music",
        mentorCount: 37,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Photography" },
      update: {},
      create: {
        name: "Photography",
        category: "creative",
        description: "Capture stunning photos with professional techniques and composition.",
        icon: "Camera",
        mentorCount: 44,
      },
    }),
    prisma.skill.upsert({
      where: { name: "React Development" },
      update: {},
      create: {
        name: "React Development",
        category: "programming",
        description: "Build modern web applications with React, hooks, and component patterns.",
        icon: "Code2",
        mentorCount: 72,
      },
    }),
    prisma.skill.upsert({
      where: { name: "Digital Marketing" },
      update: {},
      create: {
        name: "Digital Marketing",
        category: "business",
        description: "Grow brands through SEO, social media, content marketing, and analytics.",
        icon: "TrendingUp",
        mentorCount: 38,
      },
    }),
  ]);

  const skillMap = Object.fromEntries(skills.map((s) => [s.name, s]));

  // ── Users (6 users) ──────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("password123", 10);

  const sarah = await prisma.user.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      fullName: "Sarah Chen",
      username: "sarahchen",
      email: "sarah@example.com",
      passwordHash,
      avatar: "/avatars/sarah.jpg",
      bio: "Full-stack developer passionate about teaching Flutter and learning creative skills. Love connecting with fellow learners!",
      location: "San Francisco, CA",
      availability: JSON.stringify(["morning", "evening", "weekend"]),
      growthLevel: 4,
      completedSwaps: 58,
      rating: 4.9,
      reviewCount: 42,
    },
  });

  const kenji = await prisma.user.upsert({
    where: { email: "kenji@example.com" },
    update: {},
    create: {
      fullName: "Kenji Tanaka",
      username: "kenjitanaka",
      email: "kenji@example.com",
      passwordHash,
      avatar: "/avatars/kenji.jpg",
      bio: "Native Japanese speaker and certified language teacher. Let me help you master Japanese!",
      location: "Tokyo, Japan",
      availability: JSON.stringify(["afternoon", "evening"]),
      growthLevel: 3,
      completedSwaps: 24,
      rating: 4.8,
      reviewCount: 19,
    },
  });

  const marcus = await prisma.user.upsert({
    where: { email: "marcus@example.com" },
    update: {},
    create: {
      fullName: "Marcus Rivera",
      username: "marcusrivera",
      email: "marcus@example.com",
      passwordHash,
      avatar: "/avatars/marcus.jpg",
      bio: "3D artist and animator. I bring ideas to life in Blender and love learning new programming skills.",
      location: "Austin, TX",
      availability: JSON.stringify(["morning", "weekend"]),
      growthLevel: 2,
      completedSwaps: 8,
      rating: 4.7,
      reviewCount: 6,
    },
  });

  const amira = await prisma.user.upsert({
    where: { email: "amira@example.com" },
    update: {},
    create: {
      fullName: "Amira Patel",
      username: "amirapatel",
      email: "amira@example.com",
      passwordHash,
      avatar: "/avatars/amira.jpg",
      bio: "UI/UX designer with a passion for creating beautiful, accessible interfaces. Always eager to learn!",
      location: "London, UK",
      availability: JSON.stringify(["afternoon", "evening", "weekend"]),
      growthLevel: 3,
      completedSwaps: 31,
      rating: 4.9,
      reviewCount: 25,
    },
  });

  const david = await prisma.user.upsert({
    where: { email: "david@example.com" },
    update: {},
    create: {
      fullName: "David Kim",
      username: "davidkim",
      email: "david@example.com",
      passwordHash,
      avatar: "/avatars/david.jpg",
      bio: "Public speaking coach and business consultant. Let me help you find your voice!",
      location: "New York, NY",
      availability: JSON.stringify(["morning", "afternoon"]),
      growthLevel: 5,
      completedSwaps: 112,
      rating: 5.0,
      reviewCount: 89,
    },
  });

  const elena = await prisma.user.upsert({
    where: { email: "elena@example.com" },
    update: {},
    create: {
      fullName: "Elena Popova",
      username: "elenapopova",
      email: "elena@example.com",
      passwordHash,
      avatar: "/avatars/elena.jpg",
      bio: "Professional photographer turned Python enthusiast. Love the intersection of art and technology.",
      location: "Berlin, Germany",
      availability: JSON.stringify(["evening", "weekend"]),
      growthLevel: 4,
      completedSwaps: 52,
      rating: 4.8,
      reviewCount: 38,
    },
  });

  // ── User Skills (teach) ──────────────────────────────────────────────
  const userSkills = [
    { userId: sarah.id, skillId: skillMap["Flutter Development"].id, level: "expert", description: "5+ years building production Flutter apps" },
    { userId: sarah.id, skillId: skillMap["React Development"].id, level: "advanced", description: "React & Next.js specialist" },
    { userId: kenji.id, skillId: skillMap["Japanese Language"].id, level: "expert", description: "Certified JLPT instructor" },
    { userId: marcus.id, skillId: skillMap["Blender 3D"].id, level: "advanced", description: "Professional 3D modeling and animation" },
    { userId: marcus.id, skillId: skillMap["Video Editing"].id, level: "intermediate", description: "Video editing with DaVinci Resolve" },
    { userId: amira.id, skillId: skillMap["UI/UX Design"].id, level: "expert", description: "Lead designer with 6 years experience" },
    { userId: amira.id, skillId: skillMap["Graphic Design"].id, level: "advanced", description: "Brand identity and visual design" },
    { userId: david.id, skillId: skillMap["Public Speaking"].id, level: "expert", description: "TEDx speaker and communication coach" },
    { userId: david.id, skillId: skillMap["Digital Marketing"].id, level: "advanced", description: "Growth marketing strategist" },
    { userId: elena.id, skillId: skillMap["Photography"].id, level: "expert", description: "Award-winning photographer" },
    { userId: elena.id, skillId: skillMap["Python Programming"].id, level: "intermediate", description: "Python for data visualization" },
  ];

  for (const us of userSkills) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: us.userId, skillId: us.skillId } },
      update: {},
      create: us,
    });
  }

  // ── User Skill Desires (learn) ───────────────────────────────────────
  const desires = [
    { userId: sarah.id, skillId: skillMap["Blender 3D"].id },
    { userId: sarah.id, skillId: skillMap["Video Editing"].id },
    { userId: kenji.id, skillId: skillMap["Flutter Development"].id },
    { userId: kenji.id, skillId: skillMap["React Development"].id },
    { userId: marcus.id, skillId: skillMap["Python Programming"].id },
    { userId: marcus.id, skillId: skillMap["Flutter Development"].id },
    { userId: amira.id, skillId: skillMap["Japanese Language"].id },
    { userId: amira.id, skillId: skillMap["Guitar"].id },
    { userId: david.id, skillId: skillMap["Graphic Design"].id },
    { userId: david.id, skillId: skillMap["Python Programming"].id },
    { userId: elena.id, skillId: skillMap["Flutter Development"].id },
    { userId: elena.id, skillId: skillMap["UI/UX Design"].id },
  ];

  for (const d of desires) {
    await prisma.userSkillDesire.upsert({
      where: { userId_skillId: { userId: d.userId, skillId: d.skillId } },
      update: {},
      create: d,
    });
  }

  // ── Portfolio Items ──────────────────────────────────────────────────
  const portfolios = [
    { userId: sarah.id, title: "E-Commerce App", description: "A full-featured shopping app built with Flutter", type: "link", url: "https://example.com/project1" },
    { userId: sarah.id, title: "Flutter Certification", description: "Google Associate Android Developer", type: "certificate", url: "https://example.com/cert1" },
    { userId: kenji.id, title: "Japanese Learning Channel", description: "YouTube channel with 50k subscribers", type: "link", url: "https://example.com/channel" },
    { userId: marcus.id, title: "3D Character Collection", description: "A series of stylized 3D characters", type: "image", url: "https://example.com/portfolio" },
    { userId: amira.id, title: "Design System", description: "Comprehensive design system for a SaaS product", type: "link", url: "https://example.com/design" },
    { userId: elena.id, title: "Photo Exhibition", description: "Solo exhibition at Berlin Art Gallery", type: "image", url: "https://example.com/exhibition" },
  ];

  for (const p of portfolios) {
    await prisma.portfolioItem.create({ data: p });
  }

  // ── Swap Requests (4) ────────────────────────────────────────────────
  await prisma.swapRequest.createMany({
    data: [
      {
        requesterId: sarah.id,
        receiverId: kenji.id,
        skillOffered: "Flutter Development",
        skillWanted: "Japanese Language",
        message: "Hi Kenji! I'd love to learn Japanese. I can teach you Flutter development in return.",
        status: "accepted",
      },
      {
        requesterId: marcus.id,
        receiverId: sarah.id,
        skillOffered: "Blender 3D",
        skillWanted: "Flutter Development",
        message: "Hey Sarah! I can teach you Blender 3D if you're interested in a swap!",
        status: "pending",
      },
      {
        requesterId: sarah.id,
        receiverId: david.id,
        skillOffered: "React Development",
        skillWanted: "Public Speaking",
        message: "Hi David! I need help with public speaking for tech conferences.",
        status: "completed",
      },
      {
        requesterId: amira.id,
        receiverId: sarah.id,
        skillOffered: "UI/UX Design",
        skillWanted: "Flutter Development",
        message: "Hi Sarah! I'd love to learn Flutter for prototyping. I can teach you UI/UX design!",
        status: "accepted",
      },
    ],
  });

  // ── Reviews (3) ──────────────────────────────────────────────────────
  await prisma.review.createMany({
    data: [
      {
        authorId: kenji.id,
        targetId: sarah.id,
        rating: 5,
        communication: 5,
        teachingQuality: 5,
        reliability: 5,
        comment: "Sarah is an amazing Flutter teacher! She explains complex concepts clearly and is always patient. Highly recommend!",
      },
      {
        authorId: david.id,
        targetId: sarah.id,
        rating: 5,
        communication: 5,
        teachingQuality: 5,
        reliability: 4,
        comment: "Incredible React skills and very responsive. Our skill swap was one of the best learning experiences I've had.",
      },
      {
        authorId: amira.id,
        targetId: sarah.id,
        rating: 4,
        communication: 5,
        teachingQuality: 4,
        reliability: 5,
        comment: "Great experience learning Flutter basics. Sarah made the sessions fun and engaging!",
      },
    ],
  });

  // ── Conversations & Messages ──────────────────────────────────────────
  const conv1 = await prisma.conversation.create({ data: {} });
  await prisma.conversationParticipant.createMany({
    data: [
      { userId: sarah.id, conversationId: conv1.id },
      { userId: kenji.id, conversationId: conv1.id },
    ],
  });
  await prisma.message.createMany({
    data: [
      { conversationId: conv1.id, senderId: kenji.id, content: "Konnichiwa Sarah! Ready for our first lesson?" },
      { conversationId: conv1.id, senderId: sarah.id, content: "Yes! I'm so excited. Should we start with hiragana?" },
      { conversationId: conv1.id, senderId: kenji.id, content: "Great idea! Let me share a practice sheet." },
      { conversationId: conv1.id, senderId: sarah.id, content: "Awesome! Let's schedule our next session for Thursday evening?" },
    ],
  });

  const conv2 = await prisma.conversation.create({ data: {} });
  await prisma.conversationParticipant.createMany({
    data: [
      { userId: sarah.id, conversationId: conv2.id },
      { userId: amira.id, conversationId: conv2.id },
    ],
  });
  await prisma.message.createMany({
    data: [
      { conversationId: conv2.id, senderId: amira.id, content: "Hi Sarah! I put together some design principles for your Flutter app. Want to review them together?" },
      { conversationId: conv2.id, senderId: sarah.id, content: "That would be amazing! I've been struggling with the color palette for my new project." },
      { conversationId: conv2.id, senderId: amira.id, content: "I'll send you a Figma file with some options. Also, can you help me with Flutter animations?" },
    ],
  });

  // ── Notifications (7) ────────────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { userId: sarah.id, type: "swap_request", title: "New Swap Request", description: "Marcus Rivera wants to swap Blender 3D for your Flutter Development", link: "/swaps", avatar: "/avatars/marcus.jpg" },
      { userId: sarah.id, type: "swap_accepted", title: "Swap Accepted!", description: "Amira Patel accepted your UI/UX Design swap request", link: "/chat", avatar: "/avatars/amira.jpg" },
      { userId: sarah.id, type: "message", title: "New Message", description: "Kenji Tanaka sent you a message about your Japanese lesson", link: "/chat", avatar: "/avatars/kenji.jpg" },
      { userId: sarah.id, type: "match", title: "Perfect Match Found!", description: "We found a 95% match for your learning goals", link: "/dashboard" },
      { userId: sarah.id, type: "review", title: "New Review", description: "David Kim left you a 5-star review for Public Speaking", link: "/profile/sarahchen", avatar: "/avatars/david.jpg" },
      { userId: sarah.id, type: "swap_completed", title: "Swap Completed", description: "Your skill swap with David Kim has been marked as complete", link: "/swaps", avatar: "/avatars/david.jpg" },
      { userId: sarah.id, type: "system", title: "Level Up!", description: "Congratulations! You reached Level 4 — Tree 🌳", link: "/dashboard" },
    ],
  });

  console.log("✅ Database seeded successfully!");
  console.log(`   - ${skills.length} skills`);
  console.log(`   - 6 users (password: "password123")`);
  console.log(`   - ${userSkills.length} user skills`);
  console.log(`   - ${desires.length} skill desires`);
  console.log(`   - ${portfolios.length} portfolio items`);
  console.log(`   - 4 swap requests`);
  console.log(`   - 3 reviews`);
  console.log(`   - 2 conversations with messages`);
  console.log(`   - 7 notifications`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
