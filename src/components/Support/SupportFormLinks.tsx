import React from 'react';

function SupportFormLinks() {
  return (
    <div className="mx-auto  my-[4rem] w-[85%] max-w-[768px] lg:w-full">
      <div className="my-[1.4rem]">
        <h2 className="text-[1.7rem] font-semibold xl:text-[2.5rem]">
          Need Customer Support?
        </h2>
      </div>
      <ul className="mb-[12px]">
        <li className="mb-[1rem]">
          <a
            href={'requests/new?ticket_form_id=phishing-form'}
            className="text-[1.3rem] font-semibold text-[#9BA1A6] hover:text-[#2294ff] hover:underline xl:text-[1.5rem]"
          >
            Report Site
          </a>
        </li>
        <li className="">
          <a
            href={'requests/new'}
            className="text-[1.3rem] font-semibold text-[#9BA1A6] hover:text-[#2294ff] hover:underline xl:text-[1.5rem]"
          >
            Submit a request
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SupportFormLinks;
