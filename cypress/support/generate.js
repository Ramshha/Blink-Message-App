import { v4 as uuid } from 'uuid';

const buildUser = () => {
    const [uid] = uuid().split('-')
    return {
        fullName: `Test User ${uid}`,
        email: `test-user-${uid}@test.com`,
        location: 'Test Location',
        password: uid
    }
}

export {buildUser}