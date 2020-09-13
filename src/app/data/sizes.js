const getBallSizeByScreenWidth = () => {
  console.log(document.body.clientWidth);
  if (document.body.clientWidth > 1200) { return 20; }
  if (document.body.clientWidth > 780 && document.body.clientWidth <= 1200) { return 16; }
  //if (document.body.clientWidth > 400 && document.body.clientWidth <= 780) { return 13; }
  // return 10;
  return 13;
};

const getPlatformSizeByScreenWidth = () => {
  if (document.body.clientWidth > 1200) { return getBallSizeByScreenWidth() * 7.2; }
  if (document.body.clientWidth > 780 && document.body.clientWidth <= 1200) { return getBallSizeByScreenWidth() * 8; }
  if (document.body.clientWidth > 400 && document.body.clientWidth <= 780) { return getBallSizeByScreenWidth() * 9; }
  return getBallSizeByScreenWidth() * 10;
};

export const ballSize = {
  width: getBallSizeByScreenWidth(),
};

export const platformSize = {
  width: getPlatformSizeByScreenWidth(),
};
