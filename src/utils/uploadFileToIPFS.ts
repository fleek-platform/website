import { FleekSdk, ApplicationAccessTokenService } from '@fleekxyz/sdk';


type IpfsFile = { content: File; path: string; };

export const uploadFileToIPFS = async (file: IpfsFile) => {
  try {
    const clientId = process.env.FLEEK_CLIENT_ID ? process.env.FLEEK_CLIENT_ID : "[ERROR] Missing FLEEK_CLIENT_ID env var";

    // TODO: Check to see if have to parse to static FLEEK_CLIENT_ID value
    const accessTokenService = new ApplicationAccessTokenService({ clientId });
  
    const fleekSDK = new FleekSdk({ accessTokenService });
    const ipfs = fleekSDK.ipfs();
  
    const result = await ipfs.add(file);
    return result.cid.toString();
  } catch (e) {
    console.error(e);
    return null;
  }
};
