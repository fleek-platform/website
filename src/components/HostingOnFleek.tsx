import ImageWithCopy from '@components/ImageWithCopy';
import type { RoundedType } from '@components/PageSection';
interface Props {
  rounded?: RoundedType;
}

const HostingOnFleek: React.FC<Props> = ({ rounded }) => (
  <ImageWithCopy
    kicker="hosting"
    floatingImageEffect
    className="pb-64 pt-64 xl:py-40"
    headline={<>Plus the Best of Onchain</>}
    copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu libero ac nunc mollis accumsan at non purus."
    cta={{ url: 'https://app.fleek.xyz/', text: 'try it out' }}
    rounded={rounded}
  >
    <div className="flex w-full mix-blend-screen">
      <img
        className="max-w-[280px] mix-blend-screen md:max-w-[550px] xl:max-w-[500px]"
        src={'/svg/storage-landing.svg'}
        alt="Hosting on Fleek"
      />
    </div>
  </ImageWithCopy>
);

export default HostingOnFleek;
