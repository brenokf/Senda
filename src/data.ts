import { Card } from './types';

export const TAROT_DECK: Card[] = [
  {
    id: 't_0',
    name: 'O Louco',
    meanings: {
      general: 'Inícios, espontaneidade, fé no universo e aventura.',
      love: 'Um novo amor inesperado ou uma fase de liberdade no relacionamento.',
      work: 'Novos projetos arriscados, mas promissores. Siga sua intuição.',
      shadow: 'Irresponsabilidade, falta de foco e riscos desnecessários.'
    },
    advice: ['Dê o salto de fé.', 'Esteja aberto ao novo.', 'Não tenha medo do desconhecido.'],
    journaling: ['O que me impede de recomeçar?', 'Onde preciso de mais liberdade?', 'Qual risco vale a pena correr?']
  },
  {
    id: 't_1',
    name: 'O Mago',
    meanings: {
      general: 'Manifestação, poder pessoal, ação e habilidade.',
      love: 'Iniciativa no amor, magnetismo e capacidade de criar a relação desejada.',
      work: 'Habilidade para resolver problemas e transformar ideias em realidade.',
      shadow: 'Manipulação, talentos desperdiçados e falta de ética.'
    },
    advice: ['Você tem todas as ferramentas.', 'Aja agora.', 'Foque na sua intenção.'],
    journaling: ['Quais são meus maiores talentos?', 'Como posso manifestar meus desejos?', 'O que estou criando hoje?']
  },
  {
    id: 't_2',
    name: 'A Sacerdotisa',
    meanings: {
      general: 'Intuição, mistério, subconsciente e sabedoria interior.',
      love: 'Conexão espiritual profunda, segredos revelados ou necessidade de silêncio.',
      work: 'Confie na sua intuição sobre negócios. Observe antes de agir.',
      shadow: 'Segredos prejudiciais, intuição bloqueada ou passividade excessiva.'
    },
    advice: ['Ouça sua voz interior.', 'Aguarde o momento certo.', 'Observe os sinais.'],
    journaling: ['O que minha intuição está tentando dizer?', 'Quais mistérios me cercam?', 'Como posso silenciar minha mente?']
  },
  {
    id: 't_3',
    name: 'A Imperatriz',
    meanings: {
      general: 'Abundância, fertilidade, natureza e criatividade.',
      love: 'Amor nutritivo, sensualidade e possível gravidez ou nascimento de algo novo.',
      work: 'Crescimento, produtividade e sucesso criativo.',
      shadow: 'Dependência, excesso de controle ou falta de criatividade.'
    },
    advice: ['Nutra seus projetos.', 'Conecte-se com a natureza.', 'Permita-se receber.'],
    journaling: ['O que estou cultivando na minha vida?', 'Como posso ser mais criativo?', 'Onde sinto abundância?']
  },
  {
    id: 't_4',
    name: 'O Imperador',
    meanings: {
      general: 'Estrutura, autoridade, estabilidade e proteção.',
      love: 'Relacionamento estável, proteção e necessidade de limites claros.',
      work: 'Liderança, organização e disciplina para alcançar metas.',
      shadow: 'Tirania, rigidez excessiva e abuso de poder.'
    },
    advice: ['Crie uma estrutura sólida.', 'Assuma a liderança.', 'Estabeleça limites.'],
    journaling: ['Onde preciso de mais ordem?', 'Como exerço minha autoridade?', 'O que me traz segurança?']
  },
  {
    id: 't_5',
    name: 'O Hierofante',
    meanings: {
      general: 'Tradição, espiritualidade, ensino e conformidade.',
      love: 'Compromisso formal, valores compartilhados e busca por orientação.',
      work: 'Trabalho em equipe, mentoria e respeito às normas da instituição.',
      shadow: 'Dogmatismo, rebeldia cega ou hipocrisia.'
    },
    advice: ['Siga os caminhos conhecidos.', 'Busque um mentor.', 'Honre seus valores.'],
    journaling: ['Quais tradições são importantes para mim?', 'Quem são meus mestres?', 'No que eu realmente acredito?']
  },
  {
    id: 't_6',
    name: 'Os Enamorados',
    meanings: {
      general: 'Escolhas, parcerias, valores e alinhamento.',
      love: 'Decisões importantes no amor, união de almas e harmonia.',
      work: 'Parcerias estratégicas e necessidade de alinhar valores com o trabalho.',
      shadow: 'Dúvida paralisante, desequilíbrio e escolhas baseadas no ego.'
    },
    advice: ['Escolha com o coração.', 'Busque harmonia.', 'Alinhe seus valores.'],
    journaling: ['Qual escolha estou adiando?', 'O que valorizo em uma parceria?', 'Meu coração e mente estão em sintonia?']
  },
  {
    id: 't_7',
    name: 'O Carro',
    meanings: {
      general: 'Vontade, vitória, determinação e controle.',
      love: 'Superação de obstáculos no amor através da determinação e foco.',
      work: 'Progresso rápido, sucesso em viagens e conquista de objetivos.',
      shadow: 'Falta de direção, agressividade e perda de controle.'
    },
    advice: ['Mantenha o foco.', 'Domine suas emoções.', 'Siga em frente com confiança.'],
    journaling: ['O que me motiva a vencer?', 'Como lido com forças opostas?', 'Para onde estou indo?']
  },
  {
    id: 't_8',
    name: 'A Força',
    meanings: {
      general: 'Coragem, compaixão, controle interno e resiliência.',
      love: 'Paciência no amor, domar impulsos e fortalecer laços através da doçura.',
      work: 'Persistência, liderança suave e superação de desafios difíceis.',
      shadow: 'Fraqueza, medo e perda de autocontrole.'
    },
    advice: ['Use a suavidade, não a força bruta.', 'Confie na sua resiliência.', 'Domine seus medos.'],
    journaling: ['Onde preciso de mais coragem?', 'Como posso ser mais gentil comigo?', 'O que me torna forte?']
  },
  {
    id: 't_9',
    name: 'O Eremita',
    meanings: {
      general: 'Introspecção, busca da verdade, solidão e orientação.',
      love: 'Necessidade de tempo sozinho, reflexão sobre o relacionamento ou busca por sentido.',
      work: 'Análise profunda, busca por conhecimento e trabalho solitário produtivo.',
      shadow: 'Isolamento excessivo, timidez e recusa em ouvir conselhos.'
    },
    advice: ['Retire-se para refletir.', 'Busque sua própria luz.', 'Seja seu próprio guia.'],
    journaling: ['O que busco no meu silêncio?', 'Qual verdade estou tentando encontrar?', 'Como posso me conectar com minha sabedoria?']
  },
  {
    id: 't_10',
    name: 'A Roda da Fortuna',
    meanings: {
      general: 'Mudança, ciclos, destino e pontos de virada.',
      love: 'Mudanças inesperadas no amor, encontros de destino ou fim de um ciclo.',
      work: 'Novas oportunidades, altos e baixos financeiros e mudanças de cargo.',
      shadow: 'Má sorte, resistência à mudança e ciclos repetitivos negativos.'
    },
    advice: ['Aceite o fluxo da vida.', 'Prepare-se para a mudança.', 'Tudo passa.'],
    journaling: ['Quais ciclos estão se repetindo na minha vida?', 'Como lido com o inesperado?', 'O que a sorte significa para mim?']
  },
  {
    id: 't_11',
    name: 'A Justiça',
    meanings: {
      general: 'Equilíbrio, verdade, lei e causa e efeito.',
      love: 'Clareza no relacionamento, decisões justas e honestidade mútua.',
      work: 'Contratos, decisões legais e colheita do que foi plantado.',
      shadow: 'Injustiça, desequilíbrio e recusa em aceitar a responsabilidade.'
    },
    advice: ['Seja honesto consigo mesmo.', 'Busque o equilíbrio.', 'Assuma a responsabilidade.'],
    journaling: ['Onde preciso de mais justiça?', 'Estou sendo honesto nas minhas ações?', 'Qual é a verdade da situação?']
  },
  {
    id: 't_12',
    name: 'O Pendurado',
    meanings: {
      general: 'Pausa, rendição, nova perspectiva e sacrifício.',
      love: 'Fase de espera no amor, ver o parceiro sob nova luz ou sacrifício necessário.',
      work: 'Projetos parados, necessidade de mudar a estratégia ou ver as coisas de outro ângulo.',
      shadow: 'Estagnação, vitimismo e resistência em soltar o controle.'
    },
    advice: ['Mude sua perspectiva.', 'Aguarde o momento certo.', 'Solte o controle.'],
    journaling: ['O que preciso sacrificar para evoluir?', 'Como posso ver isso de outra forma?', 'Por que estou resistindo à pausa?']
  },
  {
    id: 't_13',
    name: 'A Morte',
    meanings: {
      general: 'Finais, transformação, transição e novos começos.',
      love: 'Fim de um relacionamento ou de uma fase, abrindo espaço para o novo.',
      work: 'Mudança drástica de carreira, fim de um contrato ou renovação total.',
      shadow: 'Resistência ao fim, medo da mudança e estagnação dolorosa.'
    },
    advice: ['Deixe o velho morrer.', 'Aceite a transformação.', 'Não tema o fim.'],
    journaling: ['O que preciso deixar ir?', 'Qual transformação está ocorrendo?', 'O que está nascendo desse fim?']
  },
  {
    id: 't_14',
    name: 'A Temperança',
    meanings: {
      general: 'Equilíbrio, moderação, paciência e alquimia.',
      love: 'Harmonia no amor, paciência com o parceiro e cura emocional.',
      work: 'Trabalho equilibrado, cooperação e mistura de ideias para o sucesso.',
      shadow: 'Excesso, desequilíbrio e falta de paciência.'
    },
    advice: ['Busque o caminho do meio.', 'Tenha paciência.', 'Misture os elementos com calma.'],
    journaling: ['Onde perdi meu equilíbrio?', 'Como posso ser mais paciente?', 'O que precisa de cura em mim?']
  },
  {
    id: 't_15',
    name: 'O Diabo',
    meanings: {
      general: 'Vício, apego, materialismo e sombras.',
      love: 'Obsessão, dependência emocional ou forte atração sexual sem conexão.',
      work: 'Ambição excessiva, sentir-se preso a um emprego ou falta de ética.',
      shadow: 'Libertação de vícios, encarar as sombras e quebrar correntes.'
    },
    advice: ['Reconheça suas correntes.', 'Encare suas sombras.', 'Liberte-se do que te prende.'],
    journaling: ['O que me mantém preso?', 'Quais são meus vícios emocionais?', 'O que estou escondendo de mim mesmo?']
  },
  {
    id: 't_16',
    name: 'A Torre',
    meanings: {
      general: 'Mudança súbita, caos, revelação e despertar.',
      love: 'Ruptura inesperada, verdades chocantes ou crise necessária para o crescimento.',
      work: 'Demissão súbita, colapso de um projeto ou mudança drástica de ambiente.',
      shadow: 'Evitar o desastre, medo do colapso e reconstrução lenta.'
    },
    advice: ['Deixe cair o que não é sólido.', 'Aceite a verdade, por mais dura que seja.', 'Reconstrua sobre bases reais.'],
    journaling: ['O que em minha vida precisa ser derrubado?', 'Como lido com crises?', 'Qual verdade foi revelada?']
  },
  {
    id: 't_17',
    name: 'A Estrela',
    meanings: {
      general: 'Esperança, inspiração, renovação e espiritualidade.',
      love: 'Cura no amor, otimismo e fé em um futuro brilhante com o parceiro.',
      work: 'Inspiração criativa, reconhecimento e seguir o propósito de alma.',
      shadow: 'Desespero, falta de fé e desânimo.'
    },
    advice: ['Mantenha a esperança.', 'Confie no universo.', 'Seja sua luz.'],
    journaling: ['O que me traz esperança?', 'Qual é o meu maior sonho?', 'Como posso me curar hoje?']
  },
  {
    id: 't_18',
    name: 'A Lua',
    meanings: {
      general: 'Ilusão, medo, ansiedade e intuição.',
      love: 'Incertezas no amor, emoções confusas ou segredos ocultos.',
      work: 'Falta de clareza nos negócios, riscos ocultos e necessidade de cautela.',
      shadow: 'Revelação de mentiras, superação de medos e clareza mental.'
    },
    advice: ['Cuidado com ilusões.', 'Encare seus medos.', 'Confie na sua intuição, mas com os pés no chão.'],
    journaling: ['O que estou temendo sem motivo?', 'O que está oculto nesta situação?', 'Como lido com o desconhecido?']
  },
  {
    id: 't_19',
    name: 'O Sol',
    meanings: {
      general: 'Sucesso, alegria, vitalidade e clareza.',
      love: 'Felicidade plena, clareza no relacionamento e momentos radiantes.',
      work: 'Sucesso total, reconhecimento, energia e novos começos brilhantes.',
      shadow: 'Excesso de confiança, arrogância ou brilho ofuscado temporariamente.'
    },
    advice: ['Brilhe com confiança.', 'Aproveite o sucesso.', 'Seja positivo.'],
    journaling: ['O que me traz alegria verdadeira?', 'Onde sinto meu brilho pessoal?', 'Pelo que sou grato hoje?']
  },
  {
    id: 't_20',
    name: 'O Julgamento',
    meanings: {
      general: 'Renascimento, chamado, perdão e avaliação.',
      love: 'Segunda chance no amor, despertar para uma nova fase ou decisão final.',
      work: 'Promoção, chamado para uma nova carreira ou avaliação de desempenho.',
      shadow: 'Dúvida sobre o chamado, recusa em mudar e julgamento severo.'
    },
    advice: ['Ouça o chamado.', 'Perdoe o passado.', 'Prepare-se para o renascimento.'],
    journaling: ['Qual é o meu propósito agora?', 'O que preciso perdoar em mim?', 'Estou pronto para o novo?']
  },
  {
    id: 't_21',
    name: 'O Mundo',
    meanings: {
      general: 'Conclusão, integração, viagem e realização.',
      love: 'Relacionamento completo, união feliz e sensação de pertencer.',
      work: 'Sucesso internacional, conclusão de um grande projeto e realização profissional.',
      shadow: 'Falta de fechamento, atrasos e sensação de incompletude.'
    },
    advice: ['Celebre sua conquista.', 'Sinta-se completo.', 'O mundo é seu.'],
    journaling: ['O que concluí com sucesso?', 'Onde me sinto em casa?', 'Qual é o meu próximo nível?']
  },
  // --- Arcanos Menores ---
  // Paus (Wands)
  {
    id: 't_22',
    name: 'Ás de Paus',
    meanings: {
      general: 'Inspiração, novo começo, potencial e vontade.',
      love: 'Nova paixão, entusiasmo e faísca inicial.',
      work: 'Nova oportunidade criativa ou projeto empolgante.',
      shadow: 'Falta de direção, atrasos e falta de energia.'
    },
    advice: ['Siga sua paixão.', 'Aproveite a oportunidade.', 'Aja com entusiasmo.'],
    journaling: ['O que me inspira agora?', 'Qual novo projeto quero começar?', 'Onde sinto mais energia?']
  },
  {
    id: 't_23',
    name: 'Dois de Paus',
    meanings: {
      general: 'Planejamento, decisões, descoberta e progresso.',
      love: 'Planejar o futuro a dois ou decidir o próximo passo.',
      work: 'Expansão de horizontes e planejamento estratégico.',
      shadow: 'Medo do desconhecido, falta de planejamento e hesitação.'
    },
    advice: ['Planeje seu futuro.', 'Olhe além do horizonte.', 'Tome uma decisão.'],
    journaling: ['Quais são meus planos de longo prazo?', 'O que desejo conquistar?', 'Estou pronto para expandir?']
  },
  {
    id: 't_24',
    name: 'Três de Paus',
    meanings: {
      general: 'Expansão, visão, espera e progresso.',
      love: 'Crescimento no amor e visão de futuro compartilhada.',
      work: 'Sucesso comercial e expansão de negócios.',
      shadow: 'Atrasos, falta de visão e frustração na espera.'
    },
    advice: ['Mantenha a visão.', 'Prepare-se para o sucesso.', 'Seja paciente.'],
    journaling: ['O que estou esperando colher?', 'Como posso expandir minha visão?', 'Meus esforços estão valendo a pena?']
  },
  {
    id: 't_25',
    name: 'Quatro de Paus',
    meanings: {
      general: 'Celebração, harmonia, lar e estabilidade.',
      love: 'Casamento, festa e felicidade doméstica.',
      work: 'Sucesso em um projeto e ambiente de trabalho harmonioso.',
      shadow: 'Falta de harmonia, instabilidade no lar e cancelamentos.'
    },
    advice: ['Celebre suas vitórias.', 'Aproveite a harmonia.', 'Sinta-se em casa.'],
    journaling: ['O que merece ser celebrado hoje?', 'O que me traz paz no lar?', 'Onde me sinto seguro?']
  },
  {
    id: 't_26',
    name: 'Cinco de Paus',
    meanings: {
      general: 'Conflito, competição, tensão e desafios.',
      love: 'Brigas bobas, competição por atenção e desentendimentos.',
      work: 'Competição no trabalho e necessidade de se destacar.',
      shadow: 'Fim de conflitos, evitar brigas e cooperação.'
    },
    advice: ['Mantenha a calma na tensão.', 'Seja competitivo de forma saudável.', 'Ouça os outros.'],
    journaling: ['Por que estou em conflito?', 'Como lido com a competição?', 'O que esta tensão me ensina?']
  },
  {
    id: 't_27',
    name: 'Seis de Paus',
    meanings: {
      general: 'Vitória, reconhecimento, sucesso e orgulho.',
      love: 'Sucesso no amor e ser admirado pelo parceiro.',
      work: 'Promoção, elogios e conquista de metas.',
      shadow: 'Excesso de orgulho, queda do pedestal e falta de reconhecimento.'
    },
    advice: ['Aproveite o reconhecimento.', 'Seja um líder inspirador.', 'Mantenha a humildade.'],
    journaling: ['Qual foi minha última grande vitória?', 'Como lido com o sucesso?', 'O que me faz sentir orgulhoso?']
  },
  {
    id: 't_28',
    name: 'Sete de Paus',
    meanings: {
      general: 'Defesa, persistência, coragem e proteção.',
      love: 'Defender seu relacionamento ou seus valores afetivos.',
      work: 'Manter sua posição diante da concorrência.',
      shadow: 'Sentir-se sobrecarregado, desistir e falta de coragem.'
    },
    advice: ['Defenda o que acredita.', 'Não desista agora.', 'Mantenha-se firme.'],
    journaling: ['O que vale a pena defender?', 'Onde preciso de mais persistência?', 'Quem está me desafiando?']
  },
  {
    id: 't_29',
    name: 'Oito de Paus',
    meanings: {
      general: 'Rapidez, movimento, notícias e ação.',
      love: 'Notícias rápidas no amor e romance que evolui depressa.',
      work: 'Projetos que aceleram e viagens de negócios.',
      shadow: 'Atrasos, impulsividade e caos por pressa.'
    },
    advice: ['Aja com rapidez.', 'Esteja pronto para as notícias.', 'Siga o fluxo rápido.'],
    journaling: ['O que está se movendo rápido na minha vida?', 'Como lido com a pressa?', 'Que notícias espero receber?']
  },
  {
    id: 't_30',
    name: 'Nove de Paus',
    meanings: {
      general: 'Resiliência, cautela, última etapa e força.',
      love: 'Cansaço no amor, mas persistência para manter a relação.',
      work: 'Quase alcançando a meta, apesar do cansaço.',
      shadow: 'Exaustão, defensividade excessiva e desistência no final.'
    },
    advice: ['Aguente firme só mais um pouco.', 'Proteja-se, mas não se isole.', 'Use sua resiliência.'],
    journaling: ['O que me mantém em pé?', 'Onde me sinto exausto?', 'Qual é a última barreira?']
  },
  {
    id: 't_31',
    name: 'Dez de Paus',
    meanings: {
      general: 'Fardo, responsabilidade, sobrecarga e esforço.',
      love: 'Sentir o peso do relacionamento ou carregar tudo sozinho.',
      work: 'Excesso de trabalho e responsabilidades pesadas.',
      shadow: 'Delegar tarefas, libertação de fardos e colapso por estresse.'
    },
    advice: ['Aprenda a delegar.', 'Não carregue o mundo nas costas.', 'Reconheça seus limites.'],
    journaling: ['Qual fardo posso soltar?', 'Por que assumo tantas responsabilidades?', 'Onde preciso de ajuda?']
  },
  {
    id: 't_32',
    name: 'Valete de Paus',
    meanings: {
      general: 'Entusiasmo, notícias, exploração e potencial.',
      love: 'Novo flerte empolgante ou notícias animadoras do parceiro.',
      work: 'Nova ideia criativa ou início de carreira entusiasmado.',
      shadow: 'Falta de foco, notícias ruins e imaturidade.'
    },
    advice: ['Explore novas ideias.', 'Seja entusiasmado.', 'Ouça as notícias.'],
    journaling: ['Qual nova aventura me chama?', 'O que me entusiasma hoje?', 'Como posso ser mais criativo?']
  },
  {
    id: 't_33',
    name: 'Cavaleiro de Paus',
    meanings: {
      general: 'Ação, aventura, impulsividade e paixão.',
      love: 'Romance intenso e rápido, ou parceiro aventureiro.',
      work: 'Mudança rápida de emprego ou projetos ousados.',
      shadow: 'Agressividade, pressa imprudente e falta de compromisso.'
    },
    advice: ['Siga sua paixão com coragem.', 'Aventure-se.', 'Cuidado com a impulsividade.'],
    journaling: ['Para onde minha paixão me leva?', 'Onde estou sendo impulsivo?', 'Qual é o meu próximo desafio?']
  },
  {
    id: 't_34',
    name: 'Rainha de Paus',
    meanings: {
      general: 'Confiança, calor, independência e magnetismo.',
      love: 'Mulher apaixonada, vibrante e segura de si no amor.',
      work: 'Liderança inspiradora e sucesso através do carisma.',
      shadow: 'Ciúme, manipulação e temperamento explosivo.'
    },
    advice: ['Seja confiante.', 'Use seu carisma.', 'Mantenha sua independência.'],
    journaling: ['O que me torna magnético?', 'Como exerço minha confiança?', 'Onde preciso de mais brilho?']
  },
  {
    id: 't_35',
    name: 'Rei de Paus',
    meanings: {
      general: 'Liderança, visão, empreendedorismo e honra.',
      love: 'Parceiro protetor, apaixonado e líder na relação.',
      work: 'Sucesso nos negócios e liderança visionária.',
      shadow: 'Arrogância, tirania e falta de visão.'
    },
    advice: ['Assuma o comando.', 'Pense grande.', 'Seja um líder justo.'],
    journaling: ['Como lidero minha vida?', 'Qual é minha grande visão?', 'O que significa honra para mim?']
  },
  // Copas (Cups)
  {
    id: 't_36',
    name: 'Ás de Copas',
    meanings: {
      general: 'Amor, novas emoções, intuição e espiritualidade.',
      love: 'Novo amor profundo ou renovação emocional intensa.',
      work: 'Trabalho que traz satisfação emocional e criatividade.',
      shadow: 'Bloqueio emocional, amor não correspondido e instabilidade.'
    },
    advice: ['Abra seu coração.', 'Confie nas suas emoções.', 'Permita-se sentir.'],
    journaling: ['O que meu coração deseja?', 'Como posso me amar mais?', 'O que me traz paz emocional?']
  }
];

