import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="flex h-[134px] items-center bg-[#171717]">
      <div className="container px-[2rem] py-[3rem]">
        <nav className="flex flex-wrap items-center justify-center">
          <ul className="flex items-center">
            <li className="cursor-pointer px-[1em] py-[0.5em]  text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a href="/" target="_blank" rel="noopener noreferrer">
                Back to website
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a
                href="https://x.com/fleek"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter fontSize={16} />
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a
                href="https://www.linkedin.com/company/fleekxyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin fontSize={16} />
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a
                href="https://www.youtube.com/@fleekxyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube fontSize={16} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
