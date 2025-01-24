import { cn } from '@utils/cn';

interface SectionProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children, title, className }) => {
  return (
    <div className={cn('', className)}>
      <h1 className="text-38">{title}</h1>
      {children && <div className="text-16">{children}</div>}
    </div>
  );
};

export default Section;
