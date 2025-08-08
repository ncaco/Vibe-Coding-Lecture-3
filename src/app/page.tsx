import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Hero from '@/components/sections/Hero';
import Carousel from '@/components/ui/Carousel';
import ImageCard from '@/components/ui/ImageCard';

export default function Home() {
  const features = [
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

  const stats = [
    { label: 'Components', value: '20+' },
    { label: 'Design Tokens', value: '50+' },
    { label: 'Animations', value: '10+' },
    { label: 'Variants', value: '100+' }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Plan and build your product with modern design system"
        subtitle="Vibe Coding Lecture 3"
        description="Meet the system for modern software development. Streamline your design process with purpose-built components and Linear-inspired aesthetics."
        badge="🚀 Hot Reload Test!"
      />

      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              Interactive Carousel
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Experience our smooth carousel component with auto-play, navigation, and keyboard controls.
            </p>
          </div>
          
          <Carousel
            items={[
              <div key="1" className="h-96 bg-gradient-to-br from-accent/20 to-background-secondary rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-text mb-2">Design System</h3>
                  <p className="text-text-secondary">Modern and consistent design components</p>
                </div>
              </div>,
              <div key="2" className="h-96 bg-gradient-to-br from-green-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold text-text mb-2">Performance</h3>
                  <p className="text-text-secondary">Optimized for speed and efficiency</p>
                </div>
              </div>,
              <div key="3" className="h-96 bg-gradient-to-br from-purple-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-text mb-2">Innovation</h3>
                  <p className="text-text-secondary">Cutting-edge development practices</p>
                </div>
              </div>
            ]}
            autoPlay={true}
            interval={4000}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              Made for modern product teams
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Vibe is shaped by the practices and principles that distinguish world-class 
              product teams from the rest: relentless focus, fast execution, and a commitment to quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Cards Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore our latest projects and see how our design system comes to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                alt: "Dashboard Design"
              }}
              title="Modern Dashboard"
              description="A sleek and intuitive dashboard design with real-time analytics and customizable widgets."
              badge="New"
              badgeVariant="success"
              href="/projects/dashboard"
            />
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
                alt: "Mobile App"
              }}
              title="Mobile App Design"
              description="Responsive mobile application with smooth animations and native-like experience."
              badge="Popular"
              badgeVariant="primary"
              href="/projects/mobile-app"
            />
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
                alt: "Web Application"
              }}
              title="Web Application"
              description="Full-stack web application with modern architecture and scalable design."
              badge="Featured"
              badgeVariant="warning"
              href="/projects/web-app"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-text mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Join thousands of developers building better products with our design system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/components">
                <Button size="lg">
                  Start Building
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
