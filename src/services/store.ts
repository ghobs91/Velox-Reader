import { store as s } from 'react-recollect';
import { Stream } from '../model/stream';
import { Subscription } from '../model/subscription';
import { StoreDef, StoreStream } from '../types/RecollectStore';
import { Entry } from '../model/entry';
import { getUncategorizedId } from '../api/streams';
const store = s as StoreDef;
 
export const initStore = () => {
    store.streams = {};
    store.entries = {};
    store.profile = require('../fakeProfile.json');

    // Include our fake stream by default.
    updateAllStreams(store.profile.id, require('../fakeStream.json'));
    store.collections = require('../fakeCollections.json');
}

export const updateStream = (stream: Stream) => {
    const entryUpdate = stream.items.reduce((prev, next) => ({
        ...prev,
        [next.id]: next
    }), {});

    store.entries = {
        ...store.entries,
        ...entryUpdate
    };

    store.streams[stream.id] = {
        ...stream,
        items: stream.items.map(i => i.id)
    };
}

export const updateAllStreams = (profileId: string, allStream: Stream) => {
    console.log("Updating streams")
    const uncategorizedId = getUncategorizedId(profileId);
    const entryUpdate: { [id: string]: Entry } = {};
    const streamUpdate = {
        [allStream.id]: {
            ...allStream,
            items: allStream.items.map(i => i.id)
        },
        [uncategorizedId]: {
            id: uncategorizedId,
            title: "Uncategorized",
            items: []
        }
    };

    for (const entry of allStream.items) {
        entryUpdate[entry.id] = entry;

        // Add to uncategorized.
        if (!entry.categories || entry.categories.length === 0) {
            streamUpdate[uncategorizedId].items.push(entry.id);
            continue;
        }
        
        // Add to all categories we pretend to have.
        for (const category of entry.categories) {
            // If we haven't made a stream for this category, create one.
            if (!streamUpdate[category.id]) {
                streamUpdate[category.id] = {
                    id: category.id,
                    title: category.label,
                    items: []
                }
            }

            streamUpdate[category.id].items.push(entry.id);
        }
    }

    store.entries = {
        ...store.entries,
        ...entryUpdate
    };

    console.log(streamUpdate[uncategorizedId])
    store.streams = streamUpdate;
}