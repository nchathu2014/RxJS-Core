const {Observable} = require('rxjs');

const observable = new Observable((subscriber)=>{
  subscriber.next(10);
  subscriber.next(12);
  subscriber.next(17);
  subscriber.next(45);

});


const observer = {
  next: (val)=> console.log('Observer got a value of ',val),
  error:(err)=>console.log('Observer got an error of', err),
  complete:()=> console.log('Complete')
};

observable.subscribe(observer);