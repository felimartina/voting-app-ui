'use strict';

app

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', 'mainRepository', function ($scope, mainRepository) {


        function option(displayName, image, value) {
            this.displayName = displayName;
            this.image = image;
            this.value = value;
        }

        function voteparameters(userEmail, optionVoted) {
            this.user_email = userEmail;
            this.option_voted = optionVoted;
        }

        //user and option voted already when the button vote is clicked
        $scope.voteParams = null;
        $scope.poll = null;
        $scope.allOptions = [];

        $scope.optionSelected = null;
        $scope.selectFood = function (selected) {
            console.log(selected)
            $scope.optionSelected = selected;

            if (selected === 1) {
                $scope.class1 = "md-raised md-primary md-button md-ink-ripple"
                $scope.class2 = "md-button md-ink-ripple"
                $scope.class2 = "md-button md-ink-ripple"
                $scope.class2 = "md-button md-ink-ripple"

            } else if (selected === 2) {
                $scope.class2 = "md-raised md-primary md-button md-ink-ripple"
                $scope.class1 = "md-button md-ink-ripple"
            }
        }


        $scope.listOfPolls = mainRepository.getAllPolls().then(function successCallback(response) {
            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log(response);
            alert(response.data.message)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        var hardcodedPollId = '56e18f6a2a4ab9436e0fde45';


        $scope.getSinglePoll = mainRepository.getSinglePoll(hardcodedPollId).then(function successCallback(response) {
            console.log(response);
            $scope.poll = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log(response);
            alert(response.data.message)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


        $scope.submitVote = function (username) {
            $scope.voteParams = new voteparameters(username, $scope.optionSelected)
            mainRepository.vote(hardcodedPollId, $scope.voteParams).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);
                alert(response.data.message)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }


    }]);

