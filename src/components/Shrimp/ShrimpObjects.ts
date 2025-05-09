declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys(): string[];
    (id: string): string;
  };
};

const context = require.context('./images', true, /.png$/);

interface ShrimpObjects {
  [key: string]: string | number;
  shrimpCount: number;
}

const obj: ShrimpObjects = {
  shrimpCount: 0,
};

let shrimpCount = 0;
context.keys().forEach((key) => {
  // Remove './' from the start and '.png' from the end
  const fileName = key.slice(2, -4);
  // Remove 'shrimp' from the filename
  const shrimpNumber = fileName.replace('shrimp', '');
  obj[shrimpNumber] = context(key);
  shrimpCount++;
  obj['shrimpCount'] = shrimpCount;
});

export default {
  ...obj,
  shrimpCount,
} as ShrimpObjects;
