export enum FlowType {
  ipbible = 'ipbible', // 剧本拆解
  promptGPT = 'promptgpt', // gpt
  layoutPara = 'layout_para', // 段落分镜重绘
  generation = 'generation', // 图片生成
  generationSubtask = 'generation_subtask', // 图片生成子任务
  layout = 'layout', // 项目总分镜生成
  lora = 'lora', // 人物生成
  videoComposition = 'video_composition', // 视频合成
  layoutTemplate = 'layout_template', // 模板分镜生成
  image2video = 'image2video', // 图片转视频
}

export enum TaskStatus {
  error = 'error',
  start = 'start',
  finish = 'finish',
}

export class TaskCommonDto {
  type: FlowType;
  projectId: string;
  flowId: string;
  taskId?: string;
}

export class TaskDto extends TaskCommonDto {
  userId: string;
  param: string;
}

export enum HistoryLoraStage {
  queue = 0,
  training = 1,
  finished = 2,
  error = 3,
}
