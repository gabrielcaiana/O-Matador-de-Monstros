new Vue ({
    el: '#app',
    data: {
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
       
    },
    watch: {

    }
})