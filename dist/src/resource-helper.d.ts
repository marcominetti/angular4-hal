import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from './resource';
import { ResourceArray } from './resource-array';
import { HalOptions } from './rest.service';
import { SubTypeBuilder } from './subtype-builder';
export declare class ResourceHelper {
    private static _headers;
    private static proxy_uri;
    private static root_uri;
    private static http;
    static headers: HttpHeaders;
    static optionParams(params: HttpParams, options?: HalOptions): HttpParams;
    static resolveRelations(resource: Resource): Object;
    static createEmptyResult<T extends Resource>(_embedded: string): ResourceArray<T>;
    static getClassName(obj: any): string;
    static className(objProto: any): string[];
    static instantiateResourceCollection<T extends Resource>(type: {
        new (): T;
    }, payload: any, result: ResourceArray<T>, builder?: SubTypeBuilder): ResourceArray<T>;
    static searchSubtypes<T extends Resource>(builder: SubTypeBuilder, embeddedClassName: string, instance: T): T;
    static instantiateResource<T extends Resource>(entity: T, payload: Object): T;
    static setProxyUri(proxy_uri: string): void;
    static setRootUri(root_uri: string): void;
    static getURL(): string;
    private static addSlash(uri);
    static getProxy(url: string): string;
    static setHttp(http: HttpClient): void;
    static getHttp(): HttpClient;
    static getRootUri(): string;
}
