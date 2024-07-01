type FormatDateArgs = Intl.DateTimeFormatOptions & {
  date: Date;
};

export const formatDate = ({ date, ...options }: FormatDateArgs) => {
  return new Intl.DateTimeFormat(
    'en-US',
    Object.keys(options).length === 0
      ? {
          dateStyle: 'medium',
        }
      : options,
  ).format(date);
};
