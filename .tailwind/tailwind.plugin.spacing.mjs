import plugin from "tailwindcss/plugin";
import { pxToRemUnit } from "./tailwind.config.utils";

export default function(usePx) {
    /**
     * Creates a custom spacing scale, where the classname maps
     * 1:1 to its pixel value. Uses px to rem conversion under the hood.
     *
     * iE `w-16 => width: 16px | 1.6rem;`
     *
     * ```
     * 1-32 = 1px steps.
     * 32-64 = 2px steps.
     * 64-128 = 4px steps.
     * 128-256 = 8px steps.
     * 256-512 = 16px steps.
     * 512-1024 = 32px steps.
     * ```
     */
    const createScale = ({ min = 0, max = 100, steps = 1, valFM, keyFM }) => {
        const limit = Math.round((max - min) / steps);
        const scale = [...new Array(limit + 1)].map((_, i) => min + i * steps);

        return scale.reduce((prev, curr) => {
            const key = keyFM ? keyFM(curr) : curr;
            const val = valFM && curr !== 0 ? valFM(curr) : curr;

            return { ...prev, [String(key)]: val };
        }, {});
    };

    const valFM = usePx ? (val) => val : pxToRemUnit;

    const spacing = {
        ...createScale({ max: 32, steps: 1, valFM }),
        ...createScale({ min: 32, max: 64, steps: 2, valFM }),
        ...createScale({ min: 64, max: 128, steps: 4, valFM }),
        ...createScale({ min: 128, max: 256, steps: 8, valFM }),
        ...createScale({ min: 256, max: 512, steps: 16, valFM }),
        ...createScale({ min: 512, max: 1024, steps: 32, valFM }),
    };

    const spacings = plugin(function () {}, {
        theme: {
            spacing,
            extend: {
                minWidth: spacing,
                minHeight: spacing,
                gap: spacing,
            },
        },
    });

    return {
        pxToRemUnit,
        plugin: spacings,
    };
};
