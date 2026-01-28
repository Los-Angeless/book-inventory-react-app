'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book } from './book-inventory';

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Education',
  'Other',
];

interface BookFormProps {
  onSubmit: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  initialData?: Omit<Book, 'id' | 'createdAt'>;
}

export function BookForm({ onSubmit, initialData }: BookFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publishedDate: '',
      genre: '',
      description: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required';
    }
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        publishedDate: '',
        genre: '',
        description: '',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: value,
    }));
    if (errors.genre) {
      setErrors((prev) => ({
        ...prev,
        genre: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author *</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          className={errors.author ? 'border-red-500' : ''}
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="isbn">ISBN *</Label>
        <Input
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="e.g., 978-0-123456-78-9"
          className={errors.isbn ? 'border-red-500' : ''}
        />
        {errors.isbn && (
          <p className="text-sm text-red-500">{errors.isbn}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publisher">Publisher *</Label>
        <Input
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Enter publisher name"
          className={errors.publisher ? 'border-red-500' : ''}
        />
        {errors.publisher && (
          <p className="text-sm text-red-500">{errors.publisher}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedDate">Published Date</Label>
        <Input
          id="publishedDate"
          name="publishedDate"
          type="date"
          value={formData.publishedDate}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">Genre *</Label>
        <Select value={formData.genre} onValueChange={handleGenreChange}>
          <SelectTrigger className={errors.genre ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.genre && (
          <p className="text-sm text-red-500">{errors.genre}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter book description"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? 'Update Book' : 'Add Book'}
      </Button>
    </form>
  );
}
