import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Entry } from "../model/entry";
import { getEntryByline, getEntrySummary, getEntryVisualUrl, getEntrySourceFaviconUrl } from "../services/entry";

const maxLines = {
    maxLines: 4
};

const EntryCard = (props: { entry: Entry, showingUnreadOnly?: boolean }) => {
    const visualUrl = getEntryVisualUrl(props.entry);
    const entrySourceFaviconUrl = getEntrySourceFaviconUrl(props.entry);
    const subheader = getEntryByline(props.entry);
    const summaryHtmlContent = useMemo(() => ({
        __html: getEntrySummary(props.entry)
    }), [props.entry?.summary, props.entry?.content]);

    const [imageUrl, setImageUrl] = useState(visualUrl);
    useEffect(() => {
        setImageUrl(visualUrl);
    }, [visualUrl]);

    const [entrySourceFaviconUrlFromState, setEntrySourceFaviconUrl] = useState(entrySourceFaviconUrl);
    useEffect(() => {
        setEntrySourceFaviconUrl(entrySourceFaviconUrl);
    }, [entrySourceFaviconUrl]);

    // Unset the image url when there's an error.
    const onImageError = useCallback(() => {
        setImageUrl(null);
    }, []);

    // Tint unread articles if and only if they are read and only unread articles are meant to be displayed.
    const tintGray = !props.entry.unread && props.showingUnreadOnly;

    return <div className="bg-paper cursor-pointer relative rounded-lg overflow-hidden shadow entry-card" id="article-card">
            <div className="flex flex-row article-row-container">
                <div className="flex-1 min-w-0 article-text-container">
                    <div className="entry-title-container">
                        <div className="entry-title-text-container">
                            <div className="entry-title-text overflow-hidden leading-tight" style={maxLines}>{props.entry.title}</div>
                        </div>
                        <div className="article-source-container">
                            <div className="source-favicon-container">
                                <img src={entrySourceFaviconUrlFromState} className="rounded-l-md object-cover source-favicon" />
                            </div>
                            <div className="text-md text-gray-500 leading-tight">{subheader}</div>
                        </div>
                    </div>
                    <div className="mt-2 mb-2 text-sm entry-summary-container">
                        <div className="entry-summary" dangerouslySetInnerHTML={summaryHtmlContent}></div>
                    </div>
                </div>
                {imageUrl && <img
                    onError={onImageError}
                    src={imageUrl}
                    alt="Article Visual"
                    className="h-48 w-24 sm:w-48 flex-grow-0 flex-shrink-0 object-cover"/>}
        </div>
        {tintGray && <div className="absolute top-0 left-0 bottom-0 right-0 opacity-60 bg-background"></div>}
    </div>;
}

export default memo(EntryCard);