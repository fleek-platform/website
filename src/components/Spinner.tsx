import SpinnerImage from '/public/images/spinner.png';
import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => (
  <img
    src={SpinnerImage.src}
    className={clsx('animate-reverse-spin', className)}
    alt="Loading..."
    // Rotate infinitely
  />
);

export default Spinner;
