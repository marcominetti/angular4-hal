import { Inject, Injectable } from '@angular/core';
import { ResourceHelper } from './resource-helper';
var ExternalService = /** @class */ (function () {
    function ExternalService(externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUri(externalConfigurationService.getProxyUri());
        ResourceHelper.setRootUri(externalConfigurationService.getRootUri());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }
    ExternalService.prototype.updateExternalConfigurationHandlerInterface = function (externalConfigurationService) {
        this.externalConfigurationService = externalConfigurationService;
        ResourceHelper.setProxyUri(externalConfigurationService.getProxyUri());
        ResourceHelper.setRootUri(externalConfigurationService.getRootUri());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    };
    ExternalService.prototype.getExternalConfiguration = function () {
        return this.externalConfigurationService.getExternalConfiguration();
    };
    ExternalService.prototype.getProxyUri = function () {
        return this.externalConfigurationService.getProxyUri();
    };
    ExternalService.prototype.getRootUri = function () {
        return this.externalConfigurationService.getRootUri();
    };
    ExternalService.prototype.getURL = function () {
        return ResourceHelper.getURL();
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
