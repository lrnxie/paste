'use client';

import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CopyButton from '@/components/copy-button';
import DeleteButton from '@/components/delete-button';

export default function Pastes() {
  const { isLoading } = useConvexAuth();
  const { user } = useUser();
  const pastes = useQuery(api.pastes.getAll);

  if (isLoading || !pastes) {
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
              {user?.publicMetadata.admin ? <DeleteButton id={_id} /> : null}
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
