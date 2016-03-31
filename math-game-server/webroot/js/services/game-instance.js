define(["angular",'js/services', 'js/services/game-services'], function(angular, services){
	
    services.factory('gameInstance', ['$log', 'game', function($log,game){
        
        $log.info("gameInstance");

        var status = {
            id : "",
            problemStatus: "SHOW_PROBLEM",
            instanceId : "",
            lives: [1,2,3],
            problemCount: 0,
            responses: {
                nook: 0,
                pass:0,
                ok: 0,            
                good:0,
                great: 0
            },
            corrects: 0,
            incorrects: 0,      
            score: 0,       
            time: 60,
            problemTime: 0,
            levelCount: 0
        };

        var joinGame = function(name, selectedInstance, callback){

            resetStatus();
            
            var params = {"playerName" : name, "instance" : selectedInstance };
            
            game.player.one.post(params).then(function(response){
                console.log("game.player.one : response");
                console.log(response);
                if(response.status == 'SUCCESS'){                    
                    
                    game.instance.one.get(selectedInstance.gameId, selectedInstance._id, "RANDOM")
                    .then(function(instanceResponse){
                        console.log("instance response :");
                        console.log(instanceResponse);
                        gameInstance.instance = instanceResponse; 
                        configGame(response.id);
                        callback();
                    });            
                }
                
            });         

        };

        function resetStatus(){
            gameInstance.status = {
                id : "",
                problemStatus: "SHOW_PROBLEM",
                instanceId : "",
                lives: [1,2,3],
                problemCount: 0,
                responses: {
                    nook: 0,
                    pass:0,
                    ok: 0,            
                    good:0,
                    great: 0
                },
                corrects: 0,
                incorrects: 0,      
                score: 0,       
                time: 60,
                problemTime: 0,
                levelCount: 0
            };
        }

        function configGame(id){
            gameInstance.instance.status = "SUCCESS";
            gameInstance.status.id = id;
            gameInstance.status.instanceId = gameInstance.instance.instanceId;
        }

        var resetAll = function(){
            resetStatus();
            gameInstance.instance = {status : "NOT_SELECTED" };
        }

        var gameInstance = {
            instance : { status : "NOT_SELECTED" },
            status : status,
            join : joinGame,
            resetAll : resetAll
        };



        return gameInstance;

	}]);

})
