import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCMatchUser } from "../index";
import { SignUpRepository } from "../../interactor/repository";

@injectable()
export default class UCMatchUserImpl implements UCMatchUser {
  private signUpRepository: SignUpRepository;

  constructor(
    @inject("SignUpRepository")
    signUpRepository: SignUpRepository
  ) {
    this.signUpRepository = signUpRepository;
  }

  execute(logInData: Entity.User): Promise<Entity.User> {
    return this.signUpRepository.matchUser(logInData);
  }
}
