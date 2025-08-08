import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

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
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              🚀 Vibe Coding Lecture 3
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
              Plan and build your product with{' '}
              <span className="heading-gradient">modern design system</span>
              <span className="text-accent"> 🔥 Hot Reload Test!</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Meet the system for modern software development. Streamline your design process 
              with purpose-built components and Linear-inspired aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/components">
                <Button size="lg">
                  Explore Components
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
