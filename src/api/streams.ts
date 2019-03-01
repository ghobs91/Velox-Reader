import { Stream } from '../model/stream';
import { makeRequest } from './common';
const endpoint = '/streams'

interface StreamRequestOptions {
    count?: number;
    ranked?: 'oldest' | 'newest';
    unreadOnly?: boolean;
    newerThan?: number;
    continuation?: string;
}

export const getStream = async (streamId: string, type: 'content' | 'id' = 'content', options?: StreamRequestOptions): Promise<Stream> => {
    return makeRequest<Stream>(`${endpoint}/${type}?streamId=${streamId}`, options);
}