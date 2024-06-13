import clsx from 'clsx';

interface Props {
  className?: string;
  rounded?: RoundedType;
  overflow?: string;
}

export type RoundedType =
  | 'all-small'
  | 'all-big'
  | 'top-big-bottom-small'
  | 'top-small-bottom-big';

const PageSection: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  rounded = 'all-small',
}) => {
  return (
    <section className={clsx('relative', className)}>
      {children}
      <div
        className={clsx(
          'absolute left-0 top-0 -z-2 h-full w-full bg-gray-dark-1',
          {
            'rounded-24 lg:rounded-48': rounded === 'all-big',
            'rounded-8': rounded === 'all-small',
            'rounded-8 rounded-tl-24 rounded-tr-24 lg:rounded-tl-48 lg:rounded-tr-48':
              rounded === 'top-big-bottom-small',
            'rounded-8 rounded-bl-24 rounded-br-24 lg:rounded-bl-48 lg:rounded-br-48':
              rounded === 'top-small-bottom-big',
          },
        )}
      ></div>
    </section>
  );
};

export default PageSection;
