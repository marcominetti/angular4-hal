import { HttpClient } from '@angular/common/http';
import { ExternalConfigurationHandlerInterface } from './external-configuration.handler';
import { ExternalConfiguration } from './ExternalConfiguration';
export declare class ExternalService {
    private externalConfigurationService;
    constructor(externalConfigurationService: ExternalConfigurationHandlerInterface);
    updateExternalConfigurationHandlerInterface(externalConfigurationService: ExternalConfigurationHandlerInterface): void;
    getExternalConfiguration(): ExternalConfiguration;
    getProxyUri(): Map<string, string>;
    getRootUri(): Map<string, string>;
    getURL(resource: string): string;
    getHttp(): HttpClient;
}
