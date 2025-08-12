import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderLogoProps {
  className?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ className }) => {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">V</span>
      </div>
      <span className="text-xl font-bold text-text">Vibe</span>
    </Link>
  );
};
