declare module 'node-adodb' {
  let debug: boolean;
  let open: (connection: string) => adodb.adodb;

  namespace adodb {
    export interface adodb {
      execute(sql: string): Execute;
      query(sql: string): Query;
      executeScalar(sql: string, scalar: string): ExecuteScalar;
    }

    interface IData {
      valid: boolean;
      message: string;
      records: Array<any>;
    }

    interface IFail {
      valid: boolean;
      message: string;
    }

    class Execute {
      on(event: 'done', cm: (data: IData) => void): Execute;
      on(event: 'fail', cm: (error: IFail) => void): Execute;
    }

    class Query {
      on(event: 'done', cm: (data: IData) => void): Query;
      on(event: 'fail', cm: (error: IFail) => void): Query;
    }

    class ExecuteScalar {
      on(event: 'done', cm: (data: IData) => void): ExecuteScalar;
      on(event: 'fail', cm: (error: IFail) => void): ExecuteScalar;
    }
  }
}