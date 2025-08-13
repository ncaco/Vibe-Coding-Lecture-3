'use client';

import React from 'react';
import { Hero, WelcomeMessage, CTA, Stats, CarouselSection, Features, ImageCards } from '@/components/sections';
import { SectionDivider } from '@/components/ui';

export default function SectionsPage() {
    // Hero 섹션 데이터
    const heroProps = {
        title: "Section Components",
        subtitle: "Vibe Design System",
        description: "Explore our comprehensive collection of reusable section components. Each section is designed to be flexible, customizable, and ready for production use.",
        badge: "🎯 7+ Sections Available",
        primaryAction: {
            label: "Get Started",
            href: "#sections"
        },
        secondaryAction: {
            label: "View Documentation",
            href: "/docs"
        }
    };

    // Stats 섹션 데이터
    const statsData = [
        { label: 'Hero Sections', value: '1' },
        { label: 'Feature Sections', value: '1' },
        { label: 'CTA Sections', value: '1' },
        { label: 'Content Sections', value: '4' }
    ];

    // Features 섹션 데이터
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

    // Carousel 섹션 데이터
    const carouselData = {
        title: "Interactive Carousel Section",
        description: "Experience our smooth carousel section component with auto-play, navigation, and keyboard controls."
    };

    // ImageCards 섹션 데이터
    const projectsData = [
        {
            image: {
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
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
                src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
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
                src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
                alt: "Web Application"
            },
            title: "Web Application",
            description: "Full-stack web application with modern architecture and scalable design.",
            badge: "Featured",
            badgeVariant: "warning" as const,
            href: "/projects/web-app"
        }
    ];

    // CTA 섹션 데이터
    const ctaData = {
        title: "Ready to use these sections?",
        description: "Start building your next project with our flexible and customizable section components.",
        primaryAction: {
            label: "View All Components",
            href: "/components"
        },
        secondaryAction: {
            label: "Get Documentation",
            href: "/docs"
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SectionDivider
                title="Welcome Message Section"
                description="로그인한 사용자를 위한 환영 메시지 섹션입니다."
            />

            {/* Hero Section */}
            <Hero {...heroProps} />

            {/* Welcome Message Section */}
            <SectionDivider
                title="Welcome Message Section"
                description="로그인한 사용자를 위한 환영 메시지 섹션입니다."
            />
            <WelcomeMessage />

            {/* Stats Section */}
            <SectionDivider
                title="Stats Section"
                description="통계 정보를 그리드 형태로 표시하는 섹션입니다."
            />
            <Stats stats={statsData} />

            {/* Carousel Section */}
            <SectionDivider
                title="Carousel Section"
                description="슬라이드 형태로 콘텐츠를 표시하는 인터랙티브 섹션입니다."
            />
            <CarouselSection {...carouselData} />

            {/* Features Section */}
            <SectionDivider
                title="Features Section"
                description="기능 소개를 위한 카드 형태의 섹션으로 아이콘과 설명을 포함합니다."
            />
            <Features
                title="Made for modern product teams"
                description="Vibe is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to quality."
                features={featuresData}
            />

            {/* Image Cards Section */}
            <SectionDivider
                title="Image Cards Section"
                description="이미지와 함께 프로젝트나 제품을 소개하는 카드 섹션입니다."
            />
            <ImageCards
                title="Featured Projects"
                description="Explore our latest projects and see how our design system comes to life."
                projects={projectsData}
            />

            {/* CTA Section */}
            <SectionDivider
                title="CTA Section"
                description="사용자 행동을 유도하는 Call-to-Action 섹션입니다."
            />
            <CTA {...ctaData} />
        </div>
    );
}
