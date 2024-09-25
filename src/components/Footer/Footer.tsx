import IconSocial from '@components/IconSocial';
import StatusBar from '@components/StatusBar';
import Link, { Target } from '@components/Link';
import { FaXTwitter } from 'react-icons/fa6';
import type React from 'react';
import { Container } from '../LandingPage/Container/Container';
import { Text } from '../LandingPage/Text/Text';
import config from './config';

const { product, developers, company, resources, fleekPlatformOrgUrl } = config;

const Footer: React.FC = () => {
  return (
    <Container classNameInnerContainer="pb-40">
      <footer className="grid font-plex-sans text-14 text-gray-dark-11 sm:grid-cols-6">
        <div className="col-span-2 mb-24 flex flex-col">
          <img
            src="/svg/fleek-logo.svg"
            width={82}
            alt="fleek logo"
            className="mb-24"
            loading="lazy"
          />
          <p className="mb-16">The lightning fast onchain cloud.</p>
          <div className="mb-16 flex gap-16">
            <a
              aria-label="Fleek Github Org"
              href={fleekPlatformOrgUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSocial icon="github" />
            </a>
            <a
              aria-label="Fleek X/Twitter account"
              href="https://twitter.com/fleek/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaXTwitter fontSize={19} className="mt-2 text-gray-dark-11" />
            </a>
            <a
              aria-label="Fleek Discord"
              href="https://discord.gg/fleek"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSocial icon="discord" />
            </a>
          </div>
          <div className="col-span-16 w-fit">
            <StatusBar />
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid-cols-6 gap-x-16 gap-y-24 sm:grid lg:grid-cols-12">
            <div className="col-span-3 mb-32 flex flex-col gap-12">
              <Text variant="feature">Product</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {product.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      className="text-gray-dark-12 hover:text-gray-dark-11"
                      target={
                        item.target?.toLowerCase() == '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 mb-32 flex flex-col gap-12">
              <Text variant="feature">Developers</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {developers.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      className="text-gray-dark-12 hover:text-gray-dark-11"
                      target={
                        item.target?.toLowerCase() == '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 mb-32 flex flex-col gap-12">
              <Text variant="feature">Resources</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {resources.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      className="text-gray-dark-12 hover:text-gray-dark-11"
                      target={
                        item.target?.toLowerCase() === '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 flex flex-col gap-12">
              <Text variant="feature">Company</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {company.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      className="text-gray-dark-12 hover:text-gray-dark-11"
                      target={
                        item.target?.toLowerCase() == '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
