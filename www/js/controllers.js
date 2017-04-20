angular.module('Roomreservation.controllers', [])

  .controller('AppCtrl', function($scope, $rootScope, $timeout, $http, $ionicLoading, $state) {
    $scope.Logout = function() {
      alert("ออกจากระบบเรียบร้อยแล้ว");
      window.localStorage.removeItem("profile");
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
      $scope.FailAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: '',
          template: 'กรุณากรอกข้อมูลให้ถูกต้อง'
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
      if (!$scope.username || !$scope.password || !$scope.Name || !$scope.email || !$scope.SID || !$scope.faculty || !$scope.tel) {
        $scope.FailAlert();
      } else {
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
      }
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
      $scope.FailAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: '',
          template: 'กรุณากรอกข้อมูลให้ถูกต้อง'
        });
      };
      var registers = "http://localhost:3000/insertUSer";
      console.log(registers);
      $scope.username = username2.value;
      $scope.password = password2.value;
      $scope.Name = name2.value;
      $scope.email = email2.value;
      $scope.faculty = faculty2.value;
      $scope.tel = tel2.value;

      var parameter = ({
        'username': $scope.username,
        'password': $scope.password,
        'Name': $scope.Name,
        'email': $scope.email,
        'working': $scope.faculty,
        'tel': $scope.tel
      });
      console.log(parameter);
      if (!$scope.username || !$scope.password || !$scope.Name || !$scope.email || !$scope.faculty || !$scope.tel) {
        $scope.FailAlert();
      } else {
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
      }
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
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'ยืนยันการแก้ไขข้อมูล',
        template: 'เลือก OK เพื่อยืนยันการแก้ไขข้อมูลหรือ Cancel เพื่อยกเลิก'
      });

      confirmPopup.then(function(res) {
        if (res) {
          window.location.reload(true);
          console.log('sure');
        } else {
          console.log('not sure');
        }
      });
    };

    $rootScope.Users

var update = "http://localhost:3000/profile/" + $rootScope.Users.username;
console.log(update);
    $scope.doProfile = function() {
      var updata = {
        'Name': $scope.Users.Name,
        'tel': $scope.Users.tel,
        'faculty': $scope.Users.faculty,
        'email': $scope.Users.email,
        'SID': $scope.Users.SID
      };

      $http({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        url: update,
        data: updata
      }).success(function(response) {
        console.log('pass'+response);
        $scope.showConfirm();
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
      console.log("ID ROOM" + roomid.Roomname);

      var reserved = "http://localhost:3000/insertRRS";
      $scope.idr = roomid._id;
      $scope.namer = roomid.Roomname;

      //////////////////////////////////
      $http({
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        url: reserved,
        data: {
          'username': $rootScope.Users.username,
          'User': $rootScope.Users.Name,
          'times': $rootScope.time,
          'Roomname': $scope.namer,
          'RoomId': $scope.idr,
          'Confirmdate': $scope.sday
        }
      }).success(function(response) {
        console.log(parameter);
        console.log(response);
        $scope.showAlert();
      });
      ///////////////////////////////////
  /*    $http({
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          url: reserved,
          data: {
            'username': $rootScope.Users.username,
            'User': $rootScope.Users.Name,
            'times': $rootScope.time,
            'RoomId': $scope.namer,
            'Confirmdate': $scope.sday
          },
        })
        .success(function(response) {
          $scope.showAlert();
          console.log(data);
          console.log('OK', response);
        });*/
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
      if ($scope.sroom && $rootScope.sday && $scope.snum && $rootScope.time) {
        var searchData = "http://localhost:3000/S/" + $scope.sroom + "/" + $scope.time + "/" + $rootScope.sday + "/" + $scope.snum;
        console.log(searchData);
        $http.get(searchData).success(function(ch) {
          $rootScope.ALL = ch;
          $state.go('playlists', {
            ch
          });
          console.log(ch);
        })
      } else {
        $scope.showAlert();
      }
    }
  })
  ///////////////////////////////////////////////////////////////////////
  .controller('CancelCtrl', function($state, $scope, $stateParams, $http, $rootScope, $ionicPopup) {
    // get reserved data //

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
    //////////////////////// get detail of room/////////////////////////////////////////////////
    console.log("http://localhost:3000/showJsonRRS/" + $rootScope.Users.username);
    $http.get("http://localhost:3000/showJsonRRS/" + $rootScope.Users.username).success(function(reserv) {
      $scope.Reserved = reserv;
      console.log(reserv);
      $http.get("http://localhost:3000/showJsonRRS/" + $scope.Reserved.RoomId).success(function(roomdetail) {
        $scope.roomdetail = roomdetail;
        console.log("http://localhost:3000/showJsonRRS/" + $scope.Reserved.RoomId + ',' + $scope.roomdetail);
      });
    });

    $scope.detailreserved = reserv + roomdetail;
    // delete by id //
    $scope.del = function(dell) {
      var deldata = "http://localhost:3000/deleteRRS/" + dell;
      console.log(deldata);
      $http.post(deldata).success(function(reserv) {
        console.log(reserv);
      });
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
        $scope.showAlertFails = function() {
          var alertPopupBL = $ionicPopup.alert({
            title: 'เข้าสู่ระบบล้มเหลว',
            template: 'บัญชีผู้ใช้ของคุณอยู่ในแบล็คลิส<br>กรุณาติดต่อเจ้าหน้าที่หอสมุด'
          });
          console.log('Blacklist=' + response.data.blackList);
        };
        window.localStorage.setItem("profile", JSON.stringify(response.data));
        if (!$scope.login.username || !$scope.login.password || response.data == null) {
          console.log('id&pass fail');
          $scope.showAlertFail();
        }
        if ($scope.login.username == response.data.username && $scope.login.password == response.data.password && response.data.blackList == false) {
          console.log('success');
          console.log(window.localStorage.getItem("profile"));
          $state.go('app.search', {});
          window.location.reload(true);
        }
        if ($scope.login.username == response.data.username && $scope.login.password == response.data.password && response.data.blackList == true) {
          $scope.showAlertFails();
        }
        if (response.data.username == null) {
          $scope.showAlertFail();
        }
        if ($scope.login.username == response.data.username && $scope.login.password != response.data.password) {
          $scope.showAlertFail();
          console.log('pass fail');
        }
      });
    };
  });
