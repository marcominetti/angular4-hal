import { of as observableOf, throwError as observableThrowError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { isNullOrUndefined } from 'util';
var RestService = /** @class */ (function () {
    function RestService(type, resource, injector, _embedded) {
        this.injector = injector;
        this._embedded = '_embedded';
        this.type = type;
        this.resourceService = injector.get(ResourceService);
        this.resourceService.setResourceName(resource);
        if (!isNullOrUndefined(_embedded))
            this._embedded = _embedded;
    }
    RestService.prototype.handleError = function (error) {
        return RestService.handleError(error);
    };
    RestService.handleError = function (error) {
        return observableThrowError(error);
    };
    RestService.prototype.getAll = function (options) {
        var _this = this;
        return this.resourceService.getAll(this.type, this._embedded, options).pipe(mergeMap(function (resourceArray) {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return _this.getAll(options);
            }
            else {
                _this.resourceArray = resourceArray;
                return observableOf(resourceArray.result);
            }
        }));
    };
    RestService.prototype.get = function (id) {
        return this.resourceService.get(this.type, id);
    };
    // public getBySelfLink(selfLink: string): Observable<T> {
    //     return this.resourceService.getBySelfLink(this.type, selfLink);
    // }
    RestService.prototype.search = function (query, options) {
        var _this = this;
        return this.resourceService.search(this.type, query, this._embedded, options).pipe(mergeMap(function (resourceArray) {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return _this.search(query, options);
            }
            else {
                _this.resourceArray = resourceArray;
                return observableOf(resourceArray.result);
            }
        }));
    };
    RestService.prototype.searchSingle = function (query, options) {
        return this.resourceService.searchSingle(this.type, query, options);
    };
    RestService.prototype.customQuery = function (query, options) {
        var _this = this;
        return this.resourceService.customQuery(this.type, query, this._embedded, options).pipe(mergeMap(function (resourceArray) {
            if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                options.notPaged = false;
                options.size = resourceArray.totalElements;
                return _this.customQuery(query, options);
            }
            else {
                _this.resourceArray = resourceArray;
                return observableOf(resourceArray.result);
            }
        }));
    };
    // public getByRelationArray(relation: string, builder?: SubTypeBuilder): Observable<T[]> {
    //     return this.resourceService.getByRelationArray(this.type, relation, this._embedded, builder).pipe(
    //         map((resourceArray: ResourceArray<T>) => {
    //             this.resourceArray = resourceArray;
    //             return resourceArray.result;
    //         }));
    // }
    RestService.prototype.getByRelation = function (relation) {
        return this.resourceService.getByRelation(this.type, relation);
    };
    RestService.prototype.count = function () {
        return this.resourceService.count();
    };
    RestService.prototype.create = function (entity) {
        return this.resourceService.create(entity);
    };
    RestService.prototype.update = function (entity) {
        return this.resourceService.update(entity);
    };
    RestService.prototype.patch = function (entity) {
        return this.resourceService.patch(entity);
    };
    RestService.prototype.delete = function (entity) {
        return this.resourceService.delete(entity);
    };
    RestService.prototype.totalElement = function () {
        if (this.resourceArray && this.resourceArray.totalElements)
            return this.resourceArray.totalElements;
        return 0;
    };
    RestService.prototype.hasFirst = function () {
        if (this.resourceArray)
            return this.resourceService.hasFirst(this.resourceArray);
        return false;
    };
    RestService.prototype.hasNext = function () {
        if (this.resourceArray)
            return this.resourceService.hasNext(this.resourceArray);
        return false;
    };
    RestService.prototype.hasPrev = function () {
        if (this.resourceArray)
            return this.resourceService.hasPrev(this.resourceArray);
        return false;
    };
    RestService.prototype.hasLast = function () {
        if (this.resourceArray)
            return this.resourceService.hasLast(this.resourceArray);
        return false;
    };
    RestService.prototype.next = function () {
        var _this = this;
        if (this.resourceArray)
            return this.resourceService.next(this.resourceArray, this.type).pipe(map(function (resourceArray) {
                _this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            observableThrowError('no resourceArray found');
    };
    RestService.prototype.prev = function () {
        var _this = this;
        if (this.resourceArray)
            return this.resourceService.prev(this.resourceArray, this.type).pipe(map(function (resourceArray) {
                _this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            observableThrowError('no resourceArray found');
    };
    RestService.prototype.first = function () {
        var _this = this;
        if (this.resourceArray)
            return this.resourceService.first(this.resourceArray, this.type)
                .pipe(map(function (resourceArray) {
                _this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            observableThrowError('no resourceArray found');
    };
    RestService.prototype.last = function () {
        var _this = this;
        if (this.resourceArray)
            return this.resourceService.last(this.resourceArray, this.type)
                .pipe(map(function (resourceArray) {
                _this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            observableThrowError('no resourceArray found');
    };
    RestService.prototype.page = function (pageNumber) {
        var _this = this;
        if (this.resourceArray)
            return this.resourceService.page(this.resourceArray, this.type, pageNumber).pipe(map(function (resourceArray) {
                _this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
        else
            observableThrowError('no resourceArray found');
    };
    return RestService;
}());
export { RestService };
