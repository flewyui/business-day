type Props = {
    businessDaysLength: string;
    workingHoursPerDay: string;
};

export const WorkingHours: React.FC<Props> = ({
    businessDaysLength,
    workingHoursPerDay,
}) => {
    return (
        <div className='container h-80'>
            <h5 className='item-130'>Working hours : </h5>
            <h5 className='item-270 text-center'>
                {Number(businessDaysLength) * Number(workingHoursPerDay)} h
            </h5>
        </div>
    );
};
