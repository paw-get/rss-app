import { useState } from 'react';

export default function useLoading() {
  const [loading, setLoading] = useState({ active: false, msg: '' });

  const start = (msg) => setLoading({ active: true, msg });
  const stop = () => setLoading({ active: false, msg: '' });

  return [loading, { start, stop }];
}
