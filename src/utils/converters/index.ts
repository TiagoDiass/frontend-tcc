import { Animal, APIAnimal } from '@/@types/Animals';

export const convertAPIAnimalToAnimal = (apiAnimal: APIAnimal): Animal => {
  const types = {
    dog: 'Cão',
    cat: 'Gato',
  } as const;

  const genders = {
    M: 'Macho',
    F: 'Femêa',
  } as const;

  const sizes = {
    G: 'Grande',
    M: 'Médio',
    P: 'Pequeno',
  } as const;

  return {
    id: apiAnimal.id,
    name: apiAnimal.name,
    pictureUrl: apiAnimal.pictureUrl,
    type: types[apiAnimal.type],
    gender: genders[apiAnimal.gender],
    size: sizes[apiAnimal.size],
  };
};
