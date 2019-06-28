new Vue ({
    el: '#app',
    data: {
        running: false,
        playerLife: 100, // Life do jogador
        monsterLife: 100, // Life do Monstro
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
        },
        // Função attack e especial
        attack(especial) {
            // Chamando a função para causar dano e deixando como false o especial para apenas dar dano basico
            this.hurt('playerLife', 7,12, false)
            this.hurt('monsterLife' ,5,10, true) // o monstro pode estar sujeito a um ataque especial então habilito o true
        },
        // função que armazena a lógica de ataque para ver se o ataque é especial ou não    
        hurt(prop,min, max, especial) {
            const plus = especial  ? 5 : 0 // variavel recebe o valor de especial e caso seja verdadeiro soma 5 caso contrário recebe 0
            // Calcula o tamanho do dano que o jogador irá causar e se o valor de especial for true ela irá acrescentar 5, ao dano se não irá apenas dar o dano original
            const hurt = this.getRandom(min + plus, max + plus)
            /* math.max está sendo utilizado para que o life do jogador nunca seja negativo ou seja
            this.playerLife - o dano que foi calculado, se essa diferença for negativa o maior numero dos dois
            será o 0 e se este numero for maior do que 0 ele irá permanecer */
            this[prop] = Math.max(this[prop] - hurt, 0)
        },
        // Função para gerar valores aleatórios entre dois numeros
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        }
       
    },
    watch: {
        // OBS watch monitora tantos variaveis dentro de data como computed
        // função para monitorar quando o jogo for finalizado e ocultar os botões de controle
        // se o valor de hasResult for verdadeiro irei marcar o running como false
        hasResult(value) {
            if(value) this.running = false
        }
    }
})