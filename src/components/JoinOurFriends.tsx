import LoopingCardSlider from '@components/LoopingCardSlider';

const JoinOurFriends = () => (
  <LoopingCardSlider
    headline="Your stack works on Fleek."
    cards={[
      {
        bannerImage: '/svg/nextjs-icon.svg',
      },
      {
        bannerImage: '/svg/react-icon.svg',
      },
      {
        bannerImage: '/svg/nuxt-icon.svg',
      },
      {
        bannerImage: '/svg/gatsby-icon.svg',
      },
      {
        bannerImage: '/svg/vue-icon.svg',
      },
    ]}
  />
);

export default JoinOurFriends;
