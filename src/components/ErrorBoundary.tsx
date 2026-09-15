import { Component } from 'react'
import type { ReactNode } from 'react'
export default class ErrorBoundary extends Component<{ children: ReactNode },{ failed: boolean }> {
  state={failed:false}
  static getDerivedStateFromError() { return {failed:true} }
  render() { return this.state.failed ? <div className="container section-space"><h1>A connection needs refreshing.</h1><p>The page couldn’t finish loading. Please reload to try again.</p><button className="button button-dark" onClick={() => window.location.reload()}>Reload page</button></div> : this.props.children }
}
