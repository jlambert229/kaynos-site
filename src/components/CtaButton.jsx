import { URLS } from "../config/urls";

export default function CtaButton({ children, className = "btn btn-primary btn-lg" }) {
  return (
    <a href={URLS.signup} className={`${className} plausible-event-name=CTA-Trial`}>
      {children}
    </a>
  );
}
