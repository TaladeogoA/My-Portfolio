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
import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "Compre",
    subtitle: "Distributor Infrastructure for Pharmaceuticals",
    shortDescription:
      "A B2B platform that helps pharmaceutical distributors run inventory, credit, and retailer workflows with greater clarity.",
    description:
      "Pharmaceutical distributors need to keep stock, customer credit, and retailer orders moving at the same time. Compre is a distributor-first platform designed to bring those operational workflows into one practical system.",
    constraints:
      "The work crossed a distributor web app and supporting mobile experiences, where order and credit actions needed to stay understandable while product data, notifications, and releases moved quickly.",
    contribution:
      "I built and maintained the distributor-facing web app and supporting mobile experiences, including order and credit workflows, bulk product uploads, deep linking, and production releases.",
    decisions:
      "For bulk uploads, I used real-time WebSocket feedback so people could see progress rather than wait without context. I also connected push notifications and emails to the right in-app destination through deep links, reducing the steps between an alert and the task it referred to.",
    technicalHighlights: [
      "Built distributor-facing web application",
      "Supported mobile experiences for distributors and retailers",
      "Implemented bulk upload system with real-time WebSocket feedback",
      "Handled order and credit workflows",
      "Built deep linking across notifications and emails",
      "Managed OTA updates and store deployments",
    ],
    impact: [
      { value: "2", label: "Mobile Apps" },
      { value: "1", label: "Web App" },
    ],
    techStack:
      "React Native • React • TypeScript • Expo • Zustand • WebSockets • Push Notifications",
    assets: [
      {
        type: "image",
        url: CompreOne,
      },
      {
        type: "image",
        url: CompreTwo,
      },
      {
        type: "image",
        url: CompreThree,
      },
      {
        type: "image",
        url: CompreFour,
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
    id: "02",
    title: "Famasi",
    subtitle: "Consumer Pharmacy Platform",
    shortDescription:
      "A consumer pharmacy platform for discovering, ordering, and receiving medication across Nigeria.",
    description:
      "Famasi connects people with nearby pharmacies for medication discovery, ordering, and delivery. The product needed a dependable customer experience across web and mobile, particularly at the points where people search, check out, and pay.",
    constraints:
      "The platform served customers and pharmacies across web, iOS, and Android, with a small engineering team and the practical performance constraints of an emerging-market consumer product.",
    contribution:
      "As the sole frontend engineer, I built and maintained multiple production products across web and mobile. I developed the iOS and Android app, kept it aligned with the web platform, and worked through checkout and payment issues in production.",
    decisions:
      "I refactored legacy checkout flows and fixed critical payment bugs to make a high-intent moment more reliable. Alongside that core work, I shipped Famasi Wrapped as a personalised animated experience and integrated a LiveKit-powered AI assistant to collect conversational feedback from users.",
    technicalHighlights: [
      "Sole frontend engineer across web and mobile products",
      "Built and shipped iOS and Android apps using React Native and Expo",
      "Refactored checkout and payment flows to fix critical production bugs",
      "Built animated Famasi Wrapped experience using Reanimated",
      "Integrated LiveKit-powered AI assistant for user feedback collection",
    ],
    impact: [
      { value: "3", label: "Platforms" },
      { value: "Prod", label: "App Stores" },
    ],
    techStack:
      "React Native • React • TypeScript • Expo • Zustand • Firebase • Tailwind CSS • Socket.IO • LiveKit",
    assets: [
      {
        type: "image",
        url: FamasiOne,
      },
      {
        type: "image",
        url: FamasiTwo,
      },
      {
        type: "image",
        url: FamasiThree,
      },
      {
        type: "image",
        url: FamasiFour,
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
    id: "03",
    title: "Dispensary",
    subtitle: "Pharmacy Operations App",
    shortDescription:
      "A pharmacy operations app for orders, inventory, and storefront configuration—rebuilt and prepared for everyday use.",
    description:
      "Dispensary supports day-to-day pharmacy operations: orders, inventory, and the storefront details customers rely on. It was built for environments where connectivity can be unreliable, making dependable behaviour part of the product experience.",
    constraints:
      "The app had to serve operational users in low-connectivity conditions, adopt an entirely new product design, and reach the App Store and Google Play for the first time while continuing to support a live business.",
    contribution:
      "I took over the existing mobile application and implemented the new product design across the app. I owned its first App Store and Google Play submissions, release pipelines, OTA updates, and ongoing production support.",
    decisions:
      "I extended the product to the web with Expo for Web and built self-service storefront configuration, so pharmacies could manage their own branding, domains, business details, and operating hours without depending on a manual setup process.",
    technicalHighlights: [
      "Reimplemented the entire app UI based on a new design system",
      "Submitted the app to the App Store and Google Play for the first time",
      "Set up OTA updates and ongoing production release pipelines",
      "Deployed React Native app to web using Expo for Web",
      "Built storefront configuration system for pharmacy self-service",
    ],
    impact: [
      { value: "Web", label: "Deployment" },
      { value: "OTA", label: "Updates" },
    ],
    techStack:
      "React Native • Expo • TypeScript • Zustand • Socket.IO • DigitalOcean",
    assets: [
      {
        type: "image",
        url: DispensaryOne,
      },
      {
        type: "image",
        url: DispensaryTwo,
      },
      {
        type: "image",
        url: DispensaryThree,
      },
      {
        type: "image",
        url: DispensaryFour,
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
    id: "04",
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
    impact: [
      { value: "Stability", label: "Improved" },
      { value: "Perf", label: "Upgrade" },
    ],
    techStack:
      "React Native • TypeScript • Swift • Java • Native Modules • Push Notifications",
    assets: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088036/octodoc-two_wfkbvr.jpg",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088033/octodoc-one_mhfuhr.png",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/v1761088021/marketplace-four_fmwlpn.png",
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
