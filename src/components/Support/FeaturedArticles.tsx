import { FaFileAlt } from 'react-icons/fa';
import { singleArticleCardItems } from './config';

export type SingleArticleCardProps = {
  title: string;
  description: string;
  link?: string;
};

function FeaturedArticles() {
  return (
    <div className="mx-auto  max-w-[768px]">
      <div className="my-[1.4rem]">
        <h2 className="text-[2rem] font-semibold">Featured Articles</h2>
      </div>
      <div>
        {singleArticleCardItems.map((cardItem) => (
          <SingleArticleCard {...cardItem} />
        ))}
      </div>
    </div>
  );
}

function SingleArticleCard({ title, description }: SingleArticleCardProps) {
  return (
    <article className="mb-[12px]">
      <div className="flex gap-[10px]">
        <img
          className="h-[20px] flex-shrink"
          src="/images/article-img.svg"
          alt="file icon"
        />

        <div className="flex-1">
          <a
            href="#"
            className="text-[1.5rem] font-semibold text-[#9BA1A6] hover:text-[#2294ff] hover:underline"
          >
            {title}
          </a>
          <small className="my-[1rem] block text-[1.4rem] text-[#9BA1A6]">
            {description}
          </small>
        </div>
      </div>
    </article>
  );
}

export default FeaturedArticles;
