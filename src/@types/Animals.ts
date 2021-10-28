export type APIAnimal = {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  size: 'G' | 'M' | 'P';
  gender: 'M' | 'F';
  pictureUrl?: string;
};

export type Animal = {
  id: string;
  name: string;
  type: 'Cão' | 'Gato';
  size: 'Grande' | 'Médio' | 'Pequeno';
  gender: 'Macho' | 'Femêa';
  pictureUrl?: string;
};
