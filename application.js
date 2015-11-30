var bettingGame = function bettingGame() {
  console.log('bettingGame started');
  gameLoop(100);
};

var gameLoop = function gameLoop(startcash) {
  var bankRoll = startcash;
  while (bankRoll > 5)
  {
    try
    {
      var bet = promptUser('Bet between $5 and $10', 5, 10);
      var guess = promptUser('Pick a number from 1 to 10', 1, 10);
      bankRoll -= bet;
      var val = getNum();
      if(val === guess) {
        bankRoll += bet * 2;
        alert('You win!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
      } else if (val === guess + 1 || val === guess - 1) {
        bankRoll += bet;
        alert('Almost!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
      } else {
        alert('You lose!\nThe winning number is: ' + val + '\nNew total: $' + bankRoll);
      }
    }
    catch(ex)
    {
      alert(ex.message);
    }
  }
};

var promptUser = function promptUser(text, min, max) {
  var answer = prompt(text);
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
