angular.module("App")
    .controller("EditorController", function($scope, $http) {
        $scope.editing = true;

        $http.get('/notes').success(function(data) {
            $scope.notes = data;
        }).error(function(emsg) {
            $scope.emsg = "Could not load notes";
        })

        $scope.info = function(index) {
            $scope.editing = false;
            $scope.content = $scope.notes[index];
        }

        $scope.create = function() {
            $scope.editing = true;
            $scope.content = {
                title: "",
                content: "",
                date: ""
            }
        }

        $scope.save = function() {
            $scope.content.date = Date.now();
            if ($scope.content.id) {
                $http.put("/notes/" + $scope.content.id, $scope.content).success(function(data) {
                    $scope.editing = false;
                }).error(function(emsg) {
                    $scope.emsg = "Could not load notes";
                })
            } else {
                $http.post("/notes", $scope.content).success(function(data) {
                    $scope.notes.push($scope.content);
                    $scope.editing = false;
                }).error(function(emsg) {
                    $scope.emsg = "Could not load notes";
                })
            }
        }

        $scope.remove = function() {
            $http.delete("/notes/" + $scope.content.id, $scope.content).success(function(data) {
                var found = -1;
                angular.forEach($scope.notes, function(note, index) {
                    if (note.id == $scope.content.id) {
                        found = index;
                    }
                    if (found >= 0) {
                        $scope.notes.splic(found, 1);
                        $scope.content = {
                            title: "",
                            content: "",
                            date: ""
                        }
                    }
                })
            }).error(function(emsg){
              $scope.esmg = "Could not load notes"
            })
        }
    })
