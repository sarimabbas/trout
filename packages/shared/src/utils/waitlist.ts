const baseUrl = "https://api.getwaitlist.com/api/v1";

/**
 *
 * @returns an access token for the waitlist API
 */
export const getAccessToken = async () => {
  const response = await fetch(`${baseUrl}/auth/create_tokens`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: process.env.WAITLIST_EMAIL,
      password: process.env.WAITLIST_SECRET,
    }),
  });
  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
  };
  return data.access_token;
};

/**
 *
 * @returns metadata for the waitlist
 */
export const getWaitlistMeta = async () => {
  const url = new URL(`${baseUrl}/waitlist`);
  url.searchParams.append("waitlist_id", process.env.WAITLIST_ID);
  const response = await fetch(url, {
    method: "GET",
  });
  const data = (await response.json()) as {
    id: string;
    statistics: {
      total_signups: number;
      current_waiters: number;
    };
  };
  return data;
};

/**
 *
 * @param accessToken - the access token for the waitlist API
 * @returns the waitlistees for the waitlist, ordered by priority
 */
export const getWaitlistees = async (accessToken: string, limit: number) => {
  const urlWithParams = new URL(
    `${baseUrl}/waiter/waitlist/${process.env.WAITLIST_ID}`
  );
  // the default is 25 but we can limit it
  urlWithParams.searchParams.append("limit", `${limit}`);

  const response = await fetch(
    // the list is always ordered by priority
    urlWithParams,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = (await response.json()) as Array<{
    email: string;
    uuid: string;
  }>;

  return data;
};

/**
 *
 * @param accessToken - the access token for the waitlist API
 * @param ids - the ids of the waitlistees to offboard
 * @returns the waitlistees that were offboarded
 */
export const offboardWaitlistees = async (
  accessToken: string,
  ids: string[]
) => {
  console.log({ offboard: ids });
  const url = new URL(`${baseUrl}/waiter`);
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      waitlist_id: process.env.WAITLIST_ID,
      offboard_request: true,
      waiters: ids.map((id) => ({
        uuid: id,
      })),
    }),
  });
  const data = (await response.json()) as Array<{
    uuid: string;
    email: string;
  }>;
  return data;
};
