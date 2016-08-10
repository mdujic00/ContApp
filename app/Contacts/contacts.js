'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'Contacts/contacts.html',
        controller: 'ContactsCtrl'
        });
    }])

.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
    
    
    var rootRef = firebase.database().ref();
    
    $scope.contacts = $firebaseArray(rootRef);
     
    $scope.addContact= function(){
        console.log('Adding contact...')
        
        $scope.contacts.$add({
            name:$scope.name,
            surname:$scope.surname,
            address:$scope.address,
            zip:$scope.zip,
            city:$scope.city,
            state:$scope.state,
            phoneNumber:$scope.phoneNumber,
            email:$scope.email
        }).then(function(rootRef){
            
            var id = rootRef.key;
            
            console.log('Added contact: '+id);
            
            $scope.name = '';
            $scope.surname = '';
            $scope.address = '';
            $scope.zip = '';
            $scope.city = '';
            $scope.state = '';
            $scope.phoneNumber = '';
            $scope.email = '';
        });
    } 
    
    $scope.deleteContact = function(contact){
        
        $scope.contacts.$remove(contact);
        
    }
    
    $scope.showAddForm= true;
    $scope.showEditForm= false;
    
    $scope.showEditContact= function(contact){
        
        $scope.showAddForm= false;
        $scope.showEditForm= true;
        
        $scope.id= contact.$id;
        $scope.name= contact.name;
        $scope.surname= contact.surname;
        $scope.address= contact.address;
        $scope.zip= contact.zip;
        $scope.city= contact.city;
        $scope.state= contact.state;
        $scope.phoneNumber= contact.phoneNumber;
        $scope.email= contact.email;
    }
    
    $scope.editContact= function(contact){
        
        var id= $scope.id;
        
        var record=$scope.contacts.$getRecord(id);

        record.name=$scope.name;
        record.surname=$scope.surname;
        record.address=$scope.address;
        record.zip=$scope.zip;
        record.city=$scope.city;
        record.state=$scope.state;
        record.phoneNumber=$scope.phoneNumber;
        record.email=$scope.email;
        
        $scope.contacts.$save(record).then(function(rootRef){
            console.log('Changes saved.'+id); 
        });
        
        $scope.name = '';
        $scope.surname = '';
        $scope.address = '';
        $scope.zip = '';
        $scope.city = '';
        $scope.state = '';
        $scope.phoneNumber = '';
        $scope.email = '';
        
        $scope.showAddForm= true;
        $scope.showEditForm= false;
    }
}]);