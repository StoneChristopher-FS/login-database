const { connect, saveUser, disconnect, findUser } = require('./db');
const User = require('../api/model/user');
const mongoose = require('mongoose');

jest.mock('./db');

describe('Database Functions', () => {-
    test('save user', async () => {
        const newUser = User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Christopher',
            lastName: 'Stone',
            email: 'cstone@hostingsite.com',
            password: 'password123',
            address: '1567 Tester Ln',
            city: 'Testtown',
            state: 'NC',
            zipcode: '12345'
        });

        await connect();
        const user = await saveUser(newUser);

        expect(user.firstName).toEqual('Christopher');
        expect(user.lastName).toEqual('Stone');
        expect(user.email).toEqual('cstone@hostingsite.com');
        expect(user.address).toEqual('1567 Tester Ln');
        expect(user.city).toEqual('Testtown');
        expect(user.state).toEqual('NC');
        expect(user.zipcode).toEqual('12345');
        
        await disconnect();
    })

    test('find user', async () => {
        const email = 'cstone@hostingsite.com';

        await connect();

        const login = await findUser(email)

        expect(login.email).toEqual('cstone@hostingsite.com');
        expect(login.firstName).toEqual('Christopher');
        expect(login.lastName).toEqual('Stone');

        await disconnect();
    })
});