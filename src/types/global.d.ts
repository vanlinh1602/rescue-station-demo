declare global {
    type CustomObject<Type> = {
      [key: string]: Type;
    };
}

export {};