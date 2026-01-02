import CompreFour from "../assets/compre-four.jpg";
import CompreOne from "../assets/compre-one.jpg";
import CompreThree from "../assets/compre-three.jpg";
import CompreTwo from "../assets/compre-two.jpg";
import DispensaryFour from "../assets/dispensary-four.jpg";
import DispensaryOne from "../assets/dispensary-one.jpg";
import DispensaryThree from "../assets/dispensary-three.jpg";
import DispensaryTwo from "../assets/dispensary-two.jpg";
import FamasiFour from "../assets/famasi-four.jpg";
import FamasiOne from "../assets/famasi-one.jpg";
import FamasiThree from "../assets/famasi-three.jpg";
import FamasiTwo from "../assets/famasi-two.jpg";
import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    title: "Famasi",
    subtitle: "Consumer Pharmacy Platform",
    shortDescription:
      "A consumer-facing pharmacy app and web platform for medication discovery, ordering, and delivery across Nigeria.",
    description:
      "Famasi is a consumer pharmacy platform designed to improve access to medications by connecting users with nearby pharmacies. The product focuses on reliable ordering, optimized checkout flows, and mobile-first performance for users in emerging markets.",
    contribution:
      "As the sole frontend engineer, I built and maintained multiple production products across web and mobile. I developed the Famasi mobile app for iOS and Android, ensured feature parity with the web platform, refactored legacy checkout flows, fixed critical payment bugs, and shipped Famasi Wrapped, a personalized animated year-in-review experience. I also integrated Remi, an AI assistant using LiveKit to collect conversational user feedback.",
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
      }
    ],
    live: "https://famasi.africa",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/famasi/id6473138815",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.famasi.app",
    duration: "Ongoing",
    year: "2025",
  },
  {
    id: "02",
    title: "Dispensary",
    subtitle: "Pharmacy Operations App",
    shortDescription:
      "A pharmacy operations app for managing orders, inventory, and storefront configuration, rebuilt with a new design and shipped to app stores.",
    description:
      "Dispensary is a mobile-first pharmacy operations product built for emerging markets where internet connectivity can be unreliable. The app supports daily pharmacy workflows while maintaining stability and data integrity during network interruptions.",
    contribution:
      "I took over an existing mobile application and fully implemented a new product design across the entire app. I owned the first App Store and Google Play submissions, setting up release pipelines, OTA updates, and ongoing production support. I also deployed the React Native app to web using Expo for Web, managed production hosting, and built a storefront configuration system allowing pharmacies to manage branding, domains, business details, and operating hours.",
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
    duration: "Ongoing",
    year: "2025",
  },
  {
    id: "03",
    title: "Compre",
    subtitle: "B2B Pharmaceutical Marketplace",
    shortDescription:
      "A B2B platform connecting pharmacies and suppliers for product discovery, bulk ordering, and order tracking.",
    description:
      "Compre is a B2B pharmaceutical marketplace built to support pharmacies and suppliers with tooling for discovery, bulk purchasing, payments, and logistics tracking.",
    contribution:
      "I built and maintained both pharmacy and supplier mobile experiences and the distributor-facing web application. I implemented deep linking across push notifications and emails, built bulk product uploads with real-time WebSocket progress feedback, and managed OTA updates and store deployments.",
    technicalHighlights: [
      "Built pharmacy and supplier mobile apps",
      "Developed distributor-facing web application",
      "Implemented deep linking across notifications and emails",
      "Built bulk upload system with WebSocket progress updates",
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
    id: "04",
    title: "Octosoft Technologies",
    subtitle: "Telemedicine & Digital Health",
    shortDescription:
      "A telemedicine platform providing video consultations, appointment reminders, and health plan comparisons.",
    description:
      "Octosoft builds digital health products focused on improving access to healthcare through telemedicine, real-time notifications, and provider comparison tools.",
    contribution:
      "I built appointment reminders and real-time notifications to reduce missed consultations, led a major dependency update and performance overhaul of the mobile codebase, and developed a health plan comparison marketplace with side-by-side provider evaluation.",
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
