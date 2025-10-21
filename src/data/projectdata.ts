import MarketplaceFour from "../assets/marketplace-four.png";
import MarketplaceOne from "../assets/marketplace-one.png";
import MarketplaceThree from "../assets/marketplace-three.png";
import MarketplaceTwo from "../assets/marketplace-two.png";
import OctodocFour from "../assets/octodoc-four.png";
import OctodocOne from "../assets/octodoc-one.png";
import OctodocThree from "../assets/octodoc-three.png";
import OctodocTwo from "../assets/octodoc-two.jpg";

import { Project } from "../types/project";

export const data: Project[] = [
 {
  id: "07",
  title: "DispensaryOS",
  subtitle: "Smart Inventory & Order Management for Pharmacies",
  description:
    "DispensaryOS is a mobile app that helps pharmacies manage inventory, process orders, and stay connected to the Famasi platform. It works smoothly even without an internet connection, so pharmacies can keep running their business anywhere, anytime.",
  contribution:
    "I was brought in as the mobile developer to modernize the entire app. I migrated the project from plain React Native to Expo, redesigned every screen, and gave it a much cleaner, faster experience. I also built out core features like real-time order updates using Socket.IO and an offline-first setup that keeps everything in sync when the network comes back online. The goal was to make the app feel reliable even when the internet isn't.",
  technicalHighlights: [
    "Migrated the app to Expo with a cleaner, more maintainable architecture",
    "Added real-time order updates using Socket.IO",
    "Designed an offline mode that queues orders and syncs automatically later",
    "Integrated push notifications for important alerts",
    "Rebuilt every screen with a fresh UI and updated assets",
    "Added background tasks to keep sockets and sync active",
    "Improved data caching and network detection for a smoother user experience",
  ],
  techStack:
    "React Native • Expo • TypeScript • Socket.IO • Zustand • AsyncStorage • React Query • Expo Notifications • Background Fetch",
  assets: [],
  live: "",
  source: "",
  duration: "Ongoing",
  year: "2025",
},
  {
  id: "06",
  title: "Famasi Africa",
  subtitle: "Find Medications at the Best Prices Across Nigeria",
  description:
    "Famasi Africa is a web platform that helps patients find medications, compare prices, and get them delivered within an hour. It connects users with over 1000 pharmacies across Nigeria, making access to medication faster and more affordable.",
  contribution:
    "I worked on improving the platform's ordering flow, which used to have a lot of issues that stopped users from completing purchases. I refactored the entire process, from medication selection to checkout, and fixed the state management logic to make ordering smooth, consistent, and bug-free. My focus was on improving the experience so users could place orders easily and pharmacies could receive them without delay.",
  technicalHighlights: [
    "Refactored the full ordering flow with step-based state management using Zustand",
    "Added flow guards to prevent invalid navigation and maintain data consistency",
    "Optimized the multi-step order process — medication selection, delivery details, and price comparison",
    "Improved performance and SEO with server-side rendering using Vike",
    "Set up dynamic routes for medication search and URL-based data loading",
    "Integrated Supabase for authentication and data management",
    "Enabled real-time order dispatching to pharmacies via Socket.IO",
    "Revamped the interface with Tailwind CSS and Radix UI components",
    "Integrated Flutterwave for secure payments",
    "Added Google Maps support for delivery address selection",
  ],
  techStack:
    "React • TypeScript • Vite • Zustand • React Query • Tailwind CSS • Radix UI • Socket.IO Client • Supabase • Framer Motion",
  assets: [],
  live: "https://famasi.africa",
  source: "",
  duration: "Ongoing",
  year: "2025",
},
{
  id: "08",
  title: "Compre",
  subtitle: "Connecting Pharmacies with Distributors",
  description:
    "Compre is a B2B mobile platform that makes it easy for pharmacies to connect with distributors, discover products, and manage orders all in one place. The app includes two sides. One for pharmacies to browse and order from distributors, and another for distributors to manage inventory, fulfill orders, and serve customers efficiently.",
  contribution:
    "As the only mobile developer on the project, I built and maintain both the pharmacy and distributor sides of the app from scratch. I designed the entire ordering flow, created an advanced inventory system with bulk CSV uploads, and developed key features like product search, cart management, and business verification. I also manage the full build pipeline and handle releases to both the iOS App Store and Google Play.",
  technicalHighlights: [
    "Built a dual-interface architecture supporting both pharmacy and distributor roles",
    "Developed a complete ordering workflow from product discovery to checkout",
    "Implemented bulk product upload via CSV/XLS/XLSX with real-time validation",
    "Created an inventory management system with search and product categorization",
    "Built a shopping cart system that supports multiple distributors per order",
    "Added business profile management with document uploads and verification",
    "Integrated React Query for optimized data fetching and caching",
    "Handled form validation and state management using React Hook Form and Zustand",
    "Ensured smooth cross-platform experience for both iOS and Android users",
    "Set up CI/CD pipelines and managed app store deployments",
  ],
  techStack:
    "React Native • Expo • TypeScript • React Query • Zustand • React Hook Form • React Navigation • Expo Document Picker • Reanimated",
  assets: [],
  live: "https://getcompre.com/",
  source: "",
  duration: "Ongoing",
  year: "2024",
},
  {
  id: "04",
  title: "Health Plan Marketplace",
  subtitle: "Octodoc Marketplace - Simplified Health Plan Selection",
  description:
    "The Health Plan Marketplace helps customers easily compare and purchase health plans from different providers. It’s designed to simplify decision-making with a clean interface that makes plan details, coverage, and pricing easy to understand.",
  contribution:
    "Working in a two-person team, I handled the frontend development of key features like plan comparison, advanced filtering, and the purchase flow. I also helped implement automated post-purchase steps for collecting beneficiary details and onboarding new users. My goal was to make the entire process—from browsing to buying—simple, clear, and reliable.",
  technicalHighlights: [
    "Built a side-by-side plan comparison interface",
    "Developed an advanced filtering system for sorting plans by price and coverage",
    "Integrated Flutterwave for secure payments",
    "Implemented automated email workflows for beneficiary data collection",
    "Optimized performance to handle large datasets efficiently",
    "Ensured responsive design across all devices",
  ],
  techStack: "Next.js • TypeScript • Tailwind CSS • React Query",
  assets: [
    {
      type: "image",
      url: MarketplaceTwo,
    },
    {
      type: "image",
      url: MarketplaceThree,
    },
    {
      type: "image",
      url: MarketplaceOne,
    },
    {
      type: "image",
      url: MarketplaceFour,
    },
  ],
  live: "https://www.octodoc.com/",
  source: "",
  duration: "3 months",
  year: "2023",
},
  {
  id: "01",
  title: "OctoDoc Mobile",
  subtitle: "OctoDoc - Revolutionizing Healthcare Access",
  description:
    "OctoDoc is a healthcare platform that connects patients with doctors for real-time consultations and appointment management. The mobile app makes it easy for patients to access healthcare from anywhere and helps providers deliver care seamlessly.",
  contribution:
    "I played a key role in improving the OctoDoc mobile app by implementing real-time native call alerts and modernizing the overall codebase. I also led a major dependency upgrade that required rewriting several parts of the app to boost performance and stability. My focus was on creating a smoother, faster, and more reliable experience for both patients and doctors.",
  technicalHighlights: [
    "Implemented real-time native call alerts for instant doctor-patient communication",
    "Led a major dependency upgrade and codebase modernization",
    "Improved performance and fixed critical bugs across the app",
    "Ensured cross-platform compatibility for iOS and Android",
    "Integrated real-time backend communication for live consultations",
    "Contributed to testing and quality assurance to maintain reliability",
  ],
  techStack:
    "React Native • TypeScript • React Query • React Testing Library",
  assets: [
    {
      type: "image",
      url: OctodocTwo,
    },
    {
      type: "image",
      url: OctodocOne,
    },
    {
      type: "image",
      url: OctodocThree,
    },
    {
      type: "image",
      url: OctodocFour,
    },
  ],
  live: "https://play.google.com/store/apps/details?id=ai.octosoft.octodoc",
  source: "",
  duration: "12 months",
  year: "2023",
},
  // {
  //   id: "02",
  //   title: "Gather",
  //   subtitle: "Gather - A Culinary Journey Through Global Flavors",
  //   description:
  //     "Gather is the digital home of Chef Maria Rossi, where she shares her multicultural heritage and culinary expertise through beautifully crafted recipes that blend traditional techniques with modern approaches.",
  //   contribution:
  //     "I designed and developed a personalized platform that brings Chef Maria's vision to life, creating an intimate space where her stories and recipes intertwine. The website transforms her global culinary adventures into an accessible, visually rich experience that invites home cooks to explore world cuisines with confidence.",
  //   technicalHighlights: [
  //     "Headless CMS integration with Sanity for content management",
  //     "Advanced image optimization with blur placeholders",
  //     "Dynamic imports and route-based code splitting",
  //     "CDN integration and strategic caching layer",
  //     "Responsive Framer Motion animations",
  //     "Server-side rendering for SEO optimization",
  //     "Offline-first architecture with service workers",
  //   ],
  //   techStack:
  //     "Next.js 14 • TypeScript • Tailwind CSS • Sanity CMS • React Query • Framer Motion",
  //   assets: [
  //     {
  //       type: "image",
  //       url: GatherDesktop,
  //     },
  //     {
  //       type: "image",
  //       url: GatherTab,
  //     },
  //     {
  //       type: "image",
  //       url: GatherPhone,
  //     },
  //   ],
  //   live: "https://recipe-website-sigma.vercel.app/",
  //   source: "https://github.com/TaladeogoA/recipe-website",
  //   duration: "1 month",
  //   year: "2024",
  // },
  // {
  //   id: "03",
  //   title: "Mobann LMS",
  //   subtitle: "Learning Management System for DevOps Training",
  //   description:
  //     "A comprehensive Learning Management System designed specifically for DevOps training, enabling students to learn and practice DevOps concepts through an interactive platform. The system provides structured course delivery with real-time progress tracking.",
  //   contribution:
  //     "I led the frontend development of the entire LMS platform, creating an intuitive interface that enhances the learning experience. The implementation includes interactive assessments, real-time progress tracking, and seamless content delivery.",
  //   technicalHighlights: [
  //     "Responsive interface optimized for various learning contexts",
  //     "Real-time progress tracking system with WebSocket integration",
  //     "Custom assessment module with various question types",
  //     "RESTful API integration for course content delivery",
  //     "Cross-browser compatibility optimization",
  //     "Performance optimization for concurrent users",
  //   ],
  //   techStack:
  //     "Next.js • TypeScript • Chakra UI • Redux • Context API • React Query",
  //   assets: [
  //     {
  //       type: "image",
  //       url: MobannOne,
  //     },
  //     {
  //       type: "image",
  //       url: MobannTwo,
  //     },
  //     {
  //       type: "image",
  //       url: MobannThree,
  //     },
  //   ],
  //   live: "https://www.mobanntechnologies.com/",
  //   source: "",
  //   duration: "4 months",
  //   year: "2024",
  // },
  // {
  //   id: "05",
  //   title: "Mosaic",
  //   subtitle: "Mosaic - Your Home Screen, Your Canvas",
  //   description:
  //     "Mosaic is a hybrid Android launcher that transforms your home screen with dynamic widgets and deep customization options. Combines React Native's modern UI with Java for system-level integration.",
  //   contribution:
  //     "Currently developing this launcher from the ground up, creating a powerful widget creation system and implementing seamless integration between React Native's UI capabilities and Android's system features.",
  //   technicalHighlights: [
  //     "Custom widget creation framework with React Native",
  //     "Native Android integration using Java for system-level access",
  //     "Advanced widget layout engine for flexible arrangements",
  //     "Real-time widget updates and data synchronization",
  //     "Custom animations and transitions system",
  //     "Deep system integration for notifications and interactive widgets",
  //     "Efficient state management for widget data",
  //   ],
  //   techStack: "React Native • Java • TypeScript • Android SDK",
  //   assets: [
  //     {
  //       type: "image",
  //       url: LauncherOne,
  //     },
  //     {
  //       type: "image",
  //       url: LauncherTwo,
  //     },
  //     {
  //       type: "image",
  //       url: LauncherThree,
  //     },
  //     {
  //       type: "image",
  //       url: LauncherFour,
  //     },
  //   ],
  //   live: "",
  //   source: "",
  //   duration: "Ongoing",
  //   year: "2024",
  // },
];
