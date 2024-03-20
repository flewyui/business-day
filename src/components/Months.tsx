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
    return (
        <>
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
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='11'>11</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};
