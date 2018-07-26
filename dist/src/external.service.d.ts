import { HttpClient } from '@angular/common/http';
import { ExternalConfigurationHandlerInterface } from './external-configuration.handler';
import { ExternalConfiguration } from './ExternalConfiguration';
export declare class ExternalService {
    private externalConfigurationService;
    constructor(externalConfigurationService: ExternalConfigurationHandlerInterface);
    updateExternalConfigurationHandlerInterface(externalConfigurationService: ExternalConfigurationHandlerInterface): void;
    getExternalConfiguration(): ExternalConfiguration;
    getProxyUri(): string;
    getRootUri(): string;
    getURL(): string;
    getHttp(): HttpClient;
}
