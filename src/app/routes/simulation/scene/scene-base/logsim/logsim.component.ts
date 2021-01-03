import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-simulation-logsim',
  templateUrl: './logsim.component.html',
})
export class SimulationLogsimComponent implements OnInit {

  constructor(private http: _HttpClient) { }
  logSimTest(el){
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    // var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
    var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
//     var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
//     var geometry = new THREE.IcosahedronGeometry(50);
      // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color:0xff0000,
      opacity:0.7,
      transparent:true
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    var axisHelper = new THREE.AxesHelper(250);
    scene.add(axisHelper);
    /**
     * 光源设置
     */
      //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    var point2 = new THREE.PointLight(0xffffff);
    point2.position.set(-400, -200, -300); //点光源位置
    scene.add(point2); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    console.log(scene);
    console.log(scene.children);
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    el.appendChild(renderer.domElement); //el元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数

    let t:any;
    let t1:any;
    let t2:any;
     t1 = new Date();
    function render() {
      t2 = new Date(); //本次时间
      t = t2 - t1; //时间差
      t1 = t2;//把本次时间赋值给上次时间
      renderer.render(scene,camera);//执行渲染操作
      // requestAnimationFrame(render);

      // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
      // requestAnimationFrame(render);
    }
    render();
    let controls = new OrbitControls(camera,renderer.domElement);
    controls.addEventListener('change', render);
  }

  logSimTest1(el){
    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(40, 100, 40);
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0,0,0)
    scene.add(mesh);

// 设置产生投影的网格模型
    mesh.castShadow = true;


    var axisHelper = new THREE.AxesHelper(250);
    scene.add(axisHelper);


//创建一个平面几何体作为投影面
    var planeGeometry = new THREE.PlaneGeometry(300, 200);
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x999999
    });
// 平面网格模型作为投影面
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh); //网格模型添加到场景中
    planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
    planeMesh.position.y = -50; //设置网格模型y坐标
// 设置接收阴影的投影面
    planeMesh.receiveShadow = true;


    var spotLight = new THREE.SpotLight(0xffffff);
// 设置聚光光源位置
    spotLight.position.set(50, 60, 50);
// 设置聚光光源发散角度
    spotLight.angle = Math.PI /6;
    scene.add(spotLight); //光对象添加到scene场景中
// 设置用于计算阴影的光源对象
    spotLight.castShadow = true;
// 设置计算阴影的区域，注意包裹对象的周围
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 300;
    spotLight.shadow.camera.fov = 20;
    spotLight.shadow.mapSize.set(1024,1024);


// // 方向光
//     var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// // 设置光源位置
//     directionalLight.position.set(60, 100, 40);
//     scene.add(directionalLight);
// // 设置用于计算阴影的光源对象
//     directionalLight.castShadow = true;
// // 设置计算阴影的区域，最好刚好紧密包围在对象周围
// // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
//     directionalLight.shadow.camera.near = 1;
//     directionalLight.shadow.camera.far = 300;
//     directionalLight.shadow.camera.left = -50;
//     directionalLight.shadow.camera.right = 50;
//     directionalLight.shadow.camera.top = 200;
//     directionalLight.shadow.camera.bottom = -100;
// // 设置mapSize属性可以使阴影更清晰，不那么模糊
//     directionalLight.shadow.mapSize.set(1024,1024)
//     console.log(directionalLight.shadow.camera);


    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    el.appendChild(renderer.domElement); //el元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数

    let t:any;
    let t1:any;
    let t2:any;
    t1 = new Date();
    function render() {
      t2 = new Date(); //本次时间
      t = t2 - t1; //时间差
      t1 = t2;//把本次时间赋值给上次时间
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
    let el = document.getElementById("logSim");
    this.logSimTest1(el);
  }

}
