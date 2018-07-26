import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceHelper } from './resource-helper';
import * as url from 'url';
var ResourceArray = /** @class */ (function () {
    function ResourceArray() {
        var _this = this;
        this.totalElements = 0;
        this.totalPages = 1;
        this.pageNumber = 1;
        this.result = [];
        this.push = function (el) {
            _this.result.push(el);
        };
        this.length = function () {
            return _this.result.length;
        };
        this.init = function (type, response, sortInfo) {
            var result = ResourceHelper.createEmptyResult(_this.resource, _this._embedded);
            result.sortInfo = sortInfo;
            ResourceHelper.instantiateResourceCollection(type, response, result);
            return result;
        };
        // Load next page
        this.next = function (type) {
            if (_this.next_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.resource, _this.next_uri), { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no next defined');
        };
        this.prev = function (type) {
            if (_this.prev_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.resource, _this.prev_uri), { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no prev defined');
        };
        // Load first page
        this.first = function (type) {
            if (_this.first_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.resource, _this.first_uri), { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no first defined');
        };
        // Load last page
        this.last = function (type) {
            if (_this.last_uri) {
                return ResourceHelper.getHttp().get(ResourceHelper.getProxy(_this.resource, _this.last_uri), { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no last defined');
        };
        // Load page with given pageNumber
        this.page = function (type, pageNumber) {
            if (_this.self_uri) {
                _this.self_uri = _this.self_uri.replace('{?page,size,sort}', '');
                _this.self_uri = _this.self_uri.replace('{&sort}', '');
                var urlParsed = url.parse(ResourceHelper.getProxy(_this.resource, _this.self_uri));
                var query = ResourceArray.replaceOrAdd(urlParsed.query, 'size', _this.pageSize.toString());
                query = ResourceArray.replaceOrAdd(query, 'page', pageNumber.toString());
                var uri = urlParsed.query ?
                    ResourceHelper.getProxy(_this.resource, _this.self_uri).replace(urlParsed.query, query) : ResourceHelper.getProxy(_this.resource, _this.self_uri).concat(query);
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no pages defined');
        };
        // Sort collection based on given sort attribute
        this.sortElements = function (type) {
            var sort = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                sort[_i - 1] = arguments[_i];
            }
            if (_this.self_uri) {
                _this.self_uri = _this.self_uri.replace('{?page,size,sort}', '');
                _this.self_uri = _this.self_uri.replace('{&sort}', '');
                var uri = ResourceHelper.getProxy(_this.resource, _this.self_uri).concat('?', 'size=', _this.pageSize.toString(), '&page=', _this.pageNumber.toString());
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, sort); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no sort available');
        };
        // Load page with given size
        this.size = function (type, size) {
            if (_this.self_uri) {
                var uri = ResourceHelper.getProxy(_this.resource, _this.self_uri).concat('?', 'size=', size.toString());
                uri = _this.addSortInfo(uri);
                return ResourceHelper.getHttp().get(uri, { headers: ResourceHelper.headers }).pipe(map(function (response) { return _this.init(type, response, _this.sortInfo); }), catchError(function (error) { return observableThrowError(error); }));
            }
            return observableThrowError('no sort available');
        };
    }
    ResourceArray.prototype.addSortInfo = function (uri) {
        if (this.sortInfo) {
            for (var _i = 0, _a = this.sortInfo; _i < _a.length; _i++) {
                var item = _a[_i];
                uri = uri.concat('&sort=', item.path, ',', item.order);
            }
        }
        return uri;
    };
    ResourceArray.replaceOrAdd = function (query, field, value) {
        if (query) {
            var idx = query.indexOf(field);
            var idxNextAmp = query.indexOf('&', idx) == -1 ? query.indexOf('/', idx) : query.indexOf('&', idx);
            if (idx != -1) {
                var seachValue = query.substring(idx, idxNextAmp);
                query = query.replace(seachValue, field + '=' + value);
            }
            else {
                query = query.concat("&" + field + '=' + value);
            }
        }
        else {
            query = "?" + field + '=' + value;
        }
        return query;
    };
    return ResourceArray;
}());
export { ResourceArray };
