import { Observable } from 'rxjs';
import { Resource } from './resource';
import { Sort } from './sort';
import { ResourceArray } from './resource-array';
import { ExternalService } from './external.service';
import { HalOptions } from './rest.service';
export declare class ResourceService {
    private externalService;
    private resource;
    constructor(externalService: ExternalService);
    setResourceName(resource: string): void;
    getAll<T extends Resource>(type: {
        new (): T;
    }, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    get<T extends Resource>(type: {
        new (): T;
    }, id: any): Observable<T>;
    search<T extends Resource>(type: {
        new (): T;
    }, query: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    searchSingle<T extends Resource>(type: {
        new (): T;
    }, query: string, options?: HalOptions): Observable<T>;
    customQuery<T extends Resource>(type: {
        new (): T;
    }, query: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>>;
    getByRelation<T extends Resource>(type: {
        new (): T;
    }, resourceLink: string): Observable<T>;
    count(): Observable<number>;
    create<T extends Resource>(entity: T): Observable<Observable<never> | T>;
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
    private getResourceUrl();
}
