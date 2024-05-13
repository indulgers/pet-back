export interface BoundingBox {
  role_id: string;
  bounding_box: [number, number, number, number];
}

export interface PromptsData {
  conversation_id: string;
  project_id: string;
  chapter_id: string;
  para_id: string;
  para_content: string[];
  style: string;
  location: string;
  num_person: string;
  person_id: any[];
  pose: string[];
  gender: Record<'male' | 'female', number>;
}

export interface PersonPrompt {
  index: number;
  gender: string;
  look?: string;
  pose?: string;
  entity_id: string;
  display_prompt?: string;
  prompt: string;
}

export interface LayoutData {
  layout_type?: string;
  para_id?: string;
  scene_id?: string;
  idx?: string;
  layout_scene?: string;
  layout_view?: string;
  urls?: string;
  display_prompt?: string;
  extra_prompt?: string;
  extra_prompt_cn?: string;
  template_tags?: string;
  common_style_prompt?: string;
  bounding_box_info?: BoundingBox[];
  env_prompt?: string;
  person_prompt?: PersonPrompt[];
  sub_prompt?: Record<string, string>;
  neg_prompt?: string;
  prompts_data: PromptsData;
}
