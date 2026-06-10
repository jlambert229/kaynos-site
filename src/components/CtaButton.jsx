import { URLS } from "../config/urls";
import { PRICING_COPY } from "../config/pricing";

/** Signup CTA link. Children default to the standard trial label so the
 *  trial length lives only in config/pricing.js. */
export default function CtaButton({ children = PRICING_COPY.trialCta, className = "btn btn-primary btn-lg" }) {
  return (
    <a href={URLS.signup} className={`${className} plausible-event-name=Signup`}>
      {children}
    </a>
  );
}
