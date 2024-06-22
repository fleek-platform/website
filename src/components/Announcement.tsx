import { useEffect, useState } from 'react';
import Container from '@components/Container';
import Text from '@components/Text';
import Marquee from 'react-fast-marquee';
import settings from '@base/settings.json';

const announcement = `⚡ ${settings.site.annoucement.message} ⚡`; //character limit: 130

interface AnnouncementProps {
  hasMargin?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({
  hasMargin = true,
}: AnnouncementProps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // Init marquee on component mount
    setMount(true);
  }, []);

  return (
    <a
      href={settings.site.annoucement.url}
      rel="noopener noreferrer"
      className={`${hasMargin && 'mb-16 '}opacity-100 transition hover:opacity-80`}
    >
      <Container>
        <div
          className={`${hasMargin && 'my-8'} overflow-hidden rounded-16 border border-gray-dark-6 bg-ui-mid-black px-16 py-8`}
        >
          <div className="overflow-hidden">
            <Text className="whitespace-nowrap text-center lg:hidden" style="m">
              {mount && (
                <Marquee speed={20} delay={1}>
                  {announcement}
                </Marquee>
              )}
            </Text>
            <Text
              as="p"
              className="hidden text-center text-gray-dark-12 lg:block"
              style="m-mid"
            >
              {announcement}
            </Text>
          </div>
        </div>
      </Container>
    </a>
  );
};

export default Announcement;
