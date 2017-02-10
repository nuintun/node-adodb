declare module 'node-adodb' {
  let open: (connection: string) => ADODB.ADODB;

  namespace ADODB {
    export interface ADODB {
      execute(sql: string, scalar?: string): Execute;
      query(sql: string): Query;
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
      on(event: 'done', fn: (data: IData) => void): Execute;
      on(event: 'fail', fn: (error: IFail) => void): Execute;
      off(event: 'done', fn?: (data: IData) => void): Execute;
      off(event: 'fail', fn?: (error: IFail) => void): Execute;
    }

    class Query {
      on(event: 'done', fn: (data: IData) => void): Query;
      on(event: 'fail', fn: (error: IFail) => void): Query;
      off(event: 'done', fn?: (data: IData) => void): Query;
      off(event: 'fail', fn?: (error: IFail) => void): Query;
    }
  }
}
