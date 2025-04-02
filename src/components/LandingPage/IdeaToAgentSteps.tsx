import type { PropsWithChildren } from 'react';

export const IdeaToAgentSteps = () => {
  return (
    <div className="flex flex-col py-48 text-center sm:py-100">
      <p className="font-sans text-36 font-semibold text-neutral-12">
        Idea to agent in <span className="text-yellow">three steps</span>
      </p>
      <p className="mt-24 text-18 text-neutral-11">
        Its really as easy as that.
      </p>
      <div className="relative max-w-[800px] self-center">
        <div className="mt-36 grid grid-cols-3 gap-24">
          <Step index={1} label="Vibe-code the agent you want to build">
            <img src="/images/agent-chat-demo.png" alt="agent chat demo" />
          </Step>
          <Step index={2} label="Integrate your agent across various apps">
            <div className="grid grid-cols-3 gap-18">
              <img
                src="/images/integrations/x.png"
                className="size-[55px]"
                alt="x"
              />
              <img
                src="/images/integrations/discord.png"
                className="size-[55px]"
                alt="discord"
              />
              <img
                src="/images/integrations/gmail.png"
                className="size-[55px]"
                alt="gmail"
              />
              <img
                src="/images/integrations/reddit.png"
                className="size-[55px]"
                alt="reddit"
              />
              <img
                src="/images/integrations/apple.png"
                className="size-[55px]"
                alt="apple"
              />
              <img
                src="/images/integrations/youtube.png"
                className="size-[55px]"
                alt="youtube"
              />
            </div>
          </Step>
          <Step index={3} label="Let your agent start doing things" />
        </div>
        <div className="z-0 absolute bottom-[78px] left-[calc(100%/3/2)] right-[calc(100%/3/2)] h-[1px] bg-dash-pattern" />
      </div>
    </div>
  );
};

export const Step = ({
  children,
  index,
  label,
}: PropsWithChildren<{
  index: number;
  label: string;
}>) => {
  return (
    <div className="flex flex-col gap-20">
      <div className="grid flex-1 place-content-center rounded-8 border border-neutral-6 bg-neutral-1 p-10">
        {children}
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="z-10 grid aspect-1 size-38 place-content-center rounded-full border border-neutral-6 bg-black text-16 text-neutral-12">
          {index}
        </div>
        <p className="mt-10 text-18 font-medium leading-snug text-neutral-12">
          {label}
        </p>
      </div>
    </div>
  );
};
