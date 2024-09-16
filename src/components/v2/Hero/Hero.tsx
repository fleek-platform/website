import { FaChevronRight } from 'react-icons/fa6';
import { Announcement } from '../Announcement/Announcement';
import { Button } from '../Button/Button';

export const Hero = () => {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-400 w-400 bg-gradient-to-br from-gray-dark-3/80 via-transparent to-transparent"></div>
      <header className="flex flex-col justify-center gap-24 pt-64">
        <Announcement variant="content" />
        <section className="flex max-w-800 flex-col gap-24">
          <h1 className="text-balance font-sans text-52 font-semibold leading-tight -tracking-2 text-gray-dark-12">
            Ship fast and break paradigms.
          </h1>
          <p className="text-balance font-plex-sans text-18 font-medium text-gray-dark-11">
            Fleek is an edge-optimized cloud platform for building, shipping and
            scaling highly-performant Web apps. Escape the costs, constraints
            and nonsense of Big Cloud.
          </p>
          <div className="flex items-center gap-12">
            <Button>Get started</Button>
            <Button variant="ghost">
              Read our docs <FaChevronRight className="size-12" />
            </Button>
          </div>
        </section>
        <div className="relative">
          <div className="pointer-events-none absolute -top-152 left-[12%] h-496 w-608 bg-[radial-gradient(closest-side,rgb(34_34_34_/0.8),transparent)]"></div>
          <div className="absolute inset-0 -left-[4%] top-60 h-608 w-[1000px] origin-top-left overflow-hidden rounded-14 border border-r-0 border-gray-dark-3 transition-all [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0))] [transform:rotateX(35deg)__rotateY(7deg)_rotate(-14.337deg)] lg:-left-[11%] lg:top-108 lg:h-[800px] lg:w-[1200px] xl:w-[1300px] 2xl:-left-[20%] 2xl:w-[1452px]">
            <img src="/images/hero.webp" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-400 bg-gradient-to-l from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </header>
    </>
  );
};
