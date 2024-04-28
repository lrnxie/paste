'use client';

import { useEffect, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CopyButton({ value }: { value: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setHasCopied(true);
      }}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="size-4 text-emerald-400" />
      ) : (
        <Clipboard className="size-4" />
      )}
    </Button>
  );
}
