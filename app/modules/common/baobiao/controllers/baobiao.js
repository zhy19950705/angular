angular.module('myApp').controller('baobiao', ['$scope', '$location', '$http', 'httpRequestService', function ($scope, $location, $http, httpRequestService) {
    // $scope.pathUrl=$location.path()
    /*报表名称*/
    $scope.reportName = '报表';
    /* 查询开始时间*/
    $scope.beginTime = '';
    /*查询结束时间*/
    $scope.endTime = '';
    /*导出excel名称*/
    $scope.fileName = '测试';
    /*导出excel表头*/
    $scope.csvHeader = ['阀门编号', '客户名称', '所属小区', '所属楼栋', '单元', '房间号', '进水温度', '回水温度', '设定温度', '房间温度', '平均温度', '本次分摊热量', '本采暖季累计热量', '总累计热量', '采集时间'];
    /*导出顺序*/
    $scope.csvColumnOrder = ['valveNo', 'customerName', 'regionName', 'buildingName', 'unitName', 'roomName', 'supplyTemper', 'returnTemper', 'settingTemper', 'roomTemper', 'averageTemper', 'thisShareHeat', 'thisQuarterTotalHeat', 'totalHeat', 'collectionTime'];
    /*excel编码*/
    $scope.excelCode = 'GB2312';
    /*是否禁用导出按钮*/
    $scope.btnExcelName = '导出';


    var treeData = function (level) {
        if (angular.isUndefined(level)) {
            level = 3
        }
        return httpRequestService.httpGet('端口' + "api/GetTreeData?level=" + level).then(function (res) {
            var treeData = [];
            var defaultSelected = {};
            angular.forEach(res, function (obj) {
                var node = {
                    'id': obj.id,
                    'parent': obj.parentId,
                    'text': obj.name,
                    'type': obj.level,
                };
                treeData.push(node);
                if (obj.level === level && angular.equals(defaultSelected, {})) {
                    defaultSelected = obj;
                }
            });
            return {'treeData': treeData, 'defaultSelected': defaultSelected}
        });
    };

    $http.get('http://localhost:5500/treedata/').then(function (res) {
        var result=res.data;
        console.log(result);
        $scope.treeData=result;
        $scope.selectedData=result[4]
    })

    $scope.selectNode=function (node) {
        $scope.selectedData=node;
    }
    var fnGetExcelFileName = function () {

    }


}])