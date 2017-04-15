angular.module('Roomreservation.controllers', [])

  .controller('AppCtrl', function($scope, $rootScope, $timeout, $http, $ionicLoading, $state) {
    $scope.Logout = function() {
      window.localStorage.removeItem("profile");
      alert("ออกจากระบบ");
      $scope.data = {};

      window.localStorage.setItem("role", true);
      // $state.reload();
      $state.go('login', {}, {
        reload: true
      });
      window.location.reload(true);
    };
    /////////////////////// Local Storage //////////////////////////////
    var response = angular.fromJson(window.localStorage.getItem("profile"));
    $rootScope.Users = response;
    console.log($rootScope.Users);
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
  })

  .controller('ForgotpassCtrl', function($scope, $stateParams) {})

  .controller('RegchooseCtrl', function($scope, $stateParams, $rootScope, $ionicViewSwitcher, $ionicHistory) {
    /*  $rootScope.goBackState = function(){
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack();
    };*/
  })

  .controller('Reg1Ctrl', function($rootScope, $scope, $state, $ionicPopup, $http) {

    $scope.regist = function() {
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: '',
          template: 'สมัครสมาชิกเสร็จเรียบร้อย'
        });
        alertPopup.then(function(res) {
          $state.go('login');
        });
      };

      var registers = "http://localhost:3000/insertUSer";
      console.log(registers);
      $scope.username = username1.value;
      $scope.password = password1.value;
      $scope.Name = name1.value;
      $scope.email = email1.value;
      $scope.SID = sid1.value;
      $scope.faculty = faculty1.value;
      $scope.tel = tel1.value;

      var parameter = ({
        'username': $scope.username,
        'password': $scope.password,
        'Name': $scope.Name,
        'email': $scope.email,
        'SID': $scope.SID,
        'faculty': $scope.faculty,
        'tel': $scope.tel
      });
      console.log(parameter);
      $http({
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        url: registers,
        data: parameter
      }).success(function(response) {
        console.log(parameter);
        console.log(response);
        $scope.showAlert();
      });
    };
    $scope.canCel = function() {
      $state.go('login');
    };
  })

  .controller('Reg2Ctrl', function($rootScope, $scope, $state, $ionicPopup, $http) {

    $scope.regist = function() {

      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: '',
          template: 'สมัครสมาชิกเสร็จเรียบร้อย'
        });
        alertPopup.then(function(res) {
          $state.go('login');
        });
      };

      var registers = "http://localhost:3000/insertUSer";
      console.log(registers);
      $scope.username = username.value;
      $scope.password = password.value;
      $scope.Name = name.value;
      $scope.email = email.value;
      $scope.working = working.value.value;
      $scope.tel = tel.value;
      var parameter = ({
        'username': $scope.username,
        'password': $scope.password,
        'Name': $scope.Name,
        'email': $scope.email,
        'working': $scope.working,
        'tel': $scope.tel
      });
      console.log(parameter);
      $http({
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        url: registers,
        data: parameter
      }).success(function(response) {
        console.log(parameter);
        console.log(response);
        $scope.showAlert();
      });
    };
    $scope.canCel = function() {
      $state.go('login');
    };
  })
  .controller('ProfileCtrl', function($rootScope, $scope, $state, $ionicPopup, $http, $ionicHistory) {
    $scope.canCel = function(res) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.search');
    };
    $rootScope.Users
    $scope.username = username.value;
    $scope.password = password.value;
    $scope.Name = name.value;
    $scope.tel = tel.value;
    $scope.faculty = faculty.value;
    $scope.email = email.value;

    $scope.doProfile = function() {
      var update = "http://localhost:3000/profile/" + $rootScope.Users.username;
      console.log(update);
      console.log($scope.username);
      console.log($scope.password);
      console.log($scope.Name);
      console.log($scope.tel);
      console.log($scope.faculty);
      console.log($scope.email);
      if ($scope.password == $rootScope.Users.password) {


      } else {
        console.log('invalid');
        $scope.showAlertFail();
      }
      var updata = {
        'password': $scope.password,
        'name': $scope.Name,
        'tel': $scope.tel,
        'faculty': $scope.faculty,
        'email': $scope.email
      };

      $http({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        url: update,
        data: updata
      })
      $http.post(update, {}).success(function(response) {
        console.log('pass');
        $scope.showConfirm = function() {
          confirmPopup();
          var confirmPopup = $ionicPopup.confirm({
            title: '',
            template: 'ยืนยันการแก้ไข'
          });

          confirmPopup.then(function(res) {
            if (res) {
              window.location.reload(true);
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
        };
      });
    };
  })

  .controller('PlaylistsCtrl', function($rootScope, $ionicViewSwitcher, $ionicHistory, $scope, $stateParams, $http) {
    $rootScope.goBackState = function() {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack();
      window.location.reload(true);
    };

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: '',
        template: 'จองห้องเสร็จเรียบร้อยแล้ว'
      });
      alertPopup.then(function(res) {
        $state.go('app.cancel');
      });
    };

    console.log($rootScope.sday);
    $rootScope.sday = $scope.sday;
    $scope.reserved = function(roomid) {
      console.log("ID ROOM" + roomid._id);

      var reserved = "http://localhost:3000/insertRRS";
      $scope.namer = roomid._id;
      $http({
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          url: reserved,
          data: {
            'User': $rootScope.Users.Name,
            'times': $rootScope.time,
            'RoomId': $scope.namer,
            'Confirmdate': $scope.sday
          }
        })
        .success(function(response) {
          $scope.showAlert();
          console.log(data);
          console.log('OK', response);
        });
    };
  })

  .controller('SplashController', function($scope, $stateParams) {})


  .controller('PlaylistCtrl', function($scope, $timeout, $http, $stateParams, $rootScope) {})

  .controller('SearchCtrl', function($scope, $rootScope, $http, $state, $ionicViewSwitcher, $ionicHistory, $ionicPopup) {
////////////////////////// aleart ////////////////////////////////////////////////
$scope.showAlert = function() {
  var alertPopup = $ionicPopup.alert({
    title: '',
    template: 'กรุณากรอกข้อมูลให้ครบ'
  });
  alertPopup.then(function(res) {
    window.location.reload(true);
  });
};
    //////////////////////////// goback state //////////////////////////////
    $scope.search = {};
    $scope.searchs = function() {

      $scope.sroom = sroom.value,
        $rootScope.sday = sday.value,
        $scope.snum = snum.value;
      $rootScope.time = stime.value;

      console.log($scope.sroom);
      console.log($scope.sday);
      console.log($scope.snum);
      if($scope.sroom && $rootScope.sday && $scope.snum && $rootScope.time){
      var searchData = "http://localhost:3000/S/" + $scope.sroom + "/" + $scope.time + "/" + $rootScope.sday + "/" + $scope.snum;
      console.log(searchData);

      $http.get(searchData).success(function(ch) {
        $rootScope.ALL = ch;
        $state.go('playlists', {ch});
        console.log(ch);
      })
    }else {
      $scope.showAlert();
    }
    }


  })
  ///////////////////////////////////////////////////////////////////////
  .controller('CancelCtrl', function($state, $scope, $stateParams, $http, $rootScope, $ionicPopup) {
    // get reserved data //

    var Loginlinkdata = "http://localhost:3000/loginPage/" + $scope.login.username;
    console.log(Loginlinkdata);
    $http.get(Loginlinkdata).then(function(response) {
      if ($scope.login.username == response.data.username && $scope.login.password == response.data.password) {
        console.log('success');
        console.log(window.localStorage.getItem("profile"));
        $state.go('app.search', {});
        window.location.reload(true);
      } else {
        console.log('invalid');
        $scope.showAlertFail();
      }

    });

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: '',
        template: 'ลบการจองห้องเรียบร้อยแล้ว'
      });
      alertPopup.then(function(res) {
        window.location.reload(true);
      });
    };

    //////
    $rootScope.Users.Name
    /////////////////////////////////////////////////////////////////////////////
    $http.get("http://localhost:3000/showJsonRRS").success(function(reserv) {
      $scope.Reserved = reserv;
      console.log(reserv);

    });
    // delete by id //
    $scope.del = function(dell) {

      var deldata = "http://localhost:3000/deleteRRS/" + dell._id;
      console.log(deldata);
      $scope.showAlert();

    };
  })

  .controller('QrcodeCtrl', function($scope, $state, $interpolate) {

  })
  .controller('LoginCtrl', function($rootScope, $scope, $state, $http, $ionicPopup) {
    // Form data for the login modalz
    $scope.login = {};
    // Perform the login action when the user submits the login form
    console.log($scope.login.username);
    console.log($scope.login.password);
    $scope.doLogin = function(username) {
      var Loginlinkdata = "http://localhost:3000/loginPage/" + $scope.login.username;
      console.log(Loginlinkdata);
      $http.get(Loginlinkdata).then(function(response) {
        $scope.showAlertFail = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'เข้าสู่ระบบล้มเหลว',
            template: 'กรุณากรอกข้อมูลให้ถูกต้อง'
          });
          console.log(Loginlinkdata);
        };
        window.localStorage.setItem("role", false);
        window.localStorage.setItem("profile", JSON.stringify(response.data));
        if (!$scope.login.username || !$scope.login.password || response.data.username == null) {
          console.log('if fail');
          $scope.showAlertFail();
        }
        if ($scope.login.username == response.data.username && $scope.login.password == response.data.password) {
          console.log('success');
          console.log(window.localStorage.getItem("profile"));
          $state.go('app.search', {});
          window.location.reload(true);
        } else {
          console.log('invalid');
          $scope.showAlertFail();
        }
      });
    };
  });
