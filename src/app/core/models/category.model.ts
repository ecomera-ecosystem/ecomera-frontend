export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  parentId: string | null;
  isActive: boolean;
  displayOrder: number;
}
