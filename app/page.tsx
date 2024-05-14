import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateButton from '@/components/create-button';
import Pastes from '@/components/pastes';

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <header className="flex items-center justify-between p-2">
        <h1 className="text-xl font-bold">Paste</h1>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="icon">
              <LogIn className="text-zinc-700" />
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-x-2">
            {user?.publicMetadata.admin ? <CreateButton /> : null}
            <UserButton />
          </div>
        </SignedIn>
      </header>

      <main className="px-2 py-4">
        <Pastes />
      </main>
    </>
  );
}
