import { Observable } from 'rxjs';
import { Resource } from './resource';
import { ResourceArray } from './resource-array';
import { Sort } from './sort';
import { Injector } from '@angular/core';
import { SubTypeBuilder } from './subtype-builder';
export declare type HalParam = {
    key: string;
    value: string | number | boolean;
};
export declare type HalOptions = {
    notPaged?: boolean;
    size?: number;
    sort?: Sort[];
    params?: HalParam[];
};
export declare class RestService<T extends Resource> {
    private injector;
    private type;
    private resource;
    resourceArray: ResourceArray<T>;
    private resourceService;
    private _embedded;
    constructor(type: {
        new (): T;
    }, resource: string, injector: Injector, _embedded?: string);
    protected handleError(error: any): Observable<never>;
    protected static handleError(error: any): Observable<never>;
    getAll(options?: HalOptions): Observable<T[]>;
    get(id: any): Observable<T>;
    getBySelfLink(selfLink: string): Observable<T>;
    search(query: string, options?: HalOptions): Observable<T[]>;
    searchSingle(query: string, options?: HalOptions): Observable<T>;
    customQuery(query: string, options?: HalOptions): Observable<T[]>;
    getByRelationArray(relation: string, builder?: SubTypeBuilder): Observable<T[]>;
    getByRelation(relation: string): Observable<T>;
    count(): Observable<number>;
    create(entity: T): Observable<Observable<never> | T>;
    update(entity: T): Observable<Observable<never> | T>;
    patch(entity: T): Observable<Observable<never> | T>;
    delete(entity: T): Observable<Object>;
    totalElement(): number;
    hasFirst(): boolean;
    hasNext(): boolean;
    hasPrev(): boolean;
    hasLast(): boolean;
    next(): Observable<T[]>;
    prev(): Observable<T[]>;
    first(): Observable<T[]>;
    last(): Observable<T[]>;
    page(pageNumber: number): Observable<T[]>;
}
