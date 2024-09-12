import styles from "./page.module.css";
import Link from "next/link";

const links = [
  {
    title: "ㅎ ㅏㄴᄀㅡㄹ -> 한글",
    description: 'MacOS에서 Windows에 전송된 문서의 파일명을 보정해주는 페이지입니다.',
    href: "/filename-converter",
  },
  {
    title: "시간 계산기(Coming Soon!)",
    description: "선택근무제 시간을 대신 계산해주는 페이지입니다.",
    href: "/time-calculator",
  },
];
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.grid}>
          {links.map((link, index) => (
            <div key={index} className={styles.card}>
              <Link href={link.href}>
                <h2 className={styles.cardTitle}>{link.title}</h2>
                <p className={styles.cardDescription}>{link.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
