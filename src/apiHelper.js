//@flow

import { useEffect, useState } from 'react';

export const useFetch = <FetchData>(
        promiseFn: () => Promise<FetchData>
    ): {
        data: ?FetchData,
        loading: bool, 
        error: ?Error
    } => {
        const [loading, setLoading] = useState(false)
        const [data, setData] = useState<?FetchData>()
        const [error, setError] = useState<?Error>()

        useEffect(() => {
            setLoading(true)

        promiseFn()
            .then((result) => setData(result))
            .catch(setError)
            .finally(() => setLoading(false))
        },[])

        return {
            loading,
            data,
            error
        }
    }

export const ok = (res: any) =>
    res.status === 200 &&
    res.data &&
    (typeof res.data.status === 'undefined' || res.data.status === 'success');

export const getResponseMessage = (result: any) =>
    result.data && result.data.message
        ? result.data.message
        : 'default.error_occurred';
    
export type SuccessResponse = {|
    status: 200,
    data: {
        status: string,
        data: mixed,
        message: ?string
    }
|};