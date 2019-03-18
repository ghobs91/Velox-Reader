import { useEffect, useState } from 'react';
import { afterChange, store as defaultStore, Store } from 'react-recollect';
import { makeUpdatableSharedCache } from './promise';

type Updater = (store: Store) => void;

const updaters: Updater[] = [];
const addUpdater = (updater: Updater) => {
    updaters.push(updater);
    return updater;
}

const removeUpdater = (updater: Updater) => {
    const index = updaters.indexOf(updater);
    updaters.splice(index, 1);
}

let currentStore = defaultStore;
afterChange(event => {
    if (event.store === event.prevStore)
      return;

    currentStore = event.store;
    updaters.forEach(u => u(event.store));
});

export const useStore = () => {
    const [store, setStore] = useState(defaultStore);

    useEffect(() => {
        const updater = addUpdater(setStore);
        return () => {
            removeUpdater(updater);
        };
    });

    return store;
}

export const makeStoreCache = <T>(fetcher: () => Promise<T>, set: (value: T) => void) => {
    const storeFetcher = async () => {
        set(await fetcher());
    };

    const useCache = makeUpdatableSharedCache(storeFetcher);
    return (lastUpdate?: number) => {
        const cached = useCache(lastUpdate);
        return cached;
    }
}