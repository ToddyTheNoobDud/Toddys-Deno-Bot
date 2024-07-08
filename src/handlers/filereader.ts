import { readdirSync, type PathLike } from 'node:fs';
import { join, extname } from 'node:path';

export const Filereader = (dir: PathLike): string[] => {
  try {
    const files = [];
    const directoryData = readdirSync(dir) as string[];

    for (const file of directoryData) {
      const filePath = join(dir.toString(), file);

      if (extname(filePath) === '.ts'){//@ts-ignore
        files.push(filePath); //@ts-ignore
      } else {//@ts-ignore
        files.push(...Filereader(filePath));
      }
    }

    return files;
  } catch (error) {
    return [];
  }
};