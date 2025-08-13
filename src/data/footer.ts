export interface FooterData {
    logo: {
      text: string;
      href: string;
    };
    description: string;
    copyright: string;
    bottomLinks: {
      id: string;
      name: string;
      href: string;
    }[];
  }
  
  export const footerData: FooterData = {
    logo: {
      text: 'Vibe',
      href: '/'
    },
    description: 'Plan and build your product with modern design system. Purpose-built for modern product development.',
    copyright: '© 2025 Vibe. All rights reserved.',
    bottomLinks: [
      {
        id: 'privacy',
        name: 'Privacy',
        href: '/privacy'
      },
      {
        id: 'terms',
        name: 'Terms',
        href: '/terms'
      },
      {
        id: 'cookies',
        name: 'Cookies',
        href: '/cookies'
      }
    ]
  };