import {ExternalConfiguration} from './ExternalConfiguration';
import {HttpClient} from '@angular/common/http';

export interface ExternalConfigurationHandlerInterface {
    deserialize();
    serialize();

    getProxyUriMap(): Map<string,string>;
    getRootUriMap(): Map<string,string>;
    getHttp(): HttpClient;


    getExternalConfiguration(): ExternalConfiguration;
    setExternalConfiguration(externalConfiguration: ExternalConfiguration);
}
