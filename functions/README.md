# API para consulta á Biblía

## Funcionalidade
Está API foi criada para fezer consulta á Biblia de forma que retorne os valores até um unico vercículo.

## Requisição

### Parametros:

* __language__    - Selecionada o idioma *(casos não seja informado retorna como padrão pr-bt)*.
* __version__     - Seleciona a versão *(casos não seja informado retorna como padrão NVI)*.
* __book__        - Seleciona o livro *(caso não seja informado retorna uma mensagem solicitando que preencha : caso seja invalido retorna os livros que existem)*.
* __chapter__     - Seleciona o capítulo *(caso não seja informado retorna todos os capítulos do livro selecionado)*.
* __verse__       - Seleciona o versículo *(caso não seja informado retorna o capítulo selecionado completo)*.

### URL

https://<span></span>us-central1-webbibletest.cloudfunctions.net/bible?__language__=*pt-br*&__version__=*acf*&__book__=*mateus*&__chapter__=*1*&__verse__=*1*