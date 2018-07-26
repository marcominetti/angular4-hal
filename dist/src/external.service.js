import { Inject, Injectable } from '@angular/core';
import { ResourceHelper } from './resource-helper';
var ExternalService = /** @class */ (function () {
    function ExternalService(externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUriMap(externalConfigurationService.getProxyUriMap());
        ResourceHelper.setRootUriMap(externalConfigurationService.getRootUriMap());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }
    ExternalService.prototype.updateExternalConfigurationHandlerInterface = function (externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUriMap(externalConfigurationService.getProxyUriMap());
        ResourceHelper.setRootUriMap(externalConfigurationService.getRootUriMap());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    };
    ExternalService.prototype.getExternalConfiguration = function () {
        return this.externalConfigurationService.getExternalConfiguration();
    };
    ExternalService.prototype.getProxyUri = function () {
        return this.externalConfigurationService.getProxyUriMap();
    };
    ExternalService.prototype.getRootUri = function () {
        return this.externalConfigurationService.getRootUriMap();
    };
    ExternalService.prototype.getURL = function (resource) {
        return ResourceHelper.getURL(resource);
    };
    ExternalService.prototype.getHttp = function () {
        return ResourceHelper.getHttp();
    };
    ExternalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ExternalService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['ExternalConfigurationService',] }] }
    ]; };
    return ExternalService;
}());
export { ExternalService };
