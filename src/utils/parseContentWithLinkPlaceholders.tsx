interface Resources {
  [key: string]: string;
}

export function parseContentWithLinkPlaceholders(
  content: string,
  resources: Resources,
): (string | JSX.Element)[] {
  const parts = content.split(/(\$[a-zA-Z0-9]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$')) {
      const key = part.slice(1);
      const url = resources[key];
      return url ? (
        <a
          key={index}
          href={url}
          className="text-yellow"
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      ) : (
        part
      );
    }
    return part;
  });
}
