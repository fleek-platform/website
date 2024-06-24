import { FaFileAlt } from 'react-icons/fa';
import { singleArticleCardItems } from './config';

export type SingleArticleCardProps = {
  title: string;
  description: string;
  link: string;
};

function FeaturedArticles() {
  return (
    <div className="mx-auto  w-[85%] max-w-[768px] lg:w-full">
      <div className="my-[1.4rem]">
        <h2 className="text-[1.5rem] font-semibold xl:text-[2rem]">
          Featured Articles
        </h2>
      </div>
      <div>
        {singleArticleCardItems.map((cardItem) => (
          <SingleArticleCard key={cardItem.id} {...cardItem} />
        ))}
      </div>
    </div>
  );
}

function SingleArticleCard({
  title,
  description,
  link,
}: SingleArticleCardProps) {
  return (
    <article className="mb-[12px]">
      <div className="flex gap-[7px] xl:gap-[10px]">
        <div className="flex-1">
          <a
            href={link}
            className="text-[1.3rem] font-semibold text-[#9BA1A6] hover:text-[#2294ff] hover:underline xl:text-[1.5rem]"
          >
            {title}
          </a>
          <small className="my-[1rem] block text-[1.2rem] text-[#9BA1A6] xl:text-[1.4rem]">
            {description}
          </small>
        </div>
      </div>
    </article>
  );
}

export default FeaturedArticles;
