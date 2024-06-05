import Link from '@components/Link';

function NavBar() {
  return (
    <header className="h-[72px]">
      <div className="flex h-full flex-wrap items-center justify-between px-[3rem]">
        <Link href="/" className="flex-shrink-0 ">
          <img className="w-full" src="/svg/fleek-logo.svg" alt="fleek logo" />
        </Link>
        <nav>
          <ul className="flex items-center">
            <li className="cursor-pointer px-[1em] py-[0.5em]  text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a href="/" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a href="/docs" target="_blank" rel="noopener noreferrer">
                Docs
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Report site
              </a>
            </li>
            <li className="cursor-pointer px-[1em] py-[0.5em] text-[1.5rem] text-white hover:text-[#dcdee0]">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Submit a request
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
