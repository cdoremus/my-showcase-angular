import { MAX_FILE_SIZE } from './../shared/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentItem } from './../shared/contentitem';
import { ContentEditorService } from './contentEditor.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'contentEditor',
  styles: [
  `
    fieldset {
      border: 2px solid black;
      padding: 5px;
      width: 375px;
      margin: 0 auto;
    }

    uploadFormContainer {
      width: 400px;
      margin: 0 auto;
    }

    .contentFormContainer {
      width: 400px;
      margin: 0 auto;
    }

  `
  ],
  template: `
    <div>
      <div class="uploadFormContainer">
      <form [formGroup]="fileUploadForm">
        <fieldset>
          <label class="">Please Choose a File to Upload</label>
          <div>
            <input type="file"  class="form-control" formControlName="uploadedFile" (change)="uploadFile($event)"/>
          </div>
        </fieldset>
      </form>
      </div>
      <div class="contentFormContainer">
        <form [formGroup]="contentForm" (ngSubmit)="saveFileMetadata(contentForm)" >
          <fieldset>
            <label for="itemId">ID:</label>
              <input id="itemId" type="text" formControlName="itemId" readonly="true"/>
          </fieldset>
          <fieldset>
            <label for="contentTitle">Title:</label>
            <input id="contentTitle" type="text" placeholder="Enter title" formControlName="title" />
            <div class="error" *ngIf="contentForm.controls['title'].hasError('required')">
              Please enter the title
            </div>
          </fieldset>
          <fieldset>
            <label for="contentDesc">Description:</label>
            <input id="contentDesc" type="text" placeholder="Enter description" formControlName="description" />
            <div class="error" *ngIf="contentForm.controls['description'].hasError('required')">
              Please enter the description
            </div>
          </fieldset>
          <fieldset>
            <label for="filename">File Name:</label>
              <input id="filename" type="text" formControlName="filename" readonly="true"/>
          </fieldset>
          <fieldset>
            <label for="height">Height:</label>
              <input id="height" type="text" formControlName="height" readonly="true"/>
          </fieldset>
          <fieldset>
            <label for="width">Width:</label>
              <input id="width" type="text" formControlName="width" readonly="true"/>
          </fieldset>
          <fieldset>
            <label for="fileCreateDate">File Create Date:</label>
              <input id="fileCreateDate" type="text" formControlName="createDate" readonly="true"/>
          </fieldset>
          <div>
            <input type="submit" value="Submit Metadata" />
          </div>
        </form>
      </div>
    </div>
  `
})

export class ContentEditorComponent implements OnInit, OnDestroy {
  contentForm: FormGroup;
  fileUploadForm: FormGroup;
  private uploadFileSubscription: Subscription;
  private saveMetadataSubscription: Subscription;
  private hasUploadedFile: boolean;
  private currentFileData: ContentItem;
  message: string;

  constructor(fb: FormBuilder, private service: ContentEditorService) {
    this.contentForm = fb.group({
      itemId: ['0'],
      title: ['', Validators.required],
      description: ['', Validators.required],
      filename: [''],
      width: ['0'],
      height: ['0'],
      createDate: ['']

    });

    this.fileUploadForm = fb.group({
      uploadedFile: []
    });
  }

  ngOnInit(): void {
    this.hasUploadedFile = false;
  }

  ngOnDestroy(): void {
    if (this.uploadFileSubscription) {
      this.uploadFileSubscription.unsubscribe();
    }
    if (this.saveMetadataSubscription) {
      this.saveMetadataSubscription.unsubscribe();
    }
  }

  uploadFile(fileInput: any): void {
        let filesToUpload = <Array<File>> fileInput.target.files;
        // console.log('File selected: ', this.filesToUpload);
        if (filesToUpload && filesToUpload.length > 0) {
            let file: File = filesToUpload[0];
            // validate size < 2MB
            if (file.size > MAX_FILE_SIZE) {
                this.message = `Size of file ${file.name} is too large. Please select a file less than 2MB.`;
                return;
            }
            this.uploadFileSubscription = this.service.uploadFile(file)
                .subscribe(resp => {
                    this.currentFileData = resp;
                    this.hasUploadedFile = true;
                    this.contentForm.controls['itemId'].setValue(this.currentFileData.itemId);
                    this.contentForm.controls['filename'].setValue(this.currentFileData.filename);
                    this.contentForm.controls['height'].setValue(this.currentFileData.height);
                    this.contentForm.controls['width'].setValue(this.currentFileData.width);
                    this.contentForm.controls['createDate'].setValue(this.currentFileData.createDate);
                    this.message = `File '${file.name}' uploaded successfully. Please fill in title and description`;
                    console.log(`${this.message}. File: ${JSON.stringify(this.currentFileData)}`);
                },
                error => {
                    console.log('Error uploading file file metatdata', error);
                    this.message = this._parseErrorMessage(`Error uploading file ${file.name} with size ${file.size}:`, error);
                });
        } else {
            this.message = 'No upload files available';
            console.log(this.message);
        }
    }

 saveFileMetadata(form: FormGroup): void {
    console.log('ContentEditorComponent.saveFileMetadata form:', form.value);
    // let id: number = parseInt(form.value.id, 10);
    // let title: string = form.value.title;
    // let description: string = form.value.description;
    // let filename: string = form.value.filename;
    let file: ContentItem = form.value;
    if (file) {
      // let fileData: FileData = {id, title, description, filename};
      this.saveMetadataSubscription = this.service.saveFileMetadata(file)
        .subscribe(
          filedata => {
            console.log('Login service response', filedata);
            this.currentFileData = filedata;
        },
          error => console.log('Error in ContentEditor.saveFileMetadata()', error)
      );
    }

  }
    _parseErrorMessage(message: string, error: any): string {
        try { // try to parse out message
            let json = JSON.parse(error._body);
            console.log('Error body parsed', json);
            let msg = `${message}: ${json.message}`;
            console.log(`Parsed message returned: ${msg}`);
            return msg ;
        } catch (e) {
            console.log(`Problem parsing error message`, e);
            return `Error finding all uploaded file records`;
        }

    }

}
