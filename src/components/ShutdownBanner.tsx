import Link, { Target } from '@components/Link';
import { cn } from '@utils/cn';
import { FaExclamationTriangle } from 'react-icons/fa';

export const ShutdownBanner = () => {
  return (
    <div
      className="fixed left-0 right-0 top-0 w-full px-16 py-12 sm:px-24"
      style={{
        zIndex: 9999,
        backgroundColor: '#7f1d1d',
        borderBottom: '1px solid #dc2626',
      }}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-center gap-12 text-center sm:gap-16">
        <FaExclamationTriangle
          className="hidden shrink-0 sm:block"
          style={{ width: '20px', height: '20px', color: '#fbbf24' }}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-8 sm:hidden">
            <FaExclamationTriangle
              className="shrink-0"
              style={{ width: '16px', height: '16px', color: '#fbbf24' }}
            />
            <span
              className="tracking-wide font-plex-sans text-14 font-bold uppercase sm:text-15"
              style={{ color: '#fbbf24' }}
            >
              Service Shutdown Notice
            </span>
          </div>

          <span
            className="tracking-wide hidden font-plex-sans text-14 font-bold uppercase sm:block sm:text-15"
            style={{ color: '#fbbf24' }}
          >
            Service Shutdown Notice
          </span>

          <span
            className="font-plex-sans text-13 font-medium leading-relaxed sm:text-14"
            style={{ color: '#ffffff' }}
          >
            Fleek Hosting and Eliza Agents service will be permanently shut down
            on{' '}
            <span className="font-bold" style={{ color: '#fcd34d' }}>
              January 31, 2026
            </span>
            . All data and access will cease. Migrate your services immediately.
          </span>
        </div>

        <Link
          href="https://resources.fleek.xyz/support/"
          target={Target.Blank}
          rel="noopener noreferrer"
          className={cn(
            'rounded-md hidden shrink-0 px-16 py-8',
            'font-plex-sans text-13 font-bold transition-all',
            'sm:block',
          )}
          style={{
            backgroundColor: '#fbbf24',
            border: '1px solid #fbbf24',
            color: '#7f1d1d',
          }}
        >
          Learn More
        </Link>
      </div>

      {/* Mobile button */}
      <div className="mt-12 flex justify-center sm:hidden">
        <Link
          href="https://fleek.xyz/support"
          target={Target.Blank}
          rel="noopener noreferrer"
          className={cn(
            'rounded-md px-20 py-10',
            'font-plex-sans text-13 font-bold transition-all',
          )}
          style={{
            backgroundColor: '#fbbf24',
            border: '1px solid #fbbf24',
            color: '#7f1d1d',
          }}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
