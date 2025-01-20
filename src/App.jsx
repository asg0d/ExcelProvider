import React, { Suspense } from "react";
import "./Style/Style.css";
import TableRight from "./components/TableRight";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log('App rendering...');
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <TableRight />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
