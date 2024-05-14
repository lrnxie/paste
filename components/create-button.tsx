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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CreateButton() {
  const createPaste = useMutation(api.pastes.create);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  function handleCreatePaste(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (content) {
      createPaste({ content, isPublic });

      setOpen(false);
      setContent('');
      setIsPublic(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ClipboardPlus className="text-zinc-700" />
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
          <div className="mt-3 flex items-center gap-x-2">
            <Checkbox
              id="public-checkbox"
              checked={isPublic}
              onCheckedChange={() => setIsPublic(!isPublic)}
            />
            <Label htmlFor="public-checkbox">Public</Label>
          </div>
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
