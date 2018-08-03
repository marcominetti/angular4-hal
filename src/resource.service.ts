
import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Resource} from './resource';
import {ResourceHelper} from './resource-helper';
import {Injectable} from '@angular/core';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {Sort} from './sort';
import {ResourceArray} from './resource-array';
import {ExternalService} from './external.service';
import {HalOptions} from './rest.service';
import {SubTypeBuilder} from './subtype-builder';

@Injectable()
export class ResourceService {

    constructor(private externalService: ExternalService, private resource: string) {
    }

    public getAll<T extends Resource>(type: { new(): T }, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl();
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(this.resource,_embedded);

        //this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)),
            catchError(error => observableThrowError(error)),);
    }

    public get<T extends Resource>(type: { new(): T }, id: any): Observable<T> {
        const uri = this.getResourceUrl().concat('/', id);
        const result: T = new type();

        //this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers});
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
            catchError(error => observableThrowError(error)),);
    }

    // public getBySelfLink<T extends Resource>(type: { new(): T }, resourceLink: string): Observable<T> {
    //     const result: T = new type();

    //     //this.setUrlsResource(result);
    //     let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), {headers: ResourceHelper.headers});
    //     return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
    //         catchError(error => observableThrowError(error)),);
    // }

    public search<T extends Resource>(type: { new(): T }, query: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl().concat('/search/', query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const resultArray: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(this.resource,_embedded);
        const resultSingle: T = new type();

        //this.setUrls(resultArray);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => {
                if (response.hasOwnProperty('_embedded')) {
                    return ResourceHelper.instantiateResourceCollection(type, response, resultArray);
                } else {
                    let resourceArray: ResourceArray<T> = new ResourceArray<T>();
                    resourceArray.push(ResourceHelper.instantiateResource(resultSingle, response));
                    return resourceArray;
                }
            }),
            catchError(error => observableThrowError(error)),);
    }

    public searchSingle<T extends Resource>(type: { new(): T }, query: string, options?: HalOptions): Observable<T> {
        const uri = this.getResourceUrl().concat('/search/', query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: T = new type();

        //this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResource(result, response)),
            catchError(error => observableThrowError(error)),);
    }

    public customQuery<T extends Resource>(type: { new(): T }, query: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl().concat('/', query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(this.resource,_embedded);

        //this.setUrls(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)),
            catchError(error => observableThrowError(error)),);
    }

    public getByRelation<T extends Resource>(type: { new(): T }, resourceLink: string): Observable<T> {
        let result: T = new type();

        //this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(resourceLink, {headers: ResourceHelper.headers});
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
            catchError(error => observableThrowError(error)),);
    }

    // public getByRelationArray<T extends Resource>(type: { new(): T }, resourceLink: string, _embedded: string, builder?: SubTypeBuilder): Observable<ResourceArray<T>> {
    //     const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);

    //     //this.setUrls(result);
    //     let observable = ResourceHelper.getHttp().get(resourceLink, {headers: ResourceHelper.headers});
    //     return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, builder)),
    //         catchError(error => observableThrowError(error)),);
    // }

    public count(): Observable<number> {
        const uri = this.getResourceUrl().concat('/search/countAll');

        return ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, observe: 'body'}).pipe(
            map((response: Response) => Number(response.body)),
            catchError(error => observableThrowError(error)),);
    }

    public create<T extends Resource>(entity: T) {
        const uri = ResourceHelper.getURL(this.resource) + this.resource;
        const payload = ResourceHelper.resolveRelations(entity);

        //this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().post(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    public update<T extends Resource>(entity: T) {
        const uri = ResourceHelper.getProxy(this.resource, entity._links.self.href);
        const payload = ResourceHelper.resolveRelations(entity);
        //this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().put(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    public patch<T extends Resource>(entity: T) {
        const uri = ResourceHelper.getProxy(this.resource,entity._links.self.href);
        const payload = ResourceHelper.resolveRelations(entity);
        //this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().patch(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    public delete<T extends Resource>(entity: T): Observable<Object> {
        const uri = ResourceHelper.getProxy(this.resource,entity._links.self.href);
        return ResourceHelper.getHttp().delete(uri, {headers: ResourceHelper.headers}).pipe(catchError(error => observableThrowError(error)));
    }

    public hasNext<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.next_uri != undefined;
    }

    public hasPrev<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.prev_uri != undefined;
    }

    public hasFirst<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.first_uri != undefined;
    }

    public hasLast<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.last_uri != undefined;
    }

    public next<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.next(type);
    }

    public prev<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.prev(type);
    }

    public first<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.first(type);
    }

    public last<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.last(type);
    }

    public page<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, id: number): Observable<ResourceArray<T>> {
        return resourceArray.page(type, id);
    }

    public sortElements<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, ...sort: Sort[]): Observable<ResourceArray<T>> {
        return resourceArray.sortElements(type, ...sort);
    }

    public size<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, size: number): Observable<ResourceArray<T>> {
        return resourceArray.size(type, size);
    }

    private getResourceUrl(): string {
        return ResourceHelper.getURL(this.resource) + this.resource;
    }

    // private setUrls<T extends Resource>(result: ResourceArray<T>) {
    //     result.proxyUrl = this.externalService.getProxyUriMap();
    //     result.rootUrl = this.externalService.getRootUriMap();
    // }

    // private setUrlsResource<T extends Resource>(result: T) {
    //     result.proxyUrl = this.externalService.getProxyUriMap();
    //     result.rootUrl = this.externalService.getRootUriMap();
    // }
}
