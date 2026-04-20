import { v4 as uuid } from 'uuid';
import { type Contact, ContactStatus } from '@t/contact';

const firstNames = [
    'Alexander', 'Maria', 'Ivan', 'Anna', 'Dmitry', 'Sophia', 'Maxim', 'Olena', 'Artem', 'Ekaterina',
    'Vladislav', 'Julia', 'Bogdan', 'Natalia', 'Sergey', 'Victoria', 'Andrey', 'Tatyana', 'Nikolay', 'Irina',
    'Pavel', 'Lyudmila', 'Roman', 'Oksana', 'Vasily', 'Galina', 'Denis', 'Larisa', 'Evgeny', 'Zoya',
    'Taras', 'Valentina', 'Igor', 'Nadezhda', 'Yuri', 'Svetlana', 'Oleg', 'Alla', 'Mikhail', 'Lina',
    'Peter', 'Kristina', 'Ruslan', 'Polina', 'Fedor', 'Ulyana', 'Zakhar', 'Darina', 'Anton', 'Zhanna',
];

const lastNames = [
    'Shevchenko', 'Kovalenko', 'Bondarenko', 'Tkachenko', 'Kravchenko', 'Melnik', 'Savchenko', 'Levchenko', 'Petrenko', 'Goncharenko',
    'Ivanenko', 'Marchenko', 'Polishchuk', 'Lysenko', 'Romanenko', 'Sidorenko', 'Kharchenko', 'Oliynyk', 'Pavlenko', 'Koval',
    'Kirilenko', 'Nazarenko', 'Ostapenko', 'Prikhodko', 'Rudenko', 'Timchenko', 'Vasilenko', 'Antonenko', 'Dyachenko', 'Zakharenko',
    'Yevtushenko', 'Gnatenko', 'Vlasenko', 'Naumenko', 'Udovenko', 'Fedorenko', 'Chernenko', 'Yatsenko', 'Musienko', 'Batig',
    'Stets', 'Ponomarenko', 'Dmitrenko', 'Ilchenko', 'Vovk', 'Moroz', 'Litvin', 'Gorobets', 'Khomenko', 'Zinchenko',
];

const cities = ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Dnipro'];
const streets = ['Shevchenko', 'Franko', 'Hrushevsky', 'Lesya Ukrainka', 'Soborna'];

const notesSamples = [
    'Regular client',
    'Needs a callback',
    'Interested in cooperation',
    'VIP client',
    'Send proposal',
    '',
];

export const mockContacts: Contact[] = Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];

    const city = cities[i % cities.length];
    const street = streets[i % streets.length];
    const building = Math.floor(Math.random() * 100) + 1;

    return {
        id: uuid(),
        firstName,
        lastName,
        phone: `+380${Math.floor(500000000 + Math.random() * 500000000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        address: `city ${city}, street ${street}, building ${building}`,
        notes: notesSamples[i % notesSamples.length],
        status: i > 2 ? ContactStatus.Active : ContactStatus.Deleted,
    };
});