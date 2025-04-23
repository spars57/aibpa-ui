export interface Mensage {
    id?: string;
    autor: "user" | "bot";
    texto: string;
    timestamp?: string;
  }