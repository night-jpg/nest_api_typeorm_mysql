import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositoryMock } from '../testing/user-repository.mock';
import { CreateUserDTO } from './dto/create.user.dto';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDto } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDto } from '../testing/update-patch-user-dto.mock';

let userService: UserService;
let userRepository: Repository<UserEntity>;

describe('UserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const data: CreateUserDTO = createUserDTO;

      const result = await userService.create(data);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.list();

      expect(result).toEqual(userEntityList);
    });

    test('method show', async () => {
      const result = await userService.show(2);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(2, updatePutUserDto);

      expect(result).toEqual(userEntityList[0]);
    });

    test('method patch', async () => {
      const result = await userService.patch(2, updatePatchUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(2);
      expect(result).toEqual(userEntityList[0]);
    });
  });
});
