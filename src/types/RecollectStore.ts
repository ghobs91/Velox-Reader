import { Omit } from "@material-ui/core";
import { Category } from "../model/category";
import { Entry } from "../model/entry";
import { Stream } from "../model/stream";
import { Subscription } from "../model/subscription";
import { Collection } from "../model/collection";

export interface UpdatingInformation {
  categories: boolean;
  stream: number;
}

export interface Settings {
  unreadOnly: boolean;
  markOpenedAsRead: boolean;
  markScrolledAsRead: boolean;
  doubleTapToCloseArticles: boolean;
  fontSize: 1 | 2 | 3 | 4 | 5;
  darkMode: boolean;
}

export interface StoreStream {
  id: string;
  length: number;
  loadedEntries: string[];
}

export interface StoreDef {
  updating: UpdatingInformation;
  settings: Settings;
  current: {
    [path: string]: string;
  },
  subscriptions: Subscription[];
  lastUpdate: number;

  stream: StoreStream;
  entries: { [id: string]: Entry };
}

declare module 'react-recollect' {
  interface Store extends StoreDef { }
}