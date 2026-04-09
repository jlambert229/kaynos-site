const SIGNUP_URL = "https://app.kaynos.net/signup";

export default function CtaButton({ children, className = "btn btn-primary btn-lg" }) {
  return (
    <a href={SIGNUP_URL} className={className}>
      {children}
    </a>
  );
}
