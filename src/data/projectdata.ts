import CompreFour from "../assets/compre-four.webp";
import CompreOne from "../assets/compre-one.webp";
import CompreThree from "../assets/compre-three.webp";
import CompreTwo from "../assets/compre-two.webp";
import DispensaryFour from "../assets/dispensary-four.webp";
import DispensaryOne from "../assets/dispensary-one.webp";
import DispensaryThree from "../assets/dispensary-three.webp";
import DispensaryTwo from "../assets/dispensary-two.webp";
import FamasiFour from "../assets/famasi-four.webp";
import FamasiOne from "../assets/famasi-one.webp";
import FamasiThree from "../assets/famasi-three.webp";
import FamasiTwo from "../assets/famasi-two.webp";
import PineLeapOne from "../assets/pineleap-one.webp";
import PineLeapThree from "../assets/pineleap-three.webp";
import PineLeapTwo from "../assets/pineleap-two.webp";
import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "PineLeap",
    subtitle: "B2B SaaS for Turning Conversations Into Action",
    shortDescription:
      "A B2B SaaS platform that helps founders, investors and teams turn conversations into structured outcomes, from meetings and goals to actions and resources.",
    description:
      "PineLeap is a SaaS product built around turning conversations into useful, structured work. The platform brings together meetings, conversations, goals, actions, resources and user profiles, with supporting workflows for onboarding, permissions, billing and calendar integrations.",
    constraints:
      "The product has a wide range of interconnected workflows and permission levels. That means navigation, access control, loading and error states, destructive actions and incomplete data all need to behave predictably rather than leaving users to figure out what happened.",
    contribution:
      "I built PineLeap’s frontend from scratch, owning the frontend architecture and implementing the core product workflows. My work spans authentication, permissions, billing, calendars, onboarding, conversations, goals, actions, resources, profiles and the public visitor experience.",
    decisions:
      "I focused on making complex workflows understandable through clear states and feedback. That included skeleton and loading states, useful empty and error states, explicit permission messaging, confirmations for destructive actions, and interaction patterns that work across different screen sizes rather than treating mobile as a smaller version of desktop.",
    technicalHighlights: [
      "Built the frontend from scratch across 39 routes and 400+ component files",
      "Implemented authentication, access control and role-based permissions",
      "Built core workflows across meetings, conversations, goals, actions and resources",
      "Implemented Stripe billing and subscription workflows",
      "Integrated Google Calendar and Outlook calendar workflows",
      "Built the public visitor experience and supporting profile workflows",
      "Built reusable UI components, data-fetching patterns and application state management",
      "Implemented loading, empty, error and graceful-degradation states across complex workflows",
      "Worked with React, Next.js, TypeScript and Tailwind CSS",
    ],
    techStack:
      "Next.js • React • TypeScript • Tailwind CSS • TanStack Query • Zustand • Framer Motion • React Hook Form • Zod • Stripe",
    assets: [
      {
        type: "image",
        url: PineLeapOne,
        width: 1512,
        height: 1210,
        alt: "PineLeap dashboard",
      },
      {
        type: "image",
        url: PineLeapTwo,
        width: 1512,
        height: 982,
        alt: "PineLeap meetings calendar",
      },
      {
        type: "image",
        url: PineLeapThree,
        width: 1512,
        height: 982,
        alt: "PineLeap conversations list",
      },
    ],
    live: "",
    source: "",
    duration: "Ongoing",
    year: "2026",
  },
  {
    id: "02",
    title: "Compre",
    subtitle: "Distributor Infrastructure for Pharmaceuticals",
    shortDescription:
      "A B2B platform that helps pharmaceutical distributors manage inventory, credit, orders and retailer relationships in one place.",
    description:
      "Compre is a B2B pharmaceutical marketplace and operations platform connecting pharmacies with pharmaceutical distributors. The product brings together workflows that normally involve a lot of moving parts: inventory, orders, payments, credit and business management.",
    constraints:
      "The product spans mobile, web and backend services, and some of its users work in environments where connectivity is unreliable. That means things like order state, payment status, notifications and user input need to be handled carefully rather than assuming everything will always work perfectly.",
    contribution:
      "I work across Compre’s mobile, web and backend applications. I was a founding engineer on the mobile app and have built and maintained core workflows across ordering, procurement, payments, inventory, credit and business management. I also work on the supplier dashboard and internal tools.",
    decisions:
      "For workflows like bulk product uploads, I used real-time feedback so users could see what was happening instead of waiting with no indication of progress. I also connected notifications and emails to the relevant parts of the app with deep links, making it easier to go from an alert to the task it referred to.",
    technicalHighlights: [
      "Built and maintained the retailer and supplier mobile experiences",
      "Built features across the supplier dashboard and internal tools",
      "Implemented bulk product uploads with real-time WebSocket feedback",
      "Built and maintained order, payment and credit workflows",
      "Implemented deep linking from notifications and emails",
      "Worked across React Native, React and Kotlin services",
      "Managed mobile releases, OTA updates and store deployments",
    ],
    techStack:
      "React Native • React • TypeScript • Expo • Zustand • WebSockets • Push Notifications • Kotlin",
    assets: [
      {
        type: "image",
        url: CompreOne,
        width: 1024,
        height: 500,
        alt: "Compre mobile app ordering screens",
      },
      {
        type: "image",
        url: CompreTwo,
        width: 1024,
        height: 500,
        alt: "Compre mobile app distributor list",
      },
      {
        type: "image",
        url: CompreThree,
        width: 1024,
        height: 500,
        alt: "Compre mobile app order tracking",
      },
      {
        type: "image",
        url: CompreFour,
        width: 1024,
        height: 500,
        alt: "Compre mobile app business overview",
      },
    ],
    live: "https://distributor.getcompre.com",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/compre/id6746078785",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.compre.compreapp",
    duration: "Ongoing",
    year: "2025",
  },
  {
    id: "03",
    title: "Famasi",
    subtitle: "Consumer Pharmacy Platform",
    shortDescription:
      "A consumer pharmacy platform for discovering, ordering and receiving medication through a network of pharmacies.",
    description:
      "Famasi connects customers with pharmacies for medication discovery, ordering and delivery. I worked across several of its web and mobile products, with much of the work centred around making the customer experience reliable at the points where people search, order and pay.",
    constraints:
      "The products ran across web, iOS and Android and were being actively used while they continued to evolve. That meant new features often had to fit into existing production systems, while bugs and reliability issues still needed to be dealt with.",
    contribution:
      "I worked as the sole frontend engineer across multiple Famasi products, building and maintaining the React Native applications alongside the web platform. I also handled production releases, updates and ongoing fixes across the products.",
    decisions:
      "I worked on the checkout and payment flows to fix issues affecting a particularly important part of the customer journey. I also built Famasi Wrapped as an animated, personalised experience using Reanimated, and worked on an AI-assisted conversational experience for collecting user feedback.",
    technicalHighlights: [
      "Built and shipped the iOS and Android consumer application with React Native and Expo",
      "Worked across multiple production web and mobile products",
      "Refactored checkout flows and fixed critical payment issues",
      "Built the animated Famasi Wrapped experience with Reanimated",
      "Integrated a LiveKit-powered conversational experience for user feedback",
      "Managed production releases and updates across the mobile products",
    ],
    techStack:
      "React Native • React • TypeScript • Expo • Reanimated • Zustand • Firebase • Tailwind CSS • Socket.IO • LiveKit",
    assets: [
      {
        type: "image",
        url: FamasiOne,
        width: 1920,
        height: 1080,
        alt: "Famasi mobile app",
      },
      {
        type: "image",
        url: FamasiTwo,
        width: 1920,
        height: 1080,
        alt: "Famasi mobile app medication search",
      },
      {
        type: "image",
        url: FamasiThree,
        width: 1920,
        height: 1080,
        alt: "Famasi mobile app pharmacy results",
      },
      {
        type: "image",
        url: FamasiFour,
        width: 1920,
        height: 1080,
        alt: "Famasi mobile app care plan",
      },
    ],
    live: "https://famasi.africa",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/famasi/id6473138815",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.famasi.app",
    duration: "2025 - Feb 2026",
    year: "2025 - 2026",
  },
  {
    id: "04",
    title: "Dispensary",
    subtitle: "Pharmacy Operations App",
    shortDescription:
      "A pharmacy operations app for managing orders, inventory and storefronts, rebuilt for production use across mobile and web.",
    description:
      "Dispensary is used by pharmacies for day-to-day operations including orders, inventory and storefront management. I took over the existing application while a new product direction was being implemented, with the additional challenge of getting the app into the app stores and supporting users in environments where connectivity can be unreliable.",
    constraints:
      "The app needed a substantial UI reimplementation, had to continue supporting a live business, and needed to go through its first App Store and Google Play submissions. The product also needed to work beyond the original mobile application.",
    contribution:
      "I took over the existing React Native application and implemented the new product design across the app. I owned the first App Store and Google Play submissions, release pipelines, OTA updates and ongoing production support. I also extended the application to the web.",
    decisions:
      "I used Expo for Web to extend the application beyond mobile, and built self-service storefront configuration so pharmacies could manage their branding, domains, business details and operating hours themselves rather than relying on manual setup.",
    technicalHighlights: [
      "Reimplemented the application UI based on the new product design",
      "Took the application through its first App Store and Google Play submissions",
      "Set up OTA updates and production release pipelines",
      "Extended the React Native application to the web with Expo for Web",
      "Built self-service storefront configuration for pharmacies",
      "Supported the application in production across mobile and web",
    ],
    techStack:
      "React Native • Expo • TypeScript • Zustand • Socket.IO • DigitalOcean",
    assets: [
      {
        type: "image",
        url: DispensaryOne,
        width: 2868,
        height: 1320,
        alt: "Dispensary pharmacy operations app sales overview",
      },
      {
        type: "image",
        url: DispensaryTwo,
        width: 2868,
        height: 1320,
        alt: "Dispensary pharmacy operations app",
      },
      {
        type: "image",
        url: DispensaryThree,
        width: 2868,
        height: 1320,
        alt: "Dispensary pharmacy operations app inventory alerts",
      },
      {
        type: "image",
        url: DispensaryFour,
        width: 2868,
        height: 1320,
        alt: "Dispensary pharmacy operations app",
      },
    ],
    live: "",
    source: "",
    appStoreUrl:
      "https://apps.apple.com/us/app/dispensaryos-by-famasi/id6748520071",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.dispensarypos",
    duration: "2025 - Feb 2026",
    year: "2025 - 2026",
  },
  {
    id: "05",
    title: "Octosoft Technologies",
    subtitle: "Telemedicine & Digital Health",
    shortDescription:
      "A telemedicine platform providing video consultations, appointment reminders, and health plan comparisons.",
    description:
      "Octosoft builds digital health products focused on improving access to healthcare through telemedicine, real-time notifications, and provider comparison tools.",
    constraints:
      "The work involved an existing mobile codebase and platform-specific integrations that needed to remain stable while the product evolved.",
    contribution:
      "I built appointment reminders and real-time notifications to reduce missed consultations, led a major dependency update and performance overhaul of the mobile codebase, and developed a health plan comparison marketplace with side-by-side provider evaluation.",
    decisions:
      "I focused on making time-sensitive information easier to act on through reminders, notifications, and side-by-side comparison rather than adding complexity to the care journey.",
    technicalHighlights: [
      "Built appointment reminders and real-time notifications",
      "Led dependency upgrades and performance stabilization",
      "Developed health plan comparison marketplace",
      "Worked with native modules and platform-specific APIs",
    ],
    techStack:
      "React Native • TypeScript • Swift • Java • Native Modules • Push Notifications",
    assets: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088036/octodoc-two_wfkbvr.jpg",
        width: 900,
        height: 690,
        alt: "Octodoc mobile app screens",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088033/octodoc-one_mhfuhr.png",
        width: 900,
        height: 702,
        alt: "Octodoc mobile app",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088021/marketplace-four_fmwlpn.png",
        width: 900,
        height: 702,
        alt: "Octodoc health plans website",
      },
    ],
    live: "https://www.octodoc.com/",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/octodoc/id1606125098",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=ai.octosoft.octodoc",
    duration: "18 months",
    year: "2023",
  },
];
