import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
   state = { hasError: true };
   errorDetails = {}
   static getDerivedStateFromError(error) {
      return { hasError: true };
   }

   componentDidCatch(error, info) {
      console.log(error, info)
   }

   render() {
      if (this.state.hasError) {
         return this.props.fallback;
      }
      return this.props.children;
   }
}
