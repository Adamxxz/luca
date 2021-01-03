import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {STChange, STColumn, STComponent, STData} from '@delon/abc/st';
import {SFSchema} from '@delon/form';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CONFIG_FILENAMES} from "tslint/lib/configuration";

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './management.component.html',
  styleUrls:['./management.component.less'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class VehicleManagementComponent implements OnInit {

  myVehicles:any;
  viewVehicles:any;
  viewVisible:boolean = true;
  ownVisible:boolean = false;
  videoVisible:boolean = false;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '车牌号'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;

  videoDetails:any;
  videoNames:any;
  viewColumns: STColumn[] = [
    { title: '编号', key:'statistical',index: 'id'},
    { title: '车牌号', index:'plateNo'},
    { title: '在线状态', index:'online', type:'enum', enum:{'true':'在线','false':'离线'}},
    { title: '视频主机', index: 'vin' , type: "link", click:(item:any)=>{
      this.videoVisible = true;
      this.videoNames = this.videoDetails[item.vin]
      }, },
    { title: '发动机编号', index:'engineNo'},
    { title: '在线时间', type: 'date', index: 'updatedAt' },
  ];

  myColumns: STColumn[] = [
    { title: '', type:'radio'  },
    { title: '编号', key:'statistical',index: 'id'},
    { title: '车牌号', index:'plateNo'},
    { title: '在线状态', index:'online', type:'enum', enum:{'true':'在线','false':'离线'}},
    { title: '视频主机', index: 'vin' , type: 'link', click:(item:any) =>{
        this.videoVisible = true;
        this.videoNames = this.videoDetails[item.vin]
      }},
    { title: '发动机编号', index:'engineNo'},
    { title: '在线时间', type: 'date', index: 'updatedAt' },
    { title: '操作' ,buttons: [
      { text: '查看',type: 'link',
        click: (item: any) => console.log(item) },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];
  selectedVehicle:STData;
  errMsg: string;
  vehicleAddVisible:boolean = false;
  vehicleEditVisible:boolean = false;

  validaFormBasic:FormGroup;
  validaFormCamera:FormGroup;

  basicAdd: boolean = false;
  cameraAdd: boolean = false;
  basicEdit:boolean = false;
  cameraEdit: boolean = false;
  addTag:number = 0;
  editTag:number = 0;
  vinSelected:any;
  buttonDisabled:boolean = true;
  deleteConfirm: boolean = false;
  selectedVehicleNo: any;
  videoPlayVisible: boolean = false;
  selectedVideoPath: any;


  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private fb:FormBuilder) {
    this.validaFormBasic = this.fb.group({
      vin:['',[Validators.required,]],
      plateNo:['',[Validators.required,Validators.minLength(7),VehicleManagementComponent.checkPlateNo]],
      engineNo:['',],
      liveCameraSeq:['',]
    });
    this.validaFormCamera = this.fb.group({
      vehicleVin:new FormControl({value:this.vinSelected,disabled:true}),
      appKey:['',[Validators.required,Validators.minLength(7)]],
      appSecret:['',[Validators.required,]],
      cameraSeq:['',[Validators.required,]],
      cameraDes:['',]
    })
  }

  ngOnInit() {
   this.viewInit();
   this.videoDetails = {'LZZ7CLXCXKC281622':['test_video.mp4'],'LZZ7CLXCXKC281623':[]}
  }

  ownGet(){
    this.http.get('/vehicle/own').subscribe((res)=>{
      if(res.code==1000){
        console.log('own',res);
        this.myVehicles = res.result
      }else{
        this.errMsg = '获取车辆信息错误';
      }
    });
  }

  viewGet(){
    this.http.get('/vehicle/viewable').subscribe((res)=>{
      if(res.code ==1000){
        console.log('viewable',res);
        this.viewVehicles = res.result;
      }else{
        this.errMsg = '获取车辆信息错误'
      }
    })
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  btnDefault(ele){
    ele.style.background = "none";
    ele.style.color = "white";
  }
  btnSelect(ele){
    ele.style.background = "white";
    ele.style.color = "black";
  }
  viewInit() {
    this.btnDefault(document.getElementById("vehicle-management-own-btn"));
    this.btnSelect(document.getElementById("vehicle-management-view-btn"));
    this.viewGet();
    this.viewVisible = true;
    this.ownVisible = false;

  }

  ownInit() {
    this.btnDefault(document.getElementById("vehicle-management-view-btn"));
    this.btnSelect(document.getElementById("vehicle-management-own-btn"));
    this.ownGet();
    this.viewVisible = false;
    this.ownVisible = true;
    this.buttonDisabled = true;
  }

  vehicleAdd() {
    this.vehicleAddVisible = true;
    this.validaFormBasic.reset();
    this.basicAdd= true;
    this.addTag = 1;
  }


  vehicleEdit() {
    if(this.selectedVehicle){
      this.validaFormBasic.patchValue(this.selectedVehicle);
      this.vehicleEditVisible = true;
      this.basicEdit= true;
      // this.validaFormCamera.patchValue({});
      this.editTag = 1;
    }
  }

  vehicleDelete() {
    if(this.selectedVehicle){
      this.deleteConfirm = true;
    }
  }

  vehicleSelect($event) {
    console.log($event);
  }
  static  checkPlateNo(control:FormControl){
    if(!control){
      return null
    }else{
      return true
    }
    // this.http.get('/vehicle/checkPlateNo').subscribe(res=>{})
  }

  addSubmit() {
    if(this.addTag==1){
      this.vinSelected = this.validaFormBasic.getRawValue().vin;
      this.validaFormCamera.patchValue({vehicleVin:this.vinSelected});
      //车辆基本信息注册，验证车牌号是否存在
      this.basicAdd = false;
      this.cameraAdd = true;
      this.addTag = 2;
    }else if(this.addTag == 2){
      //验证摄像头是否可用
      this.cameraAdd = false;
      this.vehicleAddVisible = false;
      this.addTag = 0;
    }
  }

  addCancel() {
    if(this.addTag ==2){
      this.cameraAdd = false;
      this.addTag = 0;
    }
    this.vehicleAddVisible = false;
  }

  editSubmit() {
    if(this.editTag==1){

      this.validaFormCamera.patchValue({vehicleVin:this.vinSelected});
      //车辆基本信息注册，验证车牌号是否存在
      this.basicEdit = false;
      this.cameraEdit = true;
      this.editTag = 2;
    }else if(this.editTag == 2){
      //验证摄像头是否可用
      this.cameraEdit = false;
      this.vehicleEditVisible = false;
      this.editTag = 0;
    }

  }

  editCancel() {
    if(this.editTag ==2){
      this.cameraEdit = false;
      this.editTag = 0;
    }
    this.vehicleEditVisible = false;

  }
  stChange($event:STChange) {
    if($event.radio){
      this.selectedVehicle = $event.radio;
      this.selectedVehicleNo = this.selectedVehicle.plateNo;
      this.buttonDisabled = !$event.radio.checked;
      console.log(this.selectedVehicle);
    }

  }

  deleteSubmit() {
    //删除提交操作
    this.deleteConfirm = false;
  }

  deleteCancel() {
    //删除取消
    this.deleteConfirm = false;
  }

  videoCancel() {
    this.videoVisible = false;
  }

  selectedVideoPlay(videoName) {
    this.selectedVideoPath = '../../../../assets/videos/'+videoName;
    this.videoPlayVisible = true;
  }

  videoPlayCancel() {
    this.videoPlayVisible = false;
  }
}
