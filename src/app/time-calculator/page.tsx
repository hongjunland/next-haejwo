"use client";
import { useState } from "react";
import styles from "./page.module.css"; // CSS 모듈 import

function TimeCalculator() {
  const [startTime, setStartTime] = useState("08:30"); // 기본 출근 시각 (8:30 AM)
  const [useFDay, setUseFDay] = useState(false); // F-day 사용 여부
  const [useFlexibleWork, setUseFlexibleWork] = useState(0); // 선택근무제 횟수 (0~3)
  const [applyOrder, setApplyOrder] = useState("fday-first"); // F-day와 선택근무제 적용 순서

  const WORK_HOURS = 8; // 실제 근무 시간 8시간 (점심시간 1시간 포함)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const formatTimeRange = (startTime: Date, endTime: Date) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return `${startTime.toLocaleTimeString(
      [],
      options
    )} ~ ${endTime.toLocaleTimeString([], options)}`;
  };

  const calculateTime = () => {
    let currentTime = new Date(`1970-01-01T${startTime}:00`); // 출근 시각 설정

    // 기본 퇴근 시각: 출근 시각 + 9시간 (근무 8시간 + 점심 1시간)
    const baseEndTime = new Date(currentTime.getTime());
    baseEndTime.setHours(currentTime.getHours() + WORK_HOURS + 1); // 9시간 후 기본 퇴근 시각

    let result = {
      baseEndTime: baseEndTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fDayRange: "",
      flexRange: "",
      fDayStartTime: currentTime,
      flexStartTime: currentTime,
      flexEndTime: baseEndTime,
    };

    let currentEndTime = new Date(baseEndTime.getTime()); // 기본 퇴근 시각 복사

    // F-day 및 선택근무제 순서에 따라 적용
    if (applyOrder === "fday-first") {
      // F-day 먼저 적용 후 선택근무제 적용
      if (useFDay) {
        result.fDayStartTime = new Date(currentEndTime.getTime());
        currentEndTime.setMinutes(currentEndTime.getMinutes() - 90); // F-day로 1시간 30분 단축
        result.fDayRange = `F-day: ${formatTimeRange(
          currentEndTime,
          result.fDayStartTime
        )}`;
      }

      if (useFlexibleWork > 0) {
        result.flexStartTime = new Date(currentEndTime.getTime());
        currentEndTime.setMinutes(
          currentEndTime.getMinutes() - useFlexibleWork * 30
        ); // 선택근무제 적용
        result.flexEndTime = currentEndTime;
        result.flexRange = `선택근무제: ${formatTimeRange(
          result.flexEndTime,
          result.flexStartTime
        )}`;
      }
    } else {
      // 선택근무제 먼저 적용 후 F-day 적용
      if (useFlexibleWork > 0) {
        result.flexStartTime = new Date(currentEndTime.getTime());
        currentEndTime.setMinutes(
          currentEndTime.getMinutes() - useFlexibleWork * 30
        ); // 선택근무제 적용
        result.flexEndTime = currentEndTime;
        result.flexRange = `선택근무제: ${formatTimeRange(
          result.flexEndTime,
          result.flexStartTime
        )}`;
      }

      if (useFDay) {
        result.fDayStartTime = new Date(currentEndTime.getTime());
        currentEndTime.setMinutes(currentEndTime.getMinutes() - 90); // F-day로 1시간 30분 단축
        result.fDayRange = `F-day: ${formatTimeRange(
          currentEndTime,
          result.fDayStartTime
        )}`;
      }
    }

    return result;
  };

  const {
    baseEndTime,
    fDayRange,
    flexRange,
    fDayStartTime,
    flexStartTime,
    flexEndTime,
  } = calculateTime();

  return (
    <div className={styles.container}>
      <h1>퇴근 시각 계산기</h1>

      <div className={styles.formGroup}>
        <label className={styles.label}>출근 시각 </label>
        <input
          type="time"
          value={startTime}
          onChange={handleTimeChange}
          className={styles.timeInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={useFDay}
            onChange={() => setUseFDay(!useFDay)}
            className={styles.checkbox}
          />
          F-day 사용 (1시간 30분 단축)
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>선택근무제 사용: </label>
        <select
          value={useFlexibleWork}
          onChange={(e) => setUseFlexibleWork(parseInt(e.target.value))}
          className={styles.select}
        >
          <option value={0}>사용 안함</option>
          <option value={1}>1번 사용 (30분)</option>
          <option value={2}>2번 사용 (60분)</option>
          <option value={3}>3번 사용 (90분)</option>
        </select>
      </div>

      {useFDay && useFlexibleWork > 0 && (
        <div>
          <label className={styles.label}>적용 순서: </label>
          <select
            value={applyOrder}
            onChange={(e) => setApplyOrder(e.target.value)}
            className={styles.select}
          >
            <option value="fday-first">선택근무제 -{">"} 패밀리데이</option>
            <option value="flex-first">패밀리데이 -{">"} 선택근무제</option>
          </select>
        </div>
      )}

      {/* Flow chart 형식으로 시각적으로 구간을 세로로 표시 */}
      <div className={styles.flowChartContainer}>
        <div
          className={styles.flowItem}
          style={{ backgroundColor: "rgba(1, 198, 195, 0.8)" }}
        >
          출근: {startTime}
        </div>

        {/* 조건에 따라 순서를 결정하여 그림 표시 */}
        {applyOrder !== "fday-first" ? (
          <>
            {useFDay && (
              <>
                <div className={styles.arrow}>⬇</div>
                <div
                  className={styles.flowItem}
                  style={{ backgroundColor: "rgba(217, 217, 122, 0.8)" }}
                >
                  {fDayRange}
                </div>
              </>
            )}
            {useFlexibleWork > 0 && (
              <>
                <div className={styles.arrow}>⬇</div>
                <div
                  className={styles.flowItem}
                  style={{ backgroundColor: "rgba(170, 122, 217, 0.8)" }}
                >
                  {flexRange}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {useFlexibleWork > 0 && (
              <>
                <div className={styles.arrow}>⬇</div>
                <div
                  className={styles.flowItem}
                  style={{ backgroundColor: "rgba(170, 122, 217, 0.8)" }}
                >
                  {flexRange}
                </div>
              </>
            )}
            {useFDay && (
              <>
                <div className={styles.arrow}>⬇</div>
                <div
                  className={styles.flowItem}
                  style={{ backgroundColor: "rgba(217, 217, 122, 0.8)" }}
                >
                  {fDayRange}
                </div>
              </>
            )}
          </>
        )}

        <div className={styles.arrow}>⬇</div>
        <div
          className={styles.flowItem}
          style={{ backgroundColor: "rgba(1, 198, 195, 0.8)" }}
        >
          퇴근: {baseEndTime}
        </div>
      </div>
    </div>
  );
}

export default TimeCalculator;
