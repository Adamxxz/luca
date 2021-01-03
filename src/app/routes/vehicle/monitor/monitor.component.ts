import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  Optional
} from '@angular/core';
import {SettingsService, _HttpClient} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
declare const AMap: any;
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import * as THREE from "three";
import {Vector3, WebGLRenderer, WebGLRenderTarget} from "three";
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";


@Component({
  selector: 'app-vehicle-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VehicleMonitorComponent implements OnInit {

  MeshLine = require('../../../../assets/three/meshline.js');
  ckplayer = require('../../../../assets/ckplayer/ckplayer.js');

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    // private cdf: ChangeDetectorRef,
    private router: Router,
    private settingsService: SettingsService,
    @Optional()
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {}


  city = '潍坊';
  windowWidth: number;
  player1: any;
  player2: any;
  player3:any;
  player4:any;
  src1: any;
  src2: any;
  error = '';
  vehicles = [];
  infoInterval: any;
  laneTimeout:any;
  laneInterval: any;
  charInstance: any;
  noticeMsg: string;
  map: any;
  @Input() center: number[];
  @Input() speed: number;
  @Input() address: any;
  vehicleData: any;
  vehicleState: any;

  boardOption = {
    backgroundColor: 'rgba(0,0,0,1)',
    tooltip: {
      formatter: '{a} <br/>{c} {b}'
    },
    toolbox: {
      show: false,
    },
    series: [

      {
        name: '速度',
        type: 'gauge',
        min: 0,
        max: 200,
        splitNumber: 10,
        radius: '50%',
        center: ['48.5%' , '30%'],
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.1, 'lime'], [0.7, '#1e90ff'], [1, '#ff4500']],
            width: 2,
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        axisLabel: {            // 坐标轴小标记
          fontWeight: 'bolder',
          fontSize: 8,
          color: '#fff',
          shadowColor: '#fff',
          shadowBlur: 10
        },
        axisTick: {            // 坐标轴小标记
          length: 12,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        splitLine: {           // 分隔线
          length: 15,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        pointer: {           // 分隔线
          shadowColor: '#fff',
          shadowBlur: 5
        },
        title: {
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            // fontSize: 20,
            fontStyle: 'italic',
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        detail: {
          backgroundColor: 'rgba(30,144,255,0.8)',
          borderWidth: 1,
          borderColor: '#fff',
          shadowColor: '#fff',
          fontSize: 18,
          shadowBlur: 5,
          offsetCenter: [0, '70%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            color: '#fff'
          }
        },
        data: [{value: undefined, name: 'km/h'}]
      },
      {
        name: '油门',
        type: 'gauge',
        center: ['18%', '35%'],    // 默认全局居中
        radius: '40%',
        min: 0,
        max: 100,
        endAngle: 45,
        splitNumber: 5,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
            width: 2,
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        axisLabel: {            // 坐标轴小标记
          fontWeight: 'bolder',
          fontSize: 8,
          color: '#fff',
          shadowColor: '#fff',
          shadowBlur: 10
        },
        axisTick: {            // 坐标轴小标记
          length: 10,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        splitLine: {           // 分隔线
          length: 20,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        pointer: {
          width: 5,
          shadowColor: '#fff',
          shadowBlur: 5
        },
        title: {
          offsetCenter: [0, '-20%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        detail: {
          formatter: '{value}%',
          // borderWidth: 1,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowBlur: 5,
          width: 80,
          height: 30,
          fontSize: 15,
          offsetCenter: [0, '50%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            color: '#fff'
          }
        },
        data: [{value: undefined, name: '油门'}]
      },
      {
        name: '刹车',
        type: 'gauge',
        center: ['81%', '35%'],    // 默认全局居中
        radius: '40%',
        min: 0,
        max: 100,
        startAngle: 145,
        splitNumber: 5,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
            width: 2,
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        axisLabel: {            // 坐标轴小标记
          fontWeight: 'bolder',
          fontSize: 8,
          color: '#fff',
          shadowColor: '#fff',
          shadowBlur: 10
        },
        axisTick: {            // 坐标轴小标记
          length: 10,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        splitLine: {           // 分隔线
          length: 20,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        pointer: {
          width: 5,
          shadowColor: '#fff',
          shadowBlur: 5
        },
        title: {
          offsetCenter: [0, '-30%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        detail: {
          // borderWidth: 1,
          formatter: '{value}%',
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowBlur: 5,
          width: 80,
          height: 30,
          fontSize: 15,
          offsetCenter: [0, '50%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            color: '#fff'
          }
        },
        data: [{value: undefined, name: '刹车'}]
      },
      {
        name: '挡位',
        type: 'gauge',
        center: ['82%', '82%'],    // 默认全局居中
        radius: '40%',
        min: 0,
        max: 14,
        startAngle: 150,
        endAngle: 30,
        splitNumber: 2  ,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
            width: 2,
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        axisTick: {            // 坐标轴小标记
           show: false,
        },
        axisLabel: {
          fontWeight: 'bolder',
          fontSize: 9,
          color: '#fff',
          shadowColor: '#fff',
          shadowBlur: 10,
        },
        splitLine: {           // 分隔线
          length: 15,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        pointer: {
          width: 2,
          shadowColor: '#fff',
          shadowBlur: 5
        },
        title: {
          offsetCenter: [0, '-30%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        detail: {
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowBlur: 5,
          width: 80,
          height: 30,
          fontSize: 15,
          offsetCenter: [0, '30%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            color: '#fff'
          }
        },
        data: [{value: undefined, name: '挡位'}]
      },
    ]
  };

  pcVisible = false;
  pcWindow = false;
  plateNo: any;
  mobileWindow = false;
  mobileVisible = false;
  vin: any;
  historyVisible: boolean = false;

  // private Amap: any;

// 监控页面加载
  L4Window:boolean = false;
  lane:any;

  L4Play(vehicle) {
    const isMobile = this.settingsService.user.isMobile;
    if (isMobile){
      this.mobileVisible = true;
      this.L4Window = true;
    }else{
      this.pcVisible = true;
      this.L4Window = true;
    }

    this.vin = vehicle[4][1].toString();
    this.plateNo = vehicle[0][1];
    const liveUrl = '/vehicle/lives/' + this.vin;
    let liveErr = '';
    if (this.vin){
      liveErr = '获取主机视频信息失败，请检查视频主机是否正常';
    }else{
      liveErr = '此车辆未绑定视频主机';
    }

    this.http.get(liveUrl,{},{withCredentials:true}).subscribe((liveRes) => {
      if (liveRes.message !== 'success'){
        this.error = liveRes.message;
        this.msg.error(this.error + liveErr);
        return;
      }
      let url1 = liveRes.result[0].liveAddress.replace(/http/,"https");
      let url2 = liveRes.result[1].liveAddress.replace(/http/,"https");
      let videoObject3 = {
        container: '#player3',
        variable: 'player3',
        autoplay: true,
        live:true,
        poster:"../../../../assets/logoV.png",
        html5m3u8:true,
        mobileAutoFull: false,
        video:url1,
      };
      this.player3 = new ckplayer(videoObject3);
      let videoObject4 = {
        container: '#player4',
        variable: 'player4',
        autoplay: true,
        live:true,
        poster:"../../../assets/logoV.png",
        html5m3u8:true,
        mobileAutoFull: false,
        video:url2,
      };
      this.player4 = new ckplayer(videoObject4);
    }
  )}


  monitorPlay(vehicle){

    const isMobile = this.settingsService.user.isMobile;
    if (isMobile){
      this.mobileVisible = true;
      this.mobileWindow = true;
    }else{
      this.pcVisible = true;
      this.pcWindow = true;
      // this.mobileVisible = true;
      // this.mobileWindow = true;
    }
    const that = this;
    this.windowWidth = window.screen.width;
    this.vin = vehicle[4][1].toString();
    this.plateNo = vehicle[0][1];
    // let el = document.getElementById("laneDraw");
    // let scene = this.createScene(el);
    let liveErr = '';
    if (this.vin){
      liveErr = '获取主机视频信息失败，请检查视频主机是否正常';
    }else{
      liveErr = '此车辆未绑定视频主机';
    }
    const liveUrl = '/vehicle/lives/' + this.vin;
    this.http.get(liveUrl,{},{withCredentials:true}).subscribe((liveRes) => {
      if (liveRes.message !== 'success'){
        this.error = liveRes.message;
        this.msg.error(this.error + liveErr);
        return;
      }

      let cameras = liveRes.result;
      let src1,src2;
      if(this.plateNo =="潍柴L4测试"){
        src1 = "http://hls01open.ys7.com/openlive/b38dd1aa27f24460bdf9d0134be8ed3f.m3u8";
        src2 = "http://hls01open.ys7.com/openlive/3606f6b8fe7d4e67bbde76a1ede6bd9f.m3u8";
      }else{
        src1 = cameras[0].liveAddress.replace(/http/,"https");
        src2 = cameras[1].liveAddress.replace(/http/,"https");
      }


      let videoObject1 = {
        container: '#player1',//“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player1',//该属性必需设置，值等于下面的new chplayer()的对象
        autoplay: true,//自动播放
        live:true,
        poster:"../../../../assets/logoV.png",
        html5m3u8:true,
        mobileAutoFull: false,
        video:src2//视频地址
      };
      this.player1 = new ckplayer(videoObject1);
      let videoObject2 = {
        container: '#player2',
        variable: 'player2',
        autoplay: true,
        live:true,
        poster:"../../../assets/logoV.png",
        html5m3u8:true,
        mobileAutoFull: false,
        video:src1,
      };
      this.player2 = new ckplayer(videoObject2);
    });



    // 获取实时数据
    const realUrl = '/vehicle/realtime/' + this.vin;
    let timeP: any;
    let timeU: any;
    let tagOnline = 0;
    let tagSpeed = 0;
    let tagOpen = 0;
    let addInfo: any;
    let scene = this.createScene();
    //定时函数，保证scene创建完成之后再执行渲染
    this.laneTimeout = setTimeout(()=>
      this.laneDraw(scene),1000
    );
    this.infoInterval = setInterval(() => {
      this.http.get(realUrl).subscribe((res: any) => {
          if (tagOpen == 0){
            this.scrollItem('正在获取数据...', 'yellow');
            tagOpen = 1;
          }
          if (res.message !== 'success'){
            this.error = res.message;
            if(this.error == "token invalid"){
              this.router.navigateByUrl('/passport/login').then(()=>
                that.msg.error('登录超时，请重新登陆')
              )
            }else{
              this.scrollItem('数据获取失败！</br>' + this.error, 'red');
            }

          }else{
            if (tagOpen == 1){
              this.scrollItem('获取数据完成！', 'yellow');
              tagOpen = 2;
            }
            const realData = res.result;
            // console.log(realData);
            if (realData)  {
              if(realData.lane){
                this.lane = realData.lane;
              }else{
                this.scrollItem('未获取到车道线数据！', 'red');
              }
              const avg = realData.avg_fuel_csmpt;
              const inst = realData.inst_fuel_csmpt;
              const steer = realData.steer;
              realData.avg_fuel_csmpt = avg == 0 ? 0 : (100 / avg).toFixed(2);
              realData.inst_fuel_csmpt = inst == 0 ? 0 : (100 / inst).toFixed(2);
              //设置方向盘
              let wheel = document.getElementById("vehicle-wheel-image");
              realData.steer = (steer * 180 / 3.1416).toFixed(2);
              if(wheel){
                wheel.style.transform = "rotate("+realData.steer+"deg)";
              }
              // 坐标信息
              that.vehicleData = realData;
              timeP = that.timeForm(realData.timestamp);
              const centerOri = [realData.longitude, realData.latitude];
              // console.log(realData);
              this.vehicleState = [
                ['ACC', realData.acc,{'0':"未开启",'1':"使用中",'2':"准备就绪"},{'0':"red",'1':"green",'2':"blue"}],
                ['LKA', realData.lka,{'0':"未开启",'1':"使用中",'2':"准备就绪"},{'0':"red",'1':"green",'2':"blue"}],
                // ['CAMERA',realData.camera],
                // ['ENGINE',realData.engine_state],
                // ['IGNITION',realData.ignition_state],
                ['GPS', realData.loc_state,{'0':"开启",'1':"关闭",'3':'定位失败'},{'0':"green",'1':"red","3":"red"}],
                ['ONLINE', realData.online,{true:"在线",false:"离线"},{true:"green",false:"red"}],
              ];

              AMap.convertFrom(centerOri, 'gps', function(status, result) {
                that.center = result.locations[0];
                AMap.plugin('AMap.Geocoder', function() {
                  const geo = new AMap.Geocoder({radius: 10, extensions: 'all'});
                  geo.getAddress(that.center, function(status, result) {
                      if (result.info == 'OK'){
                      that.address = result.regeocode.formattedAddress;
                      if (!realData.online){
                        if (tagOnline == 0){
                          tagOnline = 1;
                          addInfo = '车辆已离线！</br>' +
                            '离线时间: ' + timeP + '</br>' +
                            '离线位置: ' + that.address;
                          that.scrollItem(addInfo, 'red');
                        }
                      }else{
                        if (tagOnline == 1){
                          tagOnline = 0;
                          tagOpen = 0;
                          addInfo = '车辆上线!</br>' +
                                    '上线时间: ' + timeP + '</br>';
                          '上线位置: ' + that.address;
                          that.scrollItem(addInfo, 'yellow');
                        }
                        addInfo = timeP + ': ' + that.address;
                        if (realData.speed == 0){
                          if (tagSpeed == 0){
                            tagSpeed = 1;
                            addInfo = '车辆已停止！</br>' + addInfo;
                            that.scrollItem(addInfo, 'red');
                          }
                        }else{
                          if (tagSpeed == 1){
                            tagSpeed = 0;
                            addInfo = '车辆启动！</br>' + addInfo;
                            that.scrollItem(addInfo, 'yellow');
                          }else{
                            if (timeU !== realData.timestamp){
                              that.scrollItem(addInfo);
                            }
                          }
                        }
                      }
                    }else{
                      addInfo = timeP + ': ' + result.info + '！，获取地址失败！<br>'+'最后定位位置：'+that.address+'<br>';
                      that.scrollItem(addInfo, 'red');
                    }
                      timeU = realData.timestamp;
                  });
                });
              });
              this.boardOption.series[0].data[0].value = parseInt(realData.speed);
              this.boardOption.series[1].data[0].value = parseInt(realData.throttle);
              this.boardOption.series[2].data[0].value = parseInt(realData.brake);
              this.boardOption.series[3].data[0].value = parseInt(realData.gear);
              this.charInstance.setOption(this.boardOption, true);
          }else{
              tagOpen = 0;
              this.scrollItem('数据初始化失败！数据为空！', 'red');
          }
        }
        });
    }, 1000);
  }

  // onPluginsLoaded(mapObj: AMap.Map) {
  //   const mousetool = new AMap.MouseTool(mapObj);
  //   mousetool.marker(); // 使用鼠标工具，在地图上画标记点
  //   const ruler = new AMap.RangingTool(mapObj);
  //   ruler.turnOn();
  // }

  ngOnInit() {
    this.http.get('/vehicle/viewable')
      .subscribe((res: any) => {
        if (res.message !== 'success'){
          this.error = res.message;
          if (res.code == 4000){
            this.msg.error('登录超时，请重新登录');
            this.router.navigateByUrl('/passport/login');
          }
          return;
        }
        const result = res.result;
        if (result[0]){
          for (const i in result){
            let vehicle = [];
            vehicle = [
              ['车牌号', result[i].plateNo],
              ['车辆拥有者', result[i].owner],
              ['是否在线', result[i].online],
              ['发动机编号', result[i].engineNo],
              ['视频主机编号', result[i].vin],
              ['车辆ID', result[i].id],
            ];
            this.vehicles.push(vehicle);
          }
        }else{
          this.noticeMsg = '无可监控的授权车辆';
        }
      }, error1 => this.router.navigateByUrl('/'));

  }


  chartInit($event: any) {
    this.charInstance = $event;
  }

  mapReady($event: any) {
    this.map = $event;
  }


  timeForm(timeP){
    const year = this.doubleStr(new Date(timeP).getUTCFullYear());
    const month = this.doubleStr(new Date(timeP).getUTCMonth() + 1);
    const day = this.doubleStr(new Date(timeP).getUTCDate());
    const hour = this.doubleStr(new Date(timeP).getHours());
    const minute = this.doubleStr(new Date(timeP).getMinutes());
    const seconds = this.doubleStr(new Date(timeP).getSeconds());
    return  year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
  }

  doubleStr(item){
    return item < 10 ? '0' + item : item;
  }

  scrollItem(addInfo, color= 'white'){
    const scrollDiv = document.getElementById('scroll-div');
    scrollDiv.insertAdjacentHTML('beforeend', '<div style=\'color: ' + color + '\'>' + addInfo + '</div>');
    if (document.activeElement.id == 'scroll-div'){
      return;
    }
    // scrollDiv.scrollIntoView();
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }


  pcCancel($event) {
    if ($event.target.className == 'hmi-modal ng-star-inserted'){

      this.historyVisible = false;
      this.L4Window = false;
      this.pcWindow = false;
      this.pcVisible = false;

      window.clearInterval(this.laneInterval);
      window.clearTimeout(this.laneTimeout);
      window.clearInterval(this.infoInterval);
    }
   }


  mobileCancel() {
    clearInterval(this.infoInterval);
    clearInterval(this.laneTimeout);
    clearInterval(this.laneInterval);
    this.mobileWindow = false;
    this.mobileVisible = false;
    this.L4Window = false;
    this.historyVisible = false;
  }

  lineArr: any;
  myMarker:any;
  endMarker:any;
  startValue: any;
  endValue: any;
  historyState:any;
  endOpen: boolean = false;

  disabledStartDate = (startValue:Date):boolean =>{
    if(!startValue||!this.endValue){
      return false;
    }
    return startValue.getTime()>this.endValue.getTime();
  };

  disabledEndDate = (endValue:Date):boolean=>{
    if(!endValue||!this.startValue){
      return  false;
    }
    return endValue.getTime()<= this.startValue.getTime();
  };



  historyShowInit() {
    this.historyVisible = !this.historyVisible;
    this.historyState = "默认显示当前时间前1小时轨迹\n";
    this.myMarker=null;
    this.lineArr=[];
    let currentTime = new Date().getTime();
    this.endValue = this.timeForm(currentTime);
    this.startValue = this.timeForm(currentTime-3600000);
    this.historyShow();
  }


  historyShow() {
    let timeBegin = this.startValue;
    let timeEnd = this.endValue;
    let url = "/vehicle/historyPos/"+this.vin+"/"+timeBegin+"/"+timeEnd;
    this.http.get(url).subscribe((posArr)=>{
      this.lineArr = posArr.result;
      if(posArr.result.time){
          this.historyState = this.historyState+'\n'+timeBegin+"至"+timeEnd+"车辆离线状态,显示最后离线位置";
          this.lineArr = [[posArr.result.longitude,posArr.result.latitude]]
      }
      let lengthArr = this.lineArr.length;
      let map = new AMap.Map("history-map", {
        resizeEnable: true,
        center: this.lineArr[0],
        zoom: 17,
        viewMode:"3D",
      });

      this.myMarker = new AMap.Marker({
        map: map,
        position: this.lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle:-90,
      });

      this.endMarker = new AMap.Marker({
        map: map,
        position: this.lineArr[lengthArr-1],
        icon: "https://webapi.amap.com/images/5.png",
        autoRotation: true,
      });
      // 绘制轨迹
      let polyline = new AMap.Polyline({
        map: map,
        path: this.lineArr,
        showDir:true,
        strokeColor: "#28F",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
      });

      let passedPolyline = new AMap.Polyline({
        map: map,
        // path: lineArr,
        strokeColor: "#AF5",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
      });


      this.myMarker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath);
      });

      map.setFitView();

      this.myMarker.on('click',function (e) {
      })

    },(err)=>{
      this.msg.error(err);
    })
  }

  historyCancel() {
    this.historyVisible = false;
  }

  startAnimation (marker,lineArr) {
    if(marker&&lineArr){
      marker.moveAlong(lineArr, 500,function (num) {
        return num;
      });
    }else{
      this.msg.error("请先选择时间确定路径")
    }
  }

  pauseAnimation (marker) {
    if(marker){
      marker.pauseMove();
    }
  }

  resumeAnimation (marker) {
    if(marker){
      marker.resumeMove();
    }
  }

  stopAnimation (marker) {
    if(marker){
      marker.stopMove();
    }
  }



  onOk(result: Date | Date[] | null): void {
    let currentT = new Date().getTime();
    let startT = result[0].getTime();
    let endT = result[1].getTime();
    if(startT>currentT||startT>=endT){
      this.historyState = "起止时间不正确，请选择正确的时间段";
    }else{
      this.startValue = this.timeForm(startT);
      this.endValue = this.timeForm(endT);
      this.historyState = "";
      this.historyShow();
    }
  }

  createScene(){
    let scene = new THREE.Scene();
    // 创建地面对象
    let gg = new THREE.PlaneGeometry( 40, 80 );
    let gm = new THREE.MeshPhongMaterial( { color: "black" } );
    let ground = new THREE.Mesh( gg, gm );
    ground.rotation.x =  -Math.PI/2;
    scene.add(ground);
    ground.geometry.dispose();
    ground.material.dispose();
    gg.dispose();
    gm.dispose();

    // 点光源
    var point = new THREE.PointLight('white');
    point.position.set(-80, 80, 0);
    scene.add(point);
    // 环境光
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // 加载货车对象
    let sPoint = new Vector3(0,1,0);
    let fbxLoader = new FBXLoader();
    fbxLoader.load('../../../assets/three/simTruck.fbx',function (fbx) {
      fbx = fbx.rotateOnWorldAxis(sPoint,-Math.PI/2);
      scene.add(fbx);
      fbx.scale.set(0.0004,0.0003,0.0002);
      fbx.position.set(-4,0,0);
     fbx.children[1].children[0].children.map((mesh)=>{
       mesh.remove();
     })
    });
    scene.matrixAutoUpdate = true;
    return scene;
  }

  laneDraw(scene){
    let el = document.getElementById("laneDraw");
    //车道线颜色
    let laneColor = {
      '0':'white',
      '1':'yellow',
      '2':'red',
      '3':'blue',
      '6':'white',
      '7':'white',
    };
    let renderer = new THREE.WebGLRenderer();
    let width = el.clientWidth; //窗口宽度
    let height = el.clientHeight; //窗口高度
    let k = width / height; //窗口宽高比
    // let s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    let camera = new THREE.PerspectiveCamera(80,  k,0.1,100);
    camera.position.set(-7, 1.8,0 ); //设置相机位置
    camera.lookAt(scene.position); //设置THREE.PerspectiveCamera相机方向(指向的场景对象)

    renderer.setClearColor("white", 1); //设置背景颜色
    el.appendChild(renderer.domElement); //el元素中插入canvas对象

    function render() {
      let width = el.clientWidth; //窗口宽度
      let height = el.clientHeight; //窗口高度
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.render(scene,camera);//执行渲染操作
      requestAnimationFrame(render);
      renderer.dispose();
      // .rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
      // requestAnimationFrame(render);
    }
    //车道线数据lane（A,B,C,D,置信度，虚实）
    this.laneInterval = setInterval(()=>{
      scene.children = [scene.children[0],scene.children[1],scene.children[2],scene.children[3]];
      if(this.lane){
        //加载车道线
        for(let i=0;i<=3;i++){
          //根据置信度判断是否画出车道线
          if(this.lane[i][4]>=80){
            let color = laneColor[this.lane[i][5]];
            let A = this.lane[i][0];
            let B = this.lane[i][1];
            let C = this.lane[i][2];
            let D = this.lane[i][3];
            let geometry = new THREE.Geometry();
            for(let j=-5;j<20;j++){
              let Z = this.pointPath(A,B,C,D,j);
              let point = new THREE.Vector3(j,0,Z);
              geometry.vertices.push(point);
            }
            // let curve = new THREE.CatmullRomCurve3(myPoints);
            // let CurvePath = new THREE.CurvePath();
            // CurvePath.curves.push(curve);
            // let geometry = new THREE.Geometry();
            // let points = CurvePath.getPoints(50);
            // geometry.setFromPoints(points);
            // let line = new THREE.Line(geometry,material);
            // line.computeLineDistances();
            // scene.add(line);
            let line = new this.MeshLine.MeshLine();
            line.setGeometry(geometry);
            geometry.dispose();
            let material = new this.MeshLine.MeshLineMaterial({
              color:color,
              // sizeAttenuation:true,
              lineWidth:0.05
            });
            let myLine = new THREE.Mesh(line.geometry,material);
            material.dispose();
            line.geometry.dispose();
            scene.add(myLine);
            myLine.geometry.dispose();
            myLine.material.dispose();
            myLine.remove();
          }else{
            // console.log("lane"+i+"置信度为："+this.lane[i][4])
          }
        }
      }
      // renderer = null;
    },1000);
    render();
    let controls = new OrbitControls(camera,renderer.domElement);
    // controls.addEventListener('change', render);
  }

  pointPath(A,B,C,D,X:number):number{
    A = A*Math.pow(X,3);
    B = B*Math.pow(X,2);
    C = C*X;
    return A+B+C+D;
  }

}

