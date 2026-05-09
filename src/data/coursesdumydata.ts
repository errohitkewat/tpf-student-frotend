export type Course = {
  status: ReactNode
  name: ReactNode
  
  id: string
  title: string
  duration: number
  descriptionInDetail?: string | null
  descriptionInShort: string
  imageForThumbnail?: string | null
  roadmap?: string | null
  totalFees: number
  offeredFees?: number | null
  instractionMode?: string | null
  isActive: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}



export const courses: Course[] = [
  {
    id: "course_1",
    title: "Full Stack Web Development",
    duration: 6,
    descriptionInDetail:
      "This course covers frontend and backend development including React, Next.js, Node.js, Express, MongoDB, and deployment strategies.",
    descriptionInShort: "Become a complete Full Stack Developer.",
    imageForThumbnail: "/images/fullstack.jpg",
    roadmap: "HTML → CSS → JavaScript → React → Next.js → Node → Database → Deployment",
    totalFees: 45000,
    offeredFees: 35000,
    instractionMode: "Offline",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_2",
    title: "Data Structures & Algorithms",
    duration: 4,
    descriptionInDetail:
      "Deep understanding of DSA including arrays, linked list, stack, queue, trees, graphs and competitive programming.",
    descriptionInShort: "Master DSA for placements.",
    imageForThumbnail: "/images/dsa.jpg",
    roadmap: "Basics → Recursion → Sorting → Trees → Graphs → DP",
    totalFees: 30000,
    offeredFees: null,
    instractionMode: "Online",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_3",
    title: "UI/UX Design Mastery",
    duration: 3,
    descriptionInDetail:
      "Learn UI/UX principles, wireframing, prototyping, Figma, user research and real-world project execution.",
    descriptionInShort: "Design modern & user-friendly interfaces.",
    imageForThumbnail: "/images/uiux.jpg",
    roadmap: "Design Basics → Color Theory → Figma → UX Research → Live Project",
    totalFees: 25000,
    offeredFees: 20000,
    instractionMode: "Hybrid",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_4",
    title: "Digital Marketing Pro",
    duration: 5,
    descriptionInDetail:
      "SEO, Google Ads, Facebook Ads, Instagram marketing, content strategy, analytics, and freelancing setup.",
    descriptionInShort: "Build your career in Digital Marketing.",
    imageForThumbnail: null,
    roadmap: "SEO → Social Media → Ads → Analytics → Client Projects",
    totalFees: 28000,
    offeredFees: 24000,
    instractionMode: "Online",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_5",
    title: "Full Stack Web Development",
    duration: 6,
    descriptionInDetail:
      "This course covers frontend and backend development including React, Next.js, Node.js, Express, MongoDB, and deployment strategies.",
    descriptionInShort: "Become a complete Full Stack Developer.",
    imageForThumbnail: "/images/fullstack.jpg",
    roadmap: "HTML → CSS → JavaScript → React → Next.js → Node → Database → Deployment",
    totalFees: 45000,
    offeredFees: 35000,
    instractionMode: "Offline",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_6",
    title: "Data Structures & Algorithms",
    duration: 4,
    descriptionInDetail:
      "Deep understanding of DSA including arrays, linked list, stack, queue, trees, graphs and competitive programming.",
    descriptionInShort: "Master DSA for placements.",
    imageForThumbnail: "/images/dsa.jpg",
    roadmap: "Basics → Recursion → Sorting → Trees → Graphs → DP",
    totalFees: 30000,
    offeredFees: null,
    instractionMode: "Online",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_7",
    title: "UI/UX Design Mastery",
    duration: 3,
    descriptionInDetail:
      "Learn UI/UX principles, wireframing, prototyping, Figma, user research and real-world project execution.",
    descriptionInShort: "Design modern & user-friendly interfaces.",
    imageForThumbnail: "/images/uiux.jpg",
    roadmap: "Design Basics → Color Theory → Figma → UX Research → Live Project",
    totalFees: 25000,
    offeredFees: 20000,
    instractionMode: "Hybrid",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "course_8",
    title: "Digital Marketing Pro",
    duration: 5,
    descriptionInDetail:
      "SEO, Google Ads, Facebook Ads, Instagram marketing, content strategy, analytics, and freelancing setup.",
    descriptionInShort: "Build your career in Digital Marketing.",
    imageForThumbnail: null,
    roadmap: "SEO → Social Media → Ads → Analytics → Client Projects",
    totalFees: 28000,
    offeredFees: 24000,
    instractionMode: "Online",
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]