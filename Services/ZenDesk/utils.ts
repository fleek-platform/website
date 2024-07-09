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
