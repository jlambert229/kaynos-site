import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import { consumeMagicLinkToken, parseMagicLinkParams } from "../../utils/magicLink";

export default function MagicLinkSignIn() {
  const { search } = useLocation();

  const outcome = useMemo(() => {
    const { token, expiresAt, parseError } = parseMagicLinkParams(search);

    if (parseError === "missing") {
      return consumeMagicLinkToken({ token: "", expiresAt: NaN });
    }

    return consumeMagicLinkToken({ token, expiresAt });
  }, [search]);

  return (
    <main className="legal-page shell">
      <Seo
        title="Magic link sign-in"
        description="Processes one-time magic link tokens and rejects replayed or expired links with clear errors."
        path="/auth/magic-link"
      />
      <section className="legal-card prose-flow">
        <h1>Magic link sign-in</h1>
        {outcome.ok ? (
          <p>Success. Your magic link is valid and has now been consumed.</p>
        ) : (
          <p role="alert" aria-live="polite">
            {outcome.message}
          </p>
        )}
      </section>
    </main>
  );
}
