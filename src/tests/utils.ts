import { ParsedUrlQuery } from 'querystring';
import * as urlparse from 'url';

export function parseURL(url: string): {
  path: string;
  query: Record<string, string> | ParsedUrlQuery;
} {
  const parsedUrl = urlparse.parse(url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path?.replace(/^\/+|\/+$/g, '');
  return {
    path: trimmedPath || '/',
    query: parsedUrl.query,
  };
}

export function parsePathVariables(
  path: string,
  route: string
): Record<string, string> {
  let pathVariables = path.split('/');
  let routeVariables = route.split('/');
  let pathVariablesObject: Record<string, string> = {};
  if (routeVariables.length === pathVariables.length) {
    for (let i = 0; i < routeVariables.length; i++) {
      if (routeVariables[i].startsWith(':')) {
        pathVariablesObject[routeVariables[i].slice(1)] = pathVariables[i];
      }
    }
  }
  return pathVariablesObject;
}

export function removeFirstOccurence(list: string[], item: string) {
  let index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
  return list;
}
