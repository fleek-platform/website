import { FaFileAlt } from 'react-icons/fa';

function FeaturedArticles() {
  return (
    <div className="mx-auto  max-w-[768px]">
      <div className="my-[1.4rem]">
        <h2 className="text-[2rem] font-semibold">Featured Articles</h2>
      </div>
      <div>
        <SingleArticleCard />
        <SingleArticleCard />
        <SingleArticleCard />
        <SingleArticleCard />
        <SingleArticleCard />
      </div>
    </div>
  );
}

function SingleArticleCard() {
  return (
    <article>
      <div className="flex gap-[10px]">
        <img
          className="h-[20px] flex-shrink"
          src="/images/article-img.svg"
          alt="file icon"
        />

        <div className="flex-1">
          <a
            href="google.com"
            className="text-[1.4rem] font-semibold text-[#9BA1A6] hover:text-[#2294ff] hover:underline"
          >
            Node engine errors
          </a>
          <small className="my-[1rem] block text-[1.4rem] text-[#9BA1A6]">
            If you are getting node engine mismatch errors, don't worry. It only
            means the docker image you selected does not have the required node
            version. However, you can use any docker image published on
            dockerhub, you don't need to use the ones we provide if...
          </small>
        </div>
      </div>
    </article>
  );
}

export default FeaturedArticles;
