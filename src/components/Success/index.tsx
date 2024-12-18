import styles from "./index.module.css";
interface SuccessProps {
  url: string;
  handleDownload: () => void;
  handleClose: () => void;
}
const Success = ({ url, handleDownload,handleClose }: SuccessProps) => {
  return (
    <div className={styles.popup}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 48 48"
      >
        <mask id="ipTSuccess0">
          <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path
              fill="#555"
              d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012L24 4Z"
            />
            <path d="m17 24l5 5l10-10" />
          </g>
        </mask>
        <path fill="#4CAF50" d="M0 0h48v48H0z" mask="url(#ipTSuccess0)" />
      </svg>
      <p className={styles.desc}>
        页面已保存到对应站点的svn文件夹，
        <br /> 上线前请点击
        <a href={url} target="_blank">
          {url}
        </a>
        进行最终检查
      </p>
      <p className={styles.tips}>
        提示：如果您希望保存当前html文件到自己本地，请点击下方按钮进行下载
      </p>
      <button className="cssbuttons-io-button" onClick={handleDownload}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
          ></path>
        </svg>
        <span>下载</span>
      </button>
      <div className={styles.close} onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="rgba(255,255,255,.7)"
            d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Success;
