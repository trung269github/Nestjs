import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../users.module';
import { INestApplication } from '@nestjs/common';

describe('UsersController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)  
      .expect([
        { id: 1, username: 'trung' }, 
      ]);
  });

  it('should create a user', () => {
    const createUserDto = { username: 'alonso', email: 'alonso@gmail.com' };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201) 
      .expect({ message: 'User created successfully' }); 
  });

  it('should update a user by id', () => {
    const updateUserDto = { name: 'Updated Name' };
    const id = 1;

    return request(app.getHttpServer())
      .put(`/users/${id}`)
      .send(updateUserDto)
      .expect(200) 
      .expect({ message: 'User updated successfully' }); 
  });

  it('should delete a user by id', () => {
    const id = 1;

    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .expect(200) 
      .expect({ message: 'User deleted successfully' }); 
  });


  afterAll(async () => {
    await app.close();
  });
});
