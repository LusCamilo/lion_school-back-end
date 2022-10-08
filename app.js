/***********************************
 * 
 *  Objetivo:           Criar uma API para a lion school
 *  autor:              Lucas Camilo
 *  Data de Criação:    15/09/2022
 *  versão:             1.0
 * 
**********************************/


//criar aplicacoes node no formato de API
const express = require('express')

//manipula as permissoes do protocolo http
const cors = require('cors')

//controla o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser')

//import do arquivo de estados
const {getAlunoMatricula, getCursos, getAlunos, getDisciplinas, getCursoAlunos, getAlunosCurso, getTitulo} =  require('./modulos/functions')

//cria um objeto chamado app que sera especialista nas funcoes do express
const app = express()

app.use((request, response, next) => {
    //Permite especificar quem serão os IPs que podem acessar a API (* - significa todos)  
    response.header('Acces-Control-Allow-Origin', '*')
    // Permite especificar quais serao os verbos (metodos) que a API irá reconhecer
    response.header('Acces-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')

    // Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors())

    next()

})

app.get('/cursos', cors(), async function (request, response, next){

    let cursos_disponiveis = getCursos()


    if (cursos_disponiveis) {

        response.status(200)
        response.json(cursos_disponiveis)
    } else {
        response.status(404)
    }

})
app.get('/alunos', cors(), async function (request, response, next){

    let aluno = getAlunos()

    if (aluno) {

        response.status(200)
        response.json(aluno)

    } else {
        response.status(404)
    }
    
})
app.get('/alunos/:matricula', cors(), async function(request, response, next){

    let matricula = request.params.matricula

    let aluno = getAlunoMatricula(matricula)

    if (aluno) {
        response.status(200)
        response.json(aluno)
    } else{
        response.status(404)
    }
})
app.get('/disciplinas/alunos/:matricula', cors(), async function (request, response, next){

    let  matriculaAluno = request.params.matricula
    let  alunoMatricula = getDisciplinas(matriculaAluno)
    if (alunoMatricula) {

        response.status(200)
        response.json(alunoMatricula)

    } else {

        response.status(404)

    }

})
app.get('/alunos/status/:curso/:status', cors(), async function (request, response, next){

    let cursoAluno = request.params.curso
    let statusAluno = request.params.status
    let matriculaAluno = getCursoAlunos(cursoAluno, statusAluno)
    if (matriculaAluno) {

        response.status(200)
        response.json(matriculaAluno)

    } else {

        response.status(404)

    }

})
app.get('/alunos/curso/:curso', cors(), async function(request, response, next){

    let curso = request.params.curso
    let alunos = getAlunosCurso(curso)
   

    if (alunos) {
        response.status(200)
        response.json(alunos)
    } else {

        response.status(404)
        
    }
})
app.listen(8080, function () {

    console.log('Servidor aguardando requisiçoes.')

})