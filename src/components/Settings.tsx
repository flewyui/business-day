import { Stack, TextField } from '@mui/material';

type Props = {
    businessDaysLength: string;
    workingHoursPerDay: string;
    setBusinessDaysLength: (value: React.SetStateAction<string>) => void;
    setworkingHoursPerDay: (value: React.SetStateAction<string>) => void;
};

export const Settings: React.FC<Props> = ({
    businessDaysLength,
    setBusinessDaysLength,
    workingHoursPerDay,
    setworkingHoursPerDay,
}) => {
    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={2}
        >
            <h5>Manual Settings : </h5>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                <TextField
                    sx={{ width: 100 }}
                    id='setting-days'
                    label='days'
                    type='number'
                    size='small'
                    value={businessDaysLength}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setBusinessDaysLength(e.target.value);
                    }}
                />
                <h5>×</h5>
                <TextField
                    sx={{ width: 100 }}
                    id='setting-hours'
                    label='hours'
                    type='number'
                    size='small'
                    value={workingHoursPerDay}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setworkingHoursPerDay(e.target.value);
                    }}
                />
            </Stack>
        </Stack>
    );
};
