import { IoMdCloseCircle } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import React, { useState } from 'react';
import { PiWarningCircleFill } from 'react-icons/pi';
import { GoCheckCircleFill } from 'react-icons/go';
import ButtonGray from './ButtonGray';
import settings from '@base/settings.json';
import Loading from '@components/Loading';

import type { Dispatch, SetStateAction, MouseEvent } from 'react';

const { activeHostedFormApi } = settings.newsletterSubscription;

const Modal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thankyou, setThankyou] = useState(false);
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData(e.currentTarget);

      await fetch(activeHostedFormApi, {
        method: 'POST',
        body: data,
        mode: 'no-cors',
      });

      setLoading(false);
      setThankyou(true);
    } catch (error) {
      console.log('Request failed', error);
    }

    setLoading(false);
  };

  const onClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="modal"
      className={`fixed left-0 top-0 ${isOpen ? ' scale-100 duration-300 ease-in-out' : 'scale-0 duration-300 ease-in-out '} z-50 h-[800vh] w-full bg-[#0000004a] backdrop-blur`}
      onClick={onClickOutside}
    >
      <div
        id="modal-child"
        className="typo-l ml-[5%] mt-[55%] w-[90%] rounded-48 border border-yellow bg-gray-dark-1 p-24 text-gray-dark-12  lg:typo-h5 lg:ml-[32%] lg:mt-[22%] lg:w-[40%] lg:p-40 lg:px-64"
        onClick={(e) => e.stopPropagation()}
      >
        {!thankyou ? (
          <div className="">
            <form
              method="POST"
              action={activeHostedFormApi}
              id="_form_37_"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="u" value="37" />
              <input type="hidden" name="f" value="37" />
              <input type="hidden" name="s" />
              <input type="hidden" name="c" value="0" />
              <input type="hidden" name="m" value="0" />
              <input type="hidden" name="act" value="sub" />
              <input type="hidden" name="v" value="2" />
              <input
                type="hidden"
                name="or"
                value="3276439fca5998241fe698dd1f85f114"
              />
              <div className="_form-content flex flex-col gap-20">
                <div className="_form_element _x22990483 _full_width _clear">
                  <div className="_form-title flex items-center justify-between">
                    Stay Updated
                    <div
                      id="closer"
                      className="hover:cursor-pointer"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <IoMdCloseCircle className=" rounded-full bg-black text-gray-dark-11" />
                    </div>
                  </div>
                </div>
                <div className="_form_element _x72172051 _full_width _clear">
                  <div className=" typo-m font-normal text-gray-dark-11 lg:typo-l">
                    Stay up to speed with all the development!
                  </div>
                </div>
                <div className="_form_element _x60461427 _full_width ">
                  <div className="_field-wrapper typo-m flex w-full items-center gap-8 rounded-16 border border-gray-dark-7 bg-transparent pl-16 font-normal focus:border-yellow">
                    <MdEmail className="text-20 text-gray-dark-8" />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full border-0 bg-transparent p-16 pl-0 focus:border-none"
                      required
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                  </div>
                  {userInput == '' || regex.test(userInput) ? null : (
                    <p className="typo-btn-xxs mt-5 flex items-center gap-5 text-rose-400">
                      {' '}
                      <PiWarningCircleFill />
                      Email Format Incorrect
                    </p>
                  )}
                </div>
                <div className="_button-wrapper _full_width">
                  {!loading ? (
                    <>
                      {regex.test(userInput) ? (
                        <button
                          id="_form_37_submit"
                          className="_submit typo-btn-l-mid w-full rounded-16 bg-yellow-dark-4 px-32 py-16 text-yellow hover:bg-yellow-dark-5"
                          type="submit"
                        >
                          Subscribe to Updates
                        </button>
                      ) : (
                        <div className="_submit typo-btn-l-mid w-full cursor-not-allowed rounded-16 bg-yellow-dark-4 px-32 py-16 text-center text-yellow opacity-50">
                          Subscribe to Updates
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Loading size={20} />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="_form-title flex flex-col items-center justify-center gap-25 p-10 text-center lg:gap-40">
            <GoCheckCircleFill className="text-yellow" />
            You are Subscribed
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="typo-btn-l-mid w-full cursor-pointer rounded-16 bg-yellow-dark-4 px-32 py-16 text-yellow hover:bg-yellow-dark-5"
            >
              Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CtaNewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenHandler = () => setIsOpen(!isOpen);

  return (
    <>
      <ButtonGray
        className="flex items-center justify-center gap-12 px-10"
        onClick={isOpenHandler}
      >
        <div>Stay Updated</div>
      </ButtonGray>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};
