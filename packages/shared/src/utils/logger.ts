import va from "@vercel/analytics";

type ObjectValues<T> = T[keyof T];

const LogEvent = {
  LinkClick: "link_click",
} as const;

type LogEvent = ObjectValues<typeof LogEvent>;

const LogProperty = {
  label: "label",
  href: "href",
} as const;

type LogProperty = ObjectValues<typeof LogProperty>;

/**
 *
 * @param event - The event to log
 * @param properties - The properties to log (on Vercel Pro Plan, you can only have 2)
 * @returns Promise<void>
 */
export const logEvent = async (
  event: LogEvent,
  properties: Partial<Record<LogProperty, string | number | boolean | null>>
) => {
  return va.track(event, {
    ...properties,
  });
};
