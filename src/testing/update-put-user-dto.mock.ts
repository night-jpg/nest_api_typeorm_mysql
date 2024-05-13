import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDTO = {
  name: 'Muller',
  email: 'muller@gmail.com',
  birthDay: '1998-10-01',
  role: Role.Admin,
  password: '$2b$10$zl8ifQLpe/xIKvVl5tmKP.q6n.oA1Gzx5TD5.xMNLMvxZVFrIcZD6',
};
