export enum Role {
  Admin = 'admin',
  Moderator = 'moder',
  User = 'user',
}

import { registerEnumType } from '@nestjs/graphql';

registerEnumType(Role, {
  name: 'Role',
  description: 'All possible roles',
});
