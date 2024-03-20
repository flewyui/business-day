type Props = {
    holidaysOfMonth: string[];
};

export const Holidays: React.FC<Props> = ({ holidaysOfMonth }) => {
    return (
        <>
            {holidaysOfMonth.length ? (
                holidaysOfMonth.map((holiday, key) => {
                    return (
                        <div className='container h-30' key={key}>
                            <h5 className='item-95'>
                                {key === 0 && 'Holidays : '}{' '}
                            </h5>
                            <h5 className='item-305 text-center'>{holiday}</h5>
                        </div>
                    );
                })
            ) : (
                <div className='container h-30'>
                    <h5 className='item-130'>Holidays : </h5>
                    <h5 className='item-270 text-center'>No holiday...</h5>
                </div>
            )}
        </>
    );
};
