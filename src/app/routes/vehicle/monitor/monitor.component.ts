import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  Optional
} from '@angular/core';
import {SettingsService, _HttpClient} from '@delon/theme';
import {NzMessageService, NzModalService, NzTreeModule} from 'ng-zorro-antd';
import { NgxAmapModule } from 'ngx-amap';
declare const AMap: any;
declare var ckplayer: any;
declare var EZUIPlayer: any;
// declare var GPS: any;
// import {error, utf8Encode} from "@angular/compiler/src/util";
// import { HostListener } from "@angular/core";
import { ElementRef } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService, SocialService} from '@delon/auth';
import { NgxEchartsModule } from 'ngx-echarts';



@Component({
  selector: 'app-vehicle-management',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VehicleMonitorComponent implements OnInit {



  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    // private cdf: ChangeDetectorRef,
    private router: Router,
    private settingsService: SettingsService,
    @Optional()
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: _HttpClient,
    public msg: NzMessageService
  ) {}
  city = '潍坊';


  windowWidth: number;
  player: any;
  error = '';
  vehicles = [];
  timer$: any;
  charInstance: any;
  noticeMsg: string;
  map: any;
  @Input() center: number[];
  @Input() speed: number;
  @Input() address: any;
  videoRtmp: any;
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
        center: ['48.5%' , '35%'],
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
        center: ['82%', '35%'],    // 默认全局居中
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
        center: ['48.5%', '82%'],    // 默认全局居中
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

  // private Amap: any;

// 监控页面加载
  monitorPlay(vehicle){
    const isMobile = this.isMobile();
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
    const vin = vehicle[4][1].toString();
    this.plateNo = vehicle[0][1];
    let liveErr = '';
    if (vin){
      liveErr = '获取主机视频信息失败，请检查视频主机是否正常';
    }else{
      liveErr = '此车辆未绑定视频主机';
    }
    const liveUrl = '/vehicle/live/' + vin;
    this.http.get(liveUrl).subscribe((liveRes) => {
      if (liveRes.message !== 'success'){
        this.error = liveRes.message;
        this.msg.error(this.error + liveErr);
        return;
      }
      // let videoObject = {
      //   container: '#video',
      //   variable: 'player',
      //   autoplay: true,
      //   live: true,
      //   html5m3u8: true,
      //   mobileAutoFull: false,
      //   poster: '../../../../assets/logoV.png',
      //   video: '',
      // };
      console.log(liveRes);
      let url0, url1, url2;
      if (isMobile){
        url1 = liveRes.result.liveAddress;
        url2 = liveRes.result.hdAddress;
      }else{
        url1 = 'ezopen://open.ys7.com/' + liveRes.result.deviceSerial + '/' + liveRes.result.channelNo + '.hd.live';
        // url2 = liveRes.result.hdAddress;
        url0 = url1 + ',' + 'ezopen://open.ys7.com/E33195716/1.hd.live';
      }
      const url3 = 'ezopen://open.ys7.com/' + 'E45192274' + '/' + '1' + '.hd.live';
      this.player = new EZUIPlayer({
        id: 'videoE',
        url: url3,
        autoplay: true,
        accessToken: 'at.8kb24e3daq7zq8m42q0wt4t21a5whp2c-7p1vm5mtsb-1jeivuu-ovqdxozgu',
        decoderPath: '../../../assets/EZUIKit',
        poster: '../../../../assets/logoV.png',
        // splitBasis:2,
      });
      // this.player.play();

      // this.player = new ckplayer(videoObject);
    });



    // 获取实时数据
    const realUrl = '/vehicle/realtime/' + vin;
    let timeP: any;
    let timeU: any;
    let tagOnline = 0;
    let tagSpeed = 0;
    let tagOpen = 0;
    let addInfo: any;
    this.timer$ = setInterval(() => {
      this.http.get(realUrl).subscribe((res: any) => {
          if (tagOpen == 0){
            this.scrollItem('正在获取数据...', 'yellow');
            tagOpen = 1;
          }
          if (res.message !== 'success'){
            this.error = res.message;
            this.scrollItem('数据获取失败！</br>' + this.error, 'red');
          }else{
            if (tagOpen == 1){
              this.scrollItem('获取数据完成！', 'yellow');
              tagOpen = 2;
            }
            const realData = res.result;
            const avg = realData.avg_fuel_csmpt;
            const inst = realData.inst_fuel_csmpt;
            const steer = realData.steer;
            realData.avg_fuel_csmpt = avg == 0 ? 0 : (100 / avg).toFixed(2);
            realData.inst_fuel_csmpt = inst == 0 ? 0 : (100 / inst).toFixed(2);
            realData.steer = (steer * 180 / 3.1416).toFixed(2);
            console.log(realData);
            if (realData)  {
              // 坐标信息
              that.vehicleData = realData;
              timeP = that.timeForm(realData.timestamp);
              const centerOri = [realData.longitude, realData.latitude];
              this.vehicleState = [
                ['ACC', realData.acc],
                ['LKA', realData.lka],
                // ['CAMERA',realData.camera],
                // ['ENGINE',realData.engine_state],
                // ['IGNITION',realData.ignition_state],
                ['LOC', realData.loc_state],
                ['ONLINE', realData.online],
              ];
              AMap.convertFrom(centerOri, 'gps', function(status, result) {
                that.center = result.locations[0];
                AMap.plugin('AMap.Geocoder', function() {
                  const geo = new AMap.Geocoder({radius: 10, extensions: 'all'});
                  geo.getAddress(that.center, function(status, result) {
                      if (result.info == 'OK'){
                      that.address = result.regeocode.formattedAddress;
                      if (!realData.online){
                        that.vehicleData.inst_fuel_csmpt = 0;
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
                      addInfo = timeP + ': ' + result.info + '！，获取地址失败！';
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
              this.scrollItem('数据初始化失败！', 'red');
            // this.msg.error("未获取到车辆实时数据");
          }
        }
        });
    }, 1000);

  }

  onPluginsLoaded(mapObj: AMap.Map) {
    const mousetool = new AMap.MouseTool(mapObj);
    mousetool.marker(); // 使用鼠标工具，在地图上画标记点
    const ruler = new AMap.RangingTool(mapObj);
    ruler.turnOn();
  }

  ngOnInit() {
    this.http.get('/vehicle/viewable')
      .subscribe((res: any) => {
        if (res.message !== 'success'){
          this.error = res.message;
          this.msg.error(this.error);
          if (res.code == 4000){
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

  isMobile(){
    const userAgentInfo = navigator.userAgent;
    const mobileAgents = [ 'Android', 'iPhone', 'iPad', 'iPod', 'SymbianOS', 'Windows Phone', 'Silk', 'BlackBerry', 'Opera Mini', 'IEMobile'];
    let flag = false;
    // 根据userAgent判断是否是手机
    for (let v = 0; v < mobileAgents.length; v++) {
      if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
        flag = true;
        break;
      }
    }
    return flag;
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
      this.pcWindow = false;
      this.pcVisible = false;
      clearInterval(this.timer$);
    }
  }


  mobileCancel() {
    this.mobileWindow = false;
    this.mobileVisible = false;
    clearInterval(this.timer$);
  }

  fullscreenX() {
    console.log(document.getElementsByClassName('ant-modal-content'));
  }
}

