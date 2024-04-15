export enum AppHttpCode {
  /** 成功 */
  SUCCESS = 200,
  /** 出错 */
  ERROR = 400,
  /** 未认证 */
  UN_AUTH = 401,
  /** 失败 */
  FAIL = 500,
  /** 数据验证错误 */
  VALIDATION_ERROR = 600,
  /** 无权限 */
  NO_ACCESS = 700,
}
