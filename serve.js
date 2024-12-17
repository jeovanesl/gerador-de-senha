const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

//middeware para processar o JSON
app.use(bodyParser.json)

//função que gera senhas
function gerantePassword(length, userUppercase, userNumbers, userSpecialChars){
    const lowerCaseChasrs = 'abcdefghijklmnopqrstuvwxyz'
    const Uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const Numbers = '0123456789'
    const SpecialChars = '!@#$%^&*()_+-{}[]<>?'

    let characterPool = lowerCaseChasrs;

    if(userUppercase) characterPool += Uppercase
    if(userNumbers) characterPool += Numbers
    if(userSpecialChars) characterPool += SpecialChars

    if(!characterPool){
        throw new Error('nenhum caractere foi selecionado')
    }

//variavel que guarda senha aletoria
    let password = ''

    //lop para criar a combinaçao de senha aleatoria
    for (let i =o; i < length; i ++){
        const randomIndex = Math.floor(Math.random() * characterPool.length)
        password += characterPool[randomIndex]
    }

    //retona senhar
    return password
}

//rota para gerar as senhas
app.post('/gerenate-password', (req, res) =>{
        const {length, userUppercase, userNumbers, userSpecialChars}= req.body

        if(!!length ||typeof length != 'number' ||length <=0){
            return res.status(400).json({Error: 'O campo length (o tamanho da senha) deve ser maior qeu 0'})
        }

        try {
            const password = gerantePassword(length, userUppercase, userNumbers, userSpecialChars)
            res.json({password})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
})

//inicializa o servidor
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})