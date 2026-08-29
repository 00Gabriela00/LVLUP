export interface Tournament {
  id: string;
  title: string;
  gameTitle: string;
  date: string; // ISO string
  prizePool: string;
  imageUrl: string;
  status: 'Inscripción Abierta' | 'En Curso' | 'Finalizado';
}
