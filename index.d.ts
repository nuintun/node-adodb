declare module 'node-adodb' {
  let PATH: string;
  const open: (connection: string, x64?: boolean) => open;

  export interface open {
    query<T>(sql: string): Promise<T>;
    execute<T>(sql: string, scalar?: string): Promise<T>;
    schema<T>(type: number, criteria?: any[], id?: string): Promise<T>;
  }
}
