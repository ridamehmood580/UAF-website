'use client';

import React from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

export default function LayerOrderPanel({ selected, onMove }) {
  return (
    <div className="inspector-card">
      <div className="section-label">Layer order</div>
      <p className="helper-note">Choose an object below, then change whether it appears in front of or behind overlapping objects.</p>
      <div className="layer-order-actions">
        <button type="button" disabled={!!selected.fixed} onClick={() => onMove('front')} title="Bring to front" aria-label="Bring to front"><ChevronsUp size={16}/><span>Front</span></button>
        <button type="button" disabled={!!selected.fixed} onClick={() => onMove('back')} title="Send to back" aria-label="Send to back"><ChevronsDown size={16}/><span>Back</span></button>
      </div>
    </div>
  );
}
