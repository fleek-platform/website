import GridLayout from "@components/GridLayout";
import Container from "@components/Container";
import Text from "@components/Text";
import IconSocial from "@components/IconSocial";
import StatusBar from "@components/StatusBar";
import Link from "next/link";
import fleekLogo from "../../public/images/fleek-logo-color.png";
import ExportedImage from "next-image-export-optimizer";

const RESOURCES = [
  {
    text: "Pricing",
    url: "/pricing",
  },
  {
    text: "Documentation",
    url: "https://docs.fleek.xyz/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Community",
    url: "https://discord.gg/fleek",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Support",
    url: "https://support.fleek.xyz/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Blog",
    url: "https://blog.fleek.xyz/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const PRODUCT = [
  {
    text: "Hosting",
    url: "/hosting",
  },
  {
    text: "Storage",
    url: "/storage",
  },
  {
    text: "Domains",
    url: "/domains",
  },
  {
    text: "Gateways",
    url: "/gateways",
  },
  {
    text: "Fleek Network",
    url: "https://fleek.network/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const COMPANY = [
  {
    text: "Careers",
    url: "https://wellfound.com/company/fleekhq/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Contact Us",
    url: "https://support.fleek.xyz/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const LEGAL = [
  {
    text: "Terms of Service",
    url: "https://docs.fleek.xyz/docs/terms",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Privacy Policies",
    url: "https://docs.fleek.xyz/docs/privacy",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    text: "Report Abuse",
    url: "https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=16807535390093/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const Footer = () => {
  return (
    <footer className="mt-32 bg-ui-fleek-black pb-40 pt-80 text-ui-light-grey">
      <Container>
        <GridLayout>
          <div className="col-span-16 mb-24 flex flex-col md:col-span-3 md:mb-0">
            <ExportedImage
              src={fleekLogo}
              width={82}
              alt="fleek logo"
              className="mb-24"
            />
            <Text
              style="s"
              as="p"
              className="mb-16 max-w-[14rem] md:max-w-none"
            >
              Build lightning fast web3 apps on the edge.
            </Text>
            <div className="mb-16 flex gap-16">
              <a href="https://github.com/fleekxyz" rel="noopener noreferrer" target="_blank">
                <IconSocial icon="github" />
              </a>
              <a href="https://twitter.com/fleekxyz/" rel="noopener noreferrer" target="_blank">
                <IconSocial icon="twitter" />
              </a>
              <a href="https://discord.gg/fleek" rel="noopener noreferrer" target="_blank">
                <IconSocial icon="discord" />
              </a>
            </div>
            <div className="col-span-16 md:hidden">
              <StatusBar />
            </div>
          </div>
          <div className="col-span-16 md:col-span-12 md:col-start-5">
            <div className="grid grid-flow-dense grid-cols-12 flex-col gap-x-16 gap-y-24 md:grid md:gap-y-0">
              <div className="col-span-6 flex flex-col gap-12 md:col-span-3 md:gap-16">
                <Text style="caption-m">Resources</Text>
                <ul className="flex flex-col gap-10 md:gap-8">
                  {RESOURCES.map((item, index) => (
                    <li className="flex justify-start" key={index}>
                      <Link href={item.url} target={item.target} rel={item.rel}>
                        <Text style="caption-text">{item.text}</Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 flex flex-col gap-12 md:col-span-3 md:gap-16">
                <Text style="caption-m">Product</Text>
                <ul className="flex flex-col gap-10 md:gap-8">
                  {PRODUCT.map((item, index) => (
                    <li className="flex justify-start" key={index}>
                      <Link href={item.url} target={item.target} rel={item.rel}>
                        <Text style="caption-text">{item.text}</Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 flex flex-col gap-12 md:col-span-3 md:gap-16">
                <Text style="caption-m">Company</Text>
                <ul className="flex flex-col gap-10 md:gap-8">
                  {COMPANY.map((item, index) => (
                    <li className="flex justify-start" key={index}>
                      <Link href={item.url} target={item.target} rel={item.rel}>
                        <Text style="caption-text">{item.text}</Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 flex flex-col gap-12 md:col-span-3 md:gap-16">
                <Text style="caption-m">Legal</Text>
                <ul className="flex flex-col gap-10 md:gap-8">
                  {LEGAL.map((item, index) => (
                    <li className="flex justify-start" key={index}>
                      <Link href={item.url} target={item.target} rel={item.rel}>
                        <Text style="caption-text">{item.text}</Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-16 mt-24 hidden md:block">
            <StatusBar />
          </div>
        </GridLayout>
      </Container>
    </footer>
  );
};

export default Footer;
