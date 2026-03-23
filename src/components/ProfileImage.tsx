'use client';

import { useState } from 'react';

interface ProfileImageProps {
  name: string;
}

export default function ProfileImage({ name }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 text-white font-black text-6xl select-none">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile.png"
      alt={`${name} 강사 프로필 사진`}
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  );
}
