import * as React from "react"

export { ErrorBoundary } from "react-error-boundary"

export function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: (...args: unknown[]) => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
