'use strict';
// So Menu class is as abstract as possible.
// I considered making it an interface, but left one field in the end
function Menu (name){
    this.name = name;
}
Menu.prototype.calculatePrice = function(){};
Menu.prototype.calculateCalories = function (){};
// <-----------------------------HAMBURGER---------------------------------------->
Hamburger.SIZE_SMALL = {cost: 50, calories: 20};
Hamburger.SIZE_LARGE = {cost: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {cost: 10, calories: 20};
Hamburger.STUFFING_SALAD =  {cost: 20, calories: 5};
Hamburger.STUFFING_POTATO = {cost: 15, calories: 10};

function Hamburger (size, stuffing){
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Menu.prototype);

Hamburger.prototype.getSize = function () {
    console.log("Hamburger size is " + this.size);
};
Hamburger.prototype.getStuffing = function () {
    console.log("Hamburger stuffing is" + this.stuffing);
};
Hamburger.prototype.calculatePrice = function(){
    let res = 0;
    switch (this.size) {
        case "small":
            res += Hamburger.SIZE_SMALL.cost;
            break;
        case "large":
            res +=  Hamburger.SIZE_LARGE.cost;
            break;

    }
    switch (this.stuffing) {
        case "cheese":
            res += Hamburger.STUFFING_CHEESE.cost;
            break;
        case "potato":
            res +=  Hamburger.STUFFING_POTATO.cost;
            break;
        case "salad":
            res +=  Hamburger.STUFFING_SALAD.cost;
            break;
    }
    return res;
};
Hamburger.prototype.calculateCalories = function (){
    let res = 0;
    switch (this.size) {
        case "small":
            res += Hamburger.SIZE_SMALL.calories;
            break;
        case "large":
            res +=  Hamburger.SIZE_LARGE.calories;
            break;
    }
    switch (this.stuffing) {
        case "cheese":
            res += Hamburger.STUFFING_CHEESE.calories;
            break;
        case "potato":
            res +=  Hamburger.STUFFING_POTATO.calories;
            break;
        case "salad":
            res +=  Hamburger.STUFFING_SALAD.calories;
            break;
    }
    return res;
};
//<----------------------------------------SALAD------------------------------------------->
function Salad (name){
    Menu.call(this, name);
}
Salad.prototype = Object.create(Menu.prototype);
Salad.prototype.CESAR = {cost: 100, calories: 20};
Salad.prototype.RUSIIAN_SALAD = {cost: 50, calories: 80};

Salad.prototype.calculateCalories = function (){
    switch (this.name) {
        case "cesar":
            return this.CESAR.calories;
            break;
        case "russian salad":
            return this.RUSIIAN_SALAD.calories;
            break
    }
};
Salad.prototype.calculatePrice = function(){
    switch (this.name) {
        case "cesar":
            return this.CESAR.cost;
            break;
        case "russian salad":
            return this.RUSIIAN_SALAD.cost;
            break
    }
};
//<-----------------------------------------DRINK-------------------------------------------->
function Drink (name){
    Menu.call(this, name);
}
Drink.prototype = Object.create(Menu.prototype);
Drink.prototype.COLA = {cost: 50, calories: 40};
Drink.prototype.COFFEE = {cost: 80, calories: 20};

Drink.prototype.calculateCalories = function (){
    switch (this.name) {
        case "cola":
            return this.COLA.calories;
            break;
        case "coffee":
            return this.COFFEE.calories;
            break
    }
};
Drink.prototype.calculatePrice = function(){
    switch (this.name) {
        case "cola":
            return this.COLA.cost;
            break;
        case "coffee":
            return this.COFFEE.cost;
            break
    }
};
let order = [
    {
        type: 'hamburger',
        size : 'small',
        stuffing : 'potato'},
    {
        type : 'salad',
        name : 'cesar'
    },
    {
        type : 'drink',
        name : 'cola'
    }
];
//<-----------------------------------ORDER------------------------------------------>
function Order(order) {
    this.order = [];
    for (let elem of order){
        this.add(elem);
    }
    console.log("Your order:");
    console.log(this.order);
}

Order.prototype.calculateCalories = function(){
    let sum  = 0;
    for(let elem of this.order){
        sum += elem.calculateCalories();
    }
    console.log("Your order's calories total: "+ sum);
    return sum;
};
Order.prototype.calculatePrice = function(){
    let sum  = 0;
    for(let elem of this.order){
        sum += elem.calculatePrice();
    }
    console.log("Your order's price total: "+ sum);
    return sum;
};
Order.prototype.delete = function (position) {
    // position is presented from user's side, so we use position-1 to get the real position
    console.log("You are deleting order's position #"+ (position));
    if(position-1 < this.order.length){
        try{this.order.splice(position-1, 1)}
        catch (e) {
            if (e.name === 'TypeError') console.log("Order is already paid and can't be changed!");
        }
    } else {
        console.log("No such position in your order!");
    }


};
Order.prototype.add = function (position) {
    try {
        switch (position.type) {
            case 'hamburger':
                this.order.push(new Hamburger(position.size, position.stuffing));
                break;
            case 'salad':
                this.order.push(new Salad(position.name));
                break;
            case 'drink':
                this.order.push(new Drink(position.name));
                break;
        }
        // I didn't want to add new boolean variable to track this (and keep it in class),
        // so instead I used try..catch on certain error type
    } catch (e) {
        if (e.name === 'TypeError') console.log("Order is already paid and can't be changed!");
    }
};
Order.prototype.pay = function(){
    console.log("You are paying for your order. The order will be no longer editable");
    //I thought I could use Obj.freeze, but wasn't sure if it's es5
    Object.defineProperty(this.order, "length", {writable: false});
};
 //<--------------------------------------REALIZATION------------------------------------->
var yourOrder = new Order(order);
var additionalPosition = {
    type: 'hamburger',
    size : 'large',
    stuffing : 'cheese'};
yourOrder.calculatePrice();
yourOrder.add(additionalPosition);
yourOrder.calculatePrice();
yourOrder.delete(2);
yourOrder.calculatePrice();
yourOrder.calculateCalories();
yourOrder.pay();
yourOrder.delete(0);


