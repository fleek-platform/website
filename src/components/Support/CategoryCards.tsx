import { categoryCardItems } from './config';

export type CategoryCardsProps = {
  link: string;
  image: string;
  title: string;
};

function CategoryCards() {
  return (
    <div className="mx-auto  max-w-[768px]">
      <ul className="flex w-full py-[5rem]">
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
      className="block h-full w-[85%] rounded-[8px] border-[1px] border-[#313538] py-[17px] transition-all duration-[150ms] ease-out hover:-translate-y-[1rem] hover:border-white"
    >
      <div className="flex flex-col items-center gap-[6px]">
        <div>
          <img className="h-[48px]" src={image} alt="billing" />
        </div>
        <p className="text-[2rem] font-semibold">{title}</p>
      </div>
    </a>
  );
}

export default CategoryCards;
