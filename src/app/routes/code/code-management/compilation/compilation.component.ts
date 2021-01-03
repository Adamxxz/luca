import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { SFSchema, SFUploadWidgetSchema } from '@delon/form';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-code-code-management-compilation',
  templateUrl: './compilation.component.html',
  styleUrls:['./compilation.component.less']
})
export class CodeCompilationComponent implements OnInit {
  fileList: NzUploadFile[] = [];
  formData = new FormData();
  // uploading: any;
  beforeUpload:any;

  schema: SFSchema = {
    properties: {
      // 拖动模式
      drag: {
        type: 'string',
        title: 'Drag',
        ui: {
          widget: 'upload',
          text:'上传',
          action: '/ci/uploadFile',
          // beforeUpload: (file: NzUploadFile): boolean => {
          //   console.log(file);
          //   this.fileList = this.fileList.concat(file);
          //   this.files = this.fileList;
          //   return false;
          // },
          // customRequest:(item: UploadXHRArgs):any => {
          //   console.log(item);
          //   this.formData.append(item.name,item.file as any);
          // },
          showUploadList:true,
          resReName: 'resource_id',
          urlReName: 'url',
          type: 'drag',
          showButton:true,
          // multiple: true,
        } as SFUploadWidgetSchema,
      },
    },
  };
  uploading = false;
  files: NzUploadFile[];

  constructor(private http: HttpClient,
              private msg:NzMessageService) { }

  ngOnInit() { }
  submit(value: any) {
    this.handleUpload();
    console.log('value',value);
    console.log(this.schema);
    this.msg.success(JSON.stringify(value));
  }

  handleUpload() {
    this.uploading = true;
    // You can use any AJAX library you like
    let formData = this.formData;
    console.log(formData.get('file'));
    let req = new HttpRequest('POST', '/ci/uploadFile', formData, {
      reportProgress: true,
      withCredentials:true
  });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  }
