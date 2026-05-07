import { Component } from "react";

// Marketing-site fallback. Kept inline-styled so it renders even when the
// stylesheet itself is the thing that crashed (rare, but the boundary is the
// one place in the tree where we can't trust any other module).
const DEFAULT_FALLBACK = (
  <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
    <p style={{ marginBottom: "1rem" }}>
      Something went wrong loading this page.
    </p>
    <a
      href="/"
      style={{
        display: "inline-block",
        padding: "10px 22px",
        borderRadius: "6px",
        background: "#0066ff",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 600,
      }}
    >
      Go to home page
    </a>
  </div>
);

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (typeof fallback === "function") {
        return fallback(this.state.error);
      }
      return fallback !== undefined ? fallback : DEFAULT_FALLBACK;
    }
    return this.props.children;
  }
}
