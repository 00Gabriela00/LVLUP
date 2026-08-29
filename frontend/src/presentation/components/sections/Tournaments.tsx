import { useTournaments } from '../../../application/hooks/useTournaments';

// Static closed tournaments shown as additional cards
const CLOSED_TOURNAMENTS = [
  {
    id: 'static-1',
    title: 'Mortal Kombat Duals',
    date: '2026-10-28T17:00:00Z',
    prizePool: '$350 USD',
    status: 'Finalizado' as const,
    imageUrl: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&q=80',
  },
  {
    id: 'static-2',
    title: 'FIFA 24 Kickoff Cup',
    date: '2026-11-05T14:00:00Z',
    prizePool: '$400 USD',
    status: 'Inscripci\u00f3n Abierta' as const,
    imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80',
  },
];

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }) + ' - ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

type TournamentStatus = 'Inscripci\u00f3n Abierta' | 'En Curso' | 'Finalizado';

function StatusBadge({ status }: { status: TournamentStatus }) {
  const isClosed = status === 'Finalizado';
  return (
    <span
      className={`text-[9px] uppercase border px-2 py-0.5 rounded font-mono ${
        isClosed
          ? 'border-brand-gray text-brand-gray'
          : 'border-brand-pink text-brand-pink'
      }`}
    >
      {isClosed ? 'Cerrado' : 'Registro Abierto'}
    </span>
  );
}

export function Tournaments() {
  const { tournaments, loading } = useTournaments();

  if (loading) return null;

  const allTournaments = [
    ...tournaments.map((t) => ({ ...t, isStatic: false })),
    ...CLOSED_TOURNAMENTS.map((t) => ({ ...t, isStatic: true })),
  ];

  return (
    <section id="torneos" className="relative">
      <div className="absolute bottom-0 left-1/4 w-150 h-75 bg-brand-pink rounded-full blur-[120px] opacity-10 -z-10 pointer-events-none"></div>

      <div className="mb-10">
        <p className="text-brand-pink text-xs font-bold uppercase tracking-widest mb-2">Torneos</p>
        <h2 className="text-3xl font-bold uppercase section-title-deco section-title-deco-pink tracking-widest">
          Reclama Tu Gloria
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {allTournaments.map((tournament) => {
          const isClosed = tournament.status === 'Finalizado';
          return (
            <div
              key={tournament.id}
              className={`glass-card p-4 flex gap-4 items-center ${
                isClosed ? 'opacity-75' : ''
              }`}
            >
              <img
                src={tournament.imageUrl}
                alt={tournament.title}
                className={`w-24 h-24 object-cover rounded-lg shrink-0 ${
                  isClosed ? 'grayscale' : ''
                }`}
              />
              <div className="grow">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-brand-cyan text-[10px] font-bold">
                    {formatDate(tournament.date)}
                  </span>
                  <StatusBadge status={tournament.status} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${ isClosed ? 'text-gray-400' : 'text-white' }`}>
                  {tournament.title}
                </h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-brand-gray uppercase">Bolsa de Premios</p>
                    <p className={`font-bold font-mono ${ isClosed ? 'text-yellow-600' : 'text-yellow-400' }`}>
                      {tournament.prizePool}
                    </p>
                  </div>
                  {isClosed ? (
                    <button
                      disabled
                      className="bg-transparent border border-brand-gray text-brand-gray px-4 py-1.5 rounded text-xs font-bold uppercase cursor-not-allowed"
                    >
                      Inscribirse
                    </button>
                  ) : (
                    <button className="bg-white text-black px-4 py-1.5 rounded text-xs font-bold uppercase hover:bg-gray-200 transition-colors">
                      Inscribirse
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
