import { throwError as observableThrowError, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ResourceHelper } from './resource-helper';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
var Resource = /** @class */ (function () {
    function Resource() {
    }
    Object.defineProperty(Resource.prototype, "subtypes", {
        get: function () {
            return this._subtypes;
        },
        set: function (_subtypes) {
            this._subtypes = _subtypes;
        },
        enumerable: true,
        configurable: true
    });
    // Get collection of related resources
    Resource.prototype.getRelationArray = function (type, relation, _embedded, options, builder) {
        var params = ResourceHelper.optionParams(new HttpParams(), options);
        var result = ResourceHelper.createEmptyResult(relation, isNullOrUndefined(_embedded) ? "_embedded" : _embedded);
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '')), {
                headers: ResourceHelper.headers,
                params: params
            });
            return observable.pipe(map(function (response) { return ResourceHelper.instantiateResourceCollection(type, response, result, builder); }), map(function (array) { return array.result; }));
        }
        else {
            return observableOf([]);
        }
    };
    // Get related resource
    Resource.prototype.getRelation = function (type, relation, builder) {
        var result = new type();
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            var observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '')), { headers: ResourceHelper.headers });
            return observable.pipe(map(function (data) {
                if (builder) {
                    for (var _i = 0, _a = Object.keys(data['_links']); _i < _a.length; _i++) {
                        var embeddedClassName = _a[_i];
                        if (embeddedClassName == 'self') {
                            var href = data._links[embeddedClassName].href;
                            var idx = href.lastIndexOf('/');
                            var realClassName = href.replace(ResourceHelper.getRootUri(relation), "").substring(0, idx);
                            result = ResourceHelper.searchSubtypes(builder, realClassName, result);
                            break;
                        }
                    }
                }
                return ResourceHelper.instantiateResource(result, data);
            }));
        }
        else {
            return observableOf(null);
        }
    };
    // Adds the given resource to the bound collection by the relation
    Resource.prototype.addRelation = function (relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().put(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '')), resource._links.self.href, { headers: header });
        }
        else {
            return observableThrowError('no relation found');
        }
    };
    // Bind the given resource to this resource by the given relation
    Resource.prototype.updateRelation = function (relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().patch(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '')), resource._links.self.href, { headers: header });
        }
        else {
            return observableThrowError('no relation found');
        }
    };
    // Bind the given resource to this resource by the given relation
    Resource.prototype.substituteRelation = function (relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(this._links[relation])) {
            var header = ResourceHelper.headers.append('Content-Type', 'text/uri-list');
            return ResourceHelper.getHttp().put(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '')), resource._links.self.href, { headers: header });
        }
        else {
            return observableThrowError('no relation found');
        }
    };
    // Unbind the resource with the given relation from this resource
    Resource.prototype.deleteRelation = function (relation, resource) {
        if (!isNullOrUndefined(this._links) && !isNullOrUndefined(resource._links)) {
            var link = resource._links['self'].href;
            var idx = link.lastIndexOf('/') + 1;
            if (idx == -1)
                return observableThrowError('no relation found');
            var relationId = link.substring(idx);
            return ResourceHelper.getHttp().delete(ResourceHelper.getProxy(relation, this._links[relation].href.replace('{?projection}', '') + '/' + relationId), { headers: ResourceHelper.headers });
        }
        else {
            return observableThrowError('no relation found');
        }
    };
    Resource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Resource.ctorParameters = function () { return []; };
    return Resource;
}());
export { Resource };
