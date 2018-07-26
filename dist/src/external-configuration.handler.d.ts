import { ExternalConfiguration } from './ExternalConfiguration';
import { HttpClient } from '@angular/common/http';
export interface ExternalConfigurationHandlerInterface {
    deserialize(): any;
    serialize(): any;
    getProxyUriMap(): Map<string, string>;
    getRootUriMap(): Map<string, string>;
    getHttp(): HttpClient;
    getExternalConfiguration(): ExternalConfiguration;
    setExternalConfiguration(externalConfiguration: ExternalConfiguration): any;
}
