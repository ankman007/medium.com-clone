'use client';

import dynamic from 'next/dynamic';

// Dynamically import TextEditor, disabling SSR
const TextEditor = dynamic(() => import('@/app/components/TextEditor'), { 
  ssr: false 
});

export default function Page() {
  return (
    <div>
      <TextEditor />
    </div>
  );
}
