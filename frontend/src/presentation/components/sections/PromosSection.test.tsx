import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PromosSection } from './PromosSection';
import { formatDias } from './promoUtils';

describe('PromosSection', () => {
  it('renderiza el heading y la nota de pie', () => {
    render(<PromosSection />);
    expect(screen.getByRole('heading', { name: /Promociones de la Semana/i })).toBeInTheDocument();
    expect(screen.getByText(/Precios expresados en USD/i)).toBeInTheDocument();
  });

  it('solo renderiza promos activas', () => {
    render(<PromosSection />);
    expect(screen.getByText('Happy Hour Cocteles 2x1')).toBeInTheDocument();
    expect(screen.getByText('Cofre Popcorn Chicken 2x1')).toBeInTheDocument();
    expect(screen.getByText('Gamer Pack — Combo Absoluto')).toBeInTheDocument();
    expect(screen.getByText('Promo Burgers 2x1')).toBeInTheDocument();
  });

  it('muestra el precio formateado con dos decimales para promos con precioPromo', () => {
    render(<PromosSection />);
    expect(screen.getByText('$7.00')).toBeInTheDocument();
    expect(screen.getByText('$12.00')).toBeInTheDocument();
  });

  it('renderiza solo el número esperado de promos activas', () => {
    render(<PromosSection />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });

  it('muestra el horario cuando existe, y el rango de días derivado de los datos cuando no', () => {
    render(<PromosSection />);
    expect(screen.getByText('16:00 – 19:00')).toBeInTheDocument();
    expect(screen.getByText('Dom – Jue')).toBeInTheDocument();
    expect(screen.queryByText('Lun – Jue')).not.toBeInTheDocument();
  });

  it('ticker es decorativo (aria-hidden) y no expone role marquee inválido', () => {
    render(<PromosSection />);
    const ticker = document.querySelector('.ticker-container');
    expect(ticker).not.toBeNull();
    expect(ticker?.getAttribute('role')).toBeNull();
    expect(ticker?.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('formatDias', () => {
  it('devuelve rango abreviado para 4+ días consecutivos en orden semanal', () => {
    expect(formatDias(['Lunes', 'Martes', 'Miercoles', 'Jueves'])).toBe('Lun – Jue');
  });

  it('devuelve rango abreviado arrancando en Domingo', () => {
    expect(formatDias(['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves'])).toBe('Dom – Jue');
  });

  it('devuelve rango abreviado para una secuencia semanal completa', () => {
    expect(formatDias(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'])).toBe('Lun – Sab');
  });

  it('une con comas cuando hay menos de 4 días', () => {
    expect(formatDias(['Lunes', 'Viernes'])).toBe('Lunes, Viernes');
  });

  it('une con comas cuando los días no son consecutivos', () => {
    expect(formatDias(['Lunes', 'Miercoles', 'Viernes', 'Domingo'])).toBe('Lunes, Miercoles, Viernes, Domingo');
  });

  it('devuelve string vacío para array vacío', () => {
    expect(formatDias([])).toBe('');
  });

  it('no rompe con días no reconocidos', () => {
    expect(formatDias(['Finde', 'Otro'])).toBe('Finde, Otro');
  });
});