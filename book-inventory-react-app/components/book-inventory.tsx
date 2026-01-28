'use client';

import { useState } from 'react';
import { BookForm } from './book-form';
import { BookList } from './book-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishedDate: string;
  genre: string;
  description: string;
  createdAt: string;
}

export function BookInventory() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      publisher: 'Scribner',
      publishedDate: '1925-04-10',
      genre: 'Fiction',
      description:
        'A classic American novel set in the Jazz Age, exploring themes of love, wealth, and the American Dream.',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0061120084',
      publisher: 'J.B. Lippincott',
      publishedDate: '1960-07-11',
      genre: 'Fiction',
      description:
        'A gripping tale of racial injustice and childhood innocence in the American South.',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleAddBook = (newBook: Omit<Book, 'id' | 'createdAt'>) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBooks([...books, book]);
    setIsOpen(false);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleUpdateBook = (id: string, updatedBook: Omit<Book, 'id' | 'createdAt'>) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, ...updatedBook }
          : book
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Books</h2>
          <p className="text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <BookForm onSubmit={handleAddBook} />
          </DialogContent>
        </Dialog>
      </div>

      <BookList
        books={books}
        onDelete={handleDeleteBook}
        onUpdate={handleUpdateBook}
      />
    </div>
  );
}
