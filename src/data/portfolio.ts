import { ASSETS, PROJECT_IMAGES } from '../config/assets';

import type { ThemeAsset } from '../config/assets';

export type ContactIcon =
  'github' | 'gitlab' | 'mail' | 'linkedin' | 'phone' | 'telegram';

export type Contact = {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
};

export type ProjectImage = ThemeAsset;

export type ProjectLink = {
  label: string;
  href: string;
  kind: 'github' | 'preview';
};

export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  contribution: string[];
  technologies: string[];
  images: ProjectImage[];
  links: ProjectLink[];
  featured?: boolean;
  mobileGallery?: boolean;
};

export const contacts: Contact[] = [
  {
    label: 'GitHub',
    value: '@KonstPartner',
    href: 'https://github.com/KonstPartner',
    icon: 'github',
  },
  {
    label: 'GitLab',
    value: '@KonstPartner',
    href: 'https://gitlab.com/KonstPartner',
    icon: 'gitlab',
  },
  {
    label: 'Email',
    value: 'konst.partnership@gmail.com',
    href: 'mailto:konst.partnership@gmail.com',
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: '@konstpartner',
    href: 'https://www.linkedin.com/in/konstpartner/',
    icon: 'linkedin',
  },
  {
    label: 'Phone',
    value: '+372 511-86-15',
    href: 'tel:+3725118615',
    icon: 'phone',
  },
  {
    label: 'Telegram',
    value: '@Konst21k',
    href: 'https://web.telegram.org/k/#@Konst21k',
    icon: 'telegram',
  },
];

export const education = {
  image: ASSETS.education.university,
  university: 'International University MITSO',
  degree: 'Bachelor’s degree',
  specialization: 'Management of Information Systems and Economics',
  period: '2022–2026',
  grade: 'Graduated with honors',
  description:
    'Coursework included software engineering, database management, web and mobile application development, and project management.',
  activities:
    'Participated in programming projects, hackathons, and student IT initiatives. Member of the university IT club and contributor to collaborative software development activities.',
};

export const experience = {
  image: ASSETS.experience.innowiseLogo,
  company: 'Innowise',
  location: 'Remote',
  period: '10.2025–02.2026',
  role: 'Frontend Developer Intern',
  summary:
    'Worked on frontend tasks under a mentor and participated in delivery-focused team processes.',
  points: [
    'Worked with Jira tasks, followed deadlines, and participated in cross-checks and solution reviews with a mentor.',
    'Applied Feature-Sliced Design and maintained separation of concerns across modules and reusable components.',
    'Wrote unit, integration, and snapshot tests and used Lighthouse and WAVE to check accessibility and performance.',
  ],
};

