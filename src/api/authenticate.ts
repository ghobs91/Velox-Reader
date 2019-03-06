import snakeCase from 'snake-case';
import queryString from 'query-string';
import { feedlyQueryString } from './common';

const feedlyUrl = 'https://feedly.com/v3/auth/auth';

interface AuthenticateOptions {
    responseType?: 'code';

    /**
     * Indicates the client that is making the request. The value passed in this parameter must exactly match the value set during the partnership program. 
     */
    clientId: string;

    /**
     *  Determines where the response is sent. The value of this parameter must exactly match one of the values set during the partnership program (including case, and trailing ‘/’). If it is a URL, it must use HTTPS. Make sure this parameter is URL-encoded! On sandbox, the default list includes “http://localhost”, “http://localhost:8080” and “urn:ietf:wg:oauth:2.0:oob”.
     */
    redirectUri: string;

    /**
     * The permissions the app is requesting.
     */
    scopes: string[];

    /**
     * Indicates any state which may be useful to your application upon receipt of the response. The feedly Authorization Server roundtrips this parameter, so your application receives the same value it sent. Possible uses include redirecting the user to the correct resource in your site, nonces, and cross-site-request-forgery mitigations. Make sure this parameter is URL-encoded!
     */
    state?: string;
}

/**
 * Sends an authentication request to Feedly.
 * @param options The options to send to feedly.
 */
export const authenticate = async (options: AuthenticateOptions) => {
    // Make sure we have some kind of value for code.
    options.responseType = options.responseType || 'code';

    
    window.open(`${feedlyUrl}?${feedlyQueryString(options)}`)
}