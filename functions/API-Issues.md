# API

- [ ] __Functions - Firebase__ _(Pasta onde toda a API vai ser implementada para ser hospedada no Firebase Functions.)_
- [ ] __Bíblia__
    - [ ] __Arquivos JSON (Idiomas e Versões)__
        - [ ] Árabe - __ar-SVD__
        - [ ] Chinese - __zh-CUV/NUV__
        - [ ] German - __de-Schlachter__
        - [ ] Greek - __el-Greek__
        - [ ] English - __en-BBE/KJV__
        - [ ] Esperato - __eo-Esperanto__
        - [ ] Spanish - __es-RVR__
        - [ ] Finnish - __fi-Finnish/PR__
        - [ ] French - __fr-Apee__
        - [ ] Korean - __ko-KO__
        - [ ] Portuguese - __pt-br-AA/ACF/NVI__
        - [ ] Romanian - __ro-Cornilescu__
        - [ ] Russin - __ru-Synodal__
        - [ ] Vietnamese - __vi-Vietenamese__
    - [ ] __Controller__
        - [ ] Script para fazer o tratamento dos inputs e retornar o conteúdo solicitado.
    - [ ] __Script Getter - rebebe a solicitação http e retorna o resultado em JSON.__

---
## Formatador JSON

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

Como o processo seria muito longo vou desenvolver um script para fazer a formatação.

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

- [ ] __Formatador-JSON__