export const LENORMAND_DECK: Card[] = [
  {
    id: 'l_1',
    name: 'O Cavaleiro',
    meanings: {
      general: 'Notícias, visitas e movimentos rápidos. Algo está chegando até você.',
      love: 'Um novo encontro ou comunicação importante do parceiro.',
      work: 'Novas propostas ou informações que mudam o rumo dos projetos.',
      shadow: 'Pressa excessiva ou notícias superficiais.'
    },
    advice: ['Fique atento aos sinais.', 'Aja com rapidez.', 'Prepare-se para mudanças.'],
    journaling: ['Que mensagem eu espero receber?', 'Estou pronto para me movimentar?', 'O que me motiva a seguir em frente?']
  },
  {
    id: 'l_2',
    name: 'O Trevo',
    meanings: {
      general: 'Pequena sorte, superação de obstáculos leves. Oportunidades passageiras.',
      love: 'Momentos felizes e leves a dois.',
      work: 'Um pequeno ganho ou facilidade inesperada.',
      shadow: 'Sorte que dura pouco ou negligência com problemas pequenos.'
    },
    advice: ['Aproveite as pequenas alegrias.', 'Não complique o que é simples.', 'Tenha fé na sua sorte.'],
    journaling: ['Quais pequenas vitórias eu tive hoje?', 'Como posso ser mais grato?', 'O que considero um golpe de sorte?']
  },
  {
    id: 'l_3',
    name: 'O Navio',
    meanings: {
      general: 'Viagens, mudanças, comércio e horizontes distantes.',
      love: 'Distância física ou emocional, ou uma jornada juntos.',
      work: 'Expansão de negócios, comércio exterior ou mudanças de longo prazo.',
      shadow: 'Instabilidade, desejo de fuga ou atrasos em viagens.'
    },
    advice: ['Explore novos horizontes.', 'Deixe as coisas fluírem.', 'Planeje sua jornada.'],
    journaling: ['Para onde quero viajar internamente?', 'O que desejo expandir?', 'Estou pronto para mudar de ares?']
  },
  {
    id: 'l_4',
    name: 'A Casa',
    meanings: {
      general: 'Família, lar, estabilidade e segurança.',
      love: 'Vida doméstica, construção de uma base sólida e conforto familiar.',
      work: 'Trabalho em home office, estabilidade no emprego ou negócios imobiliários.',
      shadow: 'Acomodação, problemas familiares ou falta de privacidade.'
    },
    advice: ['Cuide do seu lar.', 'Busque estabilidade.', 'Valorize suas raízes.'],
    journaling: ['O que significa "lar" para mim?', 'Como posso me sentir mais seguro?', 'Minha base é sólida?']
  },
  {
    id: 'l_5',
    name: 'A Árvore',
    meanings: {
      general: 'Saúde, crescimento, ancestralidade e paciência.',
      love: 'Relacionamento duradouro, crescimento lento e raízes profundas.',
      work: 'Crescimento sólido na carreira, projetos de longo prazo e vitalidade.',
      shadow: 'Problemas de saúde, estagnação ou falta de energia.'
    },
    advice: ['Tenha paciência.', 'Cuide da sua saúde.', 'Conecte-se com suas raízes.'],
    journaling: ['Como estou cuidando do meu corpo?', 'O que está crescendo na minha vida?', 'Qual legado quero deixar?']
  },
  {
    id: 'l_6',
    name: 'As Nuvens',
    meanings: {
      general: 'Confusão, incerteza, dúvidas e instabilidade passageira.',
      love: 'Mal-entendidos, ciúmes ou falta de clareza sobre os sentimentos.',
      work: 'Incerteza profissional, falta de foco e clima tenso no ambiente.',
      shadow: 'Clareza após a tempestade, superação de dúvidas e fim da confusão.'
    },
    advice: ['Espere a poeira baixar.', 'Não tome decisões importantes agora.', 'Busque clareza.'],
    journaling: ['O que está nublando minha visão?', 'Como lido com a incerteza?', 'O que me traz clareza?']
  },
  {
    id: 'l_7',
    name: 'A Serpente',
    meanings: {
      general: 'Traição, inteligência, desvios e complicações.',
      love: 'Rivalidade, sedução perigosa ou necessidade de ser astuto.',
      work: 'Concorrência desleal, caminhos tortuosos ou estratégia inteligente.',
      shadow: 'Falsidade revelada, superação de obstáculos e renovação.'
    },
    advice: ['Seja prudente.', 'Observe quem está ao seu redor.', 'Use sua inteligência.'],
    journaling: ['Quem ou o que me ameaça?', 'Onde preciso ser mais esperto?', 'Como lido com a inveja?']
  },
  {
    id: 'l_8',
    name: 'O Caixão',
    meanings: {
      general: 'Fim, perdas, doença e transformações profundas.',
      love: 'Fim de um ciclo amoroso, luto ou necessidade de enterrar o passado.',
      work: 'Encerramento de contrato, falência ou mudança radical de rumo.',
      shadow: 'Resistência ao fim, medo da perda e renascimento difícil.'
    },
    advice: ['Aceite o fim.', 'Deixe o passado para trás.', 'Permita-se o luto.'],
    journaling: ['O que preciso enterrar definitivamente?', 'Como lido com perdas?', 'O que está esperando para renascer?']
  },
  {
    id: 'l_9',
    name: 'As Flores',
    meanings: {
      general: 'Presentes, alegria, convites e beleza.',
      love: 'Romantismo, surpresas agradáveis e felicidade no amor.',
      work: 'Reconhecimento, bônus ou um ambiente de trabalho harmonioso.',
      shadow: 'Superficialidade, beleza passageira ou vaidade excessiva.'
    },
    advice: ['Aproveite o momento.', 'Seja grato pelos presentes.', 'Cultive a beleza.'],
    journaling: ['O que me faz sorrir?', 'Como posso ser mais gentil?', 'Qual presente a vida me deu hoje?']
  },
  {
    id: 'l_10',
    name: 'A Foice',
    meanings: {
      general: 'Cortes bruscos, perigo, decisões rápidas e colheita.',
      love: 'Ruptura repentina, palavras cortantes ou decisão drástica.',
      work: 'Demissão, corte de gastos ou necessidade de agir com precisão.',
      shadow: 'Corte desnecessário, medo de decidir ou colheita ruim.'
    },
    advice: ['Corte o que não serve mais.', 'Decida com firmeza.', 'Cuidado com acidentes.'],
    journaling: ['O que precisa de um corte imediato?', 'Estou pronto para colher o que plantei?', 'Onde fui impulsivo?']
  },
  {
    id: 'l_11',
    name: 'O Chicote',
    meanings: {
      general: 'Conflitos, discussões, castigo e repetição.',
      love: 'Brigas constantes, tensão sexual ou agressividade verbal.',
      work: 'Competição acirrada, estresse e excesso de cobrança.',
      shadow: 'Autoflagelação, fim de conflitos e necessidade de disciplina.'
    },
    advice: ['Evite discussões inúteis.', 'Controle sua raiva.', 'Tenha disciplina.'],
    journaling: ['Por que estou em conflito?', 'Como lido com a agressividade?', 'O que estou repetindo exaustivamente?']
  },
  {
    id: 'l_12',
    name: 'Os Pássaros',
    meanings: {
      general: 'Conversas, boatos, nervosismo e pequenas viagens.',
      love: 'Flertes, troca de mensagens e agitação no relacionamento.',
      work: 'Reuniões informais, networking e burburinho no escritório.',
      shadow: 'Fofocas, ansiedade excessiva e falta de foco.'
    },
    advice: ['Comunique-se.', 'Não dê ouvidos a boatos.', 'Mantenha a calma.'],
    journaling: ['O que as pessoas estão dizendo?', 'Como posso me expressar melhor?', 'O que me deixa ansioso?']
  },
  {
    id: 'l_13',
    name: 'A Criança',
    meanings: {
      general: 'Inocência, novos começos, imaturidade e filhos.',
      love: 'Novo amor, fase lúdica ou comportamento infantil no casal.',
      work: 'Novo projeto, aprendizado inicial ou falta de experiência.',
      shadow: 'Irresponsabilidade, ingenuidade perigosa ou birra.'
    },
    advice: ['Seja espontâneo.', 'Comece algo novo.', 'Mantenha a pureza.'],
    journaling: ['Onde preciso ser mais leve?', 'Qual novo começo me espera?', 'Como cuido da minha criança interior?']
  },
  {
    id: 'l_14',
    name: 'A Raposa',
    meanings: {
      general: 'Astúcia, estratégia, trabalho e cautela.',
      love: 'Sedução estratégica, desconfiança ou alguém agindo por interesse.',
      work: 'Inteligência profissional, necessidade de ser esperto e cuidado com armadilhas.',
      shadow: 'Falsidade, manipulação e desonestidade.'
    },
    advice: ['Seja esperto.', 'Observe as intenções alheias.', 'Trabalhe com estratégia.'],
    journaling: ['Onde preciso de mais malícia?', 'Quem está tentando me enganar?', 'Qual é a minha estratégia?']
  },
  {
    id: 'l_15',
    name: 'O Urso',
    meanings: {
      general: 'Poder, proteção, nutrição e autoridade.',
      love: 'Proteção do parceiro, possessividade ou figura materna/paterna forte.',
      work: 'Chefia, estabilidade financeira e força para liderar.',
      shadow: 'Abuso de poder, ciúme doentio ou dieta inadequada.'
    },
    advice: ['Seja forte.', 'Proteja o que é seu.', 'Cuide da sua nutrição.'],
    journaling: ['Como exerço minha força?', 'Quem eu protejo?', 'O que me nutre de verdade?']
  },
  {
    id: 'l_16',
    name: 'As Estrelas',
    meanings: {
      general: 'Sorte, inspiração, espiritualidade e clareza.',
      love: 'Sonhos realizados no amor, esperança e conexão espiritual.',
      work: 'Sucesso, reconhecimento e seguir o caminho certo.',
      shadow: 'Falta de direção, desilusão e sonhos irrealistas.'
    },
    advice: ['Confie no seu destino.', 'Siga sua inspiração.', 'Tenha fé.'],
    journaling: ['Qual é o meu maior desejo?', 'Como me conecto com o divino?', 'O que me guia na escuridão?']
  },
  {
    id: 'l_17',
    name: 'A Cegonha',
    meanings: {
      general: 'Mudanças, novidades, viagens e gravidez.',
      love: 'Mudança de fase no amor, renovação ou chegada de um filho.',
      work: 'Mudança de cargo, novos projetos ou viagens de negócios.',
      shadow: 'Resistência à mudança, instabilidade ou atrasos.'
    },
    advice: ['Aceite as mudanças.', 'Renove-se.', 'Esteja aberto ao novo.'],
    journaling: ['O que está mudando em mim?', 'Para onde quero voar?', 'Estou pronto para o novo?']
  },
  {
    id: 'l_18',
    name: 'O Cão',
    meanings: {
      general: 'Fidelidade, amizade, confiança e apoio.',
      love: 'Parceiro fiel, amizade que vira amor e lealdade absoluta.',
      work: 'Colegas confiáveis, parcerias duradouras e apoio profissional.',
      shadow: 'Falsa amizade, dependência excessiva ou deslealdade.'
    },
    advice: ['Confie nos seus amigos.', 'Seja fiel aos seus princípios.', 'Busque apoio.'],
    journaling: ['Quem são meus verdadeiros aliados?', 'Como posso ser um amigo melhor?', 'Em quem eu confio?']
  },
  {
    id: 'l_19',
    name: 'A Torre',
    meanings: {
      general: 'Isolamento, instituições, autoridade e longevidade.',
      love: 'Solidão a dois, distanciamento ou busca por um amor sólido e maduro.',
      work: 'Grandes empresas, órgãos públicos e ascensão na carreira.',
      shadow: 'Solidão dolorosa, arrogância ou problemas com a lei.'
    },
    advice: ['Busque sua elevação.', 'Respeite as hierarquias.', 'Tire um tempo para si.'],
    journaling: ['O que construí com solidez?', 'Por que me sinto isolado?', 'Como vejo a autoridade?']
  },
  {
    id: 'l_20',
    name: 'O Jardim',
    meanings: {
      general: 'Vida social, público, encontros e lazer.',
      love: 'Encontros em público, eventos sociais e popularidade no amor.',
      work: 'Networking, marketing, eventos corporativos e visibilidade.',
      shadow: 'Preocupação excessiva com a imagem, futilidade ou isolamento social.'
    },
    advice: ['Saia e socialize.', 'Mostre-se ao mundo.', 'Aproveite o lazer.'],
    journaling: ['Como me sinto em público?', 'Onde posso encontrar novas pessoas?', 'Qual imagem estou projetando?']
  },
  {
    id: 'l_21',
    name: 'A Montanha',
    meanings: {
      general: 'Obstáculos, atrasos, bloqueios e firmeza.',
      love: 'Dificuldades no relacionamento, frieza emocional ou barreiras externas.',
      work: 'Desafios pesados, metas difíceis e necessidade de persistência.',
      shadow: 'Superação de obstáculos, fim de bloqueios e resiliência.'
    },
    advice: ['Seja persistente.', 'Encare o desafio.', 'Aguarde o momento de subir.'],
    journaling: ['O que está me bloqueando?', 'Como lido com dificuldades?', 'Qual montanha estou subindo?']
  },
  {
    id: 'l_22',
    name: 'O Caminho',
    meanings: {
      general: 'Escolhas, decisões, alternativas e livre-arbítrio.',
      love: 'Dúvida entre dois caminhos, decisão afetiva e novos rumos.',
      work: 'Mudança de carreira, opções de negócios e decisões estratégicas.',
      shadow: 'Indecisão paralisante, caminho errado ou falta de opções.'
    },
    advice: ['Escolha com sabedoria.', 'Considere as alternativas.', 'Assuma o controle da sua jornada.'],
    journaling: ['Qual decisão estou evitando?', 'Quais são meus caminhos agora?', 'Para onde cada escolha me leva?']
  },
  {
    id: 'l_23',
    name: 'O Rato',
    meanings: {
      general: 'Desgaste, perdas, estresse e roubo.',
      love: 'Relacionamento desgastante, perda de energia ou traição sutil.',
      work: 'Prejuízos financeiros, estresse no trabalho e ambiente tóxico.',
      shadow: 'Recuperação de perdas, fim do estresse e limpeza.'
    },
    advice: ['Cuidado com o desperdício.', 'Proteja sua energia.', 'Resolva os pequenos problemas antes que cresçam.'],
    journaling: ['O que está me consumindo?', 'Onde estou perdendo energia?', 'O que precisa de reparo?']
  },
  {
    id: 'l_24',
    name: 'O Coração',
    meanings: {
      general: 'Amor, paixão, sentimentos e generosidade.',
      love: 'Amor verdadeiro, romance intenso e entrega emocional.',
      work: 'Trabalhar com amor, paixão pelo que faz e sucesso emocional.',
      shadow: 'Coração partido, egoísmo ou excesso de sentimentalismo.'
    },
    advice: ['Siga seu coração.', 'Seja generoso.', 'Ame sem medo.'],
    journaling: ['O que eu realmente amo?', 'Como expresso meus sentimentos?', 'Meu coração está aberto?']
  },
  {
    id: 'l_25',
    name: 'O Anel',
    meanings: {
      general: 'Compromisso, parcerias, contratos e ciclos.',
      love: 'Casamento, noivado ou compromisso sério e duradouro.',
      work: 'Assinatura de contratos, parcerias de sucesso e fidelidade profissional.',
      shadow: 'Ciclos viciosos, quebra de contrato ou medo de compromisso.'
    },
    advice: ['Cumpra suas promessas.', 'Assuma o compromisso.', 'Honre seus contratos.'],
    journaling: ['Com o que estou comprometido?', 'Quais ciclos preciso fechar?', 'Minhas parcerias são equilibradas?']
  },
  {
    id: 'l_26',
    name: 'O Livro',
    meanings: {
      general: 'Segredos, conhecimento, estudos e o oculto.',
      love: 'Amor secreto, desconhecimento sobre o parceiro ou necessidade de discrição.',
      work: 'Estudos, especialização, projetos secretos ou burocracia.',
      shadow: 'Revelação de segredos, falta de conhecimento ou desonestidade intelectual.'
    },
    advice: ['Estude mais.', 'Mantenha o segredo.', 'Busque o conhecimento oculto.'],
    journaling: ['O que ainda não sei sobre esta situação?', 'Qual segredo guardo?', 'O que desejo aprender?']
  },
  {
    id: 'l_27',
    name: 'A Carta',
    meanings: {
      general: 'Comunicação escrita, documentos, notícias e mensagens.',
      love: 'Declaração de amor, mensagens importantes ou convites.',
      work: 'E-mails, contratos, notícias profissionais e documentos legais.',
      shadow: 'Mensagens perdidas, notícias ruins ou falta de comunicação.'
    },
    advice: ['Escreva o que sente.', 'Verifique os documentos.', 'Comunique-se de forma clara.'],
    journaling: ['Que mensagem quero enviar?', 'O que os documentos dizem?', 'Como lido com as notícias?']
  },
  {
    id: 'l_28',
    name: 'O Homem',
    meanings: {
      general: 'Energia masculina, ação, consulente ou figura masculina importante.',
      love: 'O parceiro, um novo pretendente ou necessidade de agir com assertividade.',
      work: 'Lógica, ação direta e influência de um homem nos negócios.',
      shadow: 'Agressividade masculina, passividade excessiva ou problemas com homens.'
    },
    advice: ['Aja com assertividade.', 'Use a lógica.', 'Foque na ação.'],
    journaling: ['Como lido com minha energia masculina?', 'Quem é o homem importante agora?', 'Onde preciso de mais ação?']
  },
  {
    id: 'l_29',
    name: 'A Mulher',
    meanings: {
      general: 'Energia feminina, intuição, consulente ou figura feminina importante.',
      love: 'A parceira, uma nova pretendente ou necessidade de usar a intuição.',
      work: 'Criatividade, receptividade e influência de uma mulher nos negócios.',
      shadow: 'Manipulação feminina, excesso de emoção ou problemas com mulheres.'
    },
    advice: ['Use sua intuição.', 'Seja receptivo.', 'Conecte-se com o feminino.'],
    journaling: ['Como lido com minha energia feminina?', 'Quem é a mulher importante agora?', 'Onde preciso de mais intuição?']
  },
  {
    id: 'l_30',
    name: 'Os Lírios',
    meanings: {
      general: 'Paz, maturidade, sabedoria e sexualidade madura.',
      love: 'Amor maduro, paz no relacionamento e fidelidade de longo prazo.',
      work: 'Carreira consolidada, aposentadoria ou sucesso através da experiência.',
      shadow: 'Frieza, tédio ou problemas relacionados à idade.'
    },
    advice: ['Busque a paz.', 'Aja com maturidade.', 'Seja sábio.'],
    journaling: ['O que me traz serenidade?', 'Onde preciso de mais maturidade?', 'Como vejo minha sabedoria?']
  },
  {
    id: 'l_31',
    name: 'O Sol',
    meanings: {
      general: 'Sucesso, energia, otimismo e vitória.',
      love: 'Felicidade plena, clareza e calor no relacionamento.',
      work: 'Sucesso total, brilho profissional e grandes conquistas.',
      shadow: 'Excesso de calor, arrogância ou sucesso passageiro.'
    },
    advice: ['Seja positivo.', 'Brilhe.', 'Aproveite o sucesso.'],
    journaling: ['O que me faz sentir vitorioso?', 'Onde sinto mais energia?', 'Como posso iluminar os outros?']
  },
  {
    id: 'l_32',
    name: 'A Lua',
    meanings: {
      general: 'Reconhecimento, emoções, intuição e fama.',
      love: 'Romantismo, flutuações emocionais e atração magnética.',
      work: 'Sucesso público, criatividade e reconhecimento pelo trabalho.',
      shadow: 'Instabilidade emocional, ilusão e medo do fracasso.'
    },
    advice: ['Confie nas suas emoções.', 'Busque o reconhecimento.', 'Ouça sua intuição.'],
    journaling: ['O que sinto lá no fundo?', 'Como lido com a fama/público?', 'Minhas emoções me guiam ou me cegam?']
  },
  {
    id: 'l_33',
    name: 'A Chave',
    meanings: {
      general: 'Soluções, aberturas, destino e descobertas.',
      love: 'Abertura do coração, solução de conflitos e encontro decisivo.',
      work: 'Novas portas se abrindo, sucesso garantido e ideias geniais.',
      shadow: 'Portas fechadas, falta de solução ou segredo trancado.'
    },
    advice: ['Abra a porta.', 'Encontre a solução.', 'A chave está com você.'],
    journaling: ['Qual é a solução para o meu problema?', 'O que desejo abrir na minha vida?', 'Onde me sinto trancado?']
  },
  {
    id: 'l_34',
    name: 'Os Peixes',
    meanings: {
      general: 'Dinheiro, abundância, fluxo e comércio.',
      love: 'Relacionamento fluido, abundância de sentimentos ou foco financeiro no casal.',
      work: 'Lucros, novos negócios, fluidez financeira e sucesso comercial.',
      shadow: 'Perda de dinheiro, ganância ou excesso de gastos.'
    },
    advice: ['Deixe o dinheiro fluir.', 'Busque a abundância.', 'Seja próspero.'],
    journaling: ['Como lido com o dinheiro?', 'Onde sinto abundância?', 'Meu fluxo financeiro está aberto?']
  },
  {
    id: 'l_35',
    name: 'A Âncora',
    meanings: {
      general: 'Estabilidade, segurança, trabalho e porto seguro.',
      love: 'Relacionamento sólido, compromisso duradouro e segurança afetiva.',
      work: 'Emprego estável, segurança profissional e metas alcançadas.',
      shadow: 'Acomodação, peso excessivo ou falta de movimento.'
    },
    advice: ['Mantenha-se firme.', 'Busque a segurança.', 'Ancore seus sonhos.'],
    journaling: ['O que me traz estabilidade?', 'Onde me sinto seguro?', 'Estou acomodado ou estável?']
  },
  {
    id: 'l_36',
    name: 'A Cruz',
    meanings: {
      general: 'Destino, provação, fé e carma.',
      love: 'Relacionamento cármico, sofrimento necessário ou prova de amor.',
      work: 'Fardos profissionais, sacrifício pelo trabalho e destino de carreira.',
      shadow: 'Fim do sofrimento, alívio de fardos e renovação da fé.'
    },
    advice: ['Tenha fé.', 'Aceite seu destino.', 'Carregue sua cruz com dignidade.'],
    journaling: ['Qual é o meu maior desafio agora?', 'No que eu deposito minha fé?', 'O que este fardo está me ensinando?']
  }
];
