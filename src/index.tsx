import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as holiday_jp from '@holiday-jp/holiday_jp';
import { Holidays } from './components/Holidays';
import { Settings } from './components/Settings';
import { WorkingHours } from './components/WorkingHours';
import './style.css';
import { HolidayObj, FormatedHolidayObj } from './types';
import { DateSelect } from './components/DateSelect';

const App: React.VFC = () => {
    const currentYear = String(new Date().getFullYear()); // 現在の年
    const currentMonth = String(new Date().getMonth() + 1); // 現在の月
    const startDate = new Date('2024-01-01'); // 検索可能初日
    const endDate = new Date('2029-12-31'); // 検索可能最終日
    const holidayObjects = holiday_jp.between(startDate, endDate); // 対象期間の休日オブジェクト
    const [numbersOfDays, setNumbersOfDays] = useState<number[]>([]); // 対象年の各月の日数
    const [allHolidays, setAllHolidays] = useState<FormatedHolidayObj[]>([]); // 対象年の祝日のリスト
    const [holidaysOfMonth, setHolidaysOfMonth] = useState<string[]>([]); // 対象月の祝日のリスト
    const [businessDaysLength, setBusinessDaysLength] = useState<string>(''); // 対象月の営業日数
    const [selectedYear, setSelectedYear] = useState<string>(currentYear); // 選択された年
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth); // 選択された月
    const [workingHoursPerDay, setworkingHoursPerDay] = useState<string>('8'); // 1日の稼働時間

    /**
     * 「年/月/日(曜日)」にフォーマット
     * @param {Date} date
     * @returns {string} formatedDate フォーマットされた日付
     */
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = date.getDay();
        const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
            dayOfWeek
        ];
        const formatedDate = `${year}/${month}/${day}(${dayOfWeekStr})`;
        return formatedDate;
    };

    /**
     * 対象日が休日かどうか判定
     * @param {string} date - 対象日
     * @returns {boolean} isHoliday 休日かどうかの真偽値
     */
    const checkIsHoliday = (date: string): boolean => {
        let isHoliday = false;
        allHolidays.forEach((holiday) => {
            if (holiday.date === date) isHoliday = true;
        });
        return isHoliday;
    };

    /**
     * 対象日が土日のどちらかかどうか判定
     * @param {string} date - 対象日
     * @returns {boolean} isWeekend 土日のどちらかどうかの真偽値
     */
    const checkIsWeekend = (date: string): boolean => {
        let isWeekend = false;
        if (date.match(/Sat/) || date.match(/Sun/)) isWeekend = true;
        return isWeekend;
    };

    /**
     * 「年/月/日/(曜日)：休日名」にフォーマットしてallHolidays:[]にセット
     * @param holidayObjects
     */
    const makeHolidaysArr = (holidayObjects: HolidayObj[]) => {
        holidayObjects.forEach((holiday) => {
            const year = holiday.date.getFullYear();
            const month = holiday.date.getMonth() + 1;
            const day = holiday.date.getDate();
            const week = holiday.week_en.slice(0, 3);
            const name = holiday.name_en;
            const formatedHolidayDate = `${year}/${month}/${day}(${week})`;
            const formatedHolidayObj: FormatedHolidayObj = {
                date: formatedHolidayDate,
                name: name,
            };
            setAllHolidays((allHolidays) => [
                ...allHolidays,
                formatedHolidayObj,
            ]);
        });
    };

    /**
     * 対象月の営業日を取得
     * @param {string} ym
     */
    const getBusinessdays = (ym: string) => {
        const targetYear = Number(ym.slice(0, 4));
        let targetMonthStr = ym.slice(4, 6);
        // 月の十の位に"0"があれば削除
        if (targetMonthStr.slice(0, 1) === '0')
            targetMonthStr = targetMonthStr.replace('0', '');
        const targetMonth = Number(targetMonthStr);
        const newBusinessdaysArr: string[] = [];
        const newHolidaysArr: string[] = [];
        for (let i = 1; i <= numbersOfDays[targetMonth - 1]; i++) {
            const date: Date = new Date(targetYear, targetMonth - 1, i);
            let formatedDate = formatDate(date);
            const isWeekend = checkIsWeekend(formatedDate);
            const isHoliday = checkIsHoliday(formatedDate);
            // 休日はnewHolidaysArr:[]に追加し、ループ終了後setState()
            if (isHoliday) {
                allHolidays.forEach((holiday) => {
                    if (holiday.date === formatedDate) {
                        formatedDate = formatedDate.slice(5);
                        newHolidaysArr.push(`${formatedDate}：${holiday.name}`);
                    }
                });
            }
            // 平日はnewBusinessdaysArr:[]に追加し、ループ終了後setState()
            if (!isWeekend && !isHoliday) newBusinessdaysArr.push(formatedDate);
        }
        setHolidaysOfMonth(newHolidaysArr);
        setBusinessDaysLength(String(newBusinessdaysArr.length));
    };

    /**
     * 前月を表示
     */
    const moveToPrevMonth = () => {
        const prevMonth = Number(selectedMonth) - 1;
        // 年を跨ぐ場合
        if (prevMonth === 0) {
            const prevYear = Number(selectedYear) - 1;
            setSelectedMonth('12');
            setSelectedYear(String(prevYear));
        } else {
            setSelectedMonth(String(prevMonth));
        }
    };

    /**
     * 次月を表示
     */
    const moveToNextMonth = () => {
        const nextMonth = Number(selectedMonth) + 1;
        // 年を跨ぐ場合
        if (nextMonth === 13) {
            const nextYear = Number(selectedYear) + 1;
            setSelectedMonth('1');
            setSelectedYear(String(nextYear));
        } else {
            setSelectedMonth(String(nextMonth));
        }
    };

    useEffect(() => {
        for (let i = 1; i < 13; i++) {
            const lastDate = new Date(Number(selectedYear), i, 0).getDate();
            setNumbersOfDays((numbersOfDays) => [...numbersOfDays, lastDate]);
        }
        makeHolidaysArr(holidayObjects);
    }, []);

    /**
     * 各月の日数が取得できたら実行
     */
    useEffect(() => {
        getBusinessdays(`${selectedYear}${selectedMonth}`);
    }, [numbersOfDays, selectedYear, selectedMonth]);

    return (
        <div className='wrapper'>
            <h5 className='item-270 lnh-80 text-center'>Business day</h5>
            <DateSelect
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                moveToPrevMonth={moveToPrevMonth}
                moveToNextMonth={moveToNextMonth}
            />
            <Settings
                businessDaysLength={businessDaysLength}
                workingHoursPerDay={workingHoursPerDay}
                setBusinessDaysLength={setBusinessDaysLength}
                setworkingHoursPerDay={setworkingHoursPerDay}
            />
            <WorkingHours
                businessDaysLength={businessDaysLength}
                workingHoursPerDay={workingHoursPerDay}
            />
            <Holidays holidaysOfMonth={holidaysOfMonth} />
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
