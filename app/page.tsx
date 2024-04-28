import CreateButton from '@/components/create-button';
import Pastes from '@/components/pastes';

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-2">
        <h1 className="text-xl font-bold">Paste</h1>
        <div className="space-x-2">
          <CreateButton />
        </div>
      </header>

      <main className="px-2 py-4">
        <Pastes />
      </main>
    </>
  );
}
