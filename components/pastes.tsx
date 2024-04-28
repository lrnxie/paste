'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CopyButton from '@/components/copy-button';
import DeleteButton from '@/components/delete-button';

export default function Pastes() {
  const pastes = useQuery(api.pastes.getAll);

  if (!pastes) {
    return <div className="pt-10 text-center text-gray-500">Loading...</div>;
  }

  if (pastes.length === 0) {
    return <div className="pt-10 text-center text-gray-500">No pastes</div>;
  }

  return (
    <div className="space-y-4">
      {pastes.map(({ _id, content }) => (
        <Card key={_id}>
          <CardHeader className="px-3 py-2">
            <div className="flex items-center justify-end gap-x-2 text-sm text-zinc-500 dark:text-zinc-400">
              <CopyButton value={content} />
              <DeleteButton id={_id} />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <p>{content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
