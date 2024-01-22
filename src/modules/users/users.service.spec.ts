import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateUserService } from './services/createUserService.service';

type PrismaMock = {
  user: {
    create: jest.Mock;
    findUnique: jest.Mock;
  };
};

const prismaMock: PrismaMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  beforeEach(() => {
    prismaMock.user.create.mockReset();
  });

  it('should create a user', async () => {
    const input = {
      name: 'Teste de criação',
      email: 'test@example.com',
      password: 'securepassword',
      profile: 'A',
    };
    const expectedUser = { id: 1, ...input, password: undefined };

    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(expectedUser);

    const user = await service.create(input);
    expect(user).toEqual(expectedUser);
  });
});
