var UploaderControllerCtrs = angular.module('UploaderControllerCtrs',[]);
UploaderControllerCtrs.controller('UploaderController', function($scope,$http,fileReader){
        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };
        // 组装表单数据
        var postData = {
            fileName: $scope.myFile,
            imageSrc: $scope.imageSrc
        };

        var promise = postMultipart('./demo.html', postData);

        function postMultipart(url, data) {
            var fd = new FormData();
            angular.forEach(data, function(val, key) {
                fd.append(key, val);
            });
            var args = {
                method: 'POST',
                url: url,
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            };
            return $http(args);
        }
    });