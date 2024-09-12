"use client";
import { useState } from "react";
import styles from './page.module.css'

function FileNameConverterPage() {
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [convertedFileName, setConvertedFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<Blob | null>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const name = file.name;
    setOriginalFileName(name);

    // Mac -> Windows로 변환 (NFC 방식)
    const newFileName = convertToWindows(name);
    setConvertedFileName(newFileName);

    // 파일 내용을 Blob 형태로 저장
    const content = await file.arrayBuffer();
    setFileContent(new Blob([content], { type: file.type }));
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const convertToWindows = (name: string): string => {
    return name.normalize("NFC"); // Mac -> Windows 변환 (NFC)
  };

  const downloadFile = () => {
    if (fileContent && convertedFileName) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileContent);
      link.download = convertedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div>
      <h1>ㅎ ㅏㄴᄀㅡㄹ &#45;&#62; 한글</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.fileContainer}
      >
        파일을 이곳에 드래그하세요
      </div>
      {originalFileName && (
        <div>
          <p>변환된 파일명: {convertedFileName}</p>
          {fileContent && (
            <button onClick={downloadFile} className={styles.downloadButton}>
              Download
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FileNameConverterPage;
