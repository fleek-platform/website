export const uptimeToHumanFriendly = (uptime: number) => {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
  const seconds = Math.floor(((uptime % 86400) % 3600) % 60);

  let output = '⏱️ ';
  if (days > 0) output += `${days} day(s), `;
  if (hours > 0) output += `${hours} hour(s), `;
  if (minutes > 0) output += `${minutes} minute(s), `;
  output += `${seconds} second(s)`;

  return output.trim();
};

enum DefaultRateLimitValues {
  TimeWindow = 60,
  MaxNumberAttempts = 15,
};

export const getUserValue = ({
  userValue,
  subject,
}: { 
  userValue?: string;
  subject: keyof typeof DefaultRateLimitValues;
}) => {
  const parsedValue = parseInt(userValue || '', 10);

  if (!isNaN(parsedValue) && parsedValue > 0) return parsedValue;
  
  console.warn(`⚠️ Warning: Expected a number like value but failed to parse (${userValue}). Thus, the getter for ${subject} helper responds with the default value of ${DefaultRateLimitValues[subject]}.`);
  
  return DefaultRateLimitValues[subject];
}
