import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import ErrorBoundary from "../src/components/ErrorBoundary";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function Boom({ message = "kaboom" } = {}) {
  throw new Error(message);
}

function silentConsoleError() {
  // ErrorBoundary intentionally console.errors caught errors. React 19 also
  // logs a separate "An error occurred in the <Boom> component" message. Both
  // are expected — silence them so test output stays readable.
  return vi.spyOn(console, "error").mockImplementation(() => {});
}

describe("<ErrorBoundary />", () => {
  it("renders children normally when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <p>safe content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("safe content")).toBeInTheDocument();
  });

  it("renders the default fallback when a child throws", () => {
    silentConsoleError();
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/something went wrong/i);
    expect(alert).toHaveTextContent(/reload the page/i);
  });

  it("renders a custom fallback element when provided", () => {
    silentConsoleError();
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">oh no</div>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("custom-fallback")).toHaveTextContent("oh no");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("invokes a function fallback with the captured error", () => {
    silentConsoleError();
    render(
      <ErrorBoundary fallback={(err) => <div>caught: {err.message}</div>}>
        <Boom message="specific failure" />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/caught: specific failure/)).toBeInTheDocument();
  });

  it("isolates errors so siblings outside the boundary still render", () => {
    silentConsoleError();
    render(
      <div>
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
        <p data-testid="sibling">still here</p>
      </div>,
    );
    expect(screen.getByTestId("sibling")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
