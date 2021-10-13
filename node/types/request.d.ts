import * as http from "http";
declare module 'http' {
  namespace IncomingMessage {
    export let body: str;
  }
}

declare const Status: {
  [key: int]: str
}
declare module './request' {
  function request(url:str): Promise<str>;
  function getBody(req: http.IncomingMessage): Promise<str>; 
}