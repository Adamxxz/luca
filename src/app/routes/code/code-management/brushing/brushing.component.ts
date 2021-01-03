import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NzMessageService, NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd";
import {SFSchema, SFUploadWidgetSchema} from "@delon/form";
import {HttpClient} from "@angular/common/http";
import { Injectable} from "@angular/core";


@Component({
  selector: 'app-code-code-management-brushing',
  templateUrl: './brushing.component.html',
  styleUrls:['./brushing.component.less'],
  changeDetection:ChangeDetectionStrategy.Default
})
@Injectable()
export class CodeBrushingComponent implements OnInit {

  constructor(private http: HttpClient,
              private msg:NzMessageService) { }

  fileList: NzUploadFile[] = [];
  formData = new FormData();

  schema: SFSchema = {
    properties: {
      //
      // drag: {
      //   type: 'string',
      //   title: 'Drag',
      //   ui: {
      //     widget: 'upload',
      //     text:'拖拽文件到此区域或点击选择上传文件',
      //     hint: '刷写不支持多文件同时进行，请上传编译完成的单个wod文件',
      //     action: '',
      //     beforeUpload: (file: NzUploadFile): boolean => {
      //       console.log(file);
      //       this.fileList = this.fileList.concat(file);
      //       this.files = this.fileList;
      //       return false;
      //     },
      //     customRequest:(item: NzUploadXHRArgs):any => {
      //       console.log(item);
      //       this.formData.append(item.name,item.file as any);
      //     },
      //     showUploadList:true,
      //     resReName: 'resource_id',
      //     urlReName: 'url',
      //     type: 'drag',
      //     multiple: true,
      //   } as SFUploadWidgetSchema,
      // },
    },
  };
  uploading = false;
  files: NzUploadFile[];



  ngOnInit() { }

  submit($event: {}) {
    console.log($event)
  }
}
