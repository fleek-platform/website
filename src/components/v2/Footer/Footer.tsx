import Text from '@components/Text';
import IconSocial from '@components/IconSocial';
import StatusBar from '@components/StatusBar';
import Link, { Target } from '@components/Link';
import config from './config';
import { FaXTwitter } from 'react-icons/fa6';
import type React from 'react';
import { Container } from '../LandingPage/Container/Container';

const { product, developers, company, resources, fleekPlatformOrgUrl } = config;

const Footer: React.FC = () => {
  return (
    <Container className="pb-40">
      <footer className="grid grid-cols-5">
        <div className="col-span-2 mb-24 flex flex-col">
          <img
            src="/svg/fleek-logo.svg"
            width={82}
            alt="fleek logo"
            className="mb-24"
          />
          <Text style="s" as="p" className="mb-16">
            The edge-optimized cloud platform
          </Text>
          <div className="mb-16 flex gap-16">
            <a
              href={fleekPlatformOrgUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSocial icon="github" />
            </a>
            <a
              href="https://twitter.com/fleek/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaXTwitter fontSize={19} className="mt-2 text-gray-dark-11" />
            </a>
            <a
              href="https://discord.gg/fleek"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSocial icon="discord" />
            </a>
          </div>
          <div className="col-span-16">
            <StatusBar />
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid-cols-6 gap-x-16 gap-y-24 sm:grid lg:grid-cols-12">
            <div className="col-span-3 mb-20 flex flex-col gap-12">
              <Text style="caption-m">Product</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {product.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link href={item.url} target={Target.Blank}>
                      <Text style="caption-text">{item.text}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 mb-20 flex flex-col gap-12">
              <Text style="caption-m">Developers</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {developers.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      target={
                        item.target?.toLowerCase() == '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      <Text style="caption-text">{item.text}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 mb-20 flex flex-col gap-12">
              <Text style="caption-m">Resources</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {resources.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      target={
                        item.target?.toLowerCase() === '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      <Text style="caption-text">{item.text}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 flex flex-col gap-12">
              <Text style="caption-m">Company</Text>
              <ul className="flex flex-col gap-10 md:gap-8">
                {company.map((item, index) => (
                  <li className="flex justify-start" key={index}>
                    <Link
                      href={item.url}
                      target={
                        item.target?.toLowerCase() == '_blank'
                          ? Target.Blank
                          : Target.Self
                      }
                    >
                      <Text style="caption-text">{item.text}</Text>
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
