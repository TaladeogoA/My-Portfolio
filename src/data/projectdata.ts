import { Project } from "../../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "Gather - Culinary Portfolio",
    problem:
      "Professional chefs and culinary artists needed a modern platform to showcase their recipes and expertise. Traditional recipe websites lacked the visual appeal needed for culinary presentation, while existing portfolio solutions weren't optimized for recipe content.",
    solution:
      "I developed a chef-centric platform that prioritizes visual presentation and content management. The solution leverages Next.js 14 and Sanity CMS to deliver a seamless content management experience, while maintaining the performance and responsiveness needed for image-heavy culinary portfolios.",
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
    images: [
      "https://picsum.photos/500/300?random=1",
      "https://picsum.photos/500/300?random=2",
      "https://picsum.photos/500/300?random=3",
    ],
    live: "https://gather-recipes.vercel.app",
    source: "https://github.com/example/gather",
    duration: "1 month",
    year: "2024",
  },
  {
    id: "02",
    title: "E-commerce Dashboard",
    problem:
      "E-commerce businesses needed a comprehensive dashboard to monitor sales, track performance, and manage inventory. Existing solutions were either too complex and bloated or lacked essential features.",
    solution:
      "I developed a modern dashboard application that provides a unified interface for e-commerce store management. The solution offers real-time updates, role-based access control, and advanced reporting features to help businesses make informed decisions.",
    technicalHighlights: [
      "Server components and streaming for faster page loads",
      "Real-time updates with Server-Sent Events",
      "Dynamic PDF generation for reports",
      "Role-based access control",
      "Optimistic UI updates for better UX",
      "Advanced charting with D3.js",
    ],
    techStack: "Next.js 14 • TypeScript • TailwindCSS • Prisma • tRPC • D3.js",
    images: [
      "https://picsum.photos/500/300?random=1",
      "https://picsum.photos/500/300?random=2",
      "https://picsum.photos/500/300?random=3",
    ],
    live: "https://dashboard-demo.com",
    source: "https://github.com/example/dashboard",
    duration: "3 months",
    year: "2023",
  },
  {
    id: "03",
    title: "AR Product Viewer",
    problem:
      "E-commerce businesses needed a way to showcase products in AR to improve customer engagement and drive sales. Existing AR solutions were fragmented and lacked support for older devices.",
    solution:
      "I developed a cross-platform AR viewer application that allows users to visualize products in their physical space. The solution leverages ARKit and ARCore to provide a consistent AR experience across iOS and Android devices, while optimizing performance for older smartphones.",
    technicalHighlights: [
      "Platform-specific AR implementations unified API",
      "3D model optimization and caching",
      "Custom gesture handling for object manipulation",
      "Lighting estimation and shadow rendering",
      "Performance optimization for older devices",
      "Progressive asset loading",
    ],
    techStack: "React Native • TypeScript • ARKit • ARCore • Three.js • Redux",
    images: [
      "https://picsum.photos/500/300?random=1",
      "https://picsum.photos/500/300?random=2",
      "https://picsum.photos/500/300?random=3",
    ],
    live: "https://apps.apple.com/app",
    source: "https://github.com/example/ar-viewer",
    duration: "6 months",
    year: "2023",
  },
  {
    id: "04",
    title: "Health & Fitness Tracker",
    problem:
      "Fitness enthusiasts needed a comprehensive health and fitness tracking app to monitor their progress and stay motivated. Existing fitness apps were either too complex and overwhelming or lacked essential features.",
    solution:
      "I developed a user-centric fitness tracking app that focuses on simplicity and usability. The solution offers seamless integration with HealthKit and Google Fit, background activity monitoring, and intelligent workout suggestions to help users achieve their fitness goals.",
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
    images: [
      "https://picsum.photos/500/300?random=1",
      "https://picsum.photos/500/300?random=2",
      "https://picsum.photos/500/300?random=3",
    ],
    live: "https://play.google.com/store",
    source: "https://github.com/example/fitness",
    duration: "5 months",
    year: "2023",
  },
];
