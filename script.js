let cells = document.querySelectorAll('.cell');
let playerTurn = 'O'
let count = 0;
let possibilities;
let O_winnings = 0;
let X_winnings = 0;

cells.forEach((cell, ind) => {
    cell.addEventListener('click', () => {
        // when on the very first click
        if (count === 0) {
            winner.innerText = '';
        }

        // when the cell is already filled
        if(cell.innerText !== ''){
            return;
        }

        if (playerTurn === 'O') {
            cell.innerText = 'X';
            cell.setAttribute('aria-valuetext', 'X');
            cell.classList.remove('text-danger');
            cell.classList.add('text-success');
        }
        else {
            cell.innerText = 'O';
            cell.setAttribute('aria-valuetext', 'O');
            cell.classList.remove('text-success');
            cell.classList.add('text-danger');
        }

        playerTurn = cell.innerText;
        count++;

        possibilities = [
            cells[0].getAttribute('aria-valuetext') == cells[1].getAttribute('aria-valuetext') && cells[1].getAttribute('aria-valuetext') == cells[2].getAttribute('aria-valuetext'),
            cells[3].getAttribute('aria-valuetext') == cells[4].getAttribute('aria-valuetext') && cells[4].getAttribute('aria-valuetext') == cells[5].getAttribute('aria-valuetext'),
            cells[6].getAttribute('aria-valuetext') == cells[7].getAttribute('aria-valuetext') && cells[7].getAttribute('aria-valuetext') == cells[8].getAttribute('aria-valuetext'),
            cells[0].getAttribute('aria-valuetext') == cells[3].getAttribute('aria-valuetext') && cells[3].getAttribute('aria-valuetext') == cells[6].getAttribute('aria-valuetext'),
            cells[1].getAttribute('aria-valuetext') == cells[4].getAttribute('aria-valuetext') && cells[4].getAttribute('aria-valuetext') == cells[7].getAttribute('aria-valuetext'),
            cells[2].getAttribute('aria-valuetext') == cells[5].getAttribute('aria-valuetext') && cells[5].getAttribute('aria-valuetext') == cells[8].getAttribute('aria-valuetext'),
            cells[0].getAttribute('aria-valuetext') == cells[4].getAttribute('aria-valuetext') && cells[4].getAttribute('aria-valuetext') == cells[8].getAttribute('aria-valuetext'),
            cells[2].getAttribute('aria-valuetext') == cells[4].getAttribute('aria-valuetext') && cells[4].getAttribute('aria-valuetext') == cells[6].getAttribute('aria-valuetext'),
        ];

        // if someone wins
        if (result(possibilities)) {
            winner.innerText = playerTurn + ' Won';
            if (playerTurn === 'O') {
                O_winnings++;
                document.querySelector('#player-O').innerText = O_winnings;
            }
            else {
                X_winnings++;
                document.querySelector('#player-X').innerText = X_winnings;
            }
            reset();
        }

        // if no one wins
        if (count >= 9) {
            winner.innerText = 'No one won 😥';
            reset();
        }
    })
})


function result(possibilities) {
    for (const bool of possibilities) {
        if (bool) {
            return true;
        }
    }
    return false;
}

const reset = () => {
    cells.forEach((cell, ind) => {
        cell.innerText = '';
        cell.setAttribute('aria-valuetext', ind);
    })
    count = 0;
}

end_btn.addEventListener('click', () => {
    if (O_winnings === X_winnings) {
        finalWinner.innerText = 'No one won, play again🤨';
    }
    else if (O_winnings > X_winnings) {
        finalWinner.innerText = 'O is winner 😍';
        finalWinner.classList.add('text-danger');
    }
    else {
        finalWinner.innerText = 'X is winner 😎';
        finalWinner.classList.add('text-success');
    }
})

restart.addEventListener('click', () => {
    location.reload();
})