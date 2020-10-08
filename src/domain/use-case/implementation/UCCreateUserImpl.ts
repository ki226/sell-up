import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCCreateUser } from "../index";
import { SignUpRepository } from "../../interactor/repository";

@injectable()
export default class UCCreateUserImpl implements UCCreateUser {
  private signUpRepository: SignUpRepository;

  constructor(
    @inject("SignUpRepository")
    signUpRepository: SignUpRepository
  ) {
    this.signUpRepository = signUpRepository;
  }

  execute(userData: Entity.User): Promise<Entity.User> {
    return this.signUpRepository.createUser(userData);
  }
}
