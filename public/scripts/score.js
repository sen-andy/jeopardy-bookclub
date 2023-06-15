const player1 = {
    score: 0,
    name: ''
}

const player2 = {
    score: 0,
    name: ''
}

const player3 = {
    score: 0,
    name: ''
}

export let players = [ player1, player2, player3 ]

export let addScore = (index, score) => {
    return players[index].score += Number(score);
}

export let removeScore = (index, score) => {
    return players[index].score -= Number(score);
}