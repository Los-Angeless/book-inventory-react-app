'use client';

import { useState } from 'react';
import { Book } from './book-inventory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookForm } from './book-form';
import { Trash2, Edit2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onUpdate: (id: string, book: Omit<Book, 'id' | 'createdAt'>) => void;
}

export function BookCard({ book, onDelete, onUpdate }: BookCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (updatedBook: Omit<Book, 'id' | 'createdAt'>) => {
    onUpdate(book.id, updatedBook);
    setIsEditOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
            <CardDescription className="mt-1">{book.author}</CardDescription>
          </div>
          <Badge variant="secondary">{book.genre}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">ISBN</p>
          <p className="font-mono text-sm">{book.isbn}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground">Publisher</p>
          <p className="text-sm">{book.publisher}</p>
        </div>

        {book.publishedDate && (
          <div>
            <p className="text-xs font-medium text-muted-foreground">Published</p>
            <p className="text-sm">{formatDate(book.publishedDate)}</p>
          </div>
        )}

        {book.description && (
          <div>
            <p className="text-xs font-medium text-muted-foreground">Description</p>
            <p className="line-clamp-3 text-sm text-foreground">{book.description}</p>
          </div>
        )}
      </CardContent>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
              </DialogHeader>
              <BookForm
                onSubmit={handleEdit}
                initialData={{
                  title: book.title,
                  author: book.author,
                  isbn: book.isbn,
                  publisher: book.publisher,
                  publishedDate: book.publishedDate,
                  genre: book.genre,
                  description: book.description,
                }}
              />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(book.id)}
            className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
