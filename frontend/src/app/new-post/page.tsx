'use client';

import dynamic from 'next/dynamic';
import withAuth from '../hoc/withAuth';

// Dynamically import TextEditor, disabling SSR
const TextEditor = dynamic(() => import('@/app/components/TextEditor'), { 
  ssr: false 
});

function CreatePost() {
  return (
    <div>
      <TextEditor />
    </div>
  );
}

export default withAuth(CreatePost);