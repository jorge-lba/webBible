# JSON Formatter

Está aplicação foi desenvolvida para rodar em node js

Estou desenvolvendo uma api para consultar a Bíblia. Em busca de arquivos para usar achei o github do Thiago Bodruk, em seu repositório existem diversas versões e idiomas (https://github.com/thiagobodruk/bible/tree/master/json)

Os arquivos que utilizei são os .json, porem para fins de uma melhor legibilidade e manutenção, achei melhor mudar um pouco a formatação.
Como o processo manual seria muito trabalhoso e demorado, então criei esta aplicação para automatizar o processo.

A alteração feita é mudar de padrão de array utilizado (chapter: [[verse 1, verse 2,...]]), para o padrão de objeto (chapter: {1: {1: verse, 2:verse, ...}}). Tambem é feita a separação dos livros em arquivos (_genesis.json, _exodo.json...), desta forma caso tenha que atualizar algum erro os livros estaram individualizados, assim o arquivo atualizado sera menor.

Alem da formatação a aplicação cria um arquivo index.js para acessar os livros. Este arquivo exporta uma função que faz os require() e retorna um obj com os livros ({genesis,exedo, ...})

O acesso dos arquivo são simples de serem feitos, deixei um exmplo com onde crio três acessos em idiomas diferentes e faz um console.log mostrando as versões  (/bible/JSONNovo/index.js)

