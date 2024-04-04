"use client";

import { useEffect, useRef } from "react";
import {
  Application,
  TilingSprite,
  Texture,
  Text as PixiText,
  Container,
  Graphics,
} from "pixi.js";

import { animate } from "framer-motion";

import type { TextStyle as ITextStyle } from "pixi.js";

type TextStyle = "h1" | "h2" | "h4" | "h3" | "h5";
type TextAlign = "left" | "center";

interface Props {
  style: TextStyle;
  align?: TextAlign;
}

const getTextStyles = (
  style: TextStyle,
  align: TextAlign,
  el: HTMLDivElement
): Partial<ITextStyle> => {
  switch (style) {
    case "h1": {
      return {
        fontSize: 120,
        fontFamily: "__sans_2037d7",
        fill: 0xffffff,
        stroke: 0xffffff,
        strokeThickness: 20,
        lineHeight: 120,
        wordWrap: true,
        wordWrapWidth: el.clientWidth + 10,
        fontWeight: "500",
        letterSpacing: -3.57,
        align,
      };
    }
    case "h2": {
      return {
        fontSize: 95,
        fontFamily: "__sans_2037d7",
        fill: 0xffffff,
        stroke: 0xffffff,
        strokeThickness: 18,
        lineHeight: 95,
        wordWrap: true,
        wordWrapWidth: el.clientWidth + 10,
        fontWeight: "500",
        letterSpacing: -2.861,
        align,
      };
    }
    case "h3": {
      return {
        fontSize: 76,
        fontFamily: "__sans_2037d7",
        fill: 0xffffff,
        stroke: 0xffffff,
        strokeThickness: 15,
        lineHeight: 76,
        wordWrap: true,
        wordWrapWidth: el.clientWidth + 10,
        fontWeight: "500",
        align,
      };
    }
    case "h4": {
      return {
        fontSize: 61,
        fontFamily: "__sans_2037d7",
        fill: 0xffffff,
        stroke: 0xffffff,
        strokeThickness: 12,
        lineHeight: 61,
        wordWrap: true,
        wordWrapWidth: el.clientWidth + 10,
        fontWeight: "500",
        align,
      };
    }
    case "h5": {
      return {
        fontSize: 39,
        fontFamily: "__sans_2037d7",
        fill: 0xffffff,
        stroke: 0xffffff,
        strokeThickness: 10,
        lineHeight: 39,
        wordWrap: true,
        wordWrapWidth: el.clientWidth + 10,
        fontWeight: "500",
        align,
      };
    }
  }
};

const TextGlowHoverEffect: React.FC<React.PropsWithChildren<Props>> = ({
  style,
  align = "left",
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;

    if (el) {
      const createGradTexture = () => {
        const quality = el.clientWidth;
        const canvas = document.createElement("canvas");

        canvas.width = quality;
        canvas.height = 1;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const grd = ctx.createLinearGradient(0, 0, quality, 0);

        grd.addColorStop(0, "#FFE702");
        grd.addColorStop(0.27, "#FF3DCF");
        grd.addColorStop(0.48, "#14BCDF");
        grd.addColorStop(0.67, "#49F0A1");
        grd.addColorStop(0.83, "#49F0A1");
        grd.addColorStop(1, "#FFE702");

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, quality, 1);

        return Texture.from(canvas);
      };

      const app = new Application<HTMLCanvasElement>({
        backgroundAlpha: 0,
        resizeTo: el,
      });

      const cont = new Container();

      const gradTexture = createGradTexture();

      if (!gradTexture) return;

      const gradientSprite = new TilingSprite(
        gradTexture,
        el.clientWidth,
        el.clientHeight
      );

      gradientSprite.tileScale.x = 2;
      gradientSprite.tileScale.y = 2;

      const text = new PixiText(el.innerText, getTextStyles(style, align, el));

      if (align === "center") {
        text.anchor.set(0.5);
        text.x = el.clientWidth / 2;
        text.y = el.clientHeight / 2;
      }

      gradientSprite.mask = text;

      cont.addChild(gradientSprite);

      const maskContainer = new Container();

      cont.mask = maskContainer;

      app.stage.addChild(cont);
      app.stage.addChild(maskContainer);

      app.view.classList.add(
        "absolute",
        "w-full",
        "h-full",
        "top-0",
        "left-0",
        "-z-1",
        "blur-[15px]",
        "saturate-200",
        "opacity-0",
        "transition-opacity",
        "duration-500",
        "hidden",
        "lg:block",
        "group-hover:opacity-100"
      );

      el.classList.add("group");

      el.appendChild(app.view);

      const handleResize = () => {
        text.style.wordWrapWidth = el.clientWidth;

        if (align === "center") {
          text.x = el.clientWidth / 2;
          text.y = el.clientHeight / 2;
        }

        gradientSprite.width = el.clientWidth;
        gradientSprite.height = el.clientHeight;
      };

      const createMaskItem = () =>
        new Graphics().beginFill(0xff0000).drawCircle(64, 64, 64).endFill();

      const cursor = createMaskItem();

      maskContainer.addChild(cursor);

      const createTailMaskItem = (x: number, y: number) => {
        const mask = createMaskItem();
        mask.position.x = x - mask.width / 2;
        mask.position.y = y - mask.height / 2;
        mask.pivot.set(1, 1);

        animate(1, 0, {
          onUpdate: (value) => {
            mask.alpha = value;
            mask.scale.set(value, value);
          },
          onComplete: () => {
            mask.destroy();
          },
          duration: 1,
        });

        return mask;
      };

      app.stage.eventMode = "static";
      app.stage.hitArea = app.screen;
      app.stage.on("pointermove", (event) => {
        cursor.position.x = event.globalX - cursor.width / 2;
        cursor.position.y = event.globalY - cursor.height / 2;

        const mask = createTailMaskItem(event.globalX, event.globalY);
        maskContainer.addChild(mask);
      });

      let progress = 0;

      app.ticker.add((delta) => {
        progress += 1 * delta;
        gradientSprite.tilePosition.x = progress;
        cursor.scale.set(
          Math.cos(progress * 0.005) * 0.15 + 1,
          Math.sin(progress * 0.005) * 0.15 + 1
        );
      });

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        app.destroy(true, { baseTexture: true, children: true, texture: true });
      };
    }
  }, [style, align]);

  return (
    <div className="relative" ref={wrapperRef}>
      {children}
    </div>
  );
};

export default TextGlowHoverEffect;
