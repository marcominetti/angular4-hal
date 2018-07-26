import { HttpClient } from '@angular/common/http';
import { ExternalConfigurationHandlerInterface } from './external-configuration.handler';
import { ExternalConfiguration } from './ExternalConfiguration';
export declare class ExternalService {
    private externalConfigurationService;
    constructor(externalConfigurationService: ExternalConfigurationHandlerInterface);
    updateExternalConfigurationHandlerInterface(externalConfigurationService: ExternalConfigurationHandlerInterface): void;
    getExternalConfiguration(): ExternalConfiguration;
    getProxyUriMap(): Map<string, string>;
    getRootUriMap(): Map<string, string>;
    getURL(resource: string): string;
    getHttp(): HttpClient;
}
