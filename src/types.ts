export type Guest = {
  first_name: string;
  last_name: string;
  phone: string;
  guests: { name: string }[];
  gluten_free: number;
  vegan: number;
  coming: string;
  not_coming?: string;
};
