export type BuiltInShelf = 'want-to-read' | 'currently-reading' | 'read'
export type ShelfType = BuiltInShelf | (string & {})
export interface CustomShelf { id: string; name: string }
export interface Book { id: string; title: string; authors: string[]; isbn?: string; coverUrl: string; description: string; publishedYear?: number; pageCount: number; genres: string[]; averageRating?: number }
export interface UserBook { book: Book; shelf: ShelfType; isFavorite: boolean; currentPage: number; userRating?: number; notes: string; addedAt: string; finishedAt?: string }
export interface ReadingGoal { year: number; targetBooks: number }
export interface OpenLibrarySearchDoc { key: string; title: string; author_name?: string[]; first_publish_year?: number; cover_i?: number; isbn?: string[]; number_of_pages_median?: number; subject?: string[]; ratings_average?: number }
export interface OpenLibraryWork { title?: string; description?: string | { value: string }; subjects?: string[]; covers?: number[]; authors?: { author?: { key?: string } }[] }
