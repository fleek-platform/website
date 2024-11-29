declare module 'lite-youtube-embed' {}

declare namespace JSX {
  interface IntrinsicElements {
    'lite-youtube': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      videoid?: string;
      params?: string;
      style?: React.CSSProperties;
      title?: string;
    };
  }
}
