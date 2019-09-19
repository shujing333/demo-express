// bcryptjs的使用
//1.引入bcryptjs
const bcryptjs=require('bcryptjs');

//2.调用它的方法 hash()
let password='123';
// bcryptjs.hash(password,10,(err,hash)=>{
// //10为最高级别的加密
// if(err){
//     console.log('加密失败');
// }else{
//     console.log('加密成功');
//     console.log(hash);
// }
// });

// let hash=bcryptjs.hashSync(password,10);
// console.log(hash);

//3.使用bcryptjs.compare()来做校验
// bcryptjs.compare(password,'$2a$10$Erfq7gk9A8YaoM4jBzIem.DDIBpelPzeZp5bix9jQI7x2AnArcLyG',
// (err,success)=>{
//     if(err){
//         console.log('校验失败');
//     }else{
//         console.log(success);
//         if(success){
//             console.log('校验成功');
//         }else{
//             console.log('两次密码不一致');
//         }
//     }

// })

let isok=bcryptjs.compareSync(password,'$2a$10$Erfq7gk9A8YaoM4jBzIem.DDIBpelPzeZp5bix9jQI7x2AnArcLyG');
console.log(isok);//true

//$2a$10$Erfq7gk9A8YaoM4jBzIem.DDIBpelPzeZp5bix9jQI7x2AnArcLyG


// @param {Number} time 休眠时间

//1.
// const sleep=(time=1000)=>{
//     return new Promise((resolve,reject)=>{
//         //这里就可以写异步代码
//         setTimeout(()=>{
//             console.log(2);
//             // reject();
//             resolve('张三');
//         },time);
//     });
// }

// sleep()
// .then(()=>{
//     console.log('异步执行完成');
// }).catch(()=>{
//     console.log('catch');
// });

// const main=async()=>{
//     console.log(1);
//     let data = await sleep();
//     console.log(data);
//     console.log(3);
// };
// main();

// sleep().then(data=>{
//     console.log(data);
// });