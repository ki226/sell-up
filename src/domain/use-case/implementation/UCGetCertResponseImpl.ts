import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetCertResponse } from "../index";
import { CertResponseRepository } from "../../interactor/repository";

@injectable()
export default class UCGetCertResponseImpl implements UCGetCertResponse {
  private certResponseRepository: CertResponseRepository;

  constructor(
    @inject("CertResponseRepository")
    certResponseRepository: CertResponseRepository
  ) {
    this.certResponseRepository = certResponseRepository;
  }

  execute(): Promise<Entity.CertResponse> {
    return this.certResponseRepository.getCertResponse();
  }
}
