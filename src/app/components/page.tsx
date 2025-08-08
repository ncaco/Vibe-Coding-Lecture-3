'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Carousel from '@/components/ui/Carousel';
import ImageCard from '@/components/ui/ImageCard';

export default function ComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const buttonVariants = [
    { variant: 'primary', label: 'Primary' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'outline', label: 'Outline' },
    { variant: 'ghost', label: 'Ghost' },
  ];

  const buttonSizes = [
    { size: 'sm', label: 'Small' },
    { size: 'md', label: 'Medium' },
    { size: 'lg', label: 'Large' },
  ];

  const badgeVariants = [
    { variant: 'default', label: 'Default' },
    { variant: 'primary', label: 'Primary' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'success', label: 'Success' },
    { variant: 'warning', label: 'Warning' },
    { variant: 'error', label: 'Error' },
  ];

  const badgeSizes = [
    { size: 'sm', label: 'Small' },
    { size: 'md', label: 'Medium' },
    { size: 'lg', label: 'Large' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text mb-6">
            Component Library
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explore our comprehensive collection of reusable components built with 
            Linear-inspired design principles and TypeScript.
          </p>
        </div>

        {/* Button Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Buttons</h2>
          
          {/* Button Variants */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-text mb-6">Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buttonVariants.map((button) => (
                <Card key={button.variant} className="text-center">
                  <Button variant={button.variant as any} className="mb-4">
                    {button.label}
                  </Button>
                  <p className="text-sm text-text-secondary">
                    variant=&quot;{button.variant}&quot;
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Button Sizes */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-text mb-6">Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buttonSizes.map((button) => (
                <Card key={button.size} className="text-center">
                  <Button size={button.size as any} className="mb-4">
                    {button.label}
                  </Button>
                  <p className="text-sm text-text-secondary">
                    size=&quot;{button.size}&quot;
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Button with Icons */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-text mb-6">With Icons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="text-center">
                <Button 
                  icon={<span>→</span>} 
                  iconPosition="right"
                  className="mb-4"
                >
                  With Icon Right
                </Button>
                <p className="text-sm text-text-secondary">
                  iconPosition=&quot;right&quot;
                </p>
              </Card>
              <Card className="text-center">
                <Button 
                  icon={<span>←</span>} 
                  iconPosition="left"
                  className="mb-4"
                >
                  With Icon Left
                </Button>
                <p className="text-sm text-text-secondary">
                  iconPosition=&quot;left&quot;
                </p>
              </Card>
            </div>
          </div>

          {/* Disabled Buttons */}
          <div>
            <h3 className="text-xl font-semibold text-text mb-6">Disabled State</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="text-center">
                <Button disabled className="mb-4">
                  Disabled Primary
                </Button>
                <p className="text-sm text-text-secondary">
                  disabled={true}
                </p>
              </Card>
              <Card className="text-center">
                <Button variant="secondary" disabled className="mb-4">
                  Disabled Secondary
                </Button>
                <p className="text-sm text-text-secondary">
                  disabled={true}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Input Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Inputs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Default Input</h3>
              <Input 
                placeholder="Enter your text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">With Icon</h3>
              <Input 
                placeholder="Search..."
                icon={<span>🔍</span>}
                iconPosition="left"
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">With Error</h3>
              <Input 
                placeholder="Email address"
                error="Please enter a valid email address"
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Disabled</h3>
              <Input 
                placeholder="Disabled input"
                disabled
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Small Size</h3>
              <Input 
                placeholder="Small input"
                size="sm"
              />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Large Size</h3>
              <Input 
                placeholder="Large input"
                size="lg"
              />
            </Card>
          </div>
        </section>

        {/* Badge Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Badges</h2>
          
          {/* Badge Variants */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-text mb-6">Variants</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badgeVariants.map((badge) => (
                <Card key={badge.variant} className="text-center">
                  <Badge variant={badge.variant as any} className="mb-2">
                    {badge.label}
                  </Badge>
                  <p className="text-xs text-text-secondary">
                    variant=&quot;{badge.variant}&quot;
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Badge Sizes */}
          <div>
            <h3 className="text-xl font-semibold text-text mb-6">Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badgeSizes.map((badge) => (
                <Card key={badge.size} className="text-center">
                  <Badge size={badge.size as any} className="mb-2">
                    {badge.label}
                  </Badge>
                  <p className="text-xs text-text-secondary">
                    size=&quot;{badge.size}&quot;
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-2">Default Card</h3>
              <p className="text-text-secondary text-sm">
                This is a default card with medium padding and hover effects.
              </p>
            </Card>
            
            <Card padding="sm">
              <h3 className="text-lg font-semibold text-text mb-2">Small Padding</h3>
              <p className="text-text-secondary text-sm">
                Card with small padding for compact layouts.
              </p>
            </Card>
            
            <Card padding="lg">
              <h3 className="text-lg font-semibold text-text mb-2">Large Padding</h3>
              <p className="text-text-secondary text-sm">
                Card with large padding for spacious layouts.
              </p>
            </Card>
            
            <Card padding="xl" hover={false}>
              <h3 className="text-lg font-semibold text-text mb-2">No Hover</h3>
              <p className="text-text-secondary text-sm">
                Card without hover effects for static content.
              </p>
            </Card>
          </div>
        </section>

        {/* Modal Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Modal</h2>
          
          <Card className="text-center">
            <h3 className="text-lg font-semibold text-text mb-4">Modal Example</h3>
            <p className="text-text-secondary mb-6">
              Click the button below to open a modal dialog.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
          </Card>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-text-secondary">
                This is an example modal dialog. You can close it by clicking the X button, 
                pressing the Escape key, or clicking outside the modal.
              </p>
              <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        </section>

        {/* Carousel Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Carousel</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text mb-6">Interactive Carousel</h3>
            <Carousel
              items={[
                <div key="1" className="h-64 bg-gradient-to-br from-accent/20 to-background-secondary rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="text-xl font-bold text-text mb-2">Design System</h3>
                    <p className="text-text-secondary">Modern and consistent design components</p>
                  </div>
                </div>,
                <div key="2" className="h-64 bg-gradient-to-br from-green-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold text-text mb-2">Performance</h3>
                    <p className="text-text-secondary">Optimized for speed and efficiency</p>
                  </div>
                </div>,
                <div key="3" className="h-64 bg-gradient-to-br from-purple-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-text mb-2">Innovation</h3>
                    <p className="text-text-secondary">Cutting-edge development practices</p>
                  </div>
                </div>
              ]}
              autoPlay={true}
              interval={3000}
              className="max-w-2xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Features</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Auto-play with customizable interval</li>
                <li>• Navigation arrows and dots</li>
                <li>• Keyboard navigation (Arrow keys)</li>
                <li>• Touch/swipe support</li>
                <li>• Smooth transitions</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Props</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• <code>items</code>: Array of React nodes</li>
                <li>• <code>autoPlay</code>: Boolean for auto-play</li>
                <li>• <code>interval</code>: Auto-play interval in ms</li>
                <li>• <code>showDots</code>: Show dot indicators</li>
                <li>• <code>showArrows</code>: Show navigation arrows</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Image Card Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Image Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                alt: "Dashboard Design"
              }}
              title="Modern Dashboard"
              description="A sleek and intuitive dashboard design with real-time analytics."
              badge="New"
              badgeVariant="success"
            />
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
                alt: "Mobile App"
              }}
              title="Mobile App Design"
              description="Responsive mobile application with smooth animations."
              badge="Popular"
              badgeVariant="primary"
            />
            <ImageCard
              image={{
                src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
                alt: "Web Application"
              }}
              title="Web Application"
              description="Full-stack web application with modern architecture."
              badge="Featured"
              badgeVariant="warning"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Features</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Responsive image with Next.js Image</li>
                <li>• Hover effects and animations</li>
                <li>• Configurable badges</li>
                <li>• Optional click handlers</li>
                <li>• Customizable styling</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Props</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• <code>image</code>: Image object with src, alt</li>
                <li>• <code>title</code>: Card title</li>
                <li>• <code>description</code>: Card description</li>
                <li>• <code>badge</code>: Optional badge text</li>
                <li>• <code>badgeVariant</code>: Badge color variant</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Design Tokens */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text mb-8">Design Tokens</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-background border border-border rounded"></div>
                  <span className="text-sm text-text-secondary">background</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-background-secondary border border-border rounded"></div>
                  <span className="text-sm text-text-secondary">background-secondary</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded"></div>
                  <span className="text-sm text-text-secondary">accent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-border rounded"></div>
                  <span className="text-sm text-text-secondary">border</span>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Typography</h3>
              <div className="space-y-2">
                <p className="text-xs text-text-secondary">text-xs (12px)</p>
                <p className="text-sm text-text-secondary">text-sm (14px)</p>
                <p className="text-base text-text-secondary">text-base (16px)</p>
                <p className="text-lg text-text-secondary">text-lg (18px)</p>
                <p className="text-xl text-text-secondary">text-xl (20px)</p>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Spacing</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded"></div>
                  <span className="text-sm text-text-secondary">p-2 (8px)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-accent rounded"></div>
                  <span className="text-sm text-text-secondary">p-4 (16px)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-accent rounded"></div>
                  <span className="text-sm text-text-secondary">p-6 (24px)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent rounded"></div>
                  <span className="text-sm text-text-secondary">p-8 (32px)</span>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Border Radius</h3>
              <div className="space-y-3">
                <div className="w-12 h-8 bg-accent rounded"></div>
                <span className="text-sm text-text-secondary">rounded (4px)</span>
                <div className="w-12 h-8 bg-accent rounded-lg"></div>
                <span className="text-sm text-text-secondary">rounded-lg (8px)</span>
                <div className="w-12 h-8 bg-accent rounded-xl"></div>
                <span className="text-sm text-text-secondary">rounded-xl (12px)</span>
                <div className="w-12 h-8 bg-accent rounded-2xl"></div>
                <span className="text-sm text-text-secondary">rounded-2xl (16px)</span>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
