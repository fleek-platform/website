import { categoryCardItems } from './config';

export type CategoryCardsProps = {
  link: string;
  image: string;
  title: string;
};

function CategoryCards() {
  return (
    <div className="mx-auto   w-[85%] max-w-[768px] lg:w-full">
      <ul className="flex w-full flex-col gap-[1.5rem]  py-[5rem] md:flex-row lg:gap-[0]">
        {categoryCardItems.map((item) => (
          <li className="w-full">
            <CategoryCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryCard({ link, image, title }: CategoryCardsProps) {
  return (
    <a
      href={link}
      className="block h-full w-full rounded-[8px] border-[1px] border-[#313538] py-[17px] transition-all duration-[150ms] ease-out hover:-translate-y-[1rem] hover:border-white md:w-[85%]"
    >
      <div className="flex flex-col items-center gap-[6px]">
        <div>
          <img className="h-[48px]" src={image} alt="billing" />
        </div>
        <p className="text-[1.2rem] font-semibold lg:text-[1.5rem] xl:text-[2rem]">
          {title}
        </p>
      </div>
    </a>
  );
}

export default CategoryCards;
