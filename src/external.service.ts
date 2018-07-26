import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {ResourceHelper} from './resource-helper';
import {ExternalConfigurationHandlerInterface} from './external-configuration.handler';
import {ExternalConfiguration} from './ExternalConfiguration';

@Injectable()
export class ExternalService {

    constructor(@Inject('ExternalConfigurationService') private externalConfigurationService: ExternalConfigurationHandlerInterface) {
        ResourceHelper.setProxyUriMap(externalConfigurationService.getProxyUriMap());
        ResourceHelper.setRootUriMap(externalConfigurationService.getRootUriMap());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }

    public updateExternalConfigurationHandlerInterface(externalConfigurationService: ExternalConfigurationHandlerInterface) {
	this.externalConfigurationService = externalConfigurationService;

        ResourceHelper.setProxyUriMap(externalConfigurationService.getProxyUriMap());
        ResourceHelper.setRootUriMap(externalConfigurationService.getRootUriMap());
        ResourceHelper.setHttp(externalConfigurationService.getHttp());
    }

    public getExternalConfiguration(): ExternalConfiguration {
        return this.externalConfigurationService.getExternalConfiguration();
    }

    public getProxyUri(): Map<string,string> {
        return this.externalConfigurationService.getProxyUriMap();
    }

    public getRootUri(): Map<string,string> {
        return this.externalConfigurationService.getRootUriMap();
    }

    public getURL(resource: string): string {
        return ResourceHelper.getURL(resource);
    }

    public getHttp(): HttpClient {
        return ResourceHelper.getHttp();
    }
}
