var bettingGame = function bettingGame() {

  var bankRoll = 100
  var bet = $('#bet').val();
  var guess = $('#guess').val();

  $('.bet-btn').click(function(){
    gameLoop(bankRoll, bet, guess)
  });

  $('.reset-btn').click(function(){
    bankRoll = 100
    updateButton(bankRoll);
    $('.reset-btn').hide();
    $('.bet-btn').show();
    $('.message').text('Game reset!');
  });

  $("#bet").change(function() {
    bet = $(this).val();
    if(bet > bankRoll) {
      $('.bet-btn').hide();
    } else {
      $('.bet-btn').show(); 
    };
  });

  $("#guess").change(function() {
    guess = $(this).val();
  });

  var gameLoop = function gameLoop(bankroll, bet, guess) {
    bankRoll = bankroll
    try
    {
      console.log('checking bet')
      var checkBet = checkValue(bet, 5, 10);
      console.log('checking guess')
      var checkGuess = checkValue(guess, 1, 10);
      bankRoll -= checkBet;
      var val = getNum();
      if(val === checkGuess) {
        bankRoll += checkBet * 2;
        $('.message').text('You win!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
        updateButton(bankRoll);
      } else if (val === guess + 1 || val === guess - 1) {
        bankRoll += checkBet;
        $('.message').text('Almost!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
        updateButton(bankRoll);
      } else {
        $('.message').text('You lose!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
        updateButton(bankRoll);
      }
    }
    catch(ex)
    {
      $('.message').text(ex.message);
    }
  };

  var checkValue = function checkValue(answer, min, max) {
    console.log(answer);
    if(answer)
    {
      var num = parseInt(answer, 10);
      if(min && num < min)
      {
        throw new Error('Number should be more than ' + min);
      }
      if(max && num > max)
      {
        throw new Error('Number should be less than ' + max);
      }
      return num;
    }
    throw new Error('Please enter a number.');
  };

  var getNum = function() {
    return Math.floor((Math.random() * 10) + 1);
  };

  var updateButton = function(bankRoll) {
    $('.bank-roll').text(bankRoll);
    if(bet > bankRoll) {
      $('.bet-btn').hide();
    };
    if(bankRoll < 5) {
      $('.reset-btn').show();
    };
    icons(bankRoll);
  };

  var icons = function(bankRoll) {
    $('.pip').children().remove();
    for(var i = 0; i < bankRoll; i++) {
      $('.pip').append('<i class="fa fa-btc"></i>');
    };
  };

  updateButton(bankRoll);

};