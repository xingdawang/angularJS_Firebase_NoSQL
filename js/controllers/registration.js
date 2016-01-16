myApp.controller('RegistrationController', ['$scope', 'Authentication',
	function($scope, Authentication){

		$scope.login = function() {
			Authentication.login($scope.user);
		}; //login

		$scope.register = function() {
			Authentication.register($scope.user);
		};	// Register

		$scope.logout = function() {
			Authentication.logout();
		}	//logout
}]); // Controller