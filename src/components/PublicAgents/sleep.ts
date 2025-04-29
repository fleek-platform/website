export const sleep = async (timeInMs?: number) => {
  await new Promise((res) => setTimeout(res, timeInMs));
};
