import { Animal, APIAnimal } from '@/@types/Animals';

/**
 * It converts an APIAnimal to an Animal
 */
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

/**
 * It converts an array of APIAnimals to an array of Animals
 */
export const convertAPIAnimalsToAnimals = (
  apiAnimals: APIAnimal[]
): Animal[] => {
  return apiAnimals.map(convertAPIAnimalToAnimal);
};
