import { useEffect, useRef } from "react";

import { animate, useInView } from "framer-motion";

import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GlowWrapper from "@components/GlowWrapper";
import GridLayout from "@components/GridLayout";
import Button from "@components/Button";
import Link, { Target } from "@components/Link";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { up } from "@utils/screens";
// @ts-ignore
import imgBolt from "@images/bolt.png?w=200&format=webp";
// @ts-ignore
import imgGlobeCountDown from "@images/globe-countdown.png?w=1354&format=webp";

interface Card {
  title: string;
  subtitle: string;
  icon: string;
}

const TIMESCALE = 0.75;

const HEADLINE = "Ready to live on the edge?";

const CARDS: Array<Card> = [
  {
    title: "Web 3",
    subtitle: "Infrastructure",
    icon: "/svg/countdown/web3.svg",
  },
  {
    title: "Web 2",
    subtitle: "Speed",
    icon: "/svg/countdown/web2.svg",
  },
  {
    title: "One",
    subtitle: "Unified Platform",
    icon: "/svg/countdown/one.svg",
  },
  {
    title: "Free",
    subtitle: "To get started",
    icon: "/svg/countdown/zero.svg",
  },
];

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), time));

const CountdownAnimation = () => {
  let cardRefs: Array<HTMLDivElement> = [];
  const headlineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const countdownSequenceRef = useRef<HTMLDivElement>(null);
  const outroSequenceRef = useRef<HTMLDivElement>(null);

  const isRunning = useRef(false);

  const isInView = useInView(countdownSequenceRef);
  const isLg = useMediaQuery(up("lg"));

  const setCardRef: React.RefCallback<HTMLDivElement> = (ref) => {
    if (ref) cardRefs.push(ref);
  };

  useEffect(() => {
    const animation = async () => {
      if (isRunning.current) return;

      isRunning.current = true;

      const headlineEl = headlineRef.current;
      const counterEl = counterRef.current;
      const cardsWrapperEl = cardsWrapperRef.current;
      const globeEl = globeRef.current;
      const countdownSequenceEl = countdownSequenceRef.current;
      const outroSequenceEl = outroSequenceRef.current;

      if (
        headlineEl &&
        counterEl &&
        cardsWrapperEl &&
        globeEl &&
        countdownSequenceEl &&
        outroSequenceEl
      ) {
        // countdown sequence
        const stepsAnimation = async (counter: string, offset: string) => {
          await wait(1000 * TIMESCALE);
          await animate(
            cardRefs,
            { scale: 0.8, opacity: 0.4 },
            { duration: 1 * TIMESCALE, ease: "easeInOut" }
          );

          counterEl.innerText = counter;

          await Promise.all([
            animate(
              counterEl,
              { opacity: 1 },
              { duration: 2 * TIMESCALE, ease: "easeInOut" }
            ),
            animate(
              cardsWrapperEl,
              { y: offset },
              { duration: 2 * TIMESCALE, ease: "easeInOut" }
            ),
          ]);

          await Promise.all([
            animate(
              counterEl,
              { opacity: 0 },
              { duration: 1 * TIMESCALE, ease: "easeInOut" }
            ),
            animate(
              cardRefs,
              { scale: 1, opacity: 1 },
              { duration: 1 * TIMESCALE, ease: "easeInOut" }
            ),
          ]);
        };

        await wait(1000 * TIMESCALE);

        await animate(cardRefs, { scale: 0.8, opacity: 0.4 }, { duration: 0 });

        await animate(headlineEl, { opacity: 1 }, { duration: 2 * TIMESCALE });
        animate(
          globeEl,
          { y: "35%" },
          { duration: 18 * TIMESCALE, ease: "easeIn" }
        );
        await animate(headlineEl, { opacity: 0 }, { duration: 1 * TIMESCALE });
        await animate(counterEl, { opacity: 1 }, { duration: 2 * TIMESCALE });
        await animate(cardsWrapperEl, { y: "-100%" }, { duration: 0 });
        await animate(cardsWrapperEl, { y: "0%" }, { duration: 1 * TIMESCALE });
        await Promise.all([
          animate(
            cardRefs,
            { scale: 1, opacity: 1 },
            { duration: 1 * TIMESCALE }
          ),
          animate(counterEl, { opacity: 0 }, { duration: 1 * TIMESCALE }),
        ]);

        await stepsAnimation("2", "100%");
        await stepsAnimation("1", "200%");
        await stepsAnimation("0", "300%");
        await wait(1000 * TIMESCALE);

        // outro sequence
        await animate(
          countdownSequenceEl,
          { opacity: 0 },
          { duration: 1.5 * TIMESCALE }
        );
        outroSequenceEl.style.pointerEvents = "auto";
        await animate(outroSequenceEl, { scale: 0.95 }, { duration: 0 });
        await animate(
          outroSequenceEl,
          { scale: 1, opacity: 1 },
          { duration: 1 * TIMESCALE, ease: "easeOut" }
        );
      }
    };

    if (isInView && isLg) {
      animation();
    }
  }, [isInView, isLg]);

  return (
    <Container>
      <PageSection className="text-ui-white lg:aspect-h-9 lg:aspect-w-16 lg:overflow-hidden">
        <div className="hidden lg:block" ref={countdownSequenceRef}>
          <div
            ref={headlineRef}
            className="typo-h4 absolute bottom-1/2 w-full text-center opacity-0 xl:typo-h2"
          >
            {HEADLINE}
          </div>
          <div
            ref={counterRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-bold leading-[30rem] opacity-0 xl:text-[57.6rem] xl:leading-[57.6rem]"
          >
            3
          </div>
          <div className="absolute h-full w-full">
            <div
              ref={cardsWrapperRef}
              className="flex h-full w-full flex-col-reverse"
              style={{
                transform: `translateY(-100%)`,
              }}
            >
              {CARDS.map((item) => {
                return (
                  <div
                    className="flex h-full flex-shrink-0 items-center justify-center"
                    ref={setCardRef}
                    key={item.title}
                  >
                    <div className="relative z-10 rounded-33 bg-gradient-grey p-6 xl:rounded-66 xl:p-12">
                      <div className="absolute left-0 top-0 h-full w-full bg-brand-rainbow opacity-10 blur-[30px]"></div>
                      <div className="flex gap-44 rounded-27 bg-button-gradient p-24 pl-36 xl:gap-88 xl:rounded-54 xl:p-48 xl:pl-72">
                        <img
                          src={item.icon}
                          alt={`${item.title} icon`}
                          className="w-100 xl:w-auto"
                        />
                        <div className="flex flex-col gap-12 xl:gap-22">
                          <div className="font-plex-sans text-40 font-normal uppercase leading-[150%] tracking-[1.12rem] xl:text-56">
                            {item.title}
                          </div>
                          <div className="font-plex-sans text-26 font-normal leading-[150%] xl:text-36">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            ref={globeRef}
            className="absolute left-0 top-1/2 w-full mix-blend-screen"
          >
            <img
              src={imgGlobeCountDown}
              className="mx-auto w-[90%]"
              alt="image of a globe render"
            />
          </div>
        </div>
        <div
          ref={outroSequenceRef}
          className="pointer-events-none hidden px-60 py-29 opacity-0 lg:flex xl:px-120 xl:py-58"
        >
          <div className="flex basis-1/3 flex-col justify-between">
            {CARDS.map((item) => (
              <div
                className="flex gap-22 rounded-24 bg-black-transparent py-12 pl-18 pr-12 2xl:gap-44 2xl:py-24 2xl:pl-36 2xl:pr-24"
                key={item.title}
              >
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="w-92 xl:w-auto"
                />
                <div className="flex flex-col justify-center gap-12">
                  <div className="font-plex-sans text-20 font-normal uppercase leading-[150%] tracking-[0.056rem] xl:text-28">
                    {item.title}
                  </div>
                  <div className="font-plex-sans text-13 font-normal leading-[150%] xl:text-18">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex basis-2/3 items-center justify-center">
            <div className="inline-flex">
              <Link href="https://app.fleek.xyz/" target={Target.Blank}>
                <GlowWrapper>
                  <button className="flex items-center gap-19 rounded-28 bg-button-gradient px-38 py-25 font-plex-sans text-30 font-normal uppercase leading-[150%] tracking-[0.6144rem] xl:gap-30 xl:rounded-33 xl:px-56 xl:py-30 xl:text-40 2xl:gap-38 2xl:rounded-44 2xl:px-76 2xl:py-50 2xl:text-52">
                    <span>try it out</span>
                    <img
                      src={imgBolt}
                      alt="fleek bolt icon"
                      className="h-56 w-28 xl:h-80 xl:w-40"
                    />
                  </button>
                </GlowWrapper>
              </Link>
            </div>
          </div>
        </div>
        <GridLayout className="lg:hidden">
          <div className="col-span-16 overflow-hidden pb-72 pt-64">
            <h2 className="typo-h5 mb-48 text-center">{HEADLINE}</h2>
            <div className="flex flex-col gap-8">
              {CARDS.map((item) => (
                <div
                  className="flex gap-22 rounded-19 bg-black-transparent p-16 pl-24"
                  key={item.title}
                >
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="w-100"
                  />
                  <div className="flex flex-col justify-center gap-9">
                    <div className="font-plex-sans text-22 font-normal uppercase leading-[150%] tracking-[0.448rem]">
                      {item.title}
                    </div>
                    <div className="font-plex-sans text-14 font-normal leading-[150%]">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative flex justify-center overflow-hidden pb-64 pt-48">
              <Link href="https://app.fleek.xyz/" target={Target.Blank}>
                <Button>get started</Button>
              </Link>
              <img
                src={imgGlobeCountDown.src}
                className="absolute left-1/2 top-0 -z-1 w-[110vw] max-w-none -translate-x-1/2 pt-24 mix-blend-screen"
                alt="image of a globe render"
              />
            </div>
          </div>
        </GridLayout>
      </PageSection>
    </Container>
  );
};

export default CountdownAnimation;
