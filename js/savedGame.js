
let numbers = ['one', 'two', 'three']
let colors = ['red', 'green', 'purple']
let shapes = ['rhombus', 'ellipse', 'squiggle']
let fill = ['empty', 'full', 'striped']
let selectedCards = []
let board = []
let gameCards = []
let hintNumber = 0;
let oldScore = JSON.parse(sessionStorage.getItem('current-player')) || 1
if (oldScore == 1) {
    document.getElementById('messages').textContent = 'please sign up or log in'
    document.getElementById('messages').style.opacity = 1;
}
oldScore = oldScore.score
let player = JSON.parse(sessionStorage.getItem('current-player')) || 1
if (player == 0) {
    document.getElementById('messages').textContent = 'please sign up or log in'
    document.getElementById('messages').style.opacity = '1'
}
player = player.name
document.getElementById('oldScore').textContent = oldScore
let oldGameCards = JSON.parse(localStorage.getItem('saved-games')) || [0]
oldGameCards = oldGameCards.find(game => game.userName == player)
if (!oldGameCards) {
    gameCards = []
    document.getElementById('board').remove()
    document.getElementById('messages').textContent = 'you have no saved game'
    document.getElementById('messages').style.opacity = '1'
}
else {
    document.getElementById('hint').addEventListener('click', hint)
    document.getElementById("add3Cards").addEventListener('click', addThreeCards)
    document.getElementById('save').addEventListener('click', save)
    document.getElementById('newScore').textContent = oldGameCards.score
    let score = oldGameCards.score
    gameCards = oldGameCards.gameCards
    if (gameCards.length >= 9)
        board = gameCards
    else
        board = gameCards.splice(0, 9)   
    if(searchBoard(board)==false)
    {
        document.getElementById('messages').textContent = 'you finished the game!'
        document.getElementById('messages').style.opacity = '1';
        const users = JSON.parse(localStorage.getItem('users'))
        let user = users.find(user => user.name == player)
        user.score +=score;
        localStorage.setItem('users', JSON.stringify(users))
        sessionStorage.setItem('current-player',JSON.stringify(user))
        score = 0;
        oldScore = 0;
        let games=localStorage.getItem('saved-games')
        games.filter(game=>game.userName!=player)
        localStorage.setItem('saved-games',JSON.stringify(games))
    }
    createBoard(board)
    function isSetAndType(threeCards) {
        let multAttributes = [];
        for (let i = 0; i < 4; i++) {
            multAttributes.push(threeCards[0].attributes[i] * threeCards[1].attributes[i] * threeCards[2].attributes[i])
        }

        multAttributes = multAttributes.filter(attribute => attribute == 6 || attribute == 1 || attribute == 8 || attribute == 27)
        if (multAttributes.length != 4) {
            return false;
        }
        else {
            return multAttributes;
        }
    }


    function createBoard() {
        for (let i = 0; i < board.length; i++) {
            let card = document.createElement('div')
            card.setAttribute('class', board[i].classes)
            card.setAttribute("id", board[i].id)
            let contentDiv = document.createElement('div')
            card.appendChild(contentDiv).setAttribute('class', 'contentDiv')
            for (let j = 1; j <= 3; j++) {
                let shapesDiv = document.createElement('div')
                contentDiv.appendChild(shapesDiv).setAttribute('class', 'shapesDiv')
                let frontStyleDiv = document.createElement('div')
                let inside = document.createElement('div')
                shapesDiv.appendChild(inside).setAttribute('class', 'insideBorder')
                shapesDiv.appendChild(frontStyleDiv).setAttribute('class', 'inside')
            }
            document.getElementById('board').appendChild(card).addEventListener('click', waitForThree)
            for (let j = 0; j < board[i].attributes[0]; j++) {
                document.getElementById('' + board[i].id).children[0].children[j].classList.add('block')
                document.getElementById('' + board[i].id).children[0].children[j].classList.remove('none')
            }
            for (let j = board[i].attributes[0]; j < 3; j++) {
                document.getElementById('' + board[i].id).children[0].children[j].classList.add('none')
                document.getElementById('' + board[i].id).children[0].children[j].classList.remove('block')
            }


        }
    }

    function searchBoard(board) {
        for (let i = 0; i < board.length; i++)
            for (let j = i + 1; j < board.length; j++)
                for (let k = j + 1; k < board.length; k++) {
                    let choosenSet = [board[i], board[j], board[k]]

                    choosenSet = isSetAndType(choosenSet)
                    if (choosenSet) {
                        return choosenSet;
                    }
                }
        return false;
    }
    function changeCards(cardsToChange) {
        if (gameCards.length < 3) {
            for (let i = 0; i < 3; i++) {
                removeLastCards(cardsToChange[i])
                board = board.filter(card => card.id != cardsToChange[i].id)
            }
            if (!searchBoard(board)) {
                document.getElementById('messages').textContent = 'you finished the game!'
                document.getElementById('messages').style.opacity = '1';
                const users = JSON.parse(localStorage.getItem('users'))
                let user = users.find(user => user.name == player)
                user.score = score;
                localStorage.setItem('users', JSON.stringify(users))
                score = 0;
                oldScore = 0;
                return false;
            }
            return board;
        }
        if (board.length > 9) {
            for (let i = 0; i < 3; i++) {
                document.getElementById('board').setAttribute('class', 'boardSmall')
                let cardToRemove = document.getElementById("" + cardsToChange[i].id)
                cardToRemove.remove()
            }
            board = board.filter(card => card != cardsToChange[0] && card != cardsToChange[1] && card != cardsToChange[2])
            return board;
        }
        for (let i = 0; i < 3; i++) {
            let newCard = gameCards.splice(0, 1)
            document.getElementById(cardsToChange[i].id).setAttribute('id', '' + newCard[0].id)
            document.getElementById('' + newCard[0].id).style.opacity = 0;
            document.getElementById('' + newCard[0].id).setAttribute('class', newCard[0].classes)
            for (let j = 0; j < newCard[0].attributes[0]; j++) {
                document.getElementById('' + newCard[0].id).children[0].children[j].classList.add('block')
                document.getElementById('' + newCard[0].id).children[0].children[j].classList.remove('none')
            }
            for (let j = newCard[0].attributes[0]; j < 3; j++) {
                document.getElementById('' + newCard[0].id).children[0].children[j].classList.add('none')
                document.getElementById('' + newCard[0].id).children[0].children[j].classList.remove('block')
            }
            animateCard(document.getElementById("" + newCard[0].id));
            cardsToChange[i].id = newCard[0].id
            cardsToChange[i].classes = newCard[0].classes
            cardsToChange[i].attributes = newCard[0].attributes
        }
        return board;
    }

    function animateCard(card) {
        let stage = null;
        const cardToChange = card;
        let opacity = 0;
        clearInterval(stage);
        stage = setInterval(frame, 20);
        function frame() {
            if (opacity > 1) {
                clearInterval(stage);
                cardToChange.style.opacity = 1;
                return;
            } else {
                opacity += 0.05;
                cardToChange.style.opacity = opacity;
            }
        }

    };

    function waitForThree() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected')
            selectedCards = selectedCards.filter(card => card.id != this.id) || []
        }
        else {
            this.classList.add('selected')
            let card = board.find(card => card.id == this.id);
            selectedCards.push(card)
            if (document.getElementsByClassName('selected').length == 3) {

                if (isSetAndType(selectedCards)) {

                    score += 3
                    document.getElementById('newScore').textContent = score;
                    document.getElementById('changingScore').setAttribute('class', 'set')
                    changeCards(selectedCards)
                    setTimeout(removeClassName, 500)
                }
                else {
                    document.getElementById('messages').textContent = 'this is not a set!'
                    document.getElementById('changingScore').setAttribute('class', 'notSet')
                    score -= 3
                    document.getElementById('newScore').textContent = score;
                    removeMessages(document.getElementById('messages'))
                    setTimeout(removeClassName, 500)
                }

                hintNumber = 0;
                selectedCards = []
            }
        }
    }
    function removeClassName() {
        for (let i = 0; i < board.length; i++)
            if (document.getElementById('board').children[i].classList.contains('selected'))
                document.getElementById('board').children[i].classList.remove('selected')
    }

    function addThreeCards() {
        if (gameCards.length < 4) {
            document.getElementById('messages').textContent = 'you finished the game!'
        }
        if (this.classList.contains('highLighted'))
            this.classList.remove('highLighted')
        let cards = gameCards.splice(0, 3)
        if (searchBoard(board)) {
            score--
            document.getElementById('newScore').textContent = score
            document.getElementById('messages').textContent = 'think a little more!'
            removeMessages(document.getElementById('messages'))
            return;
        }
        document.getElementById('board').setAttribute('class', 'boardBig')
        board = board.concat(cards)
        for (let i = 0; i < 3; i++) {
            let card = document.createElement('div')
            card.setAttribute('class', board[board.length - 3 + i].classes)
            card.setAttribute("id", board[board.length - 3 + i].id)
            let contentDiv = document.createElement('div')
            card.appendChild(contentDiv).setAttribute('class', 'contentDiv')
            for (let j = 1; j <= 3; j++) {
                let shapesDiv = document.createElement('div')
                contentDiv.appendChild(shapesDiv).setAttribute('class', 'shapesDiv')
                let frontStyleDiv = document.createElement('div')
                let inside = document.createElement('div')
                shapesDiv.appendChild(inside).setAttribute('class', 'insideBorder')
                shapesDiv.appendChild(frontStyleDiv).setAttribute('class', 'inside')
            }
            document.getElementById('board').appendChild(card).addEventListener('click', waitForThree)
            for (let j = 0; j < board[board.length - 3 + i].attributes[0]; j++) {
                document.getElementById('' + board[board.length - 3 + i].id).children[0].children[j].classList.add('block');
                document.getElementById('' + board[board.length - 3 + i].id).children[0].children[j].classList.remove('none');

            }
            for (let j = board[board.length - 3 + i].attributes[0]; j < 3; j++) {
                document.getElementById('' + board[board.length - 3 + i].id).children[0].children[j].classList.add('none');
                document.getElementById('' + board[board.length - 3 + i].id).children[0].children[j].classList.remove('block');

            }

        }
    }

    function hint() {
        let hint = searchBoard(board)
        let attributesArray = [numbers, colors, shapes, fill]
        if (hint) {
            for (let i = 0; i < hint.length; i++) {
                switch (hint[i]) {
                    case 1:
                        hint[i] = attributesArray[i][0];
                        break;
                    case 8:
                        hint[i] = attributesArray[i][1]
                        break;
                    case 27:
                        hint[i] = attributesArray[i][2]
                        break;
                    case 6:
                        hint[i] = 'mixed'
                        break;

                }
            }
            visibleHint(hint);
            removeMessages(document.getElementById('currentHint'))
        }
        else {
            score--;
            document.getElementById('add3Cards').classList.add('highLighted')
        }
        selectedCards = []
        hint = 0;
    }
    function visibleHint(hint) {
        hintNumber++
        switch (hintNumber) {
            case 1:
                document.getElementById('currentHint').textContent = `numbers: ${hint[0]}`
                score--;
                document.getElementById('newScore').textContent = score;
                return;
            case 2:
                document.getElementById('currentHint').textContent = `colors: ${hint[1]}`
                score--
                document.getElementById('newScore').textContent = score;
                return;
            case 3:
                document.getElementById('currentHint').textContent = `shapes: ${hint[2]}`
                score--
                document.getElementById('newScore').textContent = score;
                return;
            case 4:
                document.getElementById('currentHint').textContent = `fill: ${hint[3]}`
                score--
                document.getElementById('newScore').textContent = score;
                return;
        }
    }
    function removeMessages(currentMessage) {
        let stage = null;
        const message = currentMessage;
        let opacity = 1;
        message.style.opacity = 1;
        clearInterval(stage);
        stage = setInterval(frame, 100);
        function frame() {
            if (opacity <= 0) {
                clearInterval(stage);
                return;
            } else {
                opacity -= 0.05;
                message.style.opacity = opacity;
            }
        }
    }
    function removeLastCards(cardJS) {
        let stage = null;
        const card = document.getElementById('' + cardJS.id);
        let opacity = 1;
        card.style.opacity = 1;
        clearInterval(stage);
        stage = setInterval(frame, 100);
        function frame() {
            if (opacity <= 0) {
                clearInterval(stage);
                return;
            } else {
                opacity -= 0.2;
                card.style.opacity = opacity;
            }
        }
        card.removeAttribute('class')

    }
    function save() {
        const savedGames = JSON.parse(localStorage.getItem('saved-games')) || []
        gameCards = board.concat(gameCards)
        const playerSaving = {
            userName: player,
            gameCards: gameCards,
            score: score,
        }
        savedGames.filter(game => game.userName != playerSaving.userName)
        savedGames.push(playerSaving)
        localStorage.setItem('saved-games', JSON.stringify(savedGames))
        window.location.href = '../html/home.html'
    }

}