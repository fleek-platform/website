import ExportedImage from 'next-image-export-optimizer';
import SpinnerImage from '/public/images/spinner.png'
import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => (
  <ExportedImage
    src={SpinnerImage}
    className={clsx("animate-reverse-spin",className)}
    alt="Loading..."
    // Rotate infinitely
  />
)

export default Spinner;
