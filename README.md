# react-aula
por que react?

. organização
. sites com muitas atualizações
. fluidez por ser SPA
. comunidade
. componentes (ver organização)
. estado
. erros react são bem organizados


algumas coisas dentro do react

. fragment: torna  "div" root desnecessária
. helmet: mexer nos heads das páginas
  - problema:  manipular diversas outras informações no head de uma página específica (como meta tags entre algumas outras configurações)
  - instalar via npm e importar a lib com import
    * inserir dentro do return do método render no meio do componente, passando um atributo title para modificar o título
      ou adicionar outras informações no head da página
    * pode injetar informações que vem via ajax por meio do setstate do react


e mais

. react era uma treta para configurar
  - investir tempo para aprender a configurar, 
    só depois de muito tempo ambiente estava pronto
. mdn web docs: repositório com documentação de várias tecnologias
  - html
  - css
  - javascript
  - etc
. standard js (na acesso usamos o lsint)
. tc39: comitê que avalia propostas futuras para js e sua implementação
. babel: transpila para js compatível
. bem (block element modifier): padronização na criação de classes css
  - não é um framework, é um conjunto de ideias para orientar o seu processo 
    de construção de CSS sustentável para qualquer site ou aplicação (https://willianjusten.com.br/falando-sobre-rscss/)
    * smac
    * rscss
. pwa (progressive web apps): ligado à experiência do usuário
  - confiável: está disponível, mesmo sem conexão com a internet
  - rápido: não ser rápido só no carregamento, mas também na interação com o usuário
  - atraente: cuidado na aparência e em como o site será carregado
. ssr (server side render)
  - gatsby
  - razzle
