new Vue ({
    el: '#app',
    data: {
        running: false,
        playerLife: 100, // Life do jogador
        monsterLife: 100, // Life do Monstro
        logs: []
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
            this.logs = [] // sempre que iniciar novo jogo os logs serão zerados
        },
        // Função attack e especial
        attack(especial) {
            // Chamando a função para causar dano e deixando como false o especial para apenas dar dano basico
            this.hurt('monsterLife', 5,10, false, 'monstro', 'jogador', 'monster')
            if(this.monsterLife > 0) {
                this.hurt('playerLife' ,7,12, especial,'jogador', 'monstro', 'player') // o monstro pode estar sujeito a um ataque especial então habilito o true
            }
        },
        // função que armazena a lógica de ataque para ver se o ataque é especial ou não    
        hurt(prop, min, max, especial, source, target, cls) { // propriedade, dano minimo,dano maximo, especial, fonte do ataque, alvo do ataque, player que atacou
            const plus = especial  ? 5 : 0 // variavel recebe o valor de especial e caso seja verdadeiro soma 5 caso contrário recebe 0
            // Calcula o tamanho do dano que o jogador irá causar e se o valor de especial for true ela irá acrescentar 5, ao dano se não irá apenas dar o dano original
            const hurt = this.getRandom(min + plus, max + plus)
            /* math.max está sendo utilizado para que o life do jogador nunca seja negativo ou seja
            this.playerLife - o dano que foi calculado, se essa diferença for negativa o maior numero dos dois
            será o 0 e se este numero for maior do que 0 ele irá permanecer */
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu o ${target} com ${hurt}.`, cls)
        },
        //função para curar e atacar
        healAndHurt() {
            this.heal(10,15)
            this.hurt('playerLife', 7,13,false, 'monstro', 'jogador','monster')
        },
        // Função para curar o jogador
        heal(min, max) {
            const heal = this.getRandom(min,max) // função para gerar um valor randomico na cura
            this.playerLife = Math.min(this.playerLife + heal,100) // esta função ira pegar sempre o menor valor dos dois
            this.registerLog(`Jogador ganhou força de ${heal}`, 'player')
        },
        // Função para gerar valores aleatórios entre dois numeros
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        // função para registrar os logs do jogo
        registerLog(text,cls) {
            this.logs.unshift({text,cls}) // significa que eu sempre irei colocar o elemento na primeira posição do Array (sempre o log mais recente vai ficar no começo)
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