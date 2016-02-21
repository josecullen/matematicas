define(["angular", "js/services", 'js/services/game-timer', 'js/services/game-instance', 'js/services/game-tooltips'], 
    function(angular, services){
	services.factory('gameScoring', ['$log', 'gameTimer', 'gameInstance', 'gameTooltips',
        function($log, gameTimer, gameInstance, gameTooltips){				
	    
        $log.info("gameScoring");

        var update = function(wasCorrect){
            var responseLevel = 0;
            var plusScore = 0;
            var plusTime = 0;

            if(wasCorrect){
                plusScore = 10;

                gameInstance.status.corrects++;

                if(gameTimer.problemTime.value < 5){
                    gameInstance.status.responses.great++;
                    plusTime += 5;
                    plusScore += 3;
                    responseLevel = 4;
                }else if(gameTimer.problemTime.value < 8){
                    gameInstance.status.responses.good++;
                    plusTime += 3;
                    plusScore += 1;
                    responseLevel = 3;
                }else if(gameTimer.problemTime.value < 10){
                    gameInstance.status.responses.ok++;
                    plusTime += 1;
                    responseLevel = 2;
                }else{
                    gameInstance.status.responses.pass++;
                    responseLevel = 1;
                }
                
                gameInstance.status.score += plusScore;
                gameTimer.gameTime.value += plusTime;

            }else{        
                gameInstance.status.responses.nook++;
                gameInstance.status.incorrects++;
                gameInstance.status.lives.pop();
                if(gameInstance.status.lives.length == 0){
                    gameInstance.instance.status = "GAME_OVER";
                }
            }

            gameTooltips.setScoreTooltip(plusScore);
            gameTooltips.setTimeTooltip(plusTime);

            return responseLevel;            
        }

        return {
            update : update
        }

	}]);
})
