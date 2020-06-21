import { useEffect, useState } from "react";
import { useForeUpdate } from "./effects";

export const useResult = <T>(promise: Promise<T>, dependencies?: any[], defaultValue: T = undefined) => {
    const [result, setResult] = useState(defaultValue);

    useEffect(() => {
        let unmounted = false;    
        promise.then(result => {
            if (unmounted)
                return;

            setResult(result);
        });

        return () => unmounted = true;
    }, dependencies);

    return result;
}

interface Cache<T> {
    updating: boolean;
    lastArgs: any[];
    state: T;
}

const elementsChanged = (l1: any[], l2: any[]) => l1.length !== l2.length || l1.some((item, index) => l2[index] !== item);
export const makeUpdatableSharedCache = <T>(fetcher: (...args) => Promise<T>, initialValue?: T) => {
    const cache: Cache<T> = {
        updating: false,
        lastArgs: [],
        state: initialValue
    };

    const updaters: (() => void)[] = [];
    const update = async (...args) => {
        if (cache.updating) return;

        const result = await fetcher(...args);
        cache.state = result;
        updaters.forEach(u => u());

        cache.lastArgs = args;
        cache.updating = false;
    };

    return (...args): T => {
        // If we don't have any data, or our args have changed
        if (!cache.state
            || elementsChanged(args, cache.lastArgs)) {
            update(...args)
        }

        // Manage registering for update
        const forceUpdate = useForeUpdate();
        useEffect(() => {
            updaters.push(forceUpdate);
            return () => {
                const index = updaters.indexOf(forceUpdate);
                updaters.splice(index, 1);
            };
        })

        return cache.state;
    };

}