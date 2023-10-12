// https://github.com/VincentSit/ChinaMobilePhoneNumberRegex/blob/master/README-CN.md
export function validPhone(mobile: string): boolean {
  const regx =
    /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/;
  return regx.test(mobile);
}

export function validEmail(email: string): boolean {
  const regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regx.test(email);
}
export function isTokenExpired(token: string): boolean {
  if (!token) {
    return true; // 如果 Token 不存在，则视为已过期
  }

  // 尝试解析 Token 的 payload 部分
  let payload: any;
  try {
    // 使用 Base64 解码 JWT Token 的 payload 部分
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);

    // 将解码后的 JSON 字符串转换为对象
    payload = JSON.parse(decodedPayload);
  } catch (error) {
    return true; // 如果解析失败，则视为已过期
  }

  // 检查 Token 中的过期时间 (exp) 是否小于当前时间
  if (payload && payload.exp) {
    const expirationTime = payload.exp * 1000; // 将秒转换为毫秒
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  }

  return true; // 如果没有过期时间信息，则视为已过期
}
