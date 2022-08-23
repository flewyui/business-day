import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as holiday_jp from '@holiday-jp/holiday_jp';

const App: React.VFC = () => {
    type HolidayObj = {
        date: Date;
        name: string;
        week: string;
        week_en: string;
    };
    type FormatedHolidayObj = {
        date: string;
        name: string;
    };
    const currentYear = String(new Date().getFullYear()); // 現在の年
    const currentMonth = String(new Date().getMonth() + 1); // 現在の月
    const startDate = new Date('2021-01-01'); // 検索可能初日
    const endDate = new Date('2023-12-31'); // 検索可能最終日
    const holidayObjects = holiday_jp.between(startDate, endDate); // 対象期間の休日オブジェクト
    const [numbersOfDays, setNumbersOfDays] = useState<number[]>([]); // 対象年の各月の日数
    const [allHolidays, setAllHolidays] = useState<FormatedHolidayObj[]>([]); // 対象年の祝日のリスト
    const [daysOfMonth, setDaysOfMonth] = useState<Date[]>([]); // 対象月の全日のリスト
    const [holidaysOfMonth, setHolidaysOfMonth] = useState<string[]>([]); // 対象月の祝日のリスト
    const [businessDays, setBusinessDays] = useState<string[]>([]); // 対象月の営業日のリスト
    const [selectedYear, setSelectedYear] = useState<string>(currentYear); // 選択された年
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth); // 選択された月

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
        const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][
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
        allHolidays.map((holiday) => {
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
        if (date.match(/土/) || date.match(/日/)) isWeekend = true;
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
            const week = holiday.week;
            const name = holiday.name;
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
        if (targetMonthStr.slice(0, 1) === '0')
            targetMonthStr = targetMonthStr.replace('0', '');
        const targetMonth = Number(targetMonthStr);
        const newBusinessdaysArr: string[] = [];
        const newHolidaysArr: string[] = [];
        for (let i = 1; i <= numbersOfDays[targetMonth - 1]; i++) {
            const date: Date = new Date(targetYear, targetMonth - 1, i);
            const formatedDate = formatDate(date);
            const isWeekend = checkIsWeekend(formatedDate);
            const isHoliday = checkIsHoliday(formatedDate);
            // 休日はnewHolidaysArr:[]に追加し、ループ終了後setState()
            if (isHoliday) {
                allHolidays.map((holiday) => {
                    if (holiday.date === formatedDate) {
                        newHolidaysArr.push(`${formatedDate}：${holiday.name}`);
                    }
                });
            }
            // 平日はnewBusinessdaysArr:[]に追加し、ループ終了後setState()
            if (!isWeekend && !isHoliday) newBusinessdaysArr.push(formatedDate);
        }
        setHolidaysOfMonth(newHolidaysArr);
        setBusinessDays(newBusinessdaysArr);
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
        <>
            <select
                value={selectedYear}
                onChange={(e) => {
                    setSelectedYear(e.target.value);
                }}
            >
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
            </select>
            年
            <select
                value={selectedMonth}
                onChange={(e) => {
                    setSelectedMonth(e.target.value);
                }}
            >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
            </select>
            月<h3>Businessdays</h3>
            <h4>{businessDays.length} days</h4>
            <h3>Holidays</h3>
            {holidaysOfMonth.map((holiday, key) => {
                return <p key={key}>{holiday}</p>;
            })}
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
