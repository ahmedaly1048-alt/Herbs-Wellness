import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
}

interface NavigationProps {
  links: NavItem[];
  className?: string;
}

export default function Navigation({ links, className = '' }: NavigationProps) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          aria-label={`Navigate to ${item.name}`}
          className="text-sm font-semibold tracking-wider text-stone-200 hover:text-white uppercase transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}