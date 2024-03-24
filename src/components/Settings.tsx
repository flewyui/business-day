import { Stack, TextField, Typography } from '@mui/material';

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
            <Typography>Manual Settings : </Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
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
                <Typography variant='body1'>×</Typography>
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
