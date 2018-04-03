import React from 'react';

const Close = ({ svgRef, ...props }) => (
  <svg viewBox="0 0 88 88" {...props} ref={svgRef}>
    <title>Dismiss</title>
    <g stroke="#063855" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="square">
      <path d="M51 37L37 51M51 51L37 37" />
    </g>
  </svg>
);

export default Close;
