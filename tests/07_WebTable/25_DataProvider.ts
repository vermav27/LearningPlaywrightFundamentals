import { faker } from '@faker-js/faker';

export let data = {
    //fake name
    fake_firstName: faker.person.firstName(),
    fake_middleName: faker.person.middleName(),
    fake_lastName: faker.person.lastName(),
    fake_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
}