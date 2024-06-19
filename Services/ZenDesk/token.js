const generateApiToken = () => {
    const formatted = `support@fleek.xyz/token:c0ecb1c1-369a-4543-b528-cbba3f2fb35d`;
  
    return Buffer.from(formatted).toString('base64');
};
  

console.log(generateApiToken());