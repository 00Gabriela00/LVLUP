const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const ABREVIATURAS: Record<string, string> = {
  Domingo: 'Dom',
  Lunes: 'Lun',
  Martes: 'Mar',
  Miercoles: 'Mie',
  Jueves: 'Jue',
  Viernes: 'Vie',
  Sabado: 'Sab',
};

export function formatDias(dias: string[]): string {
  if (dias.length === 0) return '';

  const indices = dias.map((d) => DIAS_SEMANA.indexOf(d));
  const enOrdenSemanal = indices.every((i, pos) => pos === 0 || i === indices[pos - 1] + 1);

  if (dias.length >= 4 && enOrdenSemanal && indices[0] !== -1) {
    const primero = dias[0];
    const ultimo = dias[dias.length - 1];
    return `${ABREVIATURAS[primero] ?? primero} – ${ABREVIATURAS[ultimo] ?? ultimo}`;
  }
  return dias.join(', ');
}