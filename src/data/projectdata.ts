import GatherDesktop from "../assets/gather-pc.png";
import GatherPhone from "../assets/gather-phone.png";
import GatherTab from "../assets/gather-tab.png";
import LauncherFour from "../assets/launcher-four.png";
import LauncherOne from "../assets/launcher-one.png";
import LauncherThree from "../assets/launcher-three.png";
import LauncherTwo from "../assets/launcher-two.png";
import MarketplaceFour from "../assets/marketplace-four.png";
import MarketplaceOne from "../assets/marketplace-one.png";
import MarketplaceThree from "../assets/marketplace-three.png";
import MarketplaceTwo from "../assets/marketplace-two.png";
import MobannOne from "../assets/mobann-one.png";
import MobannThree from "../assets/mobann-three.png";
import MobannTwo from "../assets/mobann-two.png";
import OctodocFour from "../assets/octodoc-four.png";
import OctodocOne from "../assets/octodoc-one.png";
import OctodocThree from "../assets/octodoc-three.png";
import OctodocTwo from "../assets/octodoc-two.jpg";

import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "OctoDoc Mobile",
    subtitle: "OctoDoc - Revolutionizing Healthcare Access",
    description:
      "OctoDoc is a comprehensive healthcare platform that connects patients with healthcare providers through real-time communication and appointment management. The mobile app enables seamless healthcare delivery and consultation.",
    contribution:
      "I played a key role in enhancing the React Native application, implementing critical features like real-time native call alerts and modernizing the codebase. Led a major dependency update project that involved substantial rewriting to improve app performance and user experience.",
    technicalHighlights: [
      "Real-time native call feature implementation",
      "Major dependency updates and codebase modernization",
      "Performance optimization and bug fixes",
      "Cross-platform compatibility for iOS and Android",
      "Integration with backend services for real-time communication",
      "Comprehensive testing and quality assurance",
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
    duration: "Ongoing",
    year: "2023",
  },
  {
    id: "02",
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
        url: GatherDesktop,
      },
      {
        type: "image",
        url: GatherTab,
      },
      {
        type: "image",
        url: GatherPhone,
      },
    ],
    live: "https://recipe-website-sigma.vercel.app/",
    source: "https://github.com/TaladeogoA/recipe-website",
    duration: "1 month",
    year: "2024",
  },
  {
    id: "03",
    title: "Mobann LMS",
    subtitle: "Learning Management System for DevOps Training",
    description:
      "A comprehensive Learning Management System designed specifically for DevOps training, enabling students to learn and practice DevOps concepts through an interactive platform. The system provides structured course delivery with real-time progress tracking.",
    contribution:
      "I led the frontend development of the entire LMS platform, creating an intuitive interface that enhances the learning experience. The implementation includes interactive assessments, real-time progress tracking, and seamless content delivery.",
    technicalHighlights: [
      "Responsive interface optimized for various learning contexts",
      "Real-time progress tracking system with WebSocket integration",
      "Custom assessment module with various question types",
      "RESTful API integration for course content delivery",
      "Cross-browser compatibility optimization",
      "Performance optimization for concurrent users",
    ],
    techStack:
      "Next.js • TypeScript • Chakra UI • Redux • Context API • React Query",
    assets: [
      {
        type: "image",
        url: MobannOne,
      },
      {
        type: "image",
        url: MobannTwo,
      },
      {
        type: "image",
        url: MobannThree,
      },
    ],
    live: "https://www.mobanntechnologies.com/",
    source: "",
    duration: "4 months",
    year: "2024",
  },
  {
    id: "04",
    title: "Health Plan Marketplace",
    subtitle: "Octodoc Marketplace - Simplified Health Plan Selection",
    description:
      "A user-centric marketplace that enables customers to compare and purchase health plans from various providers. The platform simplifies the decision-making process through intuitive comparison tools and streamlined purchasing.",
    contribution:
      "Working in a two-person team, I worked on the frontend development of key marketplace features including plan comparison, advanced filtering, and purchase flow integration. Collaborated on implementing post-purchase automation for beneficiary detail collection and user onboarding.",
    technicalHighlights: [
      "Side-by-side plan comparison interface",
      "Advanced filtering system based on price and coverage",
      "Flutterwave payment integration",
      "Automated email system for beneficiary data collection",
      "Responsive design for all devices",
      "Performance optimization for large datasets",
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
    id: "05",
    title: "Mosaic",
    subtitle: "Mosaic - Your Home Screen, Your Canvas",
    description:
      "Mosaic is a hybrid Android launcher that transforms your home screen with dynamic widgets and deep customization options. Combines React Native's modern UI with Java for system-level integration.",
    contribution:
      "Currently developing this launcher from the ground up, creating a powerful widget creation system and implementing seamless integration between React Native's UI capabilities and Android's system features.",
    technicalHighlights: [
      "Custom widget creation framework with React Native",
      "Native Android integration using Java for system-level access",
      "Advanced widget layout engine for flexible arrangements",
      "Real-time widget updates and data synchronization",
      "Custom animations and transitions system",
      "Deep system integration for notifications and interactive widgets",
      "Efficient state management for widget data",
    ],
    techStack: "React Native • Java • TypeScript • Android SDK",
    assets: [
      {
        type: "image",
        url: LauncherOne,
      },
      {
        type: "image",
        url: LauncherTwo,
      },
      {
        type: "image",
        url: LauncherThree,
      },
      {
        type: "image",
        url: LauncherFour,
      },
    ],
    live: "",
    source: "",
    duration: "Ongoing",
    year: "2024",
  },
];
