import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Features',
      links: [
        { name: 'Plan', href: '/plan' },
        { name: 'Build', href: '/build' },
        { name: 'Insights', href: '/insights' },
        { name: 'Customer Requests', href: '/customer-requests' },
        { name: 'Linear Asks', href: '/asks' },
        { name: 'Security', href: '/security' },
        { name: 'Mobile', href: '/mobile' },
      ]
    },
    {
      title: 'Product',
      links: [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Method', href: '/method' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Changelog', href: '/changelog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Download', href: '/download' },
        { name: 'Switch', href: '/switch' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Customers', href: '/customers' },
        { name: 'Careers', href: '/careers' },
        { name: 'Now', href: '/now' },
        { name: 'README', href: '/readme' },
        { name: 'Quality', href: '/quality' },
        { name: 'Brand', href: '/brand' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Developers', href: '/developers' },
        { name: 'Status', href: 'https://linearstatus.com' },
        { name: 'Startups', href: '/startups' },
        { name: 'Report vulnerability', href: '/security/vulnerability' },
        { name: 'DPA', href: '/dpa' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Contact us', href: '/contact' },
        { name: 'Community', href: 'https://linear.app/join-slack' },
        { name: 'X (Twitter)', href: 'https://x.com/linear' },
        { name: 'GitHub', href: 'https://github.com/linear' },
        { name: 'YouTube', href: 'https://www.youtube.com/@linear' },
      ]
    }
  ];

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Logo and description */}
            <div className="sm:col-span-1 lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold text-text">Vibe</span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                Plan and build your product with modern design system. 
                Purpose-built for modern product development.
              </p>
            </div>

            {/* Footer links */}
            {footerSections.map((section) => (
              <div key={section.title} className="sm:col-span-1">
                <h3 className="text-text font-semibold mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-text transition-colors duration-200 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-text-secondary text-sm text-center sm:text-left">
                © 2024 Vibe. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="text-text-secondary hover:text-text transition-colors duration-200 text-sm">
                  Privacy
                </Link>
                <Link href="/terms" className="text-text-secondary hover:text-text transition-colors duration-200 text-sm">
                  Terms
                </Link>
                <Link href="/cookies" className="text-text-secondary hover:text-text transition-colors duration-200 text-sm">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
