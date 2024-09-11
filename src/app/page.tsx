import styles from "./page.module.css";
import Link from "next/link";

const links = [
  {
    title: "Windows <=> MacOS 파일이름 변환기",
    description: '생성된 "해줘" 로고 이미지를 다운로드하세요.',
    href: "/filename-converter",
  },
  {
    title: "시간 계산기",
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
              <h2 className={styles.cardTitle}>{link.title}</h2>
              <p className={styles.cardDescription}>{link.description}</p>
              <Link href={link.href} className={styles.linkButton}>
                링크로 이동
              </Link>
            </div>
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
