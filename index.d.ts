declare module 'node-adodb' {
  const open: (connection: string) => open;

  export interface open {
    query<T>(sql: string): Promise<T>;
    execute<T>(sql: string, scalar?: string): Promise<T>;
    schema<T>(type: number, criteria?: any[], id?: string): Promise<T>;
  }
}
