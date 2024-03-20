import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Months } from './Months';
import { Years } from './Years';

type Props = {
    selectedMonth: string;
    selectedYear: string;
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
    moveToPrevMonth: () => void;
    moveToNextMonth: () => void;
};

export const DateSelect: React.FC<Props> = ({
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    moveToPrevMonth,
    moveToNextMonth,
}) => {
    return (
        <Box sx={{ minWidth: 300 }}>
            <ArrowBackIosNewIcon
                color='primary'
                sx={{ width: 30, marginTop: 1, cursor: 'pointer' }}
                onClick={() => moveToPrevMonth()}
            />
            <Years
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                from={2024}
                to={2030}
            />
            <Months
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <ArrowForwardIosIcon
                color='primary'
                sx={{ width: 30, marginTop: 1, cursor: 'pointer' }}
                onClick={() => moveToNextMonth()}
            />
        </Box>
    );
};
