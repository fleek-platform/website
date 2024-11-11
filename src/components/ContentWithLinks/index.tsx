const ContentWithLinks: React.FC<{ content: string }> = ({ content }) => {
  const parts = content.split(/(<a href=['"].*?['"]>.*?<\/a>)/);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('<a href=')) {
          const hrefMatch = part.match(/href=['"]([^'"]*)['"]/);
          const textMatch = part.match(/>([^<]*)</);

          if (hrefMatch && textMatch) {
            return (
              <a key={index} href={hrefMatch[1]} className="text-yellow">
                {textMatch[1]}
              </a>
            );
          }
        }
        return part;
      })}
    </>
  );
};

export default ContentWithLinks;
