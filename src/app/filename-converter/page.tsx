"use client";
import { useState } from "react";

function FileNameConverterPage() {
    const [originalFileName, setOriginalFileName] = useState<string>('');
    const [convertedFileName, setConvertedFileName] = useState<string>('');
    const [fileContent, setFileContent] = useState<Blob | null>(null);
    const [convertDirection, setConvertDirection] = useState<string>('mac-to-windows');
  
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const name = file.name;
      setOriginalFileName(name);
  
      let newFileName = name;
  
      // 변환 방향에 따른 파일명 변환 처리
      if (convertDirection === 'mac-to-windows') {
        newFileName = convertToWindows(name);
      } else if (convertDirection === 'windows-to-mac') {
        newFileName = convertToMac(name);
      }
  
      setConvertedFileName(newFileName);
  
      // 파일 내용을 Blob 형태로 저장
      const content = await file.arrayBuffer();
      setFileContent(new Blob([content], { type: file.type }));
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    const convertToWindows = (name: string): string => {
      return name.normalize('NFC');
    };
  
    const convertToMac = (name: string): string => {
      return name.normalize('NFD');
    };
  
    const downloadFile = () => {
      if (fileContent && convertedFileName) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(fileContent);
        link.download = convertedFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
  
    return (
      <div>
        <h1>Mac ↔ Windows 한글 파일명 인코딩 변환기</h1>
        <label htmlFor="convertDirection">변환 방향 선택:</label>
        <select
          id="convertDirection"
          value={convertDirection}
          onChange={(e) => setConvertDirection(e.target.value)}
          style={{ marginBottom: '20px' }}
        >
          <option value="mac-to-windows">Mac → Windows</option>
          <option value="windows-to-mac">Windows → Mac</option>
        </select>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            width: '300px',
            height: '200px',
            border: '2px dashed gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          파일을 이곳에 드래그하세요
        </div>
        {originalFileName && (
          <div>
            <p>변환된 파일명: {convertedFileName}</p>
            {fileContent && (
              <button onClick={downloadFile} style={{ marginTop: '10px' }}>
                변환된 파일 다운로드
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

export default FileNameConverterPage;
