import { CertResponseRepository } from "../../../domain/interactor/repository";
import * as Entity from "../../../domain/entity";
import { injectable } from "inversify";

@injectable()
export default class MockCertResponseRepository
  implements CertResponseRepository {
  getCertResponse(): Promise<Entity.CertResponse> {
    return Promise.resolve({
      cipherTime: "15020305", // 압축하는데 필요한 시간 (optional)
      requestNumber: "00100", // 요청번호 (optional)
      responseNumber: "00101", // 응답번호 (optional)
      authType: "DIRECT", // 인증타입 (optional)
      dupInfo: "111222333444555666", // 글로벌 중복체크해시값 (required)
      connInfo: "666555444333222111", // 시스템 중복체크해시값 (optional)
      name: "김사입",
      birthDate: "900108",
      gender: "male",
      nationalInfo: "kr",
      mobileNo: "01012345678",
      mobileCo: "SKT",
    });
  }
}
