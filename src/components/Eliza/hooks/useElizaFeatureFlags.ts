const DEFAULT_FLAGS = {
  subscriptionEnabled: false,
  mocksEnabled: true,
};

type ElizaFlagKey = keyof typeof DEFAULT_FLAGS;

export const useElizaFeatureFlags = (value?: ElizaFlagKey | ElizaFlagKey[]) => {
  const flagKeys: ElizaFlagKey[] = value
    ? Array.isArray(value)
      ? value
      : [value]
    : (Object.keys(DEFAULT_FLAGS) as ElizaFlagKey[]);

  return flagKeys.reduce(
    (acc, flagKey) => {
      acc[flagKey] = DEFAULT_FLAGS[flagKey];
      return acc;
    },
    {} as Record<ElizaFlagKey, boolean>,
  );
};
