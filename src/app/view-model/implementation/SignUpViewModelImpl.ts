import { inject, injectable } from "inversify";
import { SignUpViewModel } from "../index";
import { UCCreateUser, UCGetCertResponse } from "../../../domain/use-case";
import { User, CertResponse } from "../../../domain/entity";

@injectable()
export default class SignUpViewModelImpl implements SignUpViewModel {
  private ucGetCertResponse: UCGetCertResponse;
  private ucCreateUser: UCCreateUser;

  constructor(
    @inject("UCGetCertResponse") ucGetCertResponse: UCGetCertResponse,
    @inject("UCCreateUser") ucCreateUser: UCCreateUser
  ) {
    this.ucGetCertResponse = ucGetCertResponse;
    this.ucCreateUser = ucCreateUser;
  }

  getCertResponse(): Promise<CertResponse> {
    return this.ucGetCertResponse.execute();
  }
  createUser(userData: User): Promise<User> {
    return this.ucCreateUser.execute(userData);
  }
}
