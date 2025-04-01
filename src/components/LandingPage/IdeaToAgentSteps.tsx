export const IdeaToAgentSteps = () => {
	return (
		<div className="text-center flex flex-col py-100">
			<p className="text-36 font-semibold text-neutral-12">
				Idea to agent in <span className="text-yellow">three steps</span>
			</p>
			<p className="text-18 text-neutral-11 mt-24">
				Its really as easy as that.
			</p>
			<div className="max-w-[800px] self-center relative">
				<div className="mt-36 grid grid-cols-3 gap-24">
					<div className="flex flex-col gap-20">
						<div>
							<div className="bg-neutral-1 border border-neutral-6 rounded-8 p-10">
								<img
									src="/images/agent-chat-demo.png"
									className=""
									alt="agent chat demo"
								/>
							</div>
						</div>
						<div className="flex flex-col items-center text-center">
							<div className="z-10 size-38 aspect-1 text-16 text-neutral-12 rounded-full border border-neutral-6 grid place-content-center bg-black">
								1
							</div>
							<p className="mt-10 text-neutral-12 text-18 font-medium leading-snug">
								Vibe-code the agent
								<br />
								you want to build
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-20">
						<div className="bg-neutral-1 border border-neutral-6 rounded-8 py-28 grid place-content-center">
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
						</div>
						<div className="flex flex-col items-center text-center">
							<div className="z-10 size-38 aspect-1 text-16 text-neutral-12 rounded-full border border-neutral-6 grid place-content-center bg-black">
								2
							</div>
							<p className="mt-10 text-neutral-12 text-18 font-medium leading-snug">
								Integrate your agent
								<br />
								across various apps
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-20">
						<div className="bg-neutral-1 border border-neutral-6 rounded-8 flex-1" />
						<div className="flex flex-col items-center text-center">
							<div className="z-10 size-38 aspect-1 text-16 text-neutral-12 rounded-full border border-neutral-6 grid place-content-center bg-black">
								3
							</div>
							<p className="mt-10 text-neutral-12 text-18 font-medium leading-snug">
								Let your agent start
								<br />
								doing things
							</p>
						</div>
					</div>
				</div>
				<div className="absolute bottom-[78px] left-[calc(100%/3/2)] right-[calc(100%/3/2)] h-[1px] bg-dash-pattern z-0" />
			</div>
		</div>
	);
};
