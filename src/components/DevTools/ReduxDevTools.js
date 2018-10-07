import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

// createDevTools takes a monitor and produces a DevTools component
const ReduxDevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    {/* <LogMonitor theme="tomorrow" /> */}
    <Inspector theme="tomorrow" invertTheme />
  </DockMonitor>,
);

export default ReduxDevTools;
