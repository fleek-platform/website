import { FleekSdk, ApplicationAccessTokenService } from '@fleekxyz/sdk';


type IpfsFile = { content: File; path: string; };

export const uploadFileToIPFS = async (file: IpfsFile) => {
  try {
    const accessTokenService = new ApplicationAccessTokenService({ clientId: process.env.FLEEK_CLIENT_ID });
  
    const fleekSDK = new FleekSdk({ accessTokenService });
    const ipfs = fleekSDK.ipfs();
  
    const result = await ipfs.add(file);
    return result.cid.toString();
  } catch (e) {
    console.error(e);
    return null;
  }
};
