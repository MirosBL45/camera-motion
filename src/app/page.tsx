export default function Home() {
  return (
    <main className="flex flex-col gap-2 p-8">
      {/* TODO(feature 02+): privremen test element za fontove, uklanja se kad stigne prava početna */}
      <h1 className="font-(family-name:--font-heading) text-4xl font-semibold">
        Camera motion — Šampinjoni, žeđ, čačkalica
      </h1>
      <p className="font-(family-name:--font-body)">
        Snimanje dronom i kamerom — đurđevak, ćevapčići, ovčar i planinar.
      </p>
    </main>
  );
}
