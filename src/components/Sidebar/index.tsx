import styles from "./index.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logo_icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1.457.5C.652.5 0 1.152 0 1.957v7.586C0 10.348.652 11 1.457 11h4.026l-.535 1.495H4a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-.948L8.517 11h4.026C13.348 11 14 10.348 14 9.543V1.957C14 1.152 13.348.5 12.543.5zm6.53 2.289a.75.75 0 0 1 .475.948l-1.5 4.5a.75.75 0 1 1-1.424-.474l1.5-4.5a.75.75 0 0 1 .95-.474Zm-2.999 2.28a.75.75 0 1 0-.976-1.138l-1.75 1.5a.75.75 0 0 0 .008 1.145l1.5 1.25a.75.75 0 0 0 .96-1.152l-.818-.682zm5.242-.895a.75.75 0 1 0-.96 1.152l.818.682l-1.076.923a.75.75 0 1 0 .976 1.138l1.75-1.5a.75.75 0 0 0-.008-1.145z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        Alttools
      </div>
      <nav className={styles.nav}>
        <div className={styles.nav_item}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M9.964 2.686a.5.5 0 1 0-.928-.372l-4 10a.5.5 0 1 0 .928.372l4-10Zm-6.11 2.46a.5.5 0 0 1 0 .708L2.207 7.5l1.647 1.646a.5.5 0 1 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2a.5.5 0 0 1 .708 0Zm7.292 0a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L12.793 7.5l-1.647-1.646a.5.5 0 0 1 0-.708Z"
              clip-rule="evenodd"
            />
          </svg>
          No-code
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
