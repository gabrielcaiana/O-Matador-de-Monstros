new Vue ({
    el: '#app',
    data: {
        running: false,
        playerLife: 23, // Life do jogador
        monsterLife: 0, // Life do Monstro
    },
    computed: {
        hasResult() {
            //essa função apenas me dará retorno caso o valor de playerLife ou MonsterLife seja 0
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        //criando função para iniciar o jogo, nessa função é zerada a vida do jogador e do monstro
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
        }
       
    },
    watch: {

    }
})