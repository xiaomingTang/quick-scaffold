// 如果使用到其他类型文件, 也可以在此处声明
declare module "*.jpg";
declare module "*.png";
declare module "*.mp3";
declare module "*.mp4";

declare module "*.module.less" {
  const classes: {
    [key: string]: string;
  }
  export default classes
}
