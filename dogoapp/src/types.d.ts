export interface Weight {
  imperial: string;
  metric: string;
}

export interface Height {
  imperial: string;
  metric: string;
}

export interface Breed {
  weight: Weight;
  height: Height;
  id: number;
  image?: {
    url: string;
  };
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
}

export interface Dog {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}
