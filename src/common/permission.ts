import { SetMetadata } from '@nestjs/common';
import { TokenUser } from '@/interface';


export enum UserPermission {
  Parse = 'Parse', // 序列化用户
  Normal = 'normal', // 普通用户
  Admin = 'admin', // 管理员
}

export const isAdmin = (user: TokenUser) => {
  return !!user.groups.find((item) => item.endsWith(UserPermission.Admin));
};

export const PermissionMetaData = 'require-permission';

export const RequireLogin = () =>
  SetMetadata(PermissionMetaData, UserPermission.Normal);

export const RequireParse = () =>
  SetMetadata(PermissionMetaData, UserPermission.Parse);

// 需要管理员权限
export const RequirePermission = (permission = UserPermission.Admin) =>
  SetMetadata(PermissionMetaData, permission);

interface CommonDto {
  projectId: string;
}
/**
 * 判断是否有项目权限
 */
export const hasPermission = async (
  dtos: CommonDto | Array<CommonDto>,
  user: TokenUser,

) => {
  const projectIdSet = new Set<string>();
  if (Array.isArray(dtos)) {
    dtos.forEach((dto) => projectIdSet.add(dto.projectId));
  } else {
    projectIdSet.add(dtos.projectId);
  }
  if (projectIdSet.size !== 1) return false;
  const projectId = Array.from(projectIdSet)[0];

  if (!projectId.trim()) return false;

  if (isAdmin(user)) return true;

  return []
};
