import styles from "./index.module.css";
const ErrorPop = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.box}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 36 36"
        >
          <path
            fill="#FFCC4D"
            d="M2.653 35C.811 35-.001 33.662.847 32.027L16.456 1.972c.849-1.635 2.238-1.635 3.087 0l15.609 30.056c.85 1.634.037 2.972-1.805 2.972H2.653z"
          />
          <path
            fill="#231F20"
            d="M15.583 28.953a2.421 2.421 0 0 1 2.419-2.418a2.421 2.421 0 0 1 2.418 2.418a2.422 2.422 0 0 1-2.418 2.419a2.422 2.422 0 0 1-2.419-2.419zm.186-18.293c0-1.302.961-2.108 2.232-2.108c1.241 0 2.233.837 2.233 2.108v11.938c0 1.271-.992 2.108-2.233 2.108c-1.271 0-2.232-.807-2.232-2.108V10.66z"
          />
        </svg>
        <h3 className={styles.title}>警告</h3>
      </div>
      <p className="desc">
        您当前的页面无法正常获取CSS,IMAGE等相关资源，导致出现乱码情况。请按如下方式解决：
      </p>
      <div className={styles.tips}>
        <p> 1、联系当前页面的对应开发人员commit当前页面css,img资源到svn。</p>
        <p> 2、通知侯某更新svn。</p>
        <p> 3、刷新你当前编辑的页面,弹窗即可消失</p>
      </div>
    </div>
  );
};
export default ErrorPop;
