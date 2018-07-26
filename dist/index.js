import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExternalService } from './src/external.service';
import { ResourceService } from './src/resource.service';
import 'rxjs';
export { ExternalService } from './src/external.service';
export { RestService } from './src/rest.service';
export { Resource } from './src/resource';
export { ResourceArray } from './src/resource-array';
export { ResourceHelper } from './src/resource-helper';
var AngularHalModule = /** @class */ (function () {
    function AngularHalModule() {
    }
    AngularHalModule.forRoot = function () {
        return {
            ngModule: AngularHalModule,
            providers: [
                ExternalService,
                HttpClient,
                {
                    provide: ResourceService,
                    useClass: ResourceService,
                    deps: [ExternalService]
                }
            ]
        };
    };
    AngularHalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    declarations: [],
                    exports: [HttpClientModule],
                    providers: [
                        ExternalService,
                        HttpClient,
                        {
                            provide: ResourceService,
                            useClass: ResourceService,
                            deps: [ExternalService]
                        }
                    ]
                },] },
    ];
    return AngularHalModule;
}());
export { AngularHalModule };
