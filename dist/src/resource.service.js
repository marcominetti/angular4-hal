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
    ResourceService.getURL = function () {
        return ResourceHelper.getURL();
    };
    ResourceService.prototype.getAll = function (type, resource, _embedded, options) {
        var uri = this.getResourceUrl(resource);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.get = function (type, resource, id) {
        var uri = this.getResourceUrl(resource).concat('/', id);
        var result = new type();
        this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.getBySelfLink = function (type, resourceLink) {
        var result = new type();
        this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.search = function (type, query, resource, _embedded, options) {
        var uri = this.getResourceUrl(resource).concat('/search/', query);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var resultArray = ResourceHelper.createEmptyResult(_embedded);
        var resultSingle = new type();
        this.setUrls(resultArray);
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
    ResourceService.prototype.searchSingle = function (type, query, resource, options) {
        var uri = this.getResourceUrl(resource).concat('/search/', query);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = new type();
        this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResource(result, response); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.customQuery = function (type, query, resource, _embedded, options) {
        var uri = this.getResourceUrl(resource + query);
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        var observable = ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, params: params });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.getByRelation = function (type, resourceLink) {
        var result = new type();
        this.setUrlsResource(result);
        var observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (data) { return ResourceHelper.instantiateResource(result, data); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.getByRelationArray = function (type, resourceLink, _embedded, builder) {
        var result = ResourceHelper.createEmptyResult(_embedded);
        this.setUrls(result);
        var observable = ResourceHelper.getHttp().get(resourceLink, { headers: ResourceHelper.headers });
        return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, builder); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.count = function (resource) {
        var uri = this.getResourceUrl(resource).concat('/search/countAll');
        return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers, observe: 'body' }).pipe(map(function (response) { return Number(response.body); }), catchError(function (error) { return observableThrowError(error); }));
    };
    ResourceService.prototype.create = function (selfResource, entity) {
        var uri = ResourceHelper.getURL() + selfResource;
        var payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
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
        var uri = ResourceHelper.getProxy(entity._links.self.href);
        var payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
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
        var uri = ResourceHelper.getProxy(entity._links.self.href);
        var payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
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
        var uri = ResourceHelper.getProxy(entity._links.self.href);
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
    ResourceService.prototype.getResourceUrl = function (resource) {
        var url = ResourceService.getURL();
        if (!url.endsWith('/')) {
            url = url.concat('/');
        }
        if (resource) {
            return url.concat(resource);
        }
        return url;
    };
    ResourceService.prototype.setUrls = function (result) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
    };
    ResourceService.prototype.setUrlsResource = function (result) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
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
