'use strict';
window.angular.module('demoModule',['NgStorageModule']).config(function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('demoPrefix');
	//localStorageServiceProvider.setStorageCookieDomain('example.com');
	//localStorageServiceProvider.setStorageType('sessionStorage');
}).controller('DemoCtrl',
	function($scope,localStorageService){
		$scope.ngStorageDemo = localStorageService.get('ngStorageDemo');
		$scope.$watch('ngStorageDemo',function(value){
			localStorageService.set('ngStorageDemo',value);
			$scope.ngStorageDemoValue = localStorageService.get('ngStorageDemo');
		});
		$scope.storageType = 'Local storage';

		if (localStorageService.getStorageType().indexOf('session')>=0){
			$scope.storageType = 'Session storage';
		}

		if (!localStorageService.isSupported){
			$scope.storageType = 'Cookie';
		}

		$scope.$watch(function(){
			return localStorageService.get('ngStorageDemo');
		},function(value){
			$scope.ngStorageDemo = value;
		});

		$scope.clearAll = localStorageService.clearAll;
	}
);