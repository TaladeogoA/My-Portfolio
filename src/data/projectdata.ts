import GatherMockup from "../assets/gather-mac-mockup.png";
import GatherPhone from "../assets/gather-phone.png";
import GatherTab from "../assets/gather-tab.png";
import GatherDemo from "../assets/screen-capture.webm";
import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "Gather",
    subtitle: "Gather - A Culinary Journey Through Global Flavors",
    description:
      "Gather is the digital home of Chef Maria Rossi, where she shares her multicultural heritage and culinary expertise through beautifully crafted recipes that blend traditional techniques with modern approaches.",
    contribution:
      "I designed and developed a personalized platform that brings Chef Maria's vision to life, creating an intimate space where her stories and recipes intertwine. The website transforms her global culinary adventures into an accessible, visually rich experience that invites home cooks to explore world cuisines with confidence.",
    technicalHighlights: [
      "Headless CMS integration with Sanity for content management",
      "Advanced image optimization with blur placeholders",
      "Dynamic imports and route-based code splitting",
      "CDN integration and strategic caching layer",
      "Responsive Framer Motion animations",
      "Server-side rendering for SEO optimization",
      "Offline-first architecture with service workers",
    ],
    techStack:
      "Next.js 14 • TypeScript • Tailwind CSS • Sanity CMS • React Query • Framer Motion",
    assets: [
      {
        type: "image",
        url: GatherPhone,
      },
      {
        type: "image",
        url: GatherMockup,
      },
      {
        type: "image",
        url: GatherTab,
      },
    ],
    live: "https://recipe-website-sigma.vercel.app/",
    source: "https://github.com/TaladeogoA/recipe-website",
    duration: "1 month",
    year: "2024",
  },
  {
    id: "02",
    title: "Statwise",
    subtitle: "Statwise - Making Data Analytics Human",
    description:
      "Statwise transforms complex business analytics into clear, actionable insights for small business owners. The platform replaces overwhelming spreadsheets with intuitive visualizations and plain-language recommendations.",
    contribution:
      "I created an approachable dashboard that makes data analytics accessible to non-technical users. The design emphasizes visual storytelling and actionable insights, helping business owners make confident decisions without getting lost in the numbers.",
    technicalHighlights: [
      "Server components and streaming for faster page loads",
      "Real-time updates with Server-Sent Events",
      "Dynamic PDF generation for reports",
      "Role-based access control",
      "Optimistic UI updates for better UX",
      "Advanced charting with D3.js",
    ],
    techStack: "Next.js 14 • TypeScript • TailwindCSS • Prisma • tRPC • D3.js",
    assets: [
      {
        type: "video",
        url: GatherDemo,
      },
      {
        type: "image",
        url: GatherMockup,
      },
    ],
    live: "https://dashboard-demo.com",
    source: "https://github.com/example/dashboard",
    duration: "3 months",
    year: "2023",
  },
  {
    id: "03",
    title: "RoomLens",
    subtitle: "RoomLens - Try Before You Buy",
    description:
      "RoomLens helps furniture shoppers make confident purchases by bringing products into their homes through AR. This innovative platform bridges the gap between online shopping and the showroom experience.",
    contribution:
      "I developed an intuitive AR experience that makes virtual product placement feel natural and effortless. The solution helps retailers reduce returns while giving shoppers the confidence to make bigger purchases online.",
    technicalHighlights: [
      "Platform-specific AR implementations unified API",
      "3D model optimization and caching",
      "Custom gesture handling for object manipulation",
      "Lighting estimation and shadow rendering",
      "Performance optimization for older devices",
      "Progressive asset loading",
    ],
    techStack: "React Native • TypeScript • ARKit • ARCore • Three.js • Redux",
    assets: [
      {
        type: "video",
        url: GatherDemo,
      },
      {
        type: "image",
        url: GatherMockup,
      },
    ],
    live: "https://apps.apple.com/app",
    source: "https://github.com/example/ar-viewer",
    duration: "6 months",
    year: "2023",
  },
  {
    id: "04",
    title: "MoveWell",
    subtitle: "MoveWell - Your Personal Fitness Journey",
    description:
      "MoveWell transforms fitness tracking into a personal wellness story, helping users build sustainable habits through mindful movement and achievable goals.",
    contribution:
      "I designed an encouraging, judgment-free space that celebrates progress over perfection. The app's intelligent features adapt to each user's journey, providing personalized guidance while maintaining simplicity and ease of use.",
    technicalHighlights: [
      "HealthKit and Google Fit integration",
      "Background step counting and activity monitoring",
      "Offline workout tracking with sync queue",
      "Custom animation system for workout illustrations",
      "Intelligent workout suggestions using local ML",
      "Battery and performance optimizations",
    ],
    techStack:
      "React Native • TypeScript • Redux • React Query • Realm • TensorFlow Lite",
    assets: [
      {
        type: "video",
        url: GatherDemo,
      },
      {
        type: "image",
        url: GatherMockup,
      },
    ],
    live: "https://play.google.com/store",
    source: "https://github.com/example/fitness",
    duration: "5 months",
    year: "2023",
  },
];
