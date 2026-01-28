'use client';

import { useState } from 'react';
import { BookInventory } from '@/components/book-inventory';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BookInventory />
    </main>
  );
}
