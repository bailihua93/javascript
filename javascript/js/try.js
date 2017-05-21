'use strict'
function fn(){
    console.log(arguments.callee);
}
fn( );