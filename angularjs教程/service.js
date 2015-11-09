// JavaScript Document

var m1 = angular.module('module1',[]);
/*m1.factory('myService',function(){
	
	return {
		name : 'hello',
		show : function(){
			return this.name + ':angular';
		}
	};
	
});*/
m1.provider('myService',function(){
	
	return {
		name : 'hello',	
		$get : function(){	
			return {
				name : this.name,
				show : function(){
					return this.name + ':angular';
				}
			};
			
		}
	};
	
});