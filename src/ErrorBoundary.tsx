import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Filter out the specific defaultProps warning
    if (!error.message.includes('defaultProps')) {
      console.error(error, errorInfo);
    }
  }

  render() {
    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
