import { Observable } from 'rxjs';
import { HalOptions } from './rest.service';
import { SubTypeBuilder } from './subtype-builder';
export declare abstract class Resource {
    _links: any;
    _subtypes: Map<string, any>;
    subtypes: Map<string, any>;
    constructor();
    getRelationArray<T extends Resource>(type: {
        new (): T;
    }, relation: string, _embedded?: string, options?: HalOptions, builder?: SubTypeBuilder): Observable<T[]>;
    getRelation<T extends Resource>(type: {
        new (): T;
    }, relation: string, builder?: SubTypeBuilder): Observable<T>;
    addRelation<T extends Resource>(relation: string, resource: T): Observable<any>;
    updateRelation<T extends Resource>(relation: string, resource: T): Observable<any>;
    substituteRelation<T extends Resource>(relation: string, resource: T): Observable<any>;
    deleteRelation<T extends Resource>(relation: string, resource: T): Observable<any>;
}
