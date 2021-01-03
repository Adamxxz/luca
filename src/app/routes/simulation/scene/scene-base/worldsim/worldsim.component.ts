import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Vector3} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import * as MeshLine from "../../../../../../assets/three/meshline";
// declare var MeshLine:any;
@Component({
  selector: 'app-simulation-worldsim',
  templateUrl: './worldsim.component.html',
})
export class SimulationWorldsimComponent implements OnInit {
  private $refs: HTMLElement;
  private refs: HTMLElement;


  constructor(private http: _HttpClient) { }

  // MeshLine = require('../../../../../../assets/three/meshline.js');


  ShapeDraw(el){
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      el.appendChild(renderer.domElement);
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
// 绘制一个U型轮廓
    var R = 80;//圆弧半径
    var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 半圆弧的一个端点作为直线的一个端点
    var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200,), new THREE.Vector2(R, 0, ));
    var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0,), new THREE.Vector2(-R, 200, ));
// 创建组合曲线对象CurvePath
    var CurvePath = new THREE.CurvePath();
// 把多个线条插入到CurvePath中
    CurvePath.curves.push(line1, arc, line2);
//     CurvePath.add(line1);
//     CurvePath.add(arc);
//     CurvePath.add(line2);
//分段数200
    var points = CurvePath.getPoints(200);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
//     geometry.setFromPoints(points);
// 材质对象
    var material = new THREE.LineBasicMaterial({
      color:0x000000
    });
