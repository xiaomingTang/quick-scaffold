declare module "*.mp3";
declare module "*.mp4";

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "*.module.less" {
  const classes: {
    [key: string]: string;
  };
  export default classes;
}
