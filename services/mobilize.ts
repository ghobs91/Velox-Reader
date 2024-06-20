import { EntryContent } from "../model/entry";

const MOBILIZER_URL = `https://mobilize.now.sh/api/mobilize/`

const mobilize = async (url: string): Promise<EntryContent> => {
    const proxiedUrl = `https://cloudflare-cors-anywhere.andrew-ghobrial.workers.dev/?${url}`
    const response = await fetch(`${MOBILIZER_URL}${encodeURIComponent(proxiedUrl)}`);
    return await response.json();
}

export default mobilize;