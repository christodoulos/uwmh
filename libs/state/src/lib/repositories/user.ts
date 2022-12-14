import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { UserDTO } from '../interfaces';

const user = createStore(
  { name: 'user' },
  withProps<UserDTO>({
    email: '',
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    provider: '',
    providerId: '',
    claims: [],
  })
);

@Injectable()
export class UserRepository {
  name$ = user.pipe(select((state) => state.name));
  email$ = user.pipe(select((state) => state.email));
  picture$ = user.pipe(select((state) => state.picture));
  eydap$ = user.pipe(select((state) => state.claims?.includes('eydap')));
  isLoggedIn$ = user.pipe(select((state) => (state.email ? true : false)));

  updateUser(data: UserDTO) {
    user.update(() => ({ ...data }));
  }
}
