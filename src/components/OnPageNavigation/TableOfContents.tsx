import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { MarkdownHeading } from 'astro';

type ItemOffsets = {
	id: string;
	topOffset: number;
};

type Props = {
	headings: MarkdownHeading[];
};

const TableOfContents: FC<Props> = ({
	headings = [],
}) => {
	if (!headings.length) return;

	const itemOffsets = useRef<ItemOffsets[]>([]);
	const [activeId, setActiveId] = useState<string>('');

	useEffect(() => {
		setActiveId(window.location.hash.replace('#', ''));		
	}, []);
	
	useEffect(() => {
		const getItemOffsets = () => {
			const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
			itemOffsets.current = Array.from(titles).map((title) => ({
				id: title.id,
				topOffset: title.getBoundingClientRect().top + window.scrollY,
			}));
		};

		getItemOffsets();
		window.addEventListener('resize', getItemOffsets);

		return () => {
			window.removeEventListener('resize', getItemOffsets);
		};
	}, []);

  const onClickHandler = (activeId: string) => {
  	console.log('onClick', activeId)
    setActiveId(activeId);
  };

	return (
		<>
			<ul>
				<li className="leading-loose">
					<a href="" className="font-plex-sans text-18 font-bold">Content</a>
				</li>
				{headings
					.filter(({ depth }) => depth < 3)
					.map((heading) => (
						<li
							key={heading.slug}
							className={`leading-loose ${heading.depth > 1 ? 'pl-10' : ''} heading-link depth-${heading.depth} ${
								activeId === heading.slug ? 'font-bold' : ''
							}`.trim()}
							onClick={() => onClickHandler(heading.slug)}
						>
							<a className="font-plex-sans text-13" href={`#${heading.slug}`}>{heading.text}</a>
						</li>
					))}
			</ul>
		</>
	);
};

export default TableOfContents;
