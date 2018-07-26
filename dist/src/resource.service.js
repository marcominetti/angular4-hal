import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceHelper } from './resource-helper';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ResourceArray } from './resource-array';
import { ExternalService } from './external.service';
var ResourceService = /** @class */ (function () {
    function ResourceService(externalService) {
        this.externalService = externalService;
    }
    ResourceService.prototype.setResourceName = function (resource) {
        this.resource = resource;
    };
    ResourceService.prototype.getAll = function (type, _embedded, options) {
        var uri = this.getResourceUrl();
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = ResourceHelper.createEmptyResult(this.resource, _embedded);
        //this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.get = function (type, id) {
        var uri = this.getResourceUrl().concat('/', id);
        var result = new type();
        //this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
    };
    // public getBySelfLink<T extends Resource>(type: { new(): T }, resourceLink: string): Observable<T> {
    //     const result: T = new type();
    //     //this.setUrlsResource(result);
    //     let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), {headers: ResourceHelper.headers});
    //     return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
    //         catchError(error => observableThrowError(error)),);
    // }
    ResourceService.prototype.search = function (type, query, _embedded, options) {
        var uri = this.getResourceUrl().concat('/search/', query);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var resultArray = ResourceHelper.createEmptyResult(this.resource, _embedded);
        var resultSingle = new type();
        //this.setUrls(resultArray);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) {
            if (response.hasOwnProperty('_embedded')) {
                return ResourceHelper.instantiateResourceCollection(type, response, resultArray);
            }
            else {
                var resourceArray = new ResourceArray();
                resourceArray.push(ResourceHelper.instantiateResource(resultSingle, response));
                return resourceArray;
            }
        }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.searchSingle = function (type, query, options) {
        var uri = this.getResourceUrl().concat('/search/', query);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = new type();
        //this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResource(result, response); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.customQuery = function (type, query, _embedded, options) {
        var uri = this.getResourceUrl() + query;
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = ResourceHelper.createEmptyResult(this.resource, _embedded);
        //this.setUrls(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.getByRelation = function (type, resourceLink) {
        var result = new type();
        //this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
    };
    // public getByRelationArray<T extends Resource>(type: { new(): T }, resourceLink: string, _embedded: string, builder?: SubTypeBuilder): Observable<ResourceArray<T>> {
    //     const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);
    //     //this.setUrls(result);
    //     let observable = ResourceHelper.getHttp().get(resourceLink, {headers: ResourceHelper.headers});
    //     return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, builder)),
    //         catchError(error => observableThrowError(error)),);
    // }
    ResourceService.prototype.count = function () {
        var uri = this.getResourceUrl().concat('/search/countAll');
        return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, observe: 'body' }).pipe(map(function (response) { return Number(response.body); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.create = function (entity) {
        var uri = ResourceHelper.getURL(this.resource) + this.resource;
        var payload = ResourceHelper.resolveRelations(entity);
        //this.setUrlsResource(entity);
        var observable = ResourceHelper.getHttp().post(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.update = function (entity) {
        var uri = ResourceHelper.getProxy(this.resource, entity._links.self.href);
        var payload = ResourceHelper.resolveRelations(entity);
        //this.setUrlsResource(entity);
        var observable = ResourceHelper.getHttp().put(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.patch = function (entity) {
        var uri = ResourceHelper.getProxy(this.resource, entity._links.self.href);
        var payload = ResourceHelper.resolveRelations(entity);
        //this.setUrlsResource(entity);
        var observable = ResourceHelper.getHttp().patch(uri, payload, { headers: ResourceHelper.headers, observe: 'response' });
        return observable.pipe(map(function (response) {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                var body = response.body;
                return observableThrowError(body.error);
            }
        }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.delete = function (entity) {
        var uri = ResourceHelper.getProxy(this.resource, entity._links.self.href);
        return ResourceHelper.getHttp().delete(uri, { headers: ResourceHelper.headers }).pipe(catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.hasNext = function (resourceArray) {
        return resourceArray.next_uri != undefined;
    };
    ResourceService.prototype.hasPrev = function (resourceArray) {
        return resourceArray.prev_uri != undefined;
    };
    ResourceService.prototype.hasFirst = function (resourceArray) {
        return resourceArray.first_uri != undefined;
    };
    ResourceService.prototype.hasLast = function (resourceArray) {
        return resourceArray.last_uri != undefined;
    };
    ResourceService.prototype.next = function (resourceArray, type) {
        return resourceArray.next(type);
    };
    ResourceService.prototype.prev = function (resourceArray, type) {
        return resourceArray.prev(type);
    };
    ResourceService.prototype.first = function (resourceArray, type) {
        return resourceArray.first(type);
    };
    ResourceService.prototype.last = function (resourceArray, type) {
        return resourceArray.last(type);
    };
    ResourceService.prototype.page = function (resourceArray, type, id) {
        return resourceArray.page(type, id);
    };
    ResourceService.prototype.sortElements = function (resourceArray, type) {
        var sort = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            sort[_i - 2] = arguments[_i];
        }
        return resourceArray.sortElements.apply(resourceArray, [type].concat(sort));
    };
    ResourceService.prototype.size = function (resourceArray, type, size) {
        return resourceArray.size(type, size);
    };
    ResourceService.prototype.getResourceUrl = function () {
        return ResourceHelper.getURL(this.resource);
    };
    ResourceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResourceService.ctorParameters = function () { return [
        { type: ExternalService }
    ]; };
    return ResourceService;
}());
export { ResourceService };
