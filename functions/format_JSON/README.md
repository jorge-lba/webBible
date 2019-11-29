# JSON Formatter

Essa aplicação foi desenvolvida para formatar arquivos .json, com finalidade de agilizar o processo de alterações do formato original.

Todas as versões utilizadas foram disponibilizadas no Github do [Thiago Bodruk](https://github.com/thiagobodruk).
Estrutura JSON:

    [
        {
        "abbrev" : "abbrev"
        "book" : "name"
        "chapters": 
            [
                ["Verse 1", "Verse 2", "Verse 3", "..."],
                ["Verse 1", "Verse 2", "Verse 3", "..."],
                ["Verse 1", "Verse 2", "Verse 3", "..."]
            ]
        }
    ]

Por preferencia decidi mudar para a seguinte estrutura:

    [
        {
        "language":"pt-br",
        "title":"Judas",
        "abbreviation":"jd",
        "newTestament":true 
        "1": {
                "1":"Verse 1",
                "2":"Verse 2",
                "3":"Verse 3"... 
            }...

        }
    ]

O script será responsável também por separar os livros em suas respectivas pastas. Exemplo:

    +- bible/
        |
        +- pt-br/
            |
            +- NVI/
                |
                +- _genesis.json
                |
                +- _exodo.json
                |
                +- ...
                |
                +- index.js

No formato original todos os livros estão em um único arquivo, fragmentando em diversos arquivos, assim caso seja necessário fazer uma atualização ou correção ficara mais simples e leve de ser implementada.

Também será criado um arquivo index.js para fazer os require() unindo todos o livro para um acesso mais simples pelo script de controle.
