"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={() => this.setState({ hasError: false, error: undefined })} 
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="max-w-6xl mx-auto w-full mt-6 mb-4">
      <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-between" role="alert">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="block sm:inline">No pudimos cargar las cotizaciones.</span>
        </div>
        <button
          onClick={reset}
          className="bg-red-200 hover:bg-red-300 text-red-800 text-xs font-bold py-1 px-2 rounded-full transition-colors duration-200 flex-shrink-0"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
