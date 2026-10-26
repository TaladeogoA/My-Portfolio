import CompreFour from "../assets/compre-four.webp";
import CompreOne from "../assets/compre-one.webp";
import CompreThree from "../assets/compre-three.webp";
import CompreTwo from "../assets/compre-two.webp";
import DispensaryCustomersSuppliers from "../assets/dispensary-customers-suppliers.webp";
import DispensaryDevices from "../assets/dispensary-devices.webp";
import DispensaryHomeRequest from "../assets/dispensary-home-request.webp";
import DispensaryInventoryBranches from "../assets/dispensary-inventory-branches.webp";
import DispensaryNewOrder from "../assets/dispensary-new-order.mp4";
import FamasiHomePlans from "../assets/famasi-home-plans.webp";
import FamasiOrder from "../assets/famasi-order.webp";
import FamasiWrapped from "../assets/famasi-wrapped.webp";
import FamasiWrappedVideo from "../assets/famasi-wrapped.mp4";
import PineLeapGoal from "../assets/pineleap-goal.webp";
import PineLeapDashboard from "../assets/pineleap-dashboard.webp";
import PineLeapGoals from "../assets/pineleap-goals.webp";
import PineLeapConversations from "../assets/pineleap-conversations.webp";
import PineLeapMeetings from "../assets/pineleap-meetings.webp";
import PineLeapActivity from "../assets/pineleap-activity.webp";
import { Project } from "../types/project";

