export enum AppHttpCode {
  /** 公共错误 */
  /** 服务器出错 */
  SERVICE_ERROR = 5005,
  /** 数据为空 */
  DATA_IS_EMPTY = 1001,
  /** 参数有误 */
  PARAM_INVALID = 1002,
  /** 文件类型错误 */
  FILE_TYPE_ERROR = 1003,
  /** 文件超出大小 */
  FILE_SIZE_EXCEED_LIMIT = 1004,
  /** 用户手机号不存在 */
  USER_PHONE_NOT_FOUND = 1005,
  /** 创建用户已存在，手机号，邮箱， 用户名等 */
  USER_CREATE_EXISTING = 2001,
  /** 两次密码输入不一致, 账号密码不一致等 */
  USER_PASSWORD_INVALID = 2002,
  /** 帐号被禁用 */
  USER_ACCOUNT_FORBIDDEN = 2003,
  /** 用户状态更改，当前用户 与 修改用户一致 */
  USER_FORBIDDEN_UPDATE = 2004,
  /** 验证码错误 */
  USER_VERIFY_CODE_ERROR = 2005,
  /**验证码已失效 */
  USER_VERIFY_CODE_INVALID = 2006,
  /** 发送验证码失败 */
  USER_SEND_VERIFY_CODE_FAIL = 2007,
  /** 注册失败 */
  USER_REGISTER_FAIL = 3002,
  /** 用户不存在 */
  USER_NOT_FOUND = 3003,
  /** 角色未找到 */
  ROLE_NOT_FOUND = 3004,
  /** 角色不可删除 */
  ROLE_NOT_DEL = 3005,
  /** 无权限 */
  ROLE_NO_FORBIDDEN = 3006,
  /** 菜单未找到 */
  MENU_NOT_FOUND = 4004,
  /** 部门不存在 */
  DEPT_NOT_FOUND = 5004,
  /** 岗位已存在 */
  POST_REPEAT = 6001,
  /** 岗位不存在 */
  POST_NOT_FOUND = 6004,
}
