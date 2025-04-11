'use client';

import dynamic from 'next/dynamic';
import withAuth from '@/app/hoc/withAuth';

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