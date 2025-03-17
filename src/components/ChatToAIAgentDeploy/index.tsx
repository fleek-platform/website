import React, { useState } from 'react';
import { FaCircleArrowUp } from "react-icons/fa6";
import { Button } from '@components/Button';
import { getCookie } from '@utils/cookies';
import { isClient } from '@utils/common';

const FLEEK_LOCALSTORAGE_KEY_PERSONAGEN = 'fleek-xyz-personagen';

export const ChatToAIAgentDeploy = ({
  personagenEndpoint,
}: {
  personagenEndpoint: string;
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('[debug] ChatToAI: 1')
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(personagenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const json = await response.json();
      console.log('[debug] Success:', json);
      console.log('[debug] json.data:', json.data);

      localStorage.removeItem(FLEEK_LOCALSTORAGE_KEY_PERSONAGEN);
      localStorage.setItem(FLEEK_LOCALSTORAGE_KEY_PERSONAGEN, JSON.stringify(json.data));

      setContent('');

      window.location.href = '/demo';
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-20">
      <div className="text-center p-20">
        <h1 className="text-balance font-sans text-[3.6rem] font-semibold leading-[1.125] -tracking-2 text-gray-dark-12 md:text-[5.2rem]">What's your ideal agent?</h1>
        <p className="text-28 leading-[2]">Bring it to life in a few seconds by powering it into Fleek</p>
      </div>
      <div className="z-20 mx-auto flex flex-col w-full max-w-[768px] items-center justify-between rounded-16 border border-gray-dark-8 m-10 p-10 border-gray-dark-4 bg-gray-dark-6">
        <form onSubmit={handleSubmit} className="w-full flex flex-col px-10 bg-transparent items-end">
          <textarea 
            className="flex w-full bg-transparent focus-visible:outline-none text-16 h-100 font-medium mb-10 resize-none text-wrap" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your ideal AI agent..."
          />
          <button 
            className="text-20 transition ease-out hover:opacity-80 hover:scale-[1.10]" 
            type="submit"
            disabled={isSubmitting}
          >
            <FaCircleArrowUp />
          </button>
        </form>
      </div>
    </div>
  );
};

export const ChatOrDeployDemo = ({
  fleekRestApi,
  personagenEndpoint,
}: {
  fleekRestApi: string;
  personagenEndpoint: string;
}) => {
  const characterfile = isClient && localStorage.getItem(FLEEK_LOCALSTORAGE_KEY_PERSONAGEN);
  const parsedData = JSON.parse(characterfile || "{}");

  console.log('[debug] parsedData:', parsedData)
  
  return <>
    <div className="mx-auto flex w-full max-w-[1000px] my-40">
      <div className="w-full flex flex-col md:grid grid-cols-12 gap-16 pb-0 md:gap-32">
        <div className="flex flex-col col-span-6">
          <div className="w-full h-[547px] mb-12 rounded-16 bg-gray-dark-1 m-20 p-0 m-0 border border-gray-dark-8 flex flex-col p-10">
            <div className="flex justify-start w-full mb-4">
              <div className="rounded-8 bg-gray-dark-6 h-auto p-10 text-white text-[16px] font-plex-sans">
                I'm alive!
              </div>
            </div>
            <div className="flex justify-end w-full">
              <div className="rounded-8 bg-gray-dark-10 h-auto p-10 text-black text-[16px] font-plex-sans">
                I'm surviving  on this side of the world. Welcome!
              </div>
            </div>
          </div>
          <form className="flex w-full">
            <textarea className="w-full bg-gray-dark-1 rounded-16 border border-gray-dark-8 text-xs p-20 h-80 overflow-y-scroll mb-10 focus-visible:outline-none resize-none text-16" placeholder="Type a message...">
            </textarea>
          </form>
          <Button
            className="w-full"
            size="md"
            variant="secondary"
          >
            Message agent
          </Button>
        </div>
        <div className="flex flex-col col-span-6">
          <pre className="bg-gray-dark-1 rounded-16 border border-gray-dark-8 text-md p-20 h-640 overflow-y-scroll mb-10">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
          <Button
            className="w-full"
            size="md"
            variant="app-primary"
          >
            Deploy agent
          </Button>
        </div>
      </div>
    </div>
  </>;
};
