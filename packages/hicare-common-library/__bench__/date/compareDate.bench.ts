import { hicareDate } from 'lib/utility';
import { bench, describe } from 'vitest';

describe('dayjs compare date time', () => {
    const a = hicareDate.dayjs();
    const b = hicareDate.dayjs().subtract(1, 'day');

    bench('unixTime', async () => {
        const aTime = a.unix();
        const bTime = b.unix();
        aTime - bTime;
    });

    bench('valueOf', async () => {
        const aTime = a.valueOf();
        const bTime = b.valueOf();
        aTime - bTime;
    });

    bench('toDate', async () => {
        const aTime = a.toDate();
        const bTime = b.toDate();
        aTime.getTime() - bTime.getTime();
    });

    bench('diff', async () => {
        const aTime = a.diff(b, 'millisecond');
        aTime;
    });
});
