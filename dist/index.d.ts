import { ModuleWithProviders } from '@angular/core';
import 'rxjs';
export { ExternalService } from './src/external.service';
export { RestService } from './src/rest.service';
export { Resource } from './src/resource';
export { ResourceArray } from './src/resource-array';
export { Sort } from './src/sort';
export { ResourceHelper } from './src/resource-helper';
export { ExternalConfiguration } from './src/ExternalConfiguration';
export { ExternalConfigurationHandlerInterface } from './src/external-configuration.handler';
export { HalOptions, HalParam } from "./src/rest.service";
export { SubTypeBuilder } from "./src/subtype-builder";
export declare class AngularHalModule {
    static forRoot(): ModuleWithProviders;
}