//线条模型对象
    var line = new THREE.Line(geometry, material);
    scene.add(line); //线条对象添加到场景中

      camera.position.z = 5;
      renderer.render(scene,camera)
  }


  logSimTest(el){


    var scene = new THREE.Scene();
    // scene.background = new THREE.Color("white")

    /**
     * 创建网格模型
     */
    /**
     * 创建渲染器对象
     */

    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    var camera = new THREE.PerspectiveCamera(80,  k,1,1000);
    camera.position.set(-7, 1.8,0 ); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor("white", 1); //设置背景颜色
    el.appendChild(renderer.domElement); //el元素中插入canvas对象

    //创建相机对象
    var gg = new THREE.PlaneGeometry( 40, 80 );
    var gm = new THREE.MeshPhongMaterial( { color: "black" } );

    var ground = new THREE.Mesh( gg, gm );
    ground.rotation.x =  -Math.PI/2;
    scene.add(ground);

    // var axisHelper = new THREE.AxesHelper(250);
    // scene.add(axisHelper);
    //执行渲染操作   指定场景、相机作为参数

    let material = new THREE.LineBasicMaterial({
      // dashSize: 4,
      // gapSize: 6,
      color:"white",
      opacity:1,
      transparent:true,
      // linewidth:4,
    }); //材质对象Material

    function render() {
      // t2 = new Date(); //本次时间
      // t = t2 - t1; //时间差
      // t1 = t2;//把本次时间赋值给上次时间
      renderer.render(scene,camera);//执行渲染操作
      // requestAnimationFrame(render);

      // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
      // requestAnimationFrame(render);
    }



    // let mtlLoader = new MTLLoader();
    // mtlLoader.load('../../../../assets/three/货车_03.mtl', function(materials) {
    //   materials.preload();
    //   // 返回一个包含材质的对象MaterialCreator
    //   let objLoader = new OBJLoader();
    //   //obj的模型会和MaterialCreator包含的材质对应起来
    //   objLoader.setMaterials(materials);
    //   // console.log(objLoader.materials);
    //   objLoader.load('../../../../assets/three/货车_03.obj', function(obj) {
    //     console.log(obj);
    //     scene.add(obj); //返回的组对象插入场景中
    //     // 加载后操作
    //
    //     obj.scale.set(0.02,0.02,0.02);
    //     obj.position.set(0,0,0);
    //
    //   })
    // });
    let sPoint = new Vector3(0,1,0);
    let fbxLoader = new FBXLoader();
    fbxLoader.load('../../../../assets/three/simTruck.fbx',function (fbx) {
      // fbx.rotateOnAxis(sPoint,Math.PI/2);
      fbx = fbx.rotateOnWorldAxis(sPoint,-Math.PI/2);
      console.log(fbx);
      scene.add(fbx);
      fbx.scale.set(0.0004,0.00025,0.0002,);
      fbx.position.set(-4,0,0)
    });


    this.http.get('/vehicle/realtime/lane/FFFFFFFFFFFFFFFF').subscribe((res)=>{
      for(let i=0;i<=3;i++){
        let A = res.result[i][0];
        let B = res.result[i][1];
        let C = res.result[i][2];
        let D = res.result[i][3];
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
        // // line.computeLineDistances();
        // scene.add(line);
        let line = new MeshLine.MeshLine();
        line.setGeometry(geometry);
        let mat = new MeshLine.MeshLineMaterial({
          color:'yellow',
          lineWidth:0.05
        });
        let mesh = new THREE.Mesh(line.geometry,mat);
        console.log(mesh);
        scene.add(mesh);
      }
        render();
    });

    //车道线数据（A,B,C,D,置信度，虚实）
    // var p1 = new THREE.Vector3(-85.35, -35.36);
    // var p2 = new THREE.Vector3(-50, 0, 0);
    // var p3 = new THREE.Vector3(0, 50, 0);
    // var p4 = new THREE.Vector3(50, 0, 0);
    // var p5 = new THREE.Vector3(85.35, -35.36);
// 创建线条一：直线
//     let line1 = new THREE.LineCurve3(p1,p2);
// 重建线条2：三维样条曲线


    /**
     * 光源设置
     */
      //点光源
    var point = new THREE.PointLight('white');
    point.position.set(-80, 80, 0); //点光源位置
    scene.add(point); //点光源添加到场景中
  //
  //   var point2 = new THREE.PointLight(0xffffff);
  //   point2.position.set(-400, -200, -300); //点光源位置
  //   scene.add(point2); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
  //   console.log(scene);
  //   console.log(scene.children);
  //
  //
  //   let t:any;
  //   let t1:any;
  //   let t2:any;
  //   t1 = new Date();

    let controls = new OrbitControls(camera,renderer.domElement);
    controls.addEventListener('change', render);
  }

  myCanvas(el) {
      // CAMERA

      var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
      camera.position.set( 0, 150, 1300 );

      // SCENE

      var scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );
      scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

      scene.add( camera );

      // LIGHTS

      scene.add( new THREE.AmbientLight( 0x222222 ) );

      var light = new THREE.DirectionalLight( 0xffffff, 2.25 );
      light.position.set( 200, 450, 500 );

      light.castShadow = true;

      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 512;

      light.shadow.camera.near = 100;
      light.shadow.camera.far = 1200;

      light.shadow.camera.left = - 1000;
      light.shadow.camera.right = 1000;
      light.shadow.camera.top = 350;
      light.shadow.camera.bottom = - 350;

      scene.add( light );
      // scene.add( new CameraHelper( light.shadow.camera ) );


      //  GROUND
      var gt = new THREE.TextureLoader().load( "../../../../assets/tmp/img/grass-big.jpg" );
      var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );
      var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );

      var ground = new THREE.Mesh( gg, gm );
      ground.rotation.x = - Math.PI / 2;
      ground.material.map.repeat.set( 64, 64 );
      ground.material.map.wrapS = THREE.RepeatWrapping;
      ground.material.map.wrapT = THREE.RepeatWrapping;
      ground.material.map.encoding = THREE.sRGBEncoding;
      // note that because the ground does not cast a shadow, .castShadow is left false
      ground.receiveShadow = true;

      scene.add( ground );

      // RENDERER

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
      renderer.setClearColor(0xffffff, 1); //设置背景颜色
      el.appendChild(renderer.domElement); //body元素中插入canvas对象

      //执行渲染操作   指定场景、相机作为参数
      function render() {
        // t2 = new Date(); //本次时间
        // t = t2 - t1; //时间差
        // t1 = t2;//把本次时间赋值给上次时间
        renderer.render(scene,camera);//执行渲染操作
        // requestAnimationFrame(render);

        // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
        // requestAnimationFrame(render);
      }
      render();
      let controls = new OrbitControls(camera,renderer.domElement);
      controls.addEventListener('change', render);
    }
  ngOnInit() {
    this.$refs = document.getElementById("threeJS");
    // this.ShapeDraw(this.$refs);

    this.logSimTest(this.$refs);
  }

  pointPath(A,B,C,D,X:number):number{
    A = A*Math.pow(X,3);
    B = B*Math.pow(X,2);
    C = C*X;
    return A+B+C+D;
  }
}
