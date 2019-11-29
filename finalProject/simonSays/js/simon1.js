	// defines all variables 
	$(document).ready(function() {
			var shapes = $('#squares li');
			var start = $('#start');
			var state = 'wait';
			var computerSequence = new Array();
			var level = 1;
			var squareFlash;

			// initializes the game. 		
            var initiate = function() {
				$('#level').text('Level ' + level);
				squareFlash = 0;
				buttonPress = 0;
				$(this).text('Simon says...');
				$('body').removeClass('gameOver');
				lightSequence();
			}
			start.click(initiate);
			
			// when lights on uses css code pressed
			var lightOn = function(pressed) {
				shapes.eq(computerSequence[pressed]).addClass('pressed');
			};
			
			// when the light gets turned on it removes the class pressed. 
			var lightOff = function() {
				shapes.removeClass('pressed');
			};
			
			// uses the players level to generate a random sequence. 
            var lightSequence = function() {
				var randomNum =  Math.floor(Math.random() * 4);
				computerSequence[level-1] = randomNum;
				displaySequence();
			};
			
			// Displays the sequence then lets player play. 
			var displaySequence = function() {
				lightOff();
		
				if(squareFlash < level) {
					 setTimeout(function() { 
						setTimeout(function() { 
							displaySequence(); 
							squareFlash++; 
						}, 500);
						lightOn(squareFlash);
					}, 500);
                }
				else {
					state = 'play'
					$('body').addClass('play');
					start.text('Your turn...');
					clearTimeout(on);
				}	
			};
		
			// checks to see if the sequence the player clicked it the same as the sequence displayed. 
			// if it is the player goes to the next level 
			// if not the player sees game over and starts back at level 1. 
			shapes.click(function() {
				if(state == 'play') {
					var selectedShapes = $(this).index();
			
					if(computerSequence[buttonPress] == selectedShapes) {
						if(buttonPress == level-1) {
							state = 'wait';
							$('body').removeClass('play');
							start.text('Click when ready for next Level');
							level++;
						}												
                        lightOn(buttonPress);
                        
						 setTimeout(function() { 
							lightOff();
							buttonPress++;
						}, 200);
					}
					else {
						state = 'wait';
						$('body').removeClass('play');
						start.text('GAME OVER.');
						$('body').removeClass('play').addClass('gameOver');
						level = 1;	
					}
				}
            });
            
			
		});
		
