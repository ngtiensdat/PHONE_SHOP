'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

export default function CountdownTimer({
  initialHours = 4,
  initialMinutes = 15,
  initialSeconds = 30
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: initialHours, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [initialHours]);

  const formatTimeNum = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="timer-box">
      <span className="time-part">{formatTimeNum(timeLeft.hours)}</span>
      <span className="time-sep">:</span>
      <span className="time-part">{formatTimeNum(timeLeft.minutes)}</span>
      <span className="time-sep">:</span>
      <span className="time-part">{formatTimeNum(timeLeft.seconds)}</span>
    </div>
  );
}
