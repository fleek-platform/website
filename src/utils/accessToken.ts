import { jwtDecode } from 'jwt-decode';

export const decodeAccessToken = (
  accessToken: string,
):
  | {
      exp: number;
      projectId: string;
      sub: string;
    }
  | undefined => {
  try {
    return jwtDecode(accessToken);
  } catch (e) {
    console.error('Failed to decode access token', e);
    return undefined;
  }
};

export const accessTokenMatchesProject = (
  accessToken: string,
  projectId: string,
) => {
  return decodeAccessToken(accessToken)?.projectId === projectId;
};

export const getUserIdFromAccessToken = (accessToken: string) => {
  try {
    const sub = decodeAccessToken(accessToken)?.sub;
    if (!sub) {
      throw new Error('No userId found in access token');
    }
    const userId = sub.split(':')[1];
    if (!userId) {
      throw new Error('No userId found in access token');
    }
    return userId;
  } catch (e) {
    console.error('Failed to get userId from access token', e);
    return undefined;
  }
};
