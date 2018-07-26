import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from './resource';
import { ResourceArray } from './resource-array';
import { HalOptions } from './rest.service';
import { SubTypeBuilder } from './subtype-builder';
export declare class ResourceHelper {
    private static _headers;
    private static proxy_uri_map;
    private static root_uri_map;
    private static http;
    static headers: HttpHeaders;
    static optionParams(params: HttpParams, options?: HalOptions): HttpParams;
    static resolveRelations(resource: Resource): Object;
    static createEmptyResult<T extends Resource>(resource: string, _embedded: string): ResourceArray<T>;
    static getClassName(obj: any): string;
    static className(objProto: any): string[];
    static instantiateResourceCollection<T extends Resource>(type: {
        new (): T;
    }, payload: any, result: ResourceArray<T>, builder?: SubTypeBuilder): ResourceArray<T>;
    static searchSubtypes<T extends Resource>(builder: SubTypeBuilder, embeddedClassName: string, instance: T): T;
    static instantiateResource<T extends Resource>(entity: T, payload: Object): T;
    static setProxyUriMap(proxy_uri: Map<string, string>): void;
    static setRootUriMap(root_uri: Map<string, string>): void;
    static getURL(resource: string): string;
    private static addSlash(uri);
    static getProxy(resource: string, url: string): string;
    static setHttp(http: HttpClient): void;
    static getHttp(): HttpClient;
    static getRootUri(resource: string): string;
}
