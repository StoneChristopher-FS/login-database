const connect = async () => {
    console.log('Mock Connecting...');
}

const saveUser = async (user) => {
    console.log('Mock User');
    return Promise.resolve({
        firstName: 'Christopher',
        lastName: 'Stone',
        email: 'cstone@hostingsite.com',
        password: 'password123',
        address: '1567 Tester Ln',
        city: 'Testtown',
        state: 'NC',
        zipcode: '12345'
    });
}

const findUser = async (email) => {
    console.log('Found Mock User');
    return Promise.resolve({
        email: 'cstone@hostingsite.com',
        firstName: 'Christopher',
        lastName: 'Stone'
    })
}

const disconnect = async () => {
    console.log('Mock Disconnecting...');
}

module.exports = { connect, findUser, saveUser, disconnect }