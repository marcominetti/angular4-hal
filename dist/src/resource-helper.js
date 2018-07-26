import { HttpHeaders } from '@angular/common/http';
import { ResourceArray } from './resource-array';
import { isNullOrUndefined } from 'util';
import * as url from 'url';
var ResourceHelper = /** @class */ (function () {
    function ResourceHelper() {
    }
    Object.defineProperty(ResourceHelper, "headers", {
        get: function () {
            if (isNullOrUndefined(this._headers))
                this._headers = new HttpHeaders();
            return this._headers;
        },
        set: function (headers) {
            this._headers = headers;
        },
        enumerable: true,
        configurable: true
    });
    ResourceHelper.optionParams = function (params, options) {
        if (options) {
            if (options.params) {
                for (var _i = 0, _a = options.params; _i < _a.length; _i++) {
                    var param = _a[_i];
                    params = params.append(param.key, param.value.toString());
                }
            }
            if (options.size) {
                params = params.append('size', options.size.toString());
            }
            if (options.sort) {
                for (var _b = 0, _c = options.sort; _b < _c.length; _b++) {
                    var s = _c[_b];
                    var sortString = '';
                    sortString = s.path ? sortString.concat(s.path) : sortString;
                    sortString = s.order ? sortString.concat(',').concat(s.order) : sortString;
                    params = params.append('sort', sortString);
                }
            }
        }
        return params;
    };
    ResourceHelper.resolveRelations = function (resource) {
        var _this = this;
        var result = {};
        for (var key in resource) {
            if (!isNullOrUndefined(resource[key])) {
                if (ResourceHelper.className(resource[key])
                    .find(function (className) { return className == 'Resource'; })) {
                    if (resource[key]['_links'])
                        result[key] = resource[key]['_links']['self']['href'];
                }
                else if (Array.isArray(resource[key])) {
                    var array = resource[key];
                    if (array) {
                        array.forEach(function (element) { return _this.resolveRelations(element); });
                    }
                }
                else {
                    result[key] = resource[key];
                }
            }
        }
        return result;
    };
    ResourceHelper.createEmptyResult = function (resource, _embedded) {
        var resourceArray = new ResourceArray();
        resourceArray.resource = resource;
        resourceArray._embedded = _embedded;
        return resourceArray;
    };
    ResourceHelper.getClassName = function (obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(obj.constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    };
    ResourceHelper.className = function (objProto) {
        var classNames = [];
        var obj = Object.getPrototypeOf(objProto);
        var className;
        while ((className = ResourceHelper.getClassName(obj)) !== 'Object') {
            classNames.push(className);
            obj = Object.getPrototypeOf(obj);
        }
        return classNames;
    };
    ResourceHelper.instantiateResourceCollection = function (type, payload, result, builder) {
        if (result.hasOwnProperty('_embedded')) {
            for (var _i = 0, _a = Object.keys(payload[result._embedded]); _i < _a.length; _i++) {
                var embeddedClassName = _a[_i];
                var embedded = payload[result._embedded];
                var items = embedded[embeddedClassName];
                for (var _b = 0, items_1 = items; _b < items_1.length; _b++) {
                    var item = items_1[_b];
                    var instance = new type();
                    instance = this.searchSubtypes(builder, embeddedClassName, instance);
                    this.instantiateResource(instance, item);
                    result.push(instance);
                }
            }
        }
        else {
            var instance = new type();
            this.instantiateResource(instance, result);
            result.push(instance);
        }
        result.totalElements = payload.page ? payload.page.totalElements : result.length;
        result.totalPages = payload.page ? payload.page.totalPages : 1;
        result.pageNumber = payload.page ? payload.page.number : 1;
        result.pageSize = payload.page ? payload.page.size : 20;
        result.self_uri = payload._links && payload._links.self ? payload._links.self.href : undefined;
        result.next_uri = payload._links && payload._links.next ? payload._links.next.href : undefined;
        result.prev_uri = payload._links && payload._links.prev ? payload._links.prev.href : undefined;
        result.first_uri = payload._links && payload._links.first ? payload._links.first.href : undefined;
        result.last_uri = payload._links && payload._links.last ? payload._links.last.href : undefined;
        return result;
    };
    ResourceHelper.searchSubtypes = function (builder, embeddedClassName, instance) {
        if (builder && builder.subtypes) {
            var keys = builder.subtypes.keys();
            Array.from(keys).forEach(function (subtypeKey) {
                if (embeddedClassName.toLowerCase().startsWith(subtypeKey.toLowerCase())) {
                    var subtype = builder.subtypes.get(subtypeKey);
                    instance = new subtype();
                }
            });
        }
        return instance;
    };
    ResourceHelper.instantiateResource = function (entity, payload) {
        for (var p in payload) {
            //TODO array init
            /* if(entity[p].constructor === Array && isNullOrUndefined(payload[p]))
                 entity[p] = [];
             else*/
            entity[p] = payload[p];
        }
        return entity;
    };
    ResourceHelper.setProxyUriMap = function (proxy_uri) {
        ResourceHelper.proxy_uri_map = proxy_uri;
    };
    ResourceHelper.setRootUriMap = function (root_uri) {
        ResourceHelper.root_uri_map = root_uri;
    };
    ResourceHelper.getURL = function (resource) {
        var proxy_uri = ResourceHelper.proxy_uri_map[resource] || ResourceHelper.proxy_uri_map['*'];
        var root_uri = ResourceHelper.root_uri_map[resource] || ResourceHelper.root_uri_map['*'];
        return proxy_uri && proxy_uri != '' ?
            ResourceHelper.addSlash(proxy_uri) :
            ResourceHelper.addSlash(root_uri);
    };
    ResourceHelper.addSlash = function (uri) {
        var uriParsed = url.parse(uri);
        if (isNullOrUndefined(uriParsed.search) && uri && uri[uri.length - 1] != '/')
            return uri + '/';
        return uri;
    };
    ResourceHelper.getProxy = function (resource, url) {
        var proxy_uri = ResourceHelper.proxy_uri_map[resource] || ResourceHelper.proxy_uri_map['*'];
        var root_uri = ResourceHelper.root_uri_map[resource] || ResourceHelper.root_uri_map['*'];
        if (!proxy_uri || proxy_uri == '')
            return url;
        return ResourceHelper.addSlash(url.replace(root_uri, proxy_uri));
    };
    ResourceHelper.setHttp = function (http) {
        this.http = http;
    };
    ResourceHelper.getHttp = function () {
        return this.http;
    };
    ResourceHelper.getRootUri = function (resource) {
        var root_uri = ResourceHelper.root_uri_map[resource] || ResourceHelper.root_uri_map['*'];
        return ResourceHelper.addSlash(root_uri);
    };
    return ResourceHelper;
}());
export { ResourceHelper };
