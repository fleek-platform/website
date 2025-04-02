import { IoGrid } from 'react-icons/io5';
import { Badge } from './Badge';

export const Features = () => {
  return (
    <div className="mx-auto flex max-w-[800px] flex-col items-center py-100 text-center">
      <Badge>
        <IoGrid />
        Features
      </Badge>
      <p className="max-w-[600px] pt-24 text-36 font-semibold text-neutral-12">
        Fleek lets you <span className="text-yellow">easily create</span> the
        agent you've always wanted
      </p>

      <div className="mt-36 flex gap-16 text-start">
        <div className="flex flex-col rounded-10 bg-gradient-to-br from-neutral-2 to-neutral-1">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-bold text-neutral-12">
              Build your agent with natural language
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              If you can describe your agent goals in a conversation, you can
              build it.
            </p>
          </div>
          <div className="ml-18 mt-18">
            <img
              src="/images/landing-page/agent-chat-demo-2.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1 "
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-neutral-1">
          <div className="mx-18 mt-18">
            <p className="text-18 font-bold text-neutral-12">
              No API keys needed to start
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Use LLM models instantly with no configuration.
            </p>
          </div>
          <div className="mb-18 ml-18 mt-auto">
            <img
              src="/images/landing-page/api-keys.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-neutral-1">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-bold text-neutral-12">
              Keep tabs on your agents activity
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Easily check your agent's activity feed.
            </p>
          </div>
          <div className="mb-18 ml-18 mt-14">
            <img
              src="/images/landing-page/agent-activity.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex gap-16 text-start">
        <div className="rounded-10 bg-neutral-1">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-bold text-neutral-12">
              Design a unique agent personality
            </p>
            <p className="mt-8 text-14 text-neutral-11">Smart and funny.</p>
          </div>
          <div className="mt-24">
            <img
              src="/images/landing-page/agent-personality.png"
              alt="Chat with agent"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-neutral-1">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-bold text-neutral-12">
              Access your agent from the CLI
            </p>
            <p className="mt-8 text-14 text-neutral-11">You a dev?</p>
          </div>
          <div className="ml-18 mt-16">
            <img
              src="/images/landing-page/terminal.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-gradient-to-br from-neutral-2 to-neutral-1">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-bold text-neutral-12">
              Check out the key stats on how your agent is performing
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Analytics included with your agent.
            </p>
          </div>
          <div className="ml-18 mt-22">
            <img
              src="/images/landing-page/analytics.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
