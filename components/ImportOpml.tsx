import React, { useCallback } from 'react';
import { getFileText, pickFile } from '../utils/files';
import { Subscription, feedUrlPrefix } from '../model/subscription';
import Button, { ButtonProps } from 'components/Button'
interface OpmlNode {
    text: string;
    title: string;
    htmlurl: string;
    folder: string;
    xmlurl: string;
    type: string;
    children?: OpmlNode[];
}
interface Props {
    onOpmlLoaded: (feeds: Subscription[]) => void;
}

export const parseOpml = (opml: string): Promise<OpmlNode[]> => {
    const onlyFeeds = (root: OpmlNode, nodes: OpmlNode[] = []): OpmlNode[] => {
        if (root.xmlurl) {
            nodes.push(root);
        }

        if (root.children) {
            for (const child of root.children)
                onlyFeeds(child, nodes);
        }

        return nodes;
    }
    return new Promise(async (accept, reject) => {
        const opmlToJson = (await import("opml-to-json")).default;
        try {
            opmlToJson(opml, (error, json) => {
                if (error) {
                    reject(error);
                } else {
                    // Flatten the structure.
                    const feeds = onlyFeeds(json);
                    accept(feeds);
                }
            })
        } catch (err) {
            reject(err);
        }
    });
}

const ImportOpml = (props: Props & ButtonProps) => {
    const { onOpmlLoaded, ...buttonProps } = props;

    const pick = useCallback(async () => {
        const file = await pickFile({
            accept: ['text/xml', 'application/xml', 'text/plain', 'text/x-opml']
        });
        const text = await getFileText(file);
        try {
            const opml = await parseOpml(text);

            // Map the opml nodes to subscriptions.
            const subscriptions: Subscription[] = opml.map(o => ({
                id: `${feedUrlPrefix}${o.xmlurl}`,
                feedUrl: o.xmlurl,
                title: o.title,
                folder: o.folder,
                categories: [{
                    id: o.folder,
                    label: o.folder
                }].filter(c => !!c.id),
                website: o.htmlurl
            }));
            onOpmlLoaded(subscriptions);
        } catch (err) {
            console.error(err);
            window.showToast('Failed to import OPML file');
        }
    }, [onOpmlLoaded]);

    return <Button
        variant="outline"
        color="white"
        className="subscriptions-button"
        {...buttonProps}
        onClick={pick}>
        Import RSS feeds from OPML or XML
    </Button>
};

export default ImportOpml;