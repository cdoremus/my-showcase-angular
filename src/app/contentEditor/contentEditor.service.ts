import { AppStateService } from './../shared/appstate.service';
import { config } from '../app.config';
import { CONFIG } from '../shared/constants';
import { ContentItem } from '../shared/contentitem';
import { Observable } from 'rxjs';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ContentEditorService {

  constructor(private http: Http, @Inject(CONFIG) private config, appState: AppStateService) { }

  uploadFile(file: File): Observable<ContentItem> {
       // console.log(`File to upload in FileUploadService: `, file);
        let formData: FormData = new FormData();
        formData.append('uploadedFile', file);
        formData.append('loginId', this.getLoginId());
        // Note: Do NOT add headers
        return this.http.post(config.fileUploadUrl, formData)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
  }

  saveFileMetadata(fileData: ContentItem) {
        let formData: FormData = new FormData();
        formData.append('item', fileData);
        formData.append('loginId', this.getLoginId());
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(config.saveFileMetadata, formData, options)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
  }


  getLoginId() {
    // FIXME: change to real implementation
    return 'craig123';
  }
}

