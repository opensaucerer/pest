import { ParsedUrlQuery } from 'querystring';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_KEY: string;
      SECRET_KEY: string;
      AWS_REGION: string;
    }
  }
  var env: NodeJS.ProcessEnv;
  var pest: (name: string, fn: Function) => void;
  var expect: (actual: any) => {
    toBe: (expected: any) => void;
    toNotBe: (expected: any) => void;
    toInclude: (expected: any) => void;
    toNotInclude: (expected: any) => void;
    toOccur: (occurence: any) => {
      in: (parent: any[]) => void;
    };
    toBeObject: (expected: any) => void;
    toBeOfType: (expected: any) => void;
  };
  var afterPest: (fn: any) => void;
  var beforePest: (fn: any) => void;
}

declare module 'http' {
  interface IncomingMessage {
    query: Record<string, string> | ParsedUrlQuery;
    path: string;
    body: Record<string, any>;
    raw: any;
    params: Record<string, string>;
    route: string;
  }

  interface ServerResponse {
    status: (statusCode: number) => {
      json: (data: any) => void;
    };
  }
}

export {};
