declare module 'node-adodb' {
  let open: (connection: string) => ADODB.ADODB;

  namespace ADODB {
    export interface ADODB {
      execute(sql: string, scalar?: string): Execute;
      query(sql: string, schema?: boolean): Query;
    }

    class Execute {
      on(event: 'done', fn: (data: Array<any>) => void, context?: any): Execute;
      on(event: 'fail', fn: (error: string) => void, context?: any): Execute;
      off(event: 'done', fn?: (data: Array<any>) => void, context?: any): Execute;
      off(event: 'fail', fn?: (error: string) => void, context?: any): Execute;
      once(event: 'done', fn?: (data: Array<any>) => void, context?: any): Execute;
      once(event: 'fail', fn?: (error: string) => void, context?: any): Execute;
    }

    class Query {
      on(event: 'done', fn: (data: Array<any>, schema?: object) => void, context?: any): Query;
      on(event: 'fail', fn: (error: string) => void, context?: any): Query;
      off(event: 'done', fn?: (data: Array<any>, schema?: object) => void, context?: any): Query;
      off(event: 'fail', fn?: (error: string) => void, context?: any): Query;
      once(event: 'done', fn?: (data: Array<any>, schema?: object) => void, context?: any): Query;
      once(event: 'fail', fn?: (error: string) => void, context?: any): Query;
    }
  }
}
