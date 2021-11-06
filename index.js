const {Observable} = require('rxjs');
const {map,pluck} = require('rxjs/operators');

const users = {
  data:[
    {status:'active',age:54},
    {status:'active',age:44},
    {status:'inactive',age:30},
    {status:'active',age:64},
    {status:'inactive',age:14},
    {status:'active',age:24},
    {status:'inactive',age:51},
    {status:'active',age:17},
  ]
};

const users1 = {
  data:[
    {status:'active',age:14},
    {status:'active',age:44},
    {status:'inactive',age:30},
    {status:'active',age:64},
    {status:'inactive',age:14},
    {status:'active',age:24},
    {status:'inactive',age:51},
    {status:'active',age:17},
  ]
};

const observable = new Observable((subscriber)=>{
  subscriber.next(users);
 subscriber.complete(); // Other emits not continue from this point

  subscriber.next(users);
  subscriber.next(users);
  subscriber.next(users);
 
}).pipe(
  pluck("data"),
  map(users => users.filter(user => user.status === 'active')),
  map(users => users.reduce((sum,user) => sum + user.age,0)/users.length),
  map(avgAge=>{
    if(avgAge < 40) throw new Error('You are not 40 or above');
    return avgAge;
  })
);


const observer = {
  next: (val)=> console.log('Observer got a value of ',val),
  error:(err)=>console.log('Observer got an error of', err.message),
  complete:()=> console.log('Observer got a complete notification')
};

observable.subscribe(observer);