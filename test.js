


// @param {Number} time 休眠时间

//1.
const sleep=(time=1000)=>{
    return new Promise((resolve,reject)=>{
        //这里就可以写异步代码
        setTimeout(()=>{
            console.log(2);
            // reject();
            resolve('张三');
        },time);
    });
}

// sleep()
// .then(()=>{
//     console.log('异步执行完成');
// }).catch(()=>{
//     console.log('catch');
// });

const main=async()=>{
    console.log(1);
    let data = await sleep();
    console.log(data);
    console.log(3);
};
main();

// sleep().then(data=>{
//     console.log(data);
// });