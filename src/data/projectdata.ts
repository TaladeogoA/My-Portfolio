
import { Project } from "../types/project";

// export const data: Project[] = [
//   {
//     id: "01",
//     title: "OctoDoc Mobile",
//     subtitle: "OctoDoc - Revolutionizing Healthcare Access",
//     description:
//       "OctoDoc is a comprehensive healthcare platform that connects patients with healthcare providers through real-time communication and appointment management. The mobile app enables seamless healthcare delivery and consultation.",
//     contribution:
//       "I played a key role in enhancing the React Native application, implementing critical features like real-time native call alerts and modernizing the codebase. Led a major dependency update project that involved substantial rewriting to improve app performance and user experience.",
//     technicalHighlights: [
//       "Real-time native call feature implementation",
//       "Major dependency updates and codebase modernization",
//       "Performance optimization and bug fixes",
//       "Cross-platform compatibility for iOS and Android",
//       "Integration with backend services for real-time communication",
//       "Comprehensive testing and quality assurance",
//     ],
//     techStack:
//       "React Native • TypeScript • React Query • React Testing Library",
//     assets: [
//       {
//         type: "image",
//         url: OctodocTwo,
//       },
//       {
//         type: "image",
//         url: OctodocOne,
//       },
//       {
//         type: "image",
//         url: OctodocThree,
//       },
//       {
//         type: "image",
//         url: OctodocFour,
//       },
//     ],
//     live: "https://play.google.com/store/apps/details?id=ai.octosoft.octodoc",
//     source: "",
//     duration: "Ongoing",
//     year: "2023",
//   },
//   // {
//   //   id: "02",
//   //   title: "Gather",
//   //   subtitle: "Gather - A Culinary Journey Through Global Flavors",
//   //   description:
//   //     "Gather is the digital home of Chef Maria Rossi, where she shares her multicultural heritage and culinary expertise through beautifully crafted recipes that blend traditional techniques with modern approaches.",
//   //   contribution:
//   //     "I designed and developed a personalized platform that brings Chef Maria's vision to life, creating an intimate space where her stories and recipes intertwine. The website transforms her global culinary adventures into an accessible, visually rich experience that invites home cooks to explore world cuisines with confidence.",
//   //   technicalHighlights: [
//   //     "Headless CMS integration with Sanity for content management",
//   //     "Advanced image optimization with blur placeholders",
//   //     "Dynamic imports and route-based code splitting",
//   //     "CDN integration and strategic caching layer",
//   //     "Responsive Framer Motion animations",
//   //     "Server-side rendering for SEO optimization",
//   //     "Offline-first architecture with service workers",
//   //   ],
//   //   techStack:
//   //     "Next.js 14 • TypeScript • Tailwind CSS • Sanity CMS • React Query • Framer Motion",
//   //   assets: [
//   //     {
//   //       type: "image",
//   //       url: GatherDesktop,
//   //     },
//   //     {
//   //       type: "image",
//   //       url: GatherTab,
//   //     },
//   //     {
//   //       type: "image",
//   //       url: GatherPhone,
//   //     },
//   //   ],
//   //   live: "https://recipe-website-sigma.vercel.app/",
//   //   source: "https://github.com/TaladeogoA/recipe-website",
//   //   duration: "1 month",
//   //   year: "2024",
//   // },
//   {
//     id: "03",
//     title: "Mobann LMS",
//     subtitle: "Learning Management System for DevOps Training",
//     description:
//       "A comprehensive Learning Management System designed specifically for DevOps training, enabling students to learn and practice DevOps concepts through an interactive platform. The system provides structured course delivery with real-time progress tracking.",
//     contribution:
//       "I led the frontend development of the entire LMS platform, creating an intuitive interface that enhances the learning experience. The implementation includes interactive assessments, real-time progress tracking, and seamless content delivery.",
//     technicalHighlights: [
//       "Responsive interface optimized for various learning contexts",
//       "Real-time progress tracking system with WebSocket integration",
//       "Custom assessment module with various question types",
//       "RESTful API integration for course content delivery",
//       "Cross-browser compatibility optimization",
//       "Performance optimization for concurrent users",
//     ],
//     techStack:
//       "Next.js • TypeScript • Chakra UI • Redux • Context API • React Query",
//     assets: [
//       {
//         type: "image",
//         url: MobannOne,
//       },
//       {
//         type: "image",
//         url: MobannTwo,
//       },
//       {
//         type: "image",
//         url: MobannThree,
//       },
//     ],
//     live: "https://www.mobanntechnologies.com/",
//     source: "",
//     duration: "4 months",
//     year: "2024",
//   },
//   {
//     id: "04",
//     title: "Health Plan Marketplace",
//     subtitle: "Octodoc Marketplace - Simplified Health Plan Selection",
//     description:
//       "A user-centric marketplace that enables customers to compare and purchase health plans from various providers. The platform simplifies the decision-making process through intuitive comparison tools and streamlined purchasing.",
//     contribution:
//       "Working in a two-person team, I worked on the frontend development of key marketplace features including plan comparison, advanced filtering, and purchase flow integration. Collaborated on implementing post-purchase automation for beneficiary detail collection and user onboarding.",
//     technicalHighlights: [
//       "Side-by-side plan comparison interface",
//       "Advanced filtering system based on price and coverage",
//       "Flutterwave payment integration",
//       "Automated email system for beneficiary data collection",
//       "Responsive design for all devices",
//       "Performance optimization for large datasets",
//     ],
//     techStack: "Next.js • TypeScript • Tailwind CSS • React Query",
//     assets: [
//       {
//         type: "image",
//         url: MarketplaceTwo,
//       },
//       {
//         type: "image",
//         url: MarketplaceThree,
//       },
//       {
//         type: "image",
//         url: MarketplaceOne,
//       },
//       {
//         type: "image",
//         url: MarketplaceFour,
//       },
//     ],
//     live: "https://www.octodoc.com/",
//     source: "",
//     duration: "3 months",
//     year: "2023",
//   },
//   {
//     id: "05",
//     title: "Mosaic",
//     subtitle: "Mosaic - Your Home Screen, Your Canvas",
//     description:
//       "Mosaic is a hybrid Android launcher that transforms your home screen with dynamic widgets and deep customization options. Combines React Native's modern UI with Java for system-level integration.",
//     contribution:
//       "Currently developing this launcher from the ground up, creating a powerful widget creation system and implementing seamless integration between React Native's UI capabilities and Android's system features.",
//     technicalHighlights: [
//       "Custom widget creation framework with React Native",
//       "Native Android integration using Java for system-level access",
//       "Advanced widget layout engine for flexible arrangements",
//       "Real-time widget updates and data synchronization",
//       "Custom animations and transitions system",
//       "Deep system integration for notifications and interactive widgets",
//       "Efficient state management for widget data",
//     ],
//     techStack: "React Native • Java • TypeScript • Android SDK",
//     assets: [
//       {
//         type: "image",
//         url: LauncherOne,
//       },
//       {
//         type: "image",
//         url: LauncherTwo,
//       },
//       {
//         type: "image",
//         url: LauncherThree,
//       },
//       {
//         type: "image",
//         url: LauncherFour,
//       },
//     ],
//     live: "",
//     source: "",
//     duration: "Ongoing",
//     year: "2024",
//   },
//   {
//   id: "06",
//   title: "Famasi Africa Website",
//   subtitle: "Find Medications at the Best Prices Across Nigeria",
//   description:
//     "Famasi Africa is a patient-facing web platform that connects users with over 1000+ pharmacies across Nigeria. Patients can search for medications, compare prices, and get their orders delivered within 1 hour through an intuitive ordering flow.",
//   contribution:
//     "I led critical refactoring of the ordering flow to resolve persistent bugs that prevented customers from completing their purchases. The platform previously suffered from numerous order completion failures, but through systematic restructuring of the order state management and flow guards, I ensured consistency and stability throughout the entire ordering process from medication selection to payment.",
//   technicalHighlights: [
//     "Complete ordering flow refactoring with step-based state management using Zustand",
//     "Flow guard implementation to prevent invalid navigation and ensure data consistency",
//     "Multi-step order process with medication selection, delivery details, and offer comparison",
//     "Server-side rendering with Vike for improved SEO and performance",
//     "Dynamic route handling for medication search with URL-based medication loading",
//     "Integration with Supabase for authentication and data management",
//     "Socket.IO client integration for real-time order dispatching to pharmacies",
//     "Responsive design with Tailwind CSS and Radix UI components",
//     "Payment integration with Flutterwave",
//     "Google Maps integration for delivery address selection",
//   ],
//   techStack:
//     "React • TypeScript • Vite • Zustand • React Query • Tailwind CSS • Radix UI • Socket.IO Client • Supabase • Framer Motion",
//   assets: [
//   ],
//   live: "https://famasi.africa",
//   source: "",
//   duration: "Ongoing",
//   year: "2024-Present",
// },
// {
//   id: "07",
//   title: "Dispensary - Pharmacy Management System",
//   subtitle: "Smart Inventory & Order Management for Pharmacies",
//   description:
//     "A comprehensive mobile application designed for pharmacies to manage inventory, process orders, and handle customer requests. The app features real-time order notifications from the Famasi website and operates seamlessly in offline mode, ensuring pharmacies can continue business operations regardless of connectivity.",
//   contribution:
//     "Hired primarily as a mobile developer, I spearheaded the complete modernization of the application. I migrated the entire codebase from React Native to Expo, redesigned every screen with updated assets and splash screens, and implemented critical features including real-time Socket.IO integration for instant order notifications and a robust offline-first architecture. The offline mode allows pharmacies to continue processing orders without internet, with automatic synchronization when connectivity returns.",
//   technicalHighlights: [
//     "Complete migration from React Native to Expo with modernized architecture",
//     "Real-time Socket.IO integration for instant order notifications from website",
//     "Push notification system using Expo Notifications for time-critical alerts",
//     "Offline-first architecture with AsyncStorage-based data caching",
//     "Automatic order queue synchronization when connectivity is restored",
//     "Background task management for persistent socket connections",
//     "Network state detection with intelligent fallback to cached data",
//     "Offline order placement with retry logic and status tracking",
//     "Complete UI/UX redesign across all screens",
//     "Product and customer data pre-caching for offline access",
//     "Integration with Chowdeck for third-party order fulfillment",
//   ],
//   techStack:
//     "React Native • Expo • TypeScript • Socket.IO • Zustand • AsyncStorage • Expo Notifications • React Query • Background Fetch",
//   assets: [
//   ],
//   live: "",
//   source: "",
//   duration: "Ongoing",
//   year: "2023-Present",
//   },
// {
//   id: "08",
//   title: "Compre Mobile App",
//   subtitle: "Connecting Pharmacies with Distributors",
//   description:
//     "Compre is a B2B platform that streamlines the connection between pharmacies and distributors, enabling efficient product sourcing and order management. The mobile application features dual interfaces - one for pharmacies to discover and order from distributors, and another for distributors to manage their inventory, customers, and fulfill orders.",
//   contribution:
//     "As the sole mobile developer, I built and maintain both the pharmacy (retailer) and distributor (supplier) sides of the application from the ground up. I implemented comprehensive features including the ordering flow, inventory management with bulk CSV upload capabilities, product catalog integration, cart and checkout systems, and business profile management. Additionally, I handle the complete build pipeline and app store submission process for both iOS and Android platforms.",
//   technicalHighlights: [
//     "Dual-interface architecture supporting both pharmacy and distributor user experiences",
//     "Complete ordering workflow from product discovery to checkout and payment",
//     "Bulk product upload via CSV/XLS/XLSX with real-time validation and processing",
//     "Advanced inventory management system with product categorization and search",
//     "Shopping cart with multi-distributor support and order tracking",
//     "Business profile management with document upload and verification",
//     "Real-time product catalog search with infinite scroll pagination",
//     "React Query integration for optimized data fetching and caching",
//     "Form validation and state management using React Hook Form and Zustand",
//     "Cross-platform compatibility with consistent UI/UX across iOS and Android",
//     "Comprehensive navigation system with separate tab structures for user types",
//     "App store deployment and CI/CD pipeline management",
//   ],
//   techStack:
//     "React Native • Expo • TypeScript • React Query • Zustand • React Hook Form • React Navigation • Expo Document Picker • Reanimated",
//   assets: [
//   ],
//   live: "https://getcompre.com/",
//   source: "",
//   duration: "Ongoing",
//   year: "2024-Present",
// }
// ];

