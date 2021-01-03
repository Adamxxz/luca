import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UploadChangeParam, UploadFile} from "ng-zorro-antd";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter} from "rxjs/operators";
import {NgxEchartsDirective, NgxEchartsModule} from "ngx-echarts";
import {NgxEchartsConfig} from "ngx-echarts/lib/ngx-echarts.directive";

@Component({
  selector: 'app-simulation-scene-analysis',
  templateUrl: './scene-analysis.component.html',
  styleUrls:['./scene-analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SimulationSceneAnalysisComponent implements OnInit {





  constructor(private http: HttpClient) { }

  fileList:UploadFile[] = [];
  uploading = false;
  uploadMes: string;



  beforeUpload = (file: UploadFile): boolean => {
    console.log(file);
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(){
    let formData = new FormData();
    this.fileList.forEach((file:any)=>{
      formData.append('file',file)
    });
    this.uploading = true;
    formData.append("user","yuyongj");
    let req = new HttpRequest("POST",'/asc/upload',formData,{
      reportProgress:true,
      withCredentials:true
    });
    this.http.request(req).pipe(filter(e=>e instanceof HttpResponse))
      .subscribe(()=>{
        this.uploading = false;
        this.fileList = [];
        this.uploadMes = "上传成功"
      },
        ()=>{
        this.uploading = false;
        this.uploadMes = "上传失败"
        })
  }

  ngOnInit() { }

  handleChange({file,fileList}:UploadChangeParam) {
    let status = file.status;
    let fileName = file?file.name:fileList;
    if(status == "uploading"){
      this.uploadMes = fileName + "文件上传中"
    }
    if(status == 'done'){
      this.uploadMes = fileName +"上传成功"
    }
    if(status == 'error'){
      this.uploadMes = fileName +"上传失败"
    }
  }

  selectedFile ='';
  selectedSignal = '';
  fileOptions=[];
  signalOptions=[];
  sDetails = [];
  sDetailsIndex = [];
  getState:boolean = false;
  sDetailsState: string;
  detailsVisible:boolean = false ;
  chartInstance: any;
  chartVisible: boolean = false;
  analysisVisible: boolean = false;

  getUploadedFiles() {
    let user = "yuyongj";
    let url = "/asc/"+user;
    this.http.get(url).subscribe((res:any)=>{
      if(res.message=="success"){
        this.fileOptions = res.result.map(item=>{
          return{
            value:item, label:item
          }
        });
      }

    })
  }

  getSignalNames() {
    this.http.get("/asc/getSignalNames").subscribe((res:any)=>{
      if(res.message=="success"){
        this.signalOptions = res.result.map(item=>{
          return{
            value:item, label:item
          }
        });
      }else{
        if(res.message=="token invalid"){
          document.getElementById("getSignalDetailsState").innerHTML= "登录身份超时，请重新登录"
        }
      }
    })
  }


  signalDetails() {
    this.detailsVisible = true;
    this.sDetailsIndex = [];
    this.getState = true;
    let url = "/asc/getSignalValues/"+this.selectedFile+"/"+this.selectedSignal;
    this.http.get(url).subscribe((res:any)=>{
      if(res.message!="success"){
        document.getElementById("getSignalDetailsState").innerHTML= res.message+"数据获取失败"
      }else{
        this.getState = false;
        this.sDetailsState = 'Array('+res.result.length+')';
        for(let i=0;i<res.result.length;i++){
          this.sDetailsIndex.push(i);
        }
        this.sDetails = res.result;
        this.chartVisible = true;
        this.analysisOption.title.text = this.selectedSignal;
        this.analysisOption.title.subtext = this.selectedFile;
        this.analysisOption.xAxis.data = this.sDetailsIndex;
        this.analysisOption.series[0].name = this.selectedSignal;
        this.analysisOption.series[0].data = this.sDetails;
        this.chartInstance.setOption(this.analysisOption,true);
      }
    })
  }


  analysisOption={
    title: {
      text: '',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      bottom: '3%',
      left: '0%',
      right: '2%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '',
        type: 'line',
        stack: '数值',
        data: []
      },
    ]
  };


  analysisInit($event:any) {
    this.chartInstance = $event;
  }

  selectedFileChange() {

  }

  analysisOpen() {
    this.analysisVisible = true;
    this.getUploadedFiles();
    this.getSignalNames();
  }

  analysisCancel() {
    this.analysisVisible = false;
  }

}
