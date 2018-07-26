import { ExternalConfiguration } from './ExternalConfiguration';
import { HttpClient } from '@angular/common/http';
export interface ExternalConfigurationHandlerInterface {
    deserialize(): any;
    serialize(): any;
    getProxyUri(): string;
    getRootUri(): string;
    getHttp(): HttpClient;
    getExternalConfiguration(): ExternalConfiguration;
    setExternalConfiguration(externalConfiguration: ExternalConfiguration): any;
}
