import { URLS } from "../config/urls";

/* Centralizes the URL + Plausible event name used by every "open the demo"
   link on the site. Lets call sites focus on text/icon/styling and keeps
   the analytics event names from drifting. The Plausible tracker reads the
   `plausible-event-name=…` className token, so we tack it onto whatever
   className the caller passes. */
const TARGETS = {
  coach: { url: URLS.demoCoach, event: "Demo+Coach" },
  student: { url: URLS.demoStudent, event: "Demo+Student" },
};

export default function DemoLink({
  which = "coach",
  className = "",
  newTab = true,
  srOnlyHint = true,
  children,
}) {
  const target = TARGETS[which];
  if (!target) {
    throw new Error(`<DemoLink which="${which}" /> — must be "coach" or "student"`);
  }
  const eventClass = `plausible-event-name=${target.event}`;
  const finalClassName = className ? `${className} ${eventClass}` : eventClass;
  const newTabProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a href={target.url} className={finalClassName} {...newTabProps}>
      {children}
      {newTab && srOnlyHint ? (
        <span className="sr-only"> (opens in new tab)</span>
      ) : null}
    </a>
  );
}
