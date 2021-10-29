import { Animal, APIAnimal } from '@/@types/Animals';
import { convertAPIAnimalToAnimal } from '@/utils/converters';

const animalsFromApi: APIAnimal[] = [
  {
    id: '8880a8d5-c158-47e6-a3a8-2f0f6ed827f3',
    name: 'twister',
    type: 'cat',
    size: 'P',
    gender: 'M',
    pictureUrl:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0fHx8fHx8MTYzMjkxNjQ3Nw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    id: '1cafbb52-c964-4e24-af09-46cc988a93b8',
    name: 'dudu',
    type: 'dog',
    size: 'P',
    gender: 'M',
    pictureUrl:
      'https://images.unsplash.com/photo-1583511666372-62fc211f8377?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9nfHx8fHx8MTYzMjkxNjIwMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=450',
  },
];

export const mockAnimals: Animal[] = animalsFromApi.map((apiAnimal) =>
  convertAPIAnimalToAnimal(apiAnimal)
);
