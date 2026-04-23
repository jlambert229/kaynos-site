import { Component } from "react";

const DEFAULT_FALLBACK = (
  <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
    Something went wrong. Please reload the page.
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
