import Container from "@components/Container";
import Text from "@components/Text";
import Marquee from "react-fast-marquee";

const announcement =
  "⚡ We've updated our milestones and roadmap for Fleek.xyz's V1, with new features and timelines! Read more here. ⚡";

const Announcement: React.FC = () => {
  return (
    <a
      href="https://blog.fleek.xyz/post/fleek-platform-update/"
      target="_blank"
      rel="noopener noreferrer"
      className="mb-16"
    >
      <Container>
        <div className="my-8 overflow-hidden rounded-16 bg-ui-fleek-black px-16 py-8">
          <div className="overflow-hidden">
            <Text className="whitespace-nowrap text-center lg:hidden" style="m">
              <Marquee speed={20} delay={1}>
                {announcement}
              </Marquee>
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
