interface rfs{
    rfs(fileLocation: string, options: any): { write(str: string): void};
}

declare module 'rotating-file-stream';
