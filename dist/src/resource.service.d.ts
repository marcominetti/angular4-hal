import { Observable } from 'rxjs';
import { Resource } from './resource';
import { Sort } from './sort';
import { ResourceArray } from './resource-array';
import { ExternalService } from './external.service';
import { HalOptions } from './rest.service';
import { SubTypeBuilder } from './subtype-builder';
export declare class ResourceService {
    private externalService;
    constructor(externalService: ExternalService);
    private static getURL();
    getAll<T extends Resource>(type: {
        new (): T;
    }, resource: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    get<T extends Resource>(type: {
        new (): T;
    }, resource: string, id: any): Observable<T>;
    getBySelfLink<T extends Resource>(type: {
        new (): T;
    }, resourceLink: string): Observable<T>;
    search<T extends Resource>(type: {
        new (): T;
    }, query: string, resource: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    searchSingle<T extends Resource>(type: {
        new (): T;
    }, query: string, resource: string, options?: HalOptions): Observable<T>;
    customQuery<T extends Resource>(type: {
        new (): T;
    }, query: string, resource: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    getByRelation<T extends Resource>(type: {
        new (): T;
    }, resourceLink: string): Observable<T>;
    getByRelationArray<T extends Resource>(type: {
        new (): T;
    }, resourceLink: string, _embedded: string, builder?: SubTypeBuilder): Observable<ResourceArray<T>>;
    count(resource: string): Observable<number>;
    create<T extends Resource>(selfResource: string, entity: T): Observable<Observable<never> | T>;
    update<T extends Resource>(entity: T): Observable<Observable<never> | T>;
    patch<T extends Resource>(entity: T): Observable<Observable<never> | T>;
    delete<T extends Resource>(entity: T): Observable<Object>;
    hasNext<T extends Resource>(resourceArray: ResourceArray<T>): boolean;
    hasPrev<T extends Resource>(resourceArray: ResourceArray<T>): boolean;
    hasFirst<T extends Resource>(resourceArray: ResourceArray<T>): boolean;
    hasLast<T extends Resource>(resourceArray: ResourceArray<T>): boolean;
    next<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }): Observable<ResourceArray<T>>;
    prev<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }): Observable<ResourceArray<T>>;
    first<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }): Observable<ResourceArray<T>>;
    last<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }): Observable<ResourceArray<T>>;
    page<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }, id: number): Observable<ResourceArray<T>>;
    sortElements<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }, ...sort: Sort[]): Observable<ResourceArray<T>>;
    size<T extends Resource>(resourceArray: ResourceArray<T>, type: {
        new (): T;
    }, size: number): Observable<ResourceArray<T>>;
    private getResourceUrl(resource?);
    private setUrls<T>(result);
    private setUrlsResource<T>(result);
}
