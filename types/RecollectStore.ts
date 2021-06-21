import { Store } from "react-recollect";
import { Entry } from "../model/entry";
import { Subscription } from "../model/subscription";

export interface CollectProps {
  store: Store;
}
export interface UpdatingInformation {
  categories: boolean;
  stream: {
    [streamId: string]: Promise<void>;
  };
}

export interface StoreStream {
  id: string;
  unreadOnly: boolean;
  lastScrollPos: number;
  length: number;
  loadedEntries: string[];
}

export interface StoreDef {
  updating: UpdatingInformation;
  current: {
    [path: string]: string;
  },

  stream: StoreStream;
  entries: { [id: string]: Entry };
}

declare module 'react-recollect' {
  interface Store extends StoreDef { }
}