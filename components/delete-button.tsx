import { useMutation } from 'convex/react';
import { Trash2 } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

export default function DeleteButton({ id }: { id: Id<'pastes'> }) {
  const remove = useMutation(api.pastes.remove);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => remove({ id })}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
