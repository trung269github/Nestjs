import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Profile } from 'src/typeorm/entities/Profile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }

  createUsers(userDetails: CreateUserParams) {
    const user = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
      
    });
    return this.userRepository.save(user);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams){
    this.userRepository.update({id},{ ...updateUserDetails});
  }

  deleteUser(id: number){
    return this.userRepository.delete(id);
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  findByUsername(username: string): Promise<User>{
    return this.userRepository.findOneBy({username});
  }

  async validateUser(username: string, password: string){
    const user = await this.userRepository.findOneBy({ username });

    if (!user || user.password !== password) { 
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
