import { useGames } from '../../../application/hooks/useGames';

export function GamesCatalog() {
  const { games, loading } = useGames();

  if (loading) {
    return <div className="text-center text-brand-cyan py-20">Cargando equipamiento...</div>;
  }

  return (
    <section id="games" className="relative">
      <div className="absolute top-1/2 left-[-10%] w-125 h-125 bg-brand-cyan rounded-full blur-[100px] opacity-10 -z-10 pointer-events-none"></div>

      <div className="mb-10">
        <p className="text-brand-cyan text-xs font-bold uppercase tracking-widest mb-2">Catálogo de Juegos</p>
        <h2 className="text-3xl font-bold uppercase section-title-deco tracking-widest">Equipamiento de Combate</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {games.map((game) => (
          <div key={game.id} className="glass-card p-4">
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase font-bold text-brand-gray border border-brand-gray/30 px-2 py-1 rounded">
                {game.platform}
              </span>
              {game.isAvailable ? (
                <div className="flex items-center gap-1 text-[10px] text-green-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Disponible
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[10px] text-red-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Ocupado
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg text-white">{game.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
