import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    selectedYear: string;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
    from: number;
    to: number;
};

export const Years: React.FC<Props> = ({
    selectedYear,
    setSelectedYear,
    from,
    to,
}) => {
    const items = [];
    for (let year = from; year < to; year++) {
        items.push(
            <MenuItem value={year} key={year}>
                {year}
            </MenuItem>
        );
    }
    return (
        <FormControl sx={{ minWidth: 150 }} size='small'>
            <InputLabel id='demo-select-small'>Year</InputLabel>
            <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={selectedYear}
                label='Year'
                onChange={(e) => {
                    setSelectedYear(e.target.value);
                }}
            >
                {items}
            </Select>
        </FormControl>
    );
};
