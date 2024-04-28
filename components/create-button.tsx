'use client';

import { FormEvent, useState } from 'react';
import { useMutation } from 'convex/react';
import { ClipboardPlus } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CreateButton() {
  const createPaste = useMutation(api.pastes.create);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  function handleCreatePaste(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createPaste({ content });

    setOpen(false);
    setContent('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ClipboardPlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new paste</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreatePaste} id="create-paste">
          <Textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
        <DialogFooter>
          <Button type="submit" form="create-paste">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
