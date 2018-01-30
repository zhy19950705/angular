/**
 * Created by huchunyang on 2017/8/21.
 */
"use strict";
angular.module('myApp').directive('treeTemplate', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            treeName: "=treeName",
            treeData: "=treeData",
            treeSelectedData: "=treeSelectedData",
            treeSearchLevel: "=treeSearchLevel",
            treeSearchPlaceholder: "=treeSearchPlaceholder",
            selectNode: "&"
        },
        templateUrl: "components/ngJsTree-tpl/template/tree-tpl.html",
        controller: function ($scope, $filter) {
            $scope.seachValue = "";
            $scope.isTrigger = true;//判断是否为全整数据
            $scope.treeInstance = {};
            /*JsTree的配置对象*/
            $scope.treeConfig = {
                plugins: ["wholerow", "types"],
                core: {
                    error: function (error) {
                        console.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                    },
                    strings: {
                        'Loading ...': '正在加载 ...'
                    },
                    check_callback: true,
                    worker: true
                },
                types: {
                    "1": {
                        "icon": "glyphicon glyphicon-folder-open tree-folder"
                    },
                    "2": {
                        "icon": "fa fa-building tree-building"
                    },
                    "3": {
                        "icon": "glyphicon glyphicon-home tree-home"
                    },
                    "area": {
                        "icon": "glyphicon glyphicon-folder-open tree-folder"
                    },
                    "boilerRoom": {
                        "icon": "glyphicon glyphicon-home tree-home"
                    },
                    "heatExchangeStation": {
                        "icon": "fa fa-building tree-building"
                    }
                },
                version: 1
            };

            var unBingWatch = $scope.$watch('treeData', function (newValue, oldValue) {
                if ($scope.isTrigger) {
                    $scope.data = $scope.treeData;
                }
                $scope.treeConfig.version++;
            }, true);
            /*加载完成事件*/
            $scope.readyBC = function () {
                if ($scope.isTrigger) {
                    $scope.treeInstance.jstree(true).open_node($scope.treeSelectedData);
                    $scope.treeInstance.jstree(true).select_node($scope.treeSelectedData);
                } else {
                    $scope.treeInstance.jstree(true).open_node($scope.treeData[0]);
                    $scope.isTrigger = true;
                }
            };
            /*节点选中事件*/
            $scope.selectNodeCB = function (node, selected, event) {
                $scope.selectNode({selected: selected.node});
            };
            var getParentNode = function (parentId, treeData) {
                var nodes = $filter('filter')($scope.data, {id: parentId});
                angular.forEach(nodes, function (node) {
                    var exist = $filter('filter')(treeData, {id: node.id});
                    if (exist.length <= 0) {
                        treeData.push(node);
                    }
                    if (node.parent !== "#") {
                        getParentNode(node.parent, treeData);
                    }
                });
            };
            var getChildrenNode = function (id, treeData) {
                var childrenNode = $filter('filter')($scope.data, {parent: id});
                angular.forEach(childrenNode, function (children) {
                    var exist = $filter('filter')(treeData, {id: children.id});
                    if (exist.length <= 0) {
                        treeData.push(children);
                    }
                    getChildrenNode(children.id, treeData);
                });
            };
            /*搜索*/
            $scope.keyupevt = function (seachValue) {
                $scope.isTrigger = false;
                if (angular.isDefined($scope.data)) {
                    var searchData = [];
                    if (seachValue === "") {
                        searchData = $scope.data;
                        $scope.isTrigger = true;
                    } else {
                        var searchVals = $filter('filter')($scope.data, {
                            type: $scope.treeSearchLevel,
                            text: seachValue
                        });
                        angular.forEach(searchVals, function (item) {
                            if (item.parent !== "#") {
                                getParentNode(item.parent, searchData);
                            }
                            var exist = $filter('filter')(searchData, {id: item.id});
                            if (exist.length <= 0) {
                                searchData.push(item);
                            }
                            getChildrenNode(item.id, searchData);
                        });
                    }
                    $scope.treeData = searchData;
                }
            };
            /*页面跳转时解除$watch*/
            $scope.$on("$destroy", function () {
                unBingWatch();
            });
        }
    }
});