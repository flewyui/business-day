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
        <Stack direction={'row'} justifyContent={'space-between'}>
            <h5 className='item-140 lnh-80'>Manual Settings : </h5>
            <h5 className='item-260 lnh-80 text-center'>
                <TextField
                    sx={{ width: 100, marginTop: 3 }}
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
                />{' '}
                ×{' '}
                <TextField
                    sx={{ width: 100, marginTop: 3 }}
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
            </h5>
        </Stack>
    );
};