export const data: Project[] = [
  {
    id: "01",
    role: "Frontend, built from scratch",
    platforms: "Web",
    title: "PineLeap",
    subtitle: "From Conversation to Outcome",
    shortDescription:
      "A B2B platform where a goal leads to actions, actions lead to conversations, and conversations lead to meetings and outcomes you can see.",
    description:
      "PineLeap starts with a goal, like securing pilot customers. Under it sit the actions that move the goal forward: a booking link, a document, a waitlist. Each action brings in conversations with the people who respond, and those turn into meetings and outcomes. Everything lands in one activity feed, so the team can see what happened and what is next.",
    constraints:
      "One product, many connected objects: goals, actions, conversations, meetings, events and resources. Each has its own states, and each one links to the others. Users needed to always know where they were, what a status meant, and what happened after they clicked.",
    contribution:
      "I built the frontend from scratch and owned its architecture. That covers sign-in, onboarding, the goal and action flows, conversations, meetings and bookings, resources, profiles and the public page a visitor sees when they book.",
    decisions:
      "Goals are the entry point, so the dashboard and the goals list lead with what is in progress rather than with menus. Drafts, live and archived items are labelled the same way everywhere. Every list has loading, empty and error states, destructive actions ask first, and layouts are designed for small screens instead of shrunk down from desktop.",
    technicalHighlights: [
      "Built the frontend from scratch, from sign-in and onboarding to the public booking page",
      "Modelled the goal, action, conversation and meeting loop so every screen links to the next step",
      "Built the conversations table and meetings views, with bookings, calendar and templates",
      "Designed one status language (draft, live, archived) used across goals, actions and meetings",
      "Built loading, empty, error and permission states into every list and form",
      "Implemented Stripe billing and Google and Outlook calendar connections",
      "Set up shared UI components, data fetching and app state so new screens reuse the same patterns",
    ],
    techStack:
      "Next.js • React • TypeScript • Tailwind CSS • TanStack Query • Zustand • Framer Motion • React Hook Form • Zod • Stripe",
    assets: [
      {
        type: "image",
        url: PineLeapGoal,
        width: 1668,
        height: 1014,
        alt: "Goal page for Secure Pilot Customers, with its stats and ordered actions",
        caption: "A goal and its ordered actions, with live stats on conversations and conversion.",
      },
      {
        type: "image",
        url: PineLeapDashboard,
        width: 1668,
        height: 1014,
        alt: "Dashboard with active goals, conversations, meetings and recent activity",
        caption: "The dashboard brings active goals, conversations, meetings and recent activity into one view.",
      },
      {
        type: "image",
        url: PineLeapGoals,
        width: 1668,
        height: 1014,
        alt: "Goals list showing active, draft and archived goals",
        caption: "Goals, split into active, draft and archived.",
      },
      {
        type: "image",
        url: PineLeapConversations,
        width: 1668,
        height: 1014,
        alt: "Conversations table with stakeholder, event, goal and outcome",
        caption: "Every conversation is tied to a stakeholder, an event, a goal and an outcome.",
      },
      {
        type: "image",
        url: PineLeapMeetings,
        width: 1668,
        height: 1014,
        alt: "Meetings bookings list, with calendar, templates and availability tabs",
        caption: "Bookings, with the calendar, templates and availability one tab away.",
      },
      {
        type: "image",
        url: PineLeapActivity,
        width: 1668,
        height: 1014,
        alt: "Activity feed of meetings booked, forms submitted and links clicked",
        caption: "The activity feed: meetings booked, forms submitted and links clicked.",
      },
    ],
    live: "",
    source: "",
    period: "2026 – Present",
  },
  {
    id: "02",
    role: "Founding mobile engineer",
    platforms: "iOS · Android · Web",
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
        caption: "Pharmacies browse distributors and order straight from their catalogues.",
      },
      {
        type: "image",
        url: CompreTwo,
        width: 1024,
        height: 500,
        alt: "Compre mobile app distributor list",
        caption: "The distributor list, with search and a direct line to each one.",
      },
      {
        type: "image",
        url: CompreThree,
        width: 1024,
        height: 500,
        alt: "Compre mobile app order tracking",
        caption: "Following an order after it has been placed.",
      },
      {
        type: "image",
        url: CompreFour,
        width: 1024,
        height: 500,
        alt: "Compre mobile app business overview",
        caption: "A business overview for the pharmacy.",
      },
    ],
    live: "https://distributor.getcompre.com",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/compre/id6746078785",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.compre.compreapp",
    period: "2024 – Present",
  },
  {
    id: "03",
    role: "Sole frontend engineer",
    platforms: "iOS · Android · Web",
    title: "Famasi",
    subtitle: "Consumer Pharmacy Platform",
    shortDescription:
      "A consumer pharmacy platform for discovering, ordering and receiving medication through a network of pharmacies.",
    description:
      "Famasi connects customers with pharmacies for medication discovery, ordering and delivery. It started as a web platform. I built its mobile app and worked across several of its products, with much of the work centred on making the customer experience reliable at the points where people search, order and pay.",
    constraints:
      "The web platform's ordering flow was unstable, with checkout and payment bugs, and it had to keep taking real orders while it was being fixed. The mobile app had to match a web platform that already existed, while still working the way people expect a phone app to work. New features had to fit into production systems that were in daily use.",
    contribution:
      "I was the sole frontend engineer across several production products. I built the mobile version of the web platform, working towards feature parity with mobile-first performance work. On the web, I refactored the legacy order flows and fixed critical checkout and payment bugs. I also built curated medication plans and Famasi Wrapped, integrated Remi, and handled releases, updates and production support.",
    decisions:
      "I treated checkout as one transaction rather than a set of separate screens: validation and guards stop the flow moving from medication to delivery details to payment in an invalid state. Curated plans let people buy several products together in a single checkout instead of placing separate orders. Wrapped turned a year of orders into a personalised, animated story. Remi, built on LiveKit, asks users in conversation what a personal pharmacy means to them, so the answers can shape the product.",
    technicalHighlights: [
      "Built the mobile version of the web platform with React Native and Expo, aiming for feature parity",
      "Refactored legacy order flows and fixed critical checkout and payment bugs",
      "Added validation and guards so the ordering flow can't reach an invalid state",
      "Built curated medication plans: several products bought in one checkout",
      "Built Famasi Wrapped, an animated year-in-review, with Reanimated",
      "Integrated Remi, a LiveKit conversational experience for user feedback",
      "Managed production releases and updates across the products",
    ],
    techStack:
      "React Native • React • TypeScript • Expo • Reanimated • Zustand • Firebase • Tailwind CSS • Socket.IO • LiveKit",
    assets: [
      {
        type: "image",
        url: FamasiWrapped,
        width: 2400,
        height: 1350,
        bare: true,
        alt: "Four Famasi Wrapped screens: 2025 was a big year, top five medications, money saved, and the year's persona",
        caption: "Famasi Wrapped: a customer's year of orders told as an animated story, built from static Figma designs.",
      },
      {
        type: "image",
        url: FamasiHomePlans,
        width: 1800,
        height: 1200,
        bare: true,
        alt: "Famasi app home screen with a medication shelf and refill countdown, next to the curated plans list",
        caption: "Home is a medication shelf that counts down to each refill. Curated plans bundle several products into one purchase.",
      },
      {
        type: "image",
        url: FamasiOrder,
        width: 1800,
        height: 1200,
        bare: true,
        alt: "Famasi order flow: the medication tray, a countdown while pharmacies send offers, and the offers to choose from",
        caption: "Ordering: add medications to a tray, nearby pharmacies have a minute to send offers, then pick one by price, time and rating.",
      },
      {
        type: "video",
        url: FamasiWrappedVideo,
        width: 640,
        height: 1270,
        alt: "Screen recording of Famasi Wrapped playing through its screens",
        caption: "Wrapped in motion. The transitions between screens run on Reanimated.",
      },
    ],
    live: "https://famasi.africa",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/famasi/id6473138815",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.famasi.app",
    period: "2025 – 2026",
  },
  {
    id: "04",
    role: "Mobile and web, end to end",
    platforms: "iOS · Android · Web",
    title: "Dispensary",
    subtitle: "Pharmacy Operations App",
    shortDescription:
      "A pharmacy operations app for managing orders, inventory and storefronts, rebuilt for production use across mobile and web.",
    description:
      "Dispensary is used by pharmacies for day-to-day operations including orders, inventory and storefront management. I took over the existing application while a new product direction was being implemented, with the additional challenge of getting the app into the app stores and supporting users in environments where connectivity can be unreliable.",
    constraints:
      "The app needed a substantial UI reimplementation, had to continue supporting a live business, and needed to go through its first App Store and Google Play submissions. The product also needed to work beyond the original mobile application.",
    contribution:
      "I took over the existing React Native application and implemented the new product design across the app. I owned the first App Store and Google Play submissions, release pipelines, OTA updates and production support. I extended the app to the web with Expo for Web and hosted it on DigitalOcean. I also built the storefront configuration system, and built and deployed a storefront for each pharmacy, including subdomain provisioning and hosting.",
    decisions:
      "I used Expo for Web to bring the existing app to the browser rather than building a separate web frontend. Pharmacies set their own branding, custom domain, business details and opening hours in the app, and those settings feed straight into how their storefront renders, so what they enter is what customers see. Each pharmacy gets its own storefront on its own subdomain, all running on shared software instead of manual setup.",
    technicalHighlights: [
      "Reimplemented the application UI based on the new product design",
      "Took the application through its first App Store and Google Play submissions",
      "Set up OTA updates and production release pipelines",
      "Extended the React Native application to the web with Expo for Web",
      "Built self-service storefront configuration: branding, domains, business details and hours",
      "Connected storefront settings to how each storefront renders",
      "Built and deployed multi-tenant pharmacy storefronts with subdomain provisioning",
      "Hosted the web app on DigitalOcean and supported it in production across mobile and web",
    ],
    techStack:
      "React Native • Expo • TypeScript • Zustand • Socket.IO • DigitalOcean",
    assets: [
      {
        type: "image",
        url: DispensaryDevices,
        width: 2400,
        height: 1350,
        bare: true,
        alt: "Dispensary on desktop, tablet and phone: the web dashboard, a new order on the tablet, and the mobile home screen",
        caption: "The same app on the web, a tablet and a phone. I brought the existing mobile app to the browser with Expo for Web.",
      },
      {
        type: "image",
        url: DispensaryHomeRequest,
        width: 1800,
        height: 1200,
        bare: true,
        alt: "Dispensary home screen with sales analytics, next to an incoming medication request to accept or decline",
        caption: "Home shows sales and top sellers. An online request comes in with its delivery address and items, to accept or decline.",
      },
      {
        type: "image",
        url: DispensaryInventoryBranches,
        width: 1800,
        height: 1200,
        bare: true,
        alt: "Dispensary inventory with stock alerts for low and expiring items, next to the branches list",
        caption: "Inventory flags low and expiring stock. Pharmacies with several branches manage them from one account.",
      },
      {
        type: "image",
        url: DispensaryCustomersSuppliers,
        width: 1800,
        height: 1200,
        bare: true,
        alt: "Dispensary customer details and supplier details, each with its order history",
        caption: "Customers and suppliers each keep their details and order history.",
      },
      {
        type: "video",
        url: DispensaryNewOrder,
        width: 960,
        height: 960,
        alt: "Screen recording of a sale at the counter: adding items, picking a customer, reviewing, taking payment and the receipt",
        caption: "A sale at the counter: add items, attach a customer, take cash, card, transfer or QR, and send the receipt.",
      },
    ],
    live: "",
    source: "",
    appStoreUrl:
      "https://apps.apple.com/us/app/dispensaryos-by-famasi/id6748520071",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.dispensarypos",
    period: "2025 – 2026",
  },
  {
    id: "05",
    role: "Mobile engineer",
    platforms: "iOS · Android",
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
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/f_auto,q_auto,w_1200/v1761088036/octodoc-two_wfkbvr.jpg",
        width: 900,
        height: 690,
        alt: "Octodoc mobile app screens",
        caption: "Screens from the Octodoc mobile app.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/f_auto,q_auto,w_1200/v1761088033/octodoc-one_mhfuhr.png",
        width: 900,
        height: 702,
        alt: "Octodoc mobile app",
        caption: "The Octodoc mobile app.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dp1067dhj/image/upload/f_auto,q_auto,w_1200/v1761088021/marketplace-four_fmwlpn.png",
        width: 900,
        height: 702,
        alt: "Octodoc health plans website",
        caption: "Comparing health plans side by side on the web marketplace.",
      },
    ],
    live: "https://www.octodoc.com/",
    source: "",
    appStoreUrl: "https://apps.apple.com/us/app/octodoc/id1606125098",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=ai.octosoft.octodoc",
    period: "2023 – 2025",
  },
];
