import { Hero, WelcomeMessage, CTA, Stats, CarouselSection, Features, ImageCards } from '@/components/sections';

export default function Home() {
  // Stats 데이터
  const statsData = [
    { label: 'Components', value: '20+' },
    { label: 'Design Tokens', value: '50+' },
    { label: 'Animations', value: '10+' },
    { label: 'Variants', value: '100+' }
  ];

  // Features 데이터
  const featuresData = [
    {
      title: 'Modern Design System',
      description: 'Built with Linear-inspired design principles for consistency and beauty.',
      icon: '🎨'
    },
    {
      title: 'Reusable Components',
      description: 'Comprehensive component library with TypeScript support.',
      icon: '🧩'
    },
    {
      title: 'Responsive Layout',
      description: 'Mobile-first design that works on all devices.',
      icon: '📱'
    },
    {
      title: 'Performance Optimized',
      description: 'Fast loading times with Next.js 14 and optimized assets.',
      icon: '⚡'
    }
  ];

  // Carousel 데이터
  const carouselData = {
    title: "Interactive Carousel",
    description: "Experience our smooth carousel component with auto-play, navigation, and keyboard controls."
  };

  // ImageCards 데이터
  const projectsData = [
    {
      image: {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        alt: "Dashboard Design"
      },
      title: "Modern Dashboard",
      description: "A sleek and intuitive dashboard design with real-time analytics and customizable widgets.",
      badge: "New",
      badgeVariant: "success" as const,
      href: "/projects/dashboard"
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        alt: "Mobile App"
      },
      title: "Mobile App Design",
      description: "Responsive mobile application with smooth animations and native-like experience.",
      badge: "Popular",
      badgeVariant: "primary" as const,
      href: "/projects/mobile-app"
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        alt: "Web Application"
      },
      title: "Web Application",
      description: "Full-stack web application with modern architecture and scalable design.",
      badge: "Featured",
      badgeVariant: "warning" as const,
      href: "/projects/web-app"
    }
  ];

  // CTA 데이터
  const ctaData = {
    title: "Ready to get started?",
    description: "Join thousands of developers building better products with our design system.",
    primaryAction: {
      label: "Start Building",
      href: "/components"
    },
    secondaryAction: {
      label: "Contact Sales",
      href: "/contact"
    }
  };

  // 각 섹션의 props 객체 정의
  const heroProps = {
    title: "Plan and build your product with modern design system",
    subtitle: "Vibe Coding Lecture 3",
    description: "Meet the system for modern software development. Streamline your design process with purpose-built components and Linear-inspired aesthetics.",
    badge: "🚀 Hot Reload Test!"
  };

  const statsProps = {
    stats: statsData
  };

  const carouselProps = {
    title: carouselData.title,
    description: carouselData.description
  };

  const featuresProps = {
    title: "Made for modern product teams",
    description: "Vibe is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to quality.",
    features: featuresData
  };

  const imageCardsProps = {
    title: "Featured Projects",
    description: "Explore our latest projects and see how our design system comes to life.",
    projects: projectsData
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero {...heroProps} />

      {/* Welcome Message for Logged In Users */}
      <WelcomeMessage />

      {/* Stats Section */}
      <Stats {...statsProps} />

      {/* Carousel Section */}
      <CarouselSection {...carouselProps} />

      {/* Features Section */}
      <Features {...featuresProps} />

      {/* Image Cards Section */}
      <ImageCards {...imageCardsProps} />

      {/* CTA Section */}
      <CTA {...ctaData} />
    </main>
  );
}
