'use client'

import styles from './index.module.css'
import { useEffect, useState } from 'react'
import { Solar } from 'lunar-typescript'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  const hours = padZero(time.getHours())
  const minutes = padZero(time.getMinutes())
  const dateInfo = getDateInfo(time)
  const weekInfo = getWeekInfo(time)
  const lunarInfo = getLunarInfo(time)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div className={styles['box']}>
      <div className={styles['time']}>
        <span>{hours}</span>
        <span className={styles['colon']}>:</span>
        <span>{minutes}</span>
      </div>
      <div className={styles['date']}>
        <span>{dateInfo}</span>
        <span>{weekInfo}</span>
        <span>{lunarInfo}</span>
      </div>
    </div>
  )
}

function padZero(num: number) {
  return num.toString().padStart(2, '0')
}

function getDateInfo(date: Date) {
  return date.getMonth() + 1 + '月' + date.getDate() + '日'
}

function getWeekInfo(date: Date) {
  return '星期' + '日一二三四五六'.charAt(date.getDay())
}

function getLunarInfo(date: Date) {
  const lunar = Solar.fromDate(date).getLunar()
  return lunar.getMonthInChinese() + '月' + lunar.getDayInChinese()
}
