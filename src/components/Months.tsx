import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    selectedMonth: string;
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
};

export const Months: React.FC<Props> = ({
    selectedMonth,
    setSelectedMonth,
}) => {
    const months = [];
    for (let i = 1; i < 13; i++) {
        months.push(i);
    }
    return (
        <FormControl sx={{ minWidth: 150 }} size='small'>
            <InputLabel id='demo-select-small'>Month</InputLabel>
            <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={selectedMonth}
                label='Month'
                onChange={(e) => {
                    setSelectedMonth(e.target.value);
                }}
            >
                {months.map((month) => {
                    return (
                        <MenuItem value={month} key={month}>
                            {month}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
