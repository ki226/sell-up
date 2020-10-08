export interface CertResponse {
  cipherTime: string; // 압축하는데 필요한 시간 (optional)
  requestNumber: string; // 요청번호 (optional)
  responseNumber: string; // 응답번호 (optional)
  authType: string; // 인증타입 (optional)
  dupInfo: string; // 글로벌 중복체크해시값 (required)
  connInfo: string; // 시스템 중복체크해시값 (optional)
  name: string;
  birthDate: string;
  gender: string;
  nationalInfo: string;
  mobileNo: string;
  mobileCo: string;
}

export interface User {
  nameInput?: string;
  emailInput: string;
  passwordInput: string;
}

export interface Building {
  id: string;
  displayName: string;
  fullName: string;
  simpleName: string;
}

export interface Floor {
  buildingId: string;
  name: string;
  ordinal: number;
}

export interface Order {
  id: string;
  retailerId: string;
  date: string;
  createdAt?: number | null;
  createdBy?: string | null;
  sent?: boolean | null;
  sentAt?: number | null;
  type?: "REQUESTED" | "IMPORTED";
}

export interface Retailer {
  id: string;
  name: string;
  format: OrderFormat;
  status: number;
}

export interface OrderFormat {
  id: number;
  formatItems: OrderFormatItem[];
}

export interface OrderFormatItem {
  id?: number;
  name: string;
  type: OrderFormatType;
  ordinal: number;
}

export type OrderFormatType =
  | "WholesalerName"
  | "WholesalerAddress"
  | "WholesalerContact"
  | "ProductName"
  | "ProductCode"
  | "ProductOption"
  | "ProductPrice"
  | "RequestedComment"
  | "RequestedQuantity"
  | "Type"
  | "Etc";

export enum TaskType {
  PICKUP = "사입",
  RETURN = "반품",
  EXCHANGE = "교환",
  UNKNOWN = "기타",
  SAMPLE_REQUEST = "샘플",
  SAMPLE_RETURN = "샘반",
  PREPAID = "미송",
}

export enum StateStatus {
  WAITING = "대기",
  PREPAID = "미송",
  SOLD_OUT = "품절",
  SIZE_SOLD_OUT = "사이즈품절",
  COLOR_WAY_SOLD_OUT = "컬러품절",
  NO_SINGLE_PIECE = "낱장불가",
  FACTORY_DELAY = "공장지연",
  FABRIC_DELAY = "원단지연",
  RECEIVING_SCHEDULED = "입고예정",
  DAILY_CREDIT = "차감",
  TAB = "매입",
  IN_STORE_CREDIT = "다음주문시 차감",
  EXCHANGE_COLOR = "컬러교환",
  EXCHANGE_DEFECTIVE = "불량교환",
  EXCHANGE_SIZE = "사이즈교환",
  EXCHANGE_PREPAID = "교환미송",
  SAMPLE_PICKED_UP = "픽업완료",
  SAMPLE_RETURNED = "반납완료",
  CUSTOM = "기타",
}

export enum Week {
  "일밤",
  "월밤",
  "화밤",
  "수밤",
  "목밤",
  "금밤",
  "토밤",
}

export interface PickUpData {
  task: Task[];
}

export interface Task {
  index?: string;
  id?: string;
  order?: string;
  productCode: string;
  productName: string;
  productOption: string;
  productPrice: number;
  requestedComment: string;
  requestedQuantity: number;
  retailer: string;
  state?: State;
  type: TaskType;
  wholesaler: string;
  isDeleted?: boolean;
  wholesaleExpression?: string;
}

export interface State {
  checkOut: CheckOut;
  comment: string;
  id: string; // taskId
  quantity: number; // default 0
  status: StateStatus; // WAITING
  types: number; // default 0
  prepaidQuantity: number; // default 0
  requestedComment: string;
}

export interface CheckOut {
  id: number; // default 0
  isCheckedOut: boolean; // default false
}

export interface Wholesale {
  id?: string;
  name: string;
  address: WholesaleAddress;
  contacts: WholesaleContact[];
}

export interface WholesaleAddress {
  id?: number;
  building: Building;
  floor: string;
  detail: string;
}

export interface WholesaleContact {
  type: "order_number" | "store_number" | "tax_number";
  content: string;
}

export interface Filter {
  retail: Retailer[];
  building: Building[];
  type: TaskType[];
}
