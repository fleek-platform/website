import { useEffect, useState } from 'react';
import Container from '@components/Container';
import Text from '@components/Text';
import Marquee from 'react-fast-marquee';
import settings from '@base/settings.json';

const announcement =
  `⚡ ${settings.site.annoucement.message} ⚡`;

const Announcement: React.FC = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // Init marquee on component mount
    setMount(true);
  }, []);

  return (
    <a
      href={settings.site.annoucement.url}
      rel="noopener noreferrer"
      className="mb-16 transition opacity-100 hover:opacity-80"
    >
      <Container>
        <div className="my-8 overflow-hidden rounded-16 bg-ui-fleek-black px-16 py-8">
          <div className="overflow-hidden">
            <Text className="whitespace-nowrap text-center lg:hidden" style="m">
              {mount && (
                <Marquee speed={20} delay={1}>
                  {announcement}
                </Marquee>
              )}
            </Text>
            <Text as="p" className="hidden text-center lg:block" style="m">
              {announcement}
            </Text>
          </div>
        </div>
      </Container>
    </a>
  );
};

export default Announcement;
