import {Injectable} from '@angular/core';
import {USERS} from './mock-users';

@Injectable()
export class UserService {
    getUsers() {
        return Promise.resolve(USERS);
    }

    getUserByEmailOrPhone(email: string, phone: number) {
        return Promise.resolve(this.getUsers().then(users => {
            let user = null;

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email || users[i].phone === phone) {
                    user = users[i];
                    break;
                }
            }

            return user;
        }));
    }
}
