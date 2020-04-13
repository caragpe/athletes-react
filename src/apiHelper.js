//@flow

import { useState, useEffect } from 'react';
import { DO_NOT_FETCH_NOW } from './constants';

export const useFetch = <FetchData>(
        promiseFn: () => Promise<FetchData>,
        watchDog: ?number
    ): {
        data: ?FetchData,
        loading: bool,
    } => {
        const [loading, setLoading] = useState(false)
        const [data, setData] = useState<?FetchData>()

        useEffect(() => {
            if(watchDog !== DO_NOT_FETCH_NOW) {
                setLoading(true)

                promiseFn()
                    .then((result) => setData(result))
                    .catch((err) => console.log(getResponseMessage(err)))
                    .finally(() => setLoading(false))
            }
        },[watchDog])


        return {
            loading,
            data
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