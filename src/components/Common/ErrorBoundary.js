import { Component } from "react";
import styled from "styled-components";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <Error>
          <h1>Something went wrong.</h1>
        </Error>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const Error = styled.main`
  position: absolute;
  left: 40%;
`;
