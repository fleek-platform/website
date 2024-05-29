import GlowWrapper from '@components/GlowWrapper';
import clsx from 'clsx';

interface Props {
  className?: string;
  noInnerPadding?: boolean;
  image?: string;
  header?: boolean;
}

const CardWrapper: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <GlowWrapper className={props.className}>
      <div className=" w-full rounded-12 border border-gray-dark-7  p-1">
        {props.image && (
          <div className="flex w-full justify-center">
            <img src={props.image} className="rounded-t-12 lg:object-fill" />
          </div>
        )}
        <div
          className={clsx(
            `h-full  ${props.header ? 'rounded-12' : 'rounded-b-12'} bg-gray-dark-2`,
            {
              'p-8 lg:px-16 lg:py-20': !props.noInnerPadding,
              'p-0': props.noInnerPadding,
            },
          )}
        >
          {props.children}
        </div>
      </div>
    </GlowWrapper>
  );
};

export default CardWrapper;