export const projects: Project[] = [
  {
    id: 'localize',
    title: 'Localize',
    eyebrow: 'Cross-platform service platform',
    summary:
      'A React Native application for discovering local services, managing appointments, and connecting customers with businesses across mobile and web.',
    contribution: [
      'Built the entire frontend from scratch and established the application architecture, reusable UI system, and development conventions.',
      'Participated in defining business logic and translated product workflows into customer and business interfaces.',
      'Integrated the REST API and Firebase services, including authentication and application-level data flows.',
      'Implemented service discovery, search, filtering, sorting, appointments, reviews, notifications, QR workflows, maps, geolocation, and image handling.',
      'Created responsive Android, iOS, and web interfaces with light/dark themes and English/German localization.',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Firebase',
      'Emotion',
      'Expo Router',
      'i18next',
    ],
    images: PROJECT_IMAGES.localize,
    links: [],
    featured: true,
    mobileGallery: true,
  },
  {
    id: 'd-one',
    title: 'DOne — Diabetes Diary',
    eyebrow: 'Offline-first diabetes diary',
    summary:
      'A cross-platform diabetes diary for tracking glucose, insulin, carbohydrates, meals, photos, and notes, with offline-first storage, cloud synchronization, follower access, and AI-assisted food analysis.',
    contribution: [
      'Designed and built the application end to end, including product logic, architecture, data model, UI system, Firebase infrastructure, and platform-specific behavior.',
      'Implemented an offline-first mobile diary with per-user SQLite storage, local photo files, pagination, search, filters, synchronization states, and a serialized Firebase synchronization coordinator.',
      'Built Firebase authentication, email verification, role-based user/follower access, Firestore cloud diary storage, Firebase Storage photo workflows, and read-only follower access across mobile and web.',
      'Implemented photo normalization and lifecycle management together with AI food analysis through a protected Cloudflare Worker, Firebase token verification, D1 request limits, and Gemini structured responses.',
      'Added import/export workflows, cloud-to-local entry downloads, forced synchronization, light/dark themes, localization, and Android-specific glucose reminder timers.',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Expo Router',
      'SQLite',
      'Firebase',
      'TanStack Query',
      'Zustand',
      'Emotion',
      'i18next',
      'Cloudflare Workers',
      'Cloudflare D1',
      'Gemini API',
    ],
    images: PROJECT_IMAGES.dOne,
    links: [],
    featured: true,
    mobileGallery: true,
  },
  {
    id: 'book-library',
    title: 'Book Library',
    eyebrow: 'Full-stack web application',
    summary:
      'A full-stack platform for exploring books, managing a library, and sharing ratings and reviews.',
    contribution: [
      'Built the frontend and backend, including application structure, API integration, and database models.',
      'Implemented authentication, book and category CRUD operations, search, filtering, ratings, and reviews.',
      'Developed a REST API with validation, authorization, and structured error handling.',
      'Added PostgreSQL persistence, Redis caching, data import tools, and Docker-based local deployment.',
      'Created responsive light and dark interfaces with reusable components and automated tests.',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Redis',
      'Redux',
      'Tailwind CSS',
      'Jest',
      'Docker',
    ],
    images: PROJECT_IMAGES.bookLibrary,
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/KonstPartner/Book-Library',
        kind: 'github',
      },
      {
        label: 'Live preview',
        href: 'https://konst21-book-library.vercel.app/',
        kind: 'preview',
      },
    ],
    featured: true,
  },
  {
    id: 'show-business-site',
    title: 'Show Business Website',
    eyebrow: 'Responsive landing page',
    summary:
      'A pixel-accurate responsive website implemented from a Figma design without a UI framework.',
    contribution: [
      'Translated the design into responsive mobile, tablet, and desktop layouts.',
      'Structured SCSS with reusable partials and maintained BEM naming throughout the project.',
      'Validated accessibility and markup and optimized the page for strong Lighthouse results.',
    ],
    technologies: ['HTML', 'SCSS', 'JavaScript', 'Vite', 'BEM'],
    images: PROJECT_IMAGES.showBusinessSite,
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/KonstPartner/show-business-site',
        kind: 'github',
      },
      {
        label: 'Live preview',
        href: 'https://konstpartner.github.io/show-business-site/',
        kind: 'preview',
      },
    ],
  },
  {
    id: 'react-spa-app',
    title: 'React SPA Store',
    eyebrow: 'E-commerce SPA',
    summary:
      'A responsive product catalogue with detailed product pages and complete client-side cart management.',
    contribution: [
      'Integrated a public products API with caching and request-state handling.',
      'Implemented product browsing, detailed views, and add/update/remove cart workflows.',
      'Built routing and global state management with a responsive Mantine-based interface.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'React Router',
      'Redux Toolkit',
      'RTK Query',
      'Mantine',
      'Vite',
    ],
    images: PROJECT_IMAGES.reactSpaApp,
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/KonstPartner/react-spa-app',
        kind: 'github',
      },
      {
        label: 'Live preview',
        href: 'https://konstpartner.github.io/react-spa-app/',
        kind: 'preview',
      },
    ],
  },
  {
    id: 'quotes-app',
    title: 'Quotes App',
    eyebrow: 'React SPA',
    summary:
      'A responsive application combining personal quote management, GraphQL content, and real-time chat.',
    contribution: [
      'Implemented authentication and personal quote creation, editing, and deletion.',
      'Integrated TanStack Query data flows and a GraphQL posts page with Apollo Client.',
      'Built real-time WebSocket chat, theme switching, and a Jest test suite.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'TanStack Router',
      'TanStack Query',
      'Apollo Client',
      'GraphQL',
      'WebSocket',
      'Tailwind CSS',
      'Jest',
    ],
    images: PROJECT_IMAGES.quotesApp,
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/KonstPartner/quotes-app',
        kind: 'github',
      },
      {
        label: 'Live preview',
        href: 'https://konstpartner.github.io/quotes-app/',
        kind: 'preview',
      },
    ],
  },
  {
    id: 'next-talk-app',
    title: 'NextTalk',
    eyebrow: 'Social publishing platform',
    summary:
      'A modern publishing application with posts, comments, reactions, history, and external content previews.',
    contribution: [
      'Implemented authentication and complete post creation, editing, and deletion workflows.',
      'Built infinite scrolling, sorting, search, tag filtering, comments, and like/dislike reactions.',
      'Added persistent viewing history, light/dark themes, and accessible responsive navigation.',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'App Router',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS',
    ],
    images: PROJECT_IMAGES.nextTalkApp,
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/KonstPartner/next-talk-app',
        kind: 'github',
      },
      {
        label: 'Live preview',
        href: 'https://next-talk-app.vercel.app/',
        kind: 'preview',
      },
    ],
  },
];
