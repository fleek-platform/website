import BlackFeatureCards from "@components/BlackFeatureCards";

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built in CDN & content addressing makes every storage layer performant.',
    icon: '/svg/vertical-waves-icon.svg',
  },
  {
    title: 'Incredibly Cheap',
    description: 'Prices 90% lower than AWS and other cloud platforms.',
    icon: '/svg/theta-icon.svg',
  },
  {
    title: 'Better Guarantees',
    description: 'Better data security and availability guarantees. No vendor lock-in.',
    icon: '/svg/star-icon.svg',
  }
];

const StorageFeatCards = () => <BlackFeatureCards features={features} />;

export default StorageFeatCards;
