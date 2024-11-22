export type RootStackParamList = {
    Home: { menu: Menu[] };
    AddRecipe: undefined;
  };
 
  // RootStackParams.ts

export interface Menu {
  dish: string;
  description: string;
  price: string;
  course: 'Starter' | 'Main' | 'Dessert'; // Make it match the local type
}

  