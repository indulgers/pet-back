export enum RowStatus {
  delete = 0,
  normal = 1,
}

export enum SourceType {
  image = 0,
  video = 1,
}

export enum TaskType {
  None = 0,
  Generation = 1,
  Layout = 2,
  Error = 3,
  Finish = 4,
  LayoutError = 5,
  GenError = 6,
  New = 7,
  Image2Video = 8,
  Image2VideoError = 9,
  GenerationStart = 10,
}

export enum LayoutType {
  Para = 0,
  Image = 1,
}

export enum NotificationType {
  comment = 0,
  vote = 1,
}

export enum NotificationCountField {
  commentCount = 'commentCount',
  likeCount = 'likeCount',
  voteCount = 'voteCount',
}

export enum SceneType {
  None = 0,
  Normal = 1,
  Error = 2,
}

export enum ChapterStep {
  NotGenerate = 0,
  Generating = 1, // 生成图片中
  Generated = 2, // 图片生成完毕
  GenVideo = 3, // 生成视频中
  CompleteVideo = 4, // 视频完成
  ErrorVideo = 5, // 视频错误
  GenVideoStart = 6, // 视频开始
}

// lora 状态
export enum LoraAccessControl {
  Prepare = -1,
  Private = 0,
  Public = 1,
  Reviewing = 2,
}

// 项目发布状态
export enum ProjectAccessControl {
  UnPublish = 0,
  Private = 1,
  Public = 2,
}

// 项目进度状态
export enum ProjectStep {
  Queue = 0,
  Ipbible = 1,
  Layout = 2,
  Generation = 3,
  Error = 4,
  GenVideo = 5, // 生成视频中
  CompleteVideo = 6, // 视频完成
  ErrorVideo = 7, // 视频错误
  Person = 8, // 生成人物
  GenVideoStart = 9, // 视频开始
}

//  0:儿童, 1:少年, 2: 青年, 3: 中年, 4：老年，5: 未知
export enum AgeType {
  Child = 0,
  Teenager = 1,
  Youths = 2,
  Modern = 3,
  Elderly = 4,
  Unknown = 5,
}

export const AgeTypeMap: Record<string, AgeType> = {
  child: AgeType.Child,
  teenager: AgeType.Teenager,
  youths: AgeType.Youths,
  modern: AgeType.Modern,
  'middle age': AgeType.Modern,
  elderly: AgeType.Elderly,
  unknown: AgeType.Unknown,
};

// 性别: 0:女，1:男, 2: 未知
export enum GenderType {
  Female = 0,
  Male = 1,
  Unknown = 2,
}

export const GenderTypeMap: Record<string, GenderType> = {
  female: GenderType.Female,
  male: GenderType.Male,
  unknown: GenderType.Unknown,
};

// 添加实体 id
export const EntityDefaultId = '0';