export const data: Project[] = [
  {
  id: "06",
  title: "Compre Mobile App",
  subtitle: "Compre - Bridging Pharmacies and Distributors",
  storyMode: {
    description:
      "Compre bridges pharmacies and distributors, making it easier for pharmacies to source products and restock efficiently. I built and maintain the mobile app from the ground up — both the pharmacy and distributor sides — ensuring smooth communication, accurate stock updates, and a seamless ordering experience.",
    highlights: [
      "Launched the full B2B app experience for both pharmacies and distributors, helping streamline product sourcing and order management.",
      "Enabled distributors to easily upload and manage large product inventories using CSV/XLS/XLSX files.",
      "Built an intuitive ordering flow with cart and checkout systems that simplified multi-distributor transactions.",
      "Supported business verification and document upload to maintain platform trust and compliance.",
      "Maintained consistent UX across iOS and Android, contributing to improved onboarding and platform engagement.",
    ],
  },
  devMode: {
    description:
      "Architected a dual-interface React Native app for two distinct user types (pharmacy and distributor) with isolated tab structures and navigation stacks.",
    highlights: [
      "Implemented complete ordering workflow: product discovery, cart, checkout, and order tracking with Zustand for state management.",
      "Integrated CSV/XLS/XLSX bulk product upload using Expo Document Picker, with real-time validation and progress feedback.",
      "Developed advanced inventory and catalog management features including categorized search and infinite-scroll pagination.",
      "Used React Query for efficient server state synchronization and cache optimization.",
      "Built custom form validation and complex input handling using React Hook Form.",
      "Set up CI/CD pipeline for automated builds and managed deployments to App Store and Play Store.",
      "Ensured cross-platform responsiveness and performance consistency using Reanimated and Expo's native modules.",
    ],
  },
  techStack: "React Native • TypeScript • Zustand • React Query • Expo",
  assets: [],
  live: "",
  source: "",
  duration: "Ongoing",
  year: "2024",
}
];