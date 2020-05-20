export interface Model {
  id: number;
  name: string;
  size: string,
  maxDisplacement: number;
  price: number;
}

export interface Gearbox {
  id: number;
  name: string;
  price: number;
}

export interface Engine {
  id: number;
  name: string;
  displacement: number;
  gearbox: Gearbox[];
  price: number;
}

export interface Color {
  id: number;
  name: string;
}

export interface Dataset {
  models: Model[];
  engines: Engine[];
  gearboxes: Gearbox[];
  colors: Color[];
}
