/**
 *
 * @param srcUrl  The url to copy the search params from
 * @param destUrl  The url to copy the search params to
 * @returns  A new url with the search params copied from srcUrl to destUrl
 */
export const copyParamsToUrl = (srcUrl: string, destUrl: string): string => {
  const source = new URL(srcUrl);
  const dest = new URL(destUrl);
  source.searchParams.forEach((value, key) => {
    dest.searchParams.set(key, value);
  });
  return dest.toString();
};

/**
 *
 * @param headers a Headers object
 * @returns a new Headers object with problematic headers removed
 */
export const cleanHeaders = (headers: Headers) => {
  const copiedHeaders = new Headers(headers);
  copiedHeaders.delete("host");
  copiedHeaders.delete("connection");
  return copiedHeaders;
};

/**
 *
 * @param req a Request object
 * @returns a stringified RequestInit object
 */
export const serializeRequest = async (req: Request) => {
  const clonedReq = req.clone();
  const cleanedHeaders = cleanHeaders(clonedReq.headers);
  const textBody = await clonedReq.text();
  return JSON.stringify({
    method: clonedReq.method, // string
    body: textBody, // string
    // cache: clonedReq.cache, // string
    // credentials: clonedReq.credentials, // string
    headers: Object.fromEntries(cleanedHeaders), // object
    // integrity: clonedReq.integrity, // string
    // keepalive: clonedReq.keepalive, // boolean
    // mode: clonedReq.mode, // string
    // redirect: clonedReq.redirect, // string
    // referrer: clonedReq.referrer, // string
    // referrerPolicy: clonedReq.referrerPolicy, // string
    url: clonedReq.url, // string
  } as RequestInit & { url: string });
};

/**
 *
 * @param serializedRequest a stringified RequestInit object
 * Returns a RequestInit object
 */
export const deserializeRequest = (
  serializedRequest: string
): RequestInit & { url: string } => {
  const parsed = JSON.parse(serializedRequest);
  return parsed;
};
