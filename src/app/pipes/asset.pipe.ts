import {Input, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {first, last, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import { AssetsProviderService } from '../Service/assets-provider.service';


@Pipe({
    name: 'asset',
    pure: false
})
export class AssetPipe implements PipeTransform {
    constructor() {}
    transform(value: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }
  /* @Input() protected provider: AssetsProviderService | any ;
    constructor(protected sanitizer: DomSanitizer) {
    }*/

  /*  public transform(value: any): Observable<SafeResourceUrl> {
        if (value ) {
            return this.provider.changed
                .pipe(
                    map(() => {
                            const data = this.provider.get(value);
                            if (!_.isNil(data) && !_.isEmpty(data)) {
                                const v = this.sanitizer.bypassSecurityTrustResourceUrl(data);
                                return v;
                            }
                        }
                    )
                );
        }

        return this.provider.changed
            .pipe(
                map(() => {
                        const data = this.provider.getOther('image-not-found');
                        return this.sanitizer.bypassSecurityTrustResourceUrl(data);
                    }
                )
            );
    }*/
}
