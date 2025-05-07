import { cn } from '@utils/cn';

export const Button: React.FC<
  React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'flex h-36 items-center gap-8 rounded-12 px-8 font-medium transition-colors hover:bg-gray-dark-2 active:bg-gray-dark-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-dark-1',
        props.className,
      )}
    >
      {children}
    </button>
  );
};

export const IconButton: React.FC<
  React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(
        'size-36 justify-center border border-neutral-7 px-0 text-neutral-12',
        props.className,
      )}
    >
      {children}
    </Button>
  );
};
